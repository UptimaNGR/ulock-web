<template>
  <v-row align="center" justify="center">
    <v-col v-if="client.connected">
      <v-row>
        <v-col>{{getUsername}}</v-col>
        <v-col
          class="d-flex align-center justify-center">
          <v-switch
            color="primary"
            v-model="engine"
          >
            <v-icon left>
              mdi-door-open
            </v-icon>
            Engine
          </v-switch>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div v-if="mapData.length > 0">
            <GmapMap
              :center="getLatLng(mapData[mapData.length-1])"
              :zoom="20"
              style="width: 100vw; height: 100vh"
              map-type-id="hybrid"
            >
              <GmapPolyline
                :draggable="false"
                :editable="false"
                :clickable="true"
                :options="{
                  geodesic: true,
                  strokeColor: '#008000',
                  path: mapData.map((path) => { return getLatLng(path) }),
                  strokeWeight: '10'
                }"
              ></GmapPolyline>
              <GmapMarker
                :position="getLatLng(mapData[mapData.length-1])"
                :clickable="true"
                @click="goToAddress(mapData[mapData.length-1])"
                :draggable="false"
                title="Current location"
              />
            </GmapMap>
          </div>
        </v-col>
      </v-row>
      <!-- <v-row align="center" justify="center">
        <v-col
          cols="12"
          sm="6"
          class="d-flex align-center justify-center primary--text">
          Hi {{getUsername}}
        </v-col>
      </v-row> -->
      <!-- <v-row align="center" justify="center">
        <v-col
          v-if="!viewLogs">
          <v-row align="center" justify="center" v-if="battery">
            <v-col
              cols="12"
              sm="6"
              class="d-flex align-center justify-center ">
                <v-icon :color="(battery > 29) ? 'primary': 'red'">mdi-battery{{batterySuffix(battery)}}</v-icon>
                <p class=" pa-0 mx-3 my-0" :class="(battery > 29) ? 'primary--text': 'red--text'">{{battery}} %</p>
            </v-col>
            <v-col>
              <p>Location: {{ battery }}</p>
            </v-col>
          </v-row>
          <v-row align="center" justify="center" v-else>
            <v-col
              cols="12"
              sm="6"
              class="d-flex align-center justify-center ">
                <v-icon color="red">mdi-battery-unknown</v-icon>
                <p class="red--text pa-0 mx-3 my-0">Unavaliable</p>
            </v-col>
          </v-row> -->
          <!-- <v-row align="center" justify="center">
            <v-col
              class="d-flex align-center justify-center">
              <v-btn
                color="primary"
                text
                @click="openDoor"
              >
                <v-icon left>
                  mdi-door-open
                </v-icon>
                Open door
              </v-btn>
            </v-col>
          </v-row> -->
          <!-- <v-row align="center" justify="center">
            <v-col
              class="d-flex align-center justify-center">
              <v-switch
                color="primary"
                v-model="engine"
              >
                <v-icon left>
                  mdi-door-open
                </v-icon>
                Engine
              </v-switch>
            </v-col>
          </v-row>
          <v-row align="center" justify="center">
            <v-col
              class="d-flex align-center justify-center">
              <v-btn
                color="primary"
                text
                @click = "getLogs"
              >
                <v-icon left>
                  mdi-clock-outline
                </v-icon>
                View Access logs
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          v-else>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    Name
                  </th>
                  <th class="text-left">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in logs"
                  :key="item.id"
                >
                  <td>{{ item.opened_by }}</td>
                  <td>{{ new Date(item.created_at).toUTCString() }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-btn
            class="mr-4 mt-4"
            outlined
            color="primary"
            @click="viewLogs=false"
          >
            back
          </v-btn>
        </v-col>
      </v-row> -->
    </v-col>
    <v-col
      cols="12"
      sm="6" v-else>
      <v-card
      outlined
      tile
      >
        <v-card-title>
          Disconnected
        </v-card-title>
        <v-card-text>
          Please check your internet connection.
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import mqtt from 'mqtt'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getUsername'])
  },
  created () {
    if (!this.client.connected) {
      this.fetchMqttDetails()
      this.getLogs()
    }
  },
  data () {
    return {
      mapData: [],
      battery: null,
      viewLogs: false,
      engine: false,
      logs: [
        // { name: 'ola', time: 'time', via: 'Fingerprint' },
        // { name: 'demp', time: 'time', via: 'Fingerprint' },
        // { name: 'craft', time: 'time', via: 'web' }
      ],
      connection: {
        host: 'demp.uptima.co',
        port: 8883,
        endpoint: '',
        clean: true, // Reserved session
        connectTimeout: 4000, // Time out
        reconnectPeriod: 4000, // Reconnection interval
        // Certification Information
        clientId: null,
        username: null,
        password: null
      },
      subscription: {
        topic: 'uptima/tracker/location',
        qos: 0
      },
      publish: {
        topic: 'uptima/tracker/engine',
        qos: 0
      },
      receiveNews: '',
      qosList: [
        { label: 0, value: 0 },
        { label: 1, value: 1 },
        { label: 2, value: 2 }
      ],
      client: {
        connected: false
      },
      topic: 'uptima/tracker/location',
      subscribeSuccess: false
    }
  },
  methods: {
    batterySuffix (battery) {
      const batteryAppx = Math.ceil(battery / 10) * 10
      if (batteryAppx < 100) {
        return `-${batteryAppx}`
      } else {
        return ''
      }
    },
    getLogs () {
      const logsURI = `data?topic=${this.topic}`
      this.$axios
        .get(logsURI)
        .then((result) => {
          const logs = result.data.data
          console.log(logs)
          // this.logs = logs
          // this.viewLogs = true
          this.mapData = logs.map((d) => {
            return d.data
          })
        })
        .catch((err) => {
          // this.$router.push('/home')
          console.log(err)
        })
      // this.viewLogs = true
    },
    fetchMqttDetails () {
      const mqttURI = 'mqtt-user-info'
      this.$axios
        .get(mqttURI)
        .then((result) => {
          const data = result.data.data.mqttInfo[0]
          this.connection.clientId = data.id
          this.connection.username = data.username
          this.connection.password = data.password
          this.createConnection()
        })
        .catch((err) => {
          // this.$router.push('/home')
          console.log(err)
        })
    },
    createConnection () {
      // Connect string, and specify the connection method used through protocol
      // ws unencrypted WebSocket connection
      // wss encrypted WebSocket connection
      // mqtt unencrypted TCP connection
      // mqtts encrypted TCP connection
      // wxs WeChat mini app connection
      // alis Alipay mini app connection
      // const { host, port } = this.connection
      const connectUrl = `mqtt://${this.connection.host}:${this.connection.port}`
      try {
        this.client = mqtt.connect(connectUrl, { clientId: this.connection.clientId, protocol: 'wss', username: this.connection.username, password: this.connection.password })
      } catch (error) {
        console.log('mqtt.connect error', error)
      }
      this.client.on('offline', () => {
        console.log('Disconnected!')
      })
      this.client.on('error', error => {
        console.log('Connection failed', error)
      })
      this.client.on('message', (topic, message) => {
        if (topic === 'uptima/tracker/location') {
          const cord = this.binToString(message)
          this.mapData.push(cord)
        }
      })
      const { topic, qos } = this.subscription
      this.client.subscribe(topic, { qos }, (error, res) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        this.subscribeSuccess = true
        console.log('Subscribe to topics res', res)
      })
    },
    binToString (binArray) {
      let result = ''
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < binArray.length; i++) {
        result += String.fromCharCode(binArray[i])
      }
      return result
    },
    getLatLng (pathString) {
      const cords = pathString.split(';')
      return {
        lat: parseFloat(cords[0]),
        lng: parseFloat(cords[1])
      }
    },
    goToAddress (data) {
      const dataSplit = data.split(';')
      const [lat, long] = dataSplit
      window.open(`
      https://www.google.com/maps/dir//'${lat},${long}'/@,13z/data=!4m6!4m5!1m0!1m3!2m2!1d${long}!2d${lat}?entry=ttu`, '_blank')
    }
    // openDoor () {
    //   const { topic, qos } = this.publish
    //   this.client.publish(topic, qos, error => {
    //     if (error) {
    //       console.log('Publish error', error)
    //     }
    //   })
    // }
  },
  watch: {
    engine (val) {
      console.log(val)
      const { topic, qos } = this.publish
      const payload = (val) ? 'ON' : 'OFF'
      this.client.publish(topic, payload, qos, error => {
        if (error) {
          console.log('Publish error', error)
        }
      })
    }
  }
}
</script>

<style>

</style>

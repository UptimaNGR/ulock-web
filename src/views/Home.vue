<template>
  <div class="home">
    <div v-if="client.connected || connectionType !== 'mqtt'">
      <header class="header">
        <img src="@/assets/uptima.svg" alt="uptima logo">
        <div class="header-right">
          <div class="switch-engine">
            <p>Switch Vehicle Engine</p>
            <v-switch
              color="primary"
              v-model="engine"
            >
              <v-icon left>
                mdi-door-open
              </v-icon>
              Engine
            </v-switch>
          </div>
          <div class="navigation">
            <p class="username">{{getUsername}}</p>
            <button class="logout-button" @click="logout">Logout</button>
          </div>
        </div>
      </header>
      <div>
        <div>
          <div v-if="mapData.length > 0">
            <GmapMap
              :center="mapData[mapData.length-1]"
              :zoom="getScreenWidth <= 400 ? 100: 20"
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
                  path: mapData,
                  strokeWeight: '10'
                }"
              ></GmapPolyline>
              <GmapMarker
                :position="mapData[mapData.length-1]"
                :clickable="true"
                @click="goToAddress(mapData[mapData.length-1])"
                :draggable="false"
                title="Click to view Current location"
                class="custom-marker"
              />
            </GmapMap>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="offline">
      <div>
          <v-card-title>
            Disconnected
          </v-card-title>
          <v-card-text>
            Please wait or check your internet connection.
          </v-card-text>
      </div>
    </div>
  </div>
</template>

<script>
import mqtt from 'mqtt'
import { mapActions, mapGetters } from 'vuex'
import crypto from 'crypto'
export default {
  computed: {
    ...mapGetters(['getUsername']),
    getScreenWidth () {
      return window.screen.availWidth
    }
  },
  created () {
    if (!this.client.connected) {
      this.fetchMqttDetails()
    }
  },
  data () {
    return {
      customMarker: require('@/assets/uptima.svg'),
      mapData: [],
      engine: false,
      logs: [
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
        topic: null,
        qos: 0
      },
      publish: {
        topic: null,
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
      subscribeSuccess: false,
      connectionType: ''
    }
  },
  methods: {
    ...mapActions(['clearAll']),
    getLogs () {
      const logsURI = `data?topic=${this.subscription.topic}`
      this.$axios
        .get(logsURI)
        .then((result) => {
          const logs = result.data.data
          const logsData = logs.map((d) => {
            return this.getLatLng(d.data)
          })
          this.mapData = logsData.filter((o) => (o.lat && o.lat !== 0) && (o.lng && o.lng !== 0)).reverse()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getEngine () {
      const engineURI = `data?topic=${this.publish.topic}`
      this.$axios
        .get(engineURI)
        .then((result) => {
          const logs = result.data.data
          this.engine = logs[0] ? (logs[0].data === 'OFF') : 'ON'
        })
        .catch((err) => {
          console.log(err)
        })
    },
    fetchMqttDetails () {
      const mqttURI = 'mqtt-user-info'
      this.$axios
        .get(mqttURI)
        .then((result) => {
          const data = result.data.data.mqttInfo
          const { enc, iv, authTag } = data.password
          this.connection.clientId = data.id
          this.connection.username = data.username
          this.connection.password = this.decrypt(enc, iv, authTag)
          this.subscription.topic = data.topics.split(',').filter((o) => o.includes('location'))[0]
          this.publish.topic = data.topics.split(',').filter((o) => o.includes('engine'))[0]
          this.connectionType = data.subscriber_type
          this.createConnection()
          this.getLogs()
          this.getEngine()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    createConnection () {
      if (this.connectionType !== 'mqtt') {
        return null
      }
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
        if (topic === this.subscription.topic) {
          const cord = this.binToString(message)
          this.mapData.push(this.getLatLng(cord))
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
      const { lat, lng } = data
      window.open(`
      https://www.google.com/maps/dir//'${lat},${lng}'/@,13z/data=!4m6!4m5!1m0!1m3!2m2!1d${lng}!2d${lat}?entry=ttu`, '_blank')
    },
    logout () {
      this.clearAll()
    },
    decrypt (enc, iv, authTag) {
      const ALGO = 'aes-256-gcm'
      const iv2 = Buffer.from(iv, 'hex')
      const authTag2 = Buffer.from(authTag, 'hex')
      const decipher = crypto.createDecipheriv(ALGO, process.env.VUE_APP_API_ENCRYPTION_KEY, iv2)
      decipher.setAuthTag(authTag2)
      let str = decipher.update(enc, 'hex', 'utf8')
      str += decipher.final('utf8')
      return str
    }
  },
  watch: {
    engine (val) {
      const { topic, qos } = this.publish
      const payload = (val) ? 'OFF' : 'ON'
      if (this.connectionType !== 'mqtt') {
        return null
      }
      this.client.publish(topic, payload, qos, error => {
        if (error) {
          console.log('Publish error', error)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  align-items: center;
  background: #f0f3f4d6;
  border-bottom: 5px solid #3886f6;
  @media screen and (max-width: 768px) {
    padding: 10px;
  }
}
.header img {
  width: 100px;
}
.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
    gap: 0;
    align-items: flex-end;
  }
}
.username {
  text-transform: capitalize;
  font-weight: 700;
}
.switch-engine {
  display: flex;
  align-items: center;
  gap: 10px;
}
.switch-engine p {
  font-size: 14px;
  font-weight: 400;
}
.navigation {
  text-align: right;
}
.logout-button {
  cursor: pointer;
  color: #ff0004;
}
.offline {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

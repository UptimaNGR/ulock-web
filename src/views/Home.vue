<template>
  <v-row>
    <v-col>
      <v-row align="center" justify="center">
        <v-col
          cols="12"
          sm="6"
          class="d-flex align-center justify-center primary--text">
          Hi {{getUsername}}
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col
          v-if="!viewLogs">
          <v-row align="center" justify="center">
            <v-col
              cols="12"
              sm="6"
              class="d-flex align-center justify-center ">
                <v-icon color="primary">mdi-battery{{batterySuffix(battery)}}</v-icon>
                <p class="primary--text pa-0 mx-3 my-0">{{battery}} %</p>
            </v-col>
          </v-row>
          <v-row align="center" justify="center">
            <v-col
              class="d-flex align-center justify-center">
              <v-btn
                color="primary"
                text
              >
                <v-icon left>
                  mdi-door-open
                </v-icon>
                Open door
              </v-btn>
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
                  <th class="text-left">
                    Via
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in logs"
                  :key="item.name"
                >
                  <td>{{ item.name }}</td>
                  <td>{{ item.time }}</td>
                  <td>{{ item.via }}</td>
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
      </v-row>
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
    this.createConnection()
  },
  data () {
    return {
      battery: 90,
      viewLogs: false,
      logs: [
        { name: 'ola', time: 'time', via: 'Fingerprint' },
        { name: 'demp', time: 'time', via: 'Fingerprint' },
        { name: 'craft', time: 'time', via: 'web' }
      ],
      connection: {
        host: 'broker.hivemq.com',
        port: 1883,
        endpoint: '/mqtt',
        clean: true, // Reserved session
        connectTimeout: 4000, // Time out
        reconnectPeriod: 4000, // Reconnection interval
        // Certification Information
        clientId: 'mqttjs_3be2c321',
        username: 'emqx_test',
        password: 'emqx_test'
      },
      subscription: {
        topic: 'topic/mqttx',
        qos: 0
      },
      publish: {
        topic: 'topic/browser',
        qos: 0,
        payload: '{ "msg": "Hello, I am browser." }'
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
      this.viewLogs = true
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
      const connectUrl = 'mqtt://broker.hivemq.com:1883'
      try {
        this.client = mqtt.connect(connectUrl, { clientId: this.connection.clientId })
      } catch (error) {
        console.log('mqtt.connect error', error)
      }
      this.client.on('connect', () => {
        console.log('Connection succeeded!')
      })
      this.client.on('error', error => {
        console.log('Connection failed', error)
      })
      this.client.on('message', (topic, message) => {
        this.receiveNews = this.receiveNews.concat(message)
        console.log(`Received message ${message} from topic ${topic}`)
      })
    }
  }
}
</script>

<style>

</style>

<template>
  <v-row>
    <v-col>
      <v-row align="center" justify="center">
        <v-col
          cols="12"
          sm="6"
          class="d-flex align-center justify-center primary--text">
          Hi {{}}
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
export default {
  data () {
    return {
      battery: 90,
      viewLogs: false,
      logs: [
        { name: 'ola', time: 'time', via: 'Fingerprint' },
        { name: 'demp', time: 'time', via: 'Fingerprint' },
        { name: 'craft', time: 'time', via: 'web' }
      ]
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
    }
  }
}
</script>

<style>

</style>

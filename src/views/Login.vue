<template>
  <div class="login">
    <div class="login__content">
      <div class="login__content__logo">
        <img src="@/assets/uptima.svg" alt="uptima logo">
      </div>
      <div>
        <div>
          <v-form ref="form" @submit.prevent="login" v-model="valid">
            <v-text-field
              v-model="username"
              :rules="[rules.required]"
              label="Username"
            ></v-text-field>
              <v-text-field
              v-model="password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show ? 'text' : 'password'"
              name="password"
              label="Password"
              @click:append="show = !show"
            ></v-text-field>
            <v-row align="center" justify="center">
              <v-col>
                <v-btn
                  class="mr-4"
                  outlined
                  color="primary"
                  type="submit"
                  :disabled="!valid"
                >
                  Login
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      valid: false,
      username: '',
      show: false,
      password: '',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 6 || 'Min 6 characters'
      },
      connection: {
        host: 'broker.emqx.io',
        port: 8083,
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
    ...mapActions(['user']),
    login () {
      const loginURI = 'dashboard-login'
      const loginData = {
        username: this.username,
        password: this.password
      }
      this.$axios
        .post(loginURI, loginData)
        .then((result) => {
          const data = { token: result.data.data.token, username: this.username }
          this.user(data)
          this.$router.push('/')
        })
        .catch((err) => {
          // this.$router.push('/home')
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  &__content {
    min-width: 448px;
    box-shadow: -4px -4px 10px rgba(210, 192, 192, 0.25), 4px 4px 10px rgba(210, 192, 192, 0.25);
    padding: 50px;
    &__logo {
      width: 60%;
      margin: 30px auto;
    }
  }
}
</style>

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './utils/axios'
import * as VueGoogleMaps from 'vue2-google-maps'
import { mapActions, mapGetters } from 'vuex'
import vuetify from './plugins/vuetify'
import jwtDecode from 'jwt-decode'

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GMAP_KEY
  }
})
new Vue({
  router,
  store,

  created () {
    this.validateSession()
  },
  onIdle () {
    this.validateSession()
  },
  onActive () {
    this.validateSession()
  },
  computed: {
    ...mapGetters(['getToken', 'isLoggedIn'])
  },
  methods: {
    ...mapActions(['clearAll']),
    startSession () {
      axios.defaults.headers.Authorization = `Bearer ${this.getToken}`
    },
    endSession () {
      delete axios.defaults.headers.Authorization
      this.clearAll()
    },
    validateSession () {
      if (this.isLoggedIn) {
        try {
          const token = jwtDecode(this.getToken)
          const time = Date.now().valueOf() / 1000
          if (token.exp < time) {
            this.endSession()
          } else {
            this.startSession()
          }
        } catch (error) {
          this.endSession()
        }
      } else {
        this.endSession()
      }
    }
  },
  watch: {
    getToken (val) {
      if (val) {
        this.startSession()
      }
    },
    isLoggedIn (val) {
      if (val) {
        this.startSession()
      } else {
        this.endSession()
      }
    }
  },

  vuetify,
  render: h => h(App)
}).$mount('#app')

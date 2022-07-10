import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './utils/axios'
import { mapGetters } from 'vuex'
import vuetify from './plugins/vuetify'
Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,

  created () {
    if (this.getToken) {
      axios.defaults.headers.Authorization = `Bearer ${this.getToken}`
    }
  },

  computed: {
    ...mapGetters(['getToken'])
  },

  watch: {
    getToken (val) {
      axios.defaults.headers.Authorization = `Bearer ${val}`
    }
  },

  vuetify,
  render: h => h(App)
}).$mount('#app')

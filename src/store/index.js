import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexPersistence = new VuexPersistence({
  storage: localStorage,
  key: 'uLock',
  reducer: (state) => ({
    loggedIn: state.loggedIn,
    token: state.token,
    username: state.username
  })
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    token: null,
    username: null,
    mqttUsername: null,
    mqttPassword: null,
    mqttAppID: null
  },
  getters: {
    isLoggedIn: state => state.loggedIn,
    getToken: state => state.token,
    getUsername: state => state.username,
    getMqttCred: (state) => { return { mqttUsername: state.mqttUsername, mqttPassword: state.mqttPassword, mqttAppID: state.mqttAppID } }
  },
  mutations: {
    setUser (state, user) {
      state.token = user.token
      state.username = user.username
      state.loggedIn = true
    },
    clearData (state) {
      state.loggedIn = false
      state.token = null
      state.username = null
      state.mqttUsername = null
      state.mqttPassword = null
      state.mqttAppID = false
    }
  },
  actions: {
    user ({ commit }, data) {
      commit('setUser', data)
    },
    clearAll ({ commit }) {
      window.localStorage.removeItem('uLock')
      commit('clearData')
    }
  },
  plugins: [vuexPersistence.plugin]
})

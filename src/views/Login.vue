<template>
  <v-row align="center" justify="center">
    <v-col
      justify="center"
      cols="12"
      sm="6">
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
    </v-col>
  </v-row>
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
      }
    }
  },
  methods: {
    ...mapActions(['user']),
    login () {
      const data = { token: 12345, username: 'dele' }
      this.user(data)
      this.$router.push('/')
    }
  }
}
</script>

<style>
</style>

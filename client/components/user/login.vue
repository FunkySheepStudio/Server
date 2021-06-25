<template>
  <section>
    <v-card>
      <v-card-title>
        Login
      </v-card-title>
      <v-text-field
        v-model="user"
        label="User"
        :error-messages="userError"
        @change="userExist($event)"
      />
      <v-text-field
        v-model="password"
        label="Password"
      />
      <v-btn
        :disabled="!exist"
        @click="login()"
      >
        Login
      </v-btn>
    </v-card>
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {},
  data () {
    return {
      user: '',
      password: '',
      exist: false,
      userError: '',
      token: ''
    }
  },
  computed: {
    ...mapGetters('users', { users: 'find' })
  },
  mounted () {
    this.findUsers()
  },
  methods: {
    ...mapActions('users', { findUsers: 'find' }),
    ...mapActions('authentication', { authenticate: 'create' }),
    userExist (_id) {
      this.findUsers({
        query: {
          _id
        }
      })
        .then((users) => {
          if (users.total === 1) {
            this.exist = true
            this.userError = ''
          } else {
            this.exist = false
            this.userError = 'Unknown user'
          }
        })
    },
    login () {
      this.$store.dispatch('auth/authenticate', {
        _id: this.user,
        password: this.password,
        strategy: 'local'
      })
        .then((result) => {
          console.log(this.$store)
          console.log(result)
        })
      /*  this.authenticate({
        _id: this.user,
        password: this.password,
        strategy: 'local'
      })
        .then((result) => {
          this.token = result.accessToken
        })
        .catch((err) => {
          console.log(err)
        })  */
    }
  }
}
</script>
<style>
</style>

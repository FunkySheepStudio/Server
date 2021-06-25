<template>
  <section>
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
      :disabled="exist"
      @click="login()"
    >
      Register
    </v-btn>
    {{ token }}
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
      exist: true,
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
    ...mapActions('users', { findUsers: 'find', create: 'create' }),
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
            this.userError = 'This user already exist'
          } else {
            this.exist = false
            this.userError = ''
          }
        })
    },
    login () {
      this.create({
        _id: this.user,
        password: this.password
      })
        .then(() => {
          this.authenticate({
            _id: this.user,
            password: this.password,
            strategy: 'local'
          })
            .then((result) => {
              this.token = result.accessToken
            })
            .catch(() => {
              this.token = 'Error'
            })
        })
    }
  }
}
</script>
<style>
</style>

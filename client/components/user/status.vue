<template>
  <section>
    <v-dialog
      :value="!$store.getters['auth/isAuthenticated']"
      persistent='true'
    >
      <login />
    </v-dialog>
  </section>
</template>
<script>
import login from '~/components/user/login'
export default {
  components: {
    login
  },
  data () {
    return {
      status: ''
    }
  },
  computed: {},
  mounted () {
    if (!this.$store.getters['auth/isAuthenticated']) {
      if (localStorage.getItem('feathers-jwt')) {
        this.$store.dispatch('auth/authenticate', {
          accessToken: localStorage.getItem('feathers-jwt'),
          strategy: 'jwt'
        })
          .then((result) => {
            console.log(result)
          })
      }
    }
  },
  methods: {}
}
</script>
<style>
</style>

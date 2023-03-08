<script lang="ts">
export default {
  components: {
    'qrcode': Vue.defineAsyncComponent( () => loadModule('/network-http/qrcode.vue', options) )
  },
  data() {
    return {
      token: ''
    }
  },
  mounted() {
    this.auth()
  },
  methods: {
    auth: function() {
      this.token = localStorage.getItem('user-auth-device-token');
    }
  }
}
</script>

<template>
  <div>
    <v-card>
      <v-card-title> Create new user</v-card-title>
      <qrcode data="http://www.cci.fr" />
    </v-card>
    <v-card>
      <v-card-title> Add new device</v-card-title>
    </v-card>
  </div>
</template>

<style>
</style>
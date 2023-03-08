<script lang="ts">
export default {
  components: {
    'qrcode': Vue.defineAsyncComponent( () => loadModule('/network-http/qrcode.vue', options) )
  },
  data() {
    return {
      url: '',
      time: 0
    }
  },
  mounted() {
    const self = this;

    this.SendNewKey()
    function IncreaseTime() {
      self.time += 1
      console.log(self.time)
      if (self.time >= 5)
      {
        self.SendNewKey()
        self.time = 0
      }
      setTimeout(IncreaseTime, 1000);
    }
    IncreaseTime()
  },
  methods: {
    SendNewKey: function() {
      const array = new Uint32Array(1);
      window.crypto.getRandomValues(array);
      let url = new URL(`${window.location.protocol}//${window.location.host}`)
      url.searchParams.append('service', 'user-auth');
      url.searchParams.append('token', array.toString());

      this.url = url.toString()

      var message = {
          service: 'user-auth',
          function: 'AddAuthKey',
          data: {
            key: array.toString()
          }
        }

      socket.send(JSON.stringify(message))
    }
  }
}
</script>

<template>
  <div>
    <v-card>
      <v-card-title> Create new user</v-card-title>
      <qrcode :qrData="url" />
      {{ url }}
      {{ time }}
    </v-card>
    <v-card>
      <v-card-title> Add new device</v-card-title>
    </v-card>
  </div>
</template>

<style>
</style>
<script lang="ts">
export default {
  components: {
    'qrcode': Vue.defineAsyncComponent( () => loadModule('/network-http/qrcode.vue', options) )
  },
  data() {
    return {
      authenticated: false,
      url: '',
      time: 0
    }
  },
  mounted() {
    emitter.on('message', this.OnMessage)
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if (urlParams.get('service') === 'user-auth' && urlParams.get('token'))
    {
      this.SendNewKey(urlParams.get('token'))
    } else {
      const self = this;

    this.SendNewKey()
      function IncreaseTime() {
        self.time += 1
        if (self.time >= 20)
        {
          self.SendNewKey()
          self.time = 0
        }
        setTimeout(IncreaseTime, 1000);
      }
      IncreaseTime()
    }
  },
  methods: {
    OnMessage: function(message) {
      if (message.service === 'user-auth')
      {
        if (message.function === 'GetUser')
        {
          this.authenticated = true
        }
      }
    },
    SendNewKey: function(token) {
      if (!token)
      {
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        token = array.toString()

        let url = new URL(`${window.location.protocol}//${window.location.host}`)
        url.searchParams.append('service', 'user-auth');
        url.searchParams.append('token', token);

        this.url = url.toString()
      }

      var message = {
          service: 'user-auth',
          function: 'AddAuthKey',
          data: {
            token
          }
        }

      socket.send(JSON.stringify(message))
    }
  }
}
</script>

<template>
  <div v-if="!authenticated" class="d-flex justify-center">
      <v-card>
        <v-card-title>Use your mobile to scan</v-card-title>
        <qrcode :qrData="url" />
        {{ url }}
      </v-card>
    </div>
</template>

<style>
</style>
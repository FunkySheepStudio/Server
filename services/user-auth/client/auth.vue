<script lang="ts">
export default {
  components: {
    'qrcode': Vue.defineAsyncComponent( () => loadModule('/network-http/qrcode.vue', options) ),
    'pincode': Vue.defineAsyncComponent( () => loadModule('/user-auth/pincode.vue', options) )
  },
  data() {
    return {
      authenticated: false,
      user: '',
      device: '',
      url: '',
      time: 0
    }
  },
  mounted() {
    emitter.on('message', this.OnMessage)
    if (socket && socket.registred === true && socket.readyState === 1)
    {
      this.Start()
    }
  },
  methods: {
    Start: function() {
      this.user = localStorage.getItem('user')
      this.device = localStorage.getItem('device')
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);

      emitter.on('user-auth-pinOk', () => {
        this.authenticated = true
      })

      if (this.user && this.device)
      {
        if (urlParams.get('service') === 'user-auth' && urlParams.get('token'))
        {
          emitter.on('user-auth-pinOk', () => {
            this.SendNewKey(urlParams.get('token'))
          })
        }
      } else {
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
              if (!self.user && !self.device)
              {
                setTimeout(IncreaseTime, 1000);
              }
            }
            IncreaseTime()
        }
      }
    },
    OnMessage: function(message) {
      if (message.service === 'user-auth')
      {
        if (message.function === 'GetUser')
        {
          this.user = message.data.user
          localStorage.setItem('user', message.data.user)
          localStorage.setItem('device', message.data.device)
        }
      } else if (message.service === "network-ws" && message.function === "RegistrationOk")
      {
        this.Start()
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

      if (this.user && this.device)
      {
        message.user = this.user
        message.device = this.device
      }

      socket.send(JSON.stringify(message))
    }
  }
}
</script>

<template>
  <div v-if="!authenticated" class="d-flex justify-center">
      <v-card
        v-if="!user && !device"
        class="text-center"
      >
        <v-card-title>Use your mobile to scan</v-card-title>
        <qrcode :qrData="url" />
        {{ url }}
      </v-card>
      <pincode v-else/>
  </div>
</template>

<style>
</style>
<script lang="ts">
export default {
  components: {
    'user-auth-authentication': Vue.defineAsyncComponent( () => loadModule('/user-auth/auth.vue', options) )
  },
  data() {
    return {
      connected: true
    }
  },
  mounted() {
    this.connect()
  },
  methods: {
    connect: function() {
      const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:"
      socket = new WebSocket(`${wsProtocol}//${window.location.host}`)

      socket.onopen = () => {
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);

        var message = {
          service: 'network-ws',
          function: 'Register',
          data: {
            wsKey: array.toString()
          }
        }

        socket.send(JSON.stringify(message))
        this.connected = true
      }

      socket.addEventListener('message', function (event) {
        let message = JSON.parse(event.data)

        if (message.service === "network-ws" && message.function === "RegistrationOk")
        {
          socket.registred = true
        }

        emitter.emit('message', message)
      });

      socket.onclose = () => {
        this.connected = false
        socket.registred = false
        setTimeout(this.connect(), 5000);
      }
    }
  }
}
</script>

<template>
  <div>
    <v-alert v-if="!connected"
      color="primary"
      class="justify-center"
      text="Connection server lost">
    </v-alert>
    <user-auth-authentication v-else />
  </div>
</template>

<style>
</style>
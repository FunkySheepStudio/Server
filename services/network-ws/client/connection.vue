<script lang="ts">
export default {
  components: {
    'user-auth-authentication': Vue.defineAsyncComponent( () => loadModule('/user-auth/auth.vue', options) )
  },
  data() {
    return {
      connected: false
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
        this.connected = true
      }

      socket.onclose = () => {
        this.connected = false
        setTimeout(this.connect, 1000);
      }

      socket.onerror = () => {
        socket.close();
      };
    }
  }
}
</script>

<template>
  <div>
    <v-alert v-if="!connected" text="Connection server lost"></v-alert>
    <user-auth-authentication v-else />
  </div>
</template>

<style>
</style>
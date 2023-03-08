<script lang="ts">
export default {
  components: {
    'connection': Vue.defineAsyncComponent( () => loadModule('/network-ws/connection.vue', options) )
  },
  data() {
    return {
      greeting: 'Hello World!'
    }
  }
}
</script>

<template>
  <p class="greeting">{{ this.greeting }}</p>
  <connection />
</template>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>
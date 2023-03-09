<script lang="ts">
export default {
  components: {
    'connection': Vue.defineAsyncComponent( () => loadModule('/network-ws/connection.vue', options) )
  },
  data() {
    return {}
  }
}
</script>

<template>
  <connection />
</template>

<style>
</style>
<script lang="ts">
export default {
  data() {
    return {
      greeting: 'Connection Status'
    }
  },
  created() {
    const store = Pinia.defineStore('counter', {
      state: () => ({ count: 0, name: 'Eduardo' }),
      getters: {
        doubleCount: (state) => state.count * 2,
      },
      actions: {
        increment() {
          this.count++
        },
      },
    })

    this.counter = Pinia.storeToRefs(store());
  }
}
</script>

<template>
  <p class="greeting">{{ this.greeting }}</p>
  {{ counter.count.value }}
</template>

<style>
</style>
<template>
  <section>
    {{ example1() }}
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {},
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters('example1', { example1: 'find', get: 'get' })
  },
  mounted () {
    this.findExample1()
  },
  methods: {
    ...mapActions('example1', { findExample1: 'find' })
  }
}
</script>
<style>
</style>

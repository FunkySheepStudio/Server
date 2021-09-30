<template>
  <section>
    <funkysheep-dashboard-item
      name="Web"
      color="orange"
      :total="connections({query: {type: 'web' } }).total"
      :value="connections({query: {type: 'web' }}).total / connections().total * 100"
    />
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
    ...mapGetters('/api/system/connections', { connections: 'find' })
  },
  mounted () {
    this.findConnections()
  },
  methods: {
    ...mapActions('/api/system/connections', { findConnections: 'find' })
  }
}
</script>
<style>
</style>

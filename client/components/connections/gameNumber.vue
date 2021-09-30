<template>
  <section>
    <funkysheep-dashboard-item
      name="Game"
      color="green"
      :total="connections({query: {type: 'game' } }).total"
      :value="connections({query: {type: 'game' }}).total / connections().total * 100"
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

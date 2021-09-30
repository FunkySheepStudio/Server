<template>
  <section>
    <funkysheep-dashboard-item
      name="Outgoing"
      color="purple"
      :total="messages({query: {direction: 'outgoing' }}).total"
      :value="messages({query: {direction: 'outgoing' }}).total / messages().total * 100"
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
    ...mapGetters('/api/system/messages', { messages: 'find' })
  },
  mounted () {
    this.findMessages()
  },
  methods: {
    ...mapActions('/api/system/messages', { findMessages: 'find' })
  }
}
</script>
<style>
</style>

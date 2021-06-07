<template>
  <section>
    <funkysheep-dashboard-item
      name="Incoming"
      color="blue"
      :total="messages().total"
      :value="messages({query: {direction: 'incoming' }}).total / messages().total * 100"
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
    ...mapGetters('messages', { messages: 'find' })
  },
  mounted () {
    this.findMessages()
  },
  methods: {
    ...mapActions('messages', { findMessages: 'find' })
  }
}
</script>
<style>
</style>

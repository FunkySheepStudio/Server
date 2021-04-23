<template>
  <section>
    <v-data-table
      :items="messages().data"
      :headers="headers"
    />
    {{ messages() }}
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
    ...mapGetters('messages', { messages: 'find', get: 'get' }),
    headers () {
      return [
        {
          text: 'ID',
          value: '_id'
        },
        {
          text: 'Time',
          value: 'time'
        },
        {
          text: 'Service',
          value: 'data.service'
        },
        {
          text: 'Request',
          value: 'data.request'
        }
      ]
    }
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

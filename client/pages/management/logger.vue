<template>
  <section>
    <v-data-table
      :items="logger().data"
      :headers="headers"
    />
    {{ logger().data }}
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
    ...mapGetters('logger', { logger: 'find', get: 'get' }),
    headers () {
      return [
        {
          text: 'ID',
          value: '_id'
        },
        {
          text: 'Type',
          value: 'type'
        },
        {
          text: 'Time',
          value: 'time'
        },
        {
          text: 'User',
          value: 'user'
        },
        {
          text: 'Message',
          value: 'data.message'
        },
        {
          text: 'Stacktrace',
          value: 'data.stackTrace'
        }
      ]
    }
  },
  mounted () {
    this.findLogger()
  },
  methods: {
    ...mapActions('logger', { findLogger: 'find' })
  }
}
</script>
<style>
</style>

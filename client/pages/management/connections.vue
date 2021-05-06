<template>
  <section>
    <v-data-table
      :headers="headers"
      :items="connections().data"
    >
      <template #[`item.startedAt`]="{ item }">
        {{ new Date(item.startedAt).toLocaleString() }}
      </template>
    </v-data-table>
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
    ...mapGetters('connections', { connections: 'find', get: 'get' }),
    headers () {
      return [
        {
          text: 'Start date',
          value: 'startedAt'
        },
        {
          text: 'ID',
          value: '_id'
        },
        {
          text: 'User',
          value: 'user'
        }
      ]
    }
  },
  mounted () {
    this.findConnections()
  },
  methods: {
    ...mapActions('connections', { findConnections: 'find' })
  }
}
</script>
<style>
</style>

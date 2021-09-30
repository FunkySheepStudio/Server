<template>
  <section>
    Web connections
    <v-data-table
      :headers="webHeaders"
      :items="connections({
        query: {
          type: 'web'
        }
      }).data"
    >
      <template #[`item.startedAt`]="{ item }">
        {{ new Date(item.startedAt).toLocaleString() }}
      </template>
    </v-data-table>
    Game connections
    <v-data-table
      :headers="gameHeaders"
      :items="connections({
        query: {
          type: 'game'
        }
      }).data"
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
    ...mapGetters('/api/system/connections', { connections: 'find', get: 'get' }),
    webHeaders () {
      return [
        {
          text: 'Id',
          value: '_id'
        },
        {
          text: 'Start date',
          value: 'startedAt'
        },
        {
          text: 'User',
          value: 'user'
        }
      ]
    },
    gameHeaders () {
      return [
        {
          text: 'Id',
          value: '_id'
        },
        {
          text: 'Start date',
          value: 'startedAt'
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
    ...mapActions('/api/system/connections', { findConnections: 'find' })
  }
}
</script>
<style>
</style>

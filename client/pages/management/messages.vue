<template>
  <section>
    <v-data-table
      :items="messages({query: {direction: 'incoming'}}).data"
      :headers="headers"
    >
      <template #[`item.sentAt`]="{ item }">
        {{ new Date(item.sentAt).toLocaleString() }}
      </template>
      <template #[`item.receiveAt`]="{ item }">
        {{ new Date(item.receiveAt).toLocaleString() }}
      </template>
      <template #[`item.data`]="{ item }">
        {{ JSON.stringify(item.data) }}
      </template>
    </v-data-table>
    <v-data-table
      :items="messages({query: {direction: 'outgoing'}}).data"
      :headers="headers"
    >
      <template #[`item.sentAt`]="{ item }">
        {{ new Date(item.sentAt).toLocaleString() }}
      </template>
      <template #[`item.receiveAt`]="{ item }">
        {{ new Date(item.receiveAt).toLocaleString() }}
      </template>
      <template #[`item.data`]="{ item }">
        {{ JSON.stringify(item.data) }}
      </template>
    </v-data-table>
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
          text: 'Send Date',
          value: 'sentAt'
        },
        {
          text: 'Reception Date',
          value: 'receiveAt'
        },
        {
          text: 'ID',
          value: '_id'
        },
        {
          text: 'Sockets',
          value: 'socket'
        },
        {
          text: 'Service',
          value: 'service'
        },
        {
          text: 'Request',
          value: 'request'
        },
        {
          text: 'Data',
          value: 'data'
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

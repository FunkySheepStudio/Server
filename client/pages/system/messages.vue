<template>
  <section>
    <v-data-table
      :items="messages({query: {direction: 'incoming'}}).data"
      :headers="headersIncoming"
    >
      <template #[`item.sentAt`]="{ item }">
        {{ new Date(item.sentAt).toLocaleString() + " " + new Date(item.sentAt).getMilliseconds() + "ms" }}
      </template>
      <template #[`item.receiveAt`]="{ item }">
        {{ new Date(item.receiveAt).toLocaleString() + " " + new Date(item.receiveAt).getMilliseconds() + "ms" }}
      </template>
      <template #[`item.data`]="{ item }">
        {{ JSON.stringify(item.data) }}
      </template>
    </v-data-table>
    <v-data-table
      :items="messages({query: {direction: 'outgoing'}}).data"
      :headers="headersOutgoing"
    >
      <template #[`item.sentAt`]="{ item }">
        {{ new Date(item.sentAt).toLocaleString() + " " + new Date(item.sentAt).getMilliseconds() + "ms" }}
      </template>
      <template #[`item.data`]="{ item }">
        {{ JSON.stringify(item.data) }}
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
    ...mapGetters('/api/system/messages', { messages: 'find', get: 'get' }),
    headersIncoming () {
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
    },
    headersOutgoing () {
      return [
        {
          text: 'Send Date',
          value: 'sentAt'
        },
        {
          text: 'ID',
          value: '_id'
        },
        {
          text: 'From',
          value: 'from'
        },
        {
          text: 'To',
          value: 'socket'
        },
        {
          text: 'Service',
          value: 'service'
        },
        {
          text: 'Method',
          value: 'method'
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
    ...mapActions('/api/system/messages', { findMessages: 'find' })
  }
}
</script>
<style>
</style>

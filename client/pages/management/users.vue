<template>
  <section>
    <v-data-table
      :items="users().data"
      :headers="headers"
    />
    {{ users() }}
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
    ...mapGetters('users', { users: 'find', get: 'get' }),
    headers () {
      return [
        {
          text: 'ID',
          value: '_id'
        },
        {
          text: 'Nickname',
          value: 'nickname'
        },
        {
          text: 'Request',
          value: 'request'
        },
        {
          text: 'Online',
          value: 'online'
        },
        {
          text: 'Game',
          value: 'game'
        }
      ]
    }
  },
  mounted () {
    this.findUsers()
  },
  methods: {
    ...mapActions('users', { findUsers: 'find' })
  }
}
</script>
<style>
</style>

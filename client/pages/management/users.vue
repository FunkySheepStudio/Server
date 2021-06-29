<template>
  <section>
    <v-data-table
      :items="users().data"
      :headers="headers"
    >
      <template #[`item.admin`]="{ item }">
        <v-checkbox
          :input-value="item.admin"
          @change="admin(item._id, !item.admin)"
        />
      </template>
      <template #[`item.remove`]="{ item }">
        <v-btn
          @click="remove(item._id)"
        >
          <v-icon
            color="red"
          >
            mdi-delete
          </v-icon>
        </v-btn>
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
    ...mapGetters('users', { users: 'find', get: 'get' }),
    headers () {
      return [
        {
          text: 'ID',
          value: '_id'
        },
        {
          text: 'Login',
          value: 'login'
        },
        {
          text: 'Nickname',
          value: 'nickname'
        },
        {
          text: 'Online',
          value: 'online'
        },
        {
          text: 'Admin',
          value: 'admin'
        },
        {
          text: 'Remove',
          value: 'remove'
        }
      ]
    }
  },
  mounted () {
    this.findUsers()
  },
  methods: {
    ...mapActions('users', { findUsers: 'find', patch: 'patch', remove: 'remove' }),
    admin (_id, admin) {
      this.patch([
        _id,
        { admin }
      ])
    },
    guest (_id, admin) {
      this.patch([
        _id,
        { admin }
      ])
    }
  }
}
</script>
<style>
</style>

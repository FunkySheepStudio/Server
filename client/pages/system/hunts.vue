<template>
  <section>
    <v-data-table
      :items="hunts().data"
      :headers="headers"
    >
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
    ...mapGetters('/api/game/hunts', { hunts: 'find', get: 'get' }),
    headers () {
      return [
        {
          text: 'ID',
          value: '_id'
        },
        {
          text: 'Name',
          value: 'name'
        },
        {
          text: 'Remove',
          value: 'remove'
        }
      ]
    }
  },
  mounted () {
    this.findHunts()
  },
  methods: {
    ...mapActions('/api/game/hunts', { findHunts: 'find', patch: 'patch', remove: 'remove' }),
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

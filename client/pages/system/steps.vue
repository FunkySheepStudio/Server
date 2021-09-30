<template>
  <section>
    <v-data-table
      :items="steps().data"
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
    ...mapGetters('/api/game/steps', { steps: 'find', get: 'get' }),
    headers () {
      return [
        {
          text: 'ID',
          value: '_id'
        },
        {
          text: 'Hunt ID',
          value: 'hunt_id'
        },
        {
          text: 'Name',
          value: 'name'
        },
        {
          text: 'Latitude',
          value: 'latitude'
        },
        {
          text: 'Longitude',
          value: 'longitude'
        },
        {
          text: 'Altitude',
          value: 'altitude'
        },
        {
          text: 'Remove',
          value: 'remove'
        }
      ]
    }
  },
  mounted () {
    this.findSteps()
  },
  methods: {
    ...mapActions('/api/game/steps', { findSteps: 'find', patch: 'patch', remove: 'remove' }),
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

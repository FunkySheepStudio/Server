<template>
  <section>
    <v-progress-circular
      :size="100"
    >
      {{ users().total }}
    </v-progress-circular>
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
    ...mapGetters('users', { users: 'find' })
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

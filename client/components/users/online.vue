<template>
  <section>
    <funkysheep-dashboard-item
      name="Online"
      color="red"
      :total="users({query: {online: true } }).total"
      :value="users({query: {online: true }}).total / users().total * 100"
    />
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

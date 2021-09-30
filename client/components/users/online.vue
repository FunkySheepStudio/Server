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
    ...mapGetters('/api/system/users', { users: 'find' })
  },
  mounted () {
    this.findUsers()
  },
  methods: {
    ...mapActions('/api/system/users', { findUsers: 'find' })
  }
}
</script>
<style>
</style>

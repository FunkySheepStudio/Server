<template>
  <section>
    <funkysheep-service
      :service="service"
    />
  </section>
</template>
<script>
export default {
  components: {},
  data () {
    return {
      service: '/api/system/services'
    }
  }
}
</script>
<style>
</style>

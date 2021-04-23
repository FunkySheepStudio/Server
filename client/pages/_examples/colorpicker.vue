<template>
  <section>
    <v-color-picker
      v-model="color"
      dot-size="25"
      swatches-max-height="200"
      @update:color="updateColor"
    />
    {{ colorpicker() }}
    {{ color }}
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {},
  data () {
    return {
      color: ''
    }
  },
  computed: {
    ...mapGetters('colorpicker', { colorpicker: 'find', get: 'get' })
  },
  mounted () {
    this.findColorpicker()
  },
  methods: {
    ...mapActions('colorpicker', { findColorpicker: 'find' }),
    updateColor: (color) => {
      console.log(localStorage.getItem('user'))
    }
  }
}
</script>
<style>
</style>

<template>
  <section>
    <Unity
      ref="unity"
      path="/_examples/"
      game="colorpicker"
    />
    <v-color-picker
      v-model="color"
      dot-size="25"
      swatches-max-height="200"
      @update:color="updateColor"
    />
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Unity from '~/components/UnityLoader'
export default {
  components: {
    Unity
  },
  data () {
    return {
      color: ''
    }
  },
  computed: {
    ...mapGetters('colorpicker', { colorpicker: 'find', get: 'get' })
  },
  created () {},
  mounted () {
    this.userId = localStorage.getItem('user')
    this.findColorpicker()
  },
  methods: {
    ...mapActions('colorpicker', { findColorpicker: 'find', create: 'create', patch: 'patch' }),
    updateColor (color) {
      this.findColorpicker({
        query: {
          _id: this.userId
        }
      })
        .then((count) => {
          if (count.total === 0) {
            this.create({
              _id: this.userId,
              color: color.hex
            })
          } else {
            this.patch([this.userId, { _id: this.userId, color: this.color }])
          }
        })
    }
  }
}
</script>
<style>
</style>

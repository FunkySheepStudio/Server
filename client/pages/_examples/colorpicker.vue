<template>
  <section>
    <v-color-picker
      v-model="color"
      dot-size="25"
      swatches-max-height="200"
      @update:color="updateColor"
    />
    {{ colorpicker() }}
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { getUnityId } from '../../lib/unityDb'
export default {
  components: {},
  data () {
    return {
      color: '',
      unityId: ''
    }
  },
  computed: {
    ...mapGetters('colorpicker', { colorpicker: 'find', get: 'get' })
  },
  async created () {
    this.unityId = await getUnityId()

    //  this.unityId = 'e3734627-e667-4fa2-b34e-669ef73615a1'
  },
  mounted () {
    this.findColorpicker()
  },
  methods: {
    ...mapActions('colorpicker', { findColorpicker: 'find', create: 'create', patch: 'patch' }),
    updateColor (color) {
      console.log(this.unityId)
      this.findColorpicker({
        query: {
          _id: this.unityId
        }
      })
        .then((count) => {
          if (count.total === 0) {
            this.create({
              _id: this.unityId,
              color: color.hex
            })
          } else {
            this.patch([this.unityId, { _id: this.unityId, color: this.color }])
          }
        })
    }
  }
}
</script>
<style>
</style>

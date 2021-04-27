<template>
  <section>
    <Unity
      path="/_examples/"
      game="colorpicker"
      @loaded="loadColorPicker"
    />
    <v-color-picker
      v-model="color"
      :disabled="!loaded"
      dot-size="25"
      swatches-max-height="200"
      @update:color="updateColor"
    />
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { getUnityId } from '../../lib/unityDb'
import Unity from '~/components/UnityLoader'
export default {
  components: {
    Unity
  },
  data () {
    return {
      color: '',
      unityId: '',
      loaded: false
    }
  },
  computed: {
    ...mapGetters('colorpicker', { colorpicker: 'find', get: 'get' })
  },
  created () {},
  mounted () {
    this.findColorpicker()
    this.loaded = false
  },
  methods: {
    ...mapActions('colorpicker', { findColorpicker: 'find', create: 'create', patch: 'patch' }),
    loadColorPicker () {
      getUnityId()
        .then((id) => {
          this.unityId = id
          //  this.unityId = 'e3734627-e667-4fa2-b34e-669ef73615a1'
          this.loaded = true
        })
    },
    updateColor (color) {
      if (this.unityId !== '') {
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
      } else {
        this.loadColorPicker()
      }
    }
  }
}
</script>
<style>
</style>

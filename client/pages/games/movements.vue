<template>
  <v-container
    class="d-md-flex justify-center"
  >
    <v-card>
      <v-card-title>Shake me!</v-card-title>
      <funkysheep-unity
        game="movements"
      />
    </v-card>
    <v-card>
      <v-card-title>Shake me!</v-card-title>
      <funkysheep-unity
        game="movements"
      />
    </v-card>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { getUnityId } from '../../lib/unityDb'
export default {
  components: {},
  data () {
    return {
      color: '',
      unityId: '',
      loaded: false
    }
  },
  computed: {
    ...mapGetters('movements', { movements: 'find', get: 'get' })
  },
  async created () {},
  mounted () {
    this.findMovements()
  },
  methods: {
    ...mapActions('movements', { findMovements: 'find', create: 'create', patch: 'patch' }),
    load () {
      getUnityId()
        .then((id) => {
          this.unityId = id
          this.loaded = true
        })
    },
    updateColor (color) {
      if (this.unityId !== '') {
        this.findMovements({
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

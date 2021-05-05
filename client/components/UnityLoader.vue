<template>
  <iframe
    name="UnityFrame"
    :src="sources"
    :width="width + 20"
    :height="height + 25"
  />
</template>

<script>
export default {
  name: 'UnityWebGL',
  props: {
    game: {
      type: String,
      default: 'Client'
    },
    companyName: {
      type: String,
      default: 'DefaultCompany'
    },
    productVersion: {
      type: String,
      default: '0.1'
    },
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 300
    }
  },
  data () {
    return {
      sources: '/_games/unityLoader.html?game=' + this.game + '&width=' + this.width + '&height=' + this.height
    }
  },
  beforeMount () {
  },
  mounted () {
  },
  methods: {}
}
</script>
<style scoped>
  iframe
  {
      border:none;
  }
</style>

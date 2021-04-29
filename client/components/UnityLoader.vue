<template>
  <iframe
    :src="sources"
    width="1000"
    height="660"
  />
</template>

<script>
export default {
  name: 'UnityWebGL',
  props: {
    path: {
      type: String,
      default: '/'
    },
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
      default: 100
    },
    height: {
      type: Number,
      default: 100
    }
  },
  data () {
    return {
      sources: this.path + this.game + '/index.html'
    }
  },
  beforeMount () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>

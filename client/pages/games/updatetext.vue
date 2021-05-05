<template>
  <section>
    <!-- <Unity
      ref="unity"
      path="/_examples/"
      game="text"
    /> -->
    <v-text-field
      :value="userText"
      @input="updateText"
    />
    {{ text() }}
    {{ userText }}
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
//  import Unity from '~/components/UnityLoader'
export default {
  components: {
    //  Unity
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters('text', { text: 'find', get: 'get' }),
    userText () {
      const record = this.text().data.find(text => text._id === this.userId)
      if (record) {
        return record.text
      } else {
        return ''
      }
    }
  },
  created () {},
  mounted () {
    this.userId = localStorage.getItem('user')
    this.findText()
  },
  methods: {
    ...mapActions('text', { findText: 'find', create: 'create', patch: 'patch' }),
    updateText (text) {
      this.findText({
        query: {
          _id: this.userId
        }
      })
        .then((count) => {
          if (count.total === 0) {
            this.create({
              _id: this.userId,
              text
            })
          } else {
            this.patch({ _id: this.userId, text })
          }
        })
    }
  }
}
</script>
<style>
</style>

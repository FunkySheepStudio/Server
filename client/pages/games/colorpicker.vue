<template>
  <v-container
    class="d-md-flex justify-center"
  >
    <v-card>
      <v-card-title>Pick a color</v-card-title>
      <v-color-picker
        v-model="color"
        dot-size="25"
        swatches-max-height="200"
        @update:color="updateColor"
      />
    </v-card>
    <v-card>
      <v-card-title>See the changes</v-card-title>
      <funkysheep-unity
        v-if="userId !== ''"
        game="colorpicker"
      />
    </v-card>
    <v-card>
      <v-card-title>Network messages</v-card-title>
      <v-data-table
        :items="messages(
          { query: {
            direction: 'outgoing',
            $limit: 5,
            $sort: {
              sentAt: -1
            }
          }
          }
        ).data.filter(record => record.data)
          .filter(record => record.data.color)
          .filter(record => record.data._id === userId)
        "
        :headers="headersOutgoing"
        :sort-by="['sentAt']"
        :sort-desc="[true]"
        hide-default-footer
      >
        <template #[`item.sentAt`]="{ item }">
          {{ new Date(item.sentAt).toLocaleString() }}
        </template>
        <template #[`item.data.color`]="{ item }">
          <v-chip
            :color="item.data.color"
            dark
          >
            {{ item.data.color }}
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {},
  data () {
    return {
      color: '',
      userId: ''
    }
  },
  computed: {
    ...mapGetters('colorpicker', { colorpicker: 'find', get: 'get' }),
    ...mapGetters('messages', { messages: 'find' }),
    headersOutgoing () {
      return [
        {
          text: 'Send Date',
          value: 'sentAt'
        },
        {
          text: 'Color',
          value: 'data.color'
        }
      ]
    }
  },
  created () {},
  mounted () {
    this.userId = localStorage.getItem('user')
    this.findColorpicker()
  },
  methods: {
    ...mapActions('colorpicker', { findColorpicker: 'find', create: 'create', patch: 'patch' }),
    ...mapActions('messages', { findMessages: 'find' }),
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

<template>
  <v-container
    class="d-md-flex justify-center"
  >
    <v-card>
      <v-card-title>Set your nickname</v-card-title>
      <v-text-field
        v-model="nickname"
        :rules="[rules.min, rules.max]"
        :error-messages="errorMessages"
        outlined
        background-color="#D6A3A3"
      />
      <v-data-table
        :items="messages(
          { query: {
            direction: 'incoming',
            $limit: 5,
            $sort: {
              sentAt: -1
            }
          }
          }
        ).data.filter(record => record.data._id === userId)"
        :headers="headersIncoming"
        :sort-by="['sentAt']"
        :sort-desc="[true]"
        items-per-page="5"
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
    <v-card>
      <v-card-title>See the changes</v-card-title>
      <funkysheep-unity
        v-if="userId !== ''"
        game="nickname"
      />
    </v-card>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {},
  data () {
    return {
      userId: '',
      rules: {
        min: value => value.length >= 5 || 'Min 5 characters',
        max: value => value.length <= 20 || 'Max 20 characters'
      },
      errorMessages: ''
    }
  },
  computed: {
    ...mapGetters('users', { users: 'find', getUser: 'get' }),
    ...mapGetters('messages', { messages: 'find' }),
    nickname: {
      get () {
        const user = this.getUser(this.userId)
        if (user && user.nickname) {
          return user.nickname
        } else {
          return ''
        }
      },
      async set (value) {
        if (await this.nicknameExist(value) !== true) {
          this.errorMessages = 'Nickname all ready exist'
          return false
        }

        if (this.rules.min(value) !== true) {
          this.errorMessages = 'Nickname must be at list 5 caracters'
          return false
        }

        if (this.rules.max(value) !== true) {
          this.errorMessages = 'Nickname must be at max 20 caracters'
          return false
        }

        this.patch([this.userId, { _id: this.userId, nickname: value }])
        this.errorMessages = ''
      }
    },
    headersOutgoing () {
      return [
        {
          text: 'Send Date',
          value: 'sentAt'
        },
        {
          text: 'Nickname',
          value: 'data.nickname'
        }
      ]
    },
    headersIncoming () {
      return [
        {
          text: 'Send Date',
          value: 'sentAt'
        },
        {
          text: 'Nickname',
          value: 'data.nickname'
        }
      ]
    }
  },
  watch: {
    nickname (value) {
      this.errorMessages = ''
      this.nicknameExist(value)
    }
  },
  created () {
    this.userId = localStorage.getItem('user')
  },
  mounted () {
    this.findUsers()
    this.findMessages()
  },
  methods: {
    ...mapActions('users', { findUsers: 'find', patch: 'patch' }),
    ...mapActions('messages', { findMessages: 'find' }),
    nicknameExist (nickname) {
      return this.findUsers({
        query: {
          _id: {
            $ne: this.userId
          },
          nickname
        }
      })
        .then((users) => {
          if (users && users.total !== 0) {
            return false
          } else {
            return true
          }
        })
    }
  }
}
</script>
<style>
</style>

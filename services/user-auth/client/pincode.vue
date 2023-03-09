<script lang="ts">
export default {
  components: {
  },
  data() {
    return {
      count: 0,
      pin: '',
      status: 'Use your mobile to scan'
    }
  },
  mounted() {
    emitter.on('message', this.OnMessage)
  },
  watch: {
    // whenever question changes, this function will run
    pin(newPin, oldPin) {
      if (newPin.length === 4)
      {
        var message = {
          service: 'user-auth',
          function: 'CheckPinCode',
          data: {
            user: localStorage.getItem('user'),
            device: localStorage.getItem('device'),
            pin: this.pin
          }
        }

        socket.send(JSON.stringify(message))
      }
    }
  },
  methods: {
    OnMessage: function(message) {
      if (message.service === 'user-auth')
      {
        if (message.function === 'ConfirmPin')
        {
          this.status = 'Please confirm'
        }

        if (message.function === 'PinOk')
        {
          this.status = 'Pin is ok'
        }

        if (message.function === 'PinNOk')
        {
          this.status = 'Wrong pin'
        }
      }
    },
    CalculateValue: function(row, col)
    {
      return row + (col - 1) + (row - 1) * 2
    }
  }
}
</script>

<template>
  <v-card class="text-center">
    <v-card-title>{{ status }}</v-card-title>
    <v-table>
      <tbody>
        <tr
          v-for="row in 3"
          :key="row"
        >
          <td
            v-for="col in 3"
            :key="col"
          >
          <v-btn
            :disabled="pin.length === 4"
            v-on:click="pin += CalculateValue(row, col)"
          >
            {{ CalculateValue(row, col) }}
          </v-btn>
          </td>
        </tr>
        <tr>
          <td>
            <v-btn
              :disabled="pin.length === 0"
              v-on:click="pin = ''"
              >
              C
            </v-btn>
          </td>
          <td>
            <v-btn
              :disabled="pin.length === 4"
              v-on:click="pin += 0"
            >
              0
            </v-btn>
          </td>
          <td>
            <v-btn
              :disabled="pin.length === 0"
              v-on:click="pin = pin.substring(0,pin.length-1)"
              >
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-table>
      <tbody>
        <tr>
          <td
            v-for="pinItem in 4"
            :key="pinItem"
          >
          <v-chip>
            <v-icon v-if="pin.length >= pinItem">
              mdi-star
            </v-icon>
            <v-icon v-else>
              mdi-minus
            </v-icon>
          </v-chip>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>
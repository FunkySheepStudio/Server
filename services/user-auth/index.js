const Service = require('../service');
const crypto = require('crypto');

module.exports = class UserAuth extends Service
{
  tokens = []
  constructor(name, services)
  {
    super(name, services)
    super.Start()
    this.Start()
  }

  Start()
  {
    this.services.eventEmitter.on('network-ws-connection-closed', (ws) => {
      this.tokens = this.tokens.filter((item) => {
        return item.ws !== ws
      })
    });
  }

  CheckPinCode(message)
  {
    var user = this.services.Get("users").users.find((item) => {
      return item.id === message.data.user
    })

    var device = this.services.Get("user-devices").devices.find((item) => {
      return (item.id === message.data.device && item.user === message.data.user)
    })

    let pinMessage = {
      service: "user-auth",
      function: ""
    }

    if (!user.pin)
    {
      user.pin = message.data.pin
      pinMessage.function = "ConfirmPin"
    } else if (user.pin === message.data.pin && device) {
      pinMessage.function = "PinOk"
    } else {
      pinMessage.function = "PinNOk"
    }

    this.services.Get("network-ws").Send(message.ws, pinMessage)
  }

  AddAuthKey(message)
  {
    // Remove old socket key
    this.tokens = this.tokens.filter((item) => {
      return item.ws !== message.ws
    })

    // Find if we allready have a key
    var token = this.tokens.find((item) => {
      return item.token == message.data.token
    })

    if (!token)
    {
      this.tokens.push({
        token: message.data.token,
        ws: message.ws
      })

    } else {

      let userId = crypto.randomUUID()
      this.services.Get("users").users.push({
        id: userId
      })

      let userMessage = {
        service: "user-auth",
        function: "GetUser",
        data: {
          user: userId,
          device: crypto.randomUUID()
        }
      }
      this.services.Get("network-ws").Send(token.ws, userMessage)
      this.services.Get("user-devices").devices.push({
        id: userMessage.data.device,
        user: userId
      })

      userMessage.device = crypto.randomUUID()
      this.services.Get("network-ws").Send(message.ws, userMessage)

      this.services.Get("user-devices").devices.push({
        id: userMessage.data.device,
        user: userId
      })
    }
  }
}
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
      pinMessage.function = "PinOk"
    } else if (user.pin === message.data.pin && device) {
      pinMessage.function = "PinOk"
    } else {
      pinMessage.function = "PinNOk"
    }

    // Register the user on the connection
    if (pinMessage.function === "PinOk")
    {
      var connection = this.services.Get("network-ws").connections.find((item) => {
        return item.key === message.ws
      })

      connection.user = user.id
      connection.device = device.id
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

      // if the connection is authenticated
      let connection = this.services.Get("network-ws").connections.find((item) => {
        return item.key === message.ws
      })

      var userId

      // else we create a new user
      if (!connection.user)
      {
        userId = crypto.randomUUID()
        this.services.Get("users").users.push({
          id: userId
        })
      } else {
        userId = connection.user
      }

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

      // Send back the data if the user is not authenticated
      if (!connection.user)
      {
        userMessage.device = crypto.randomUUID()
        this.services.Get("network-ws").Send(message.ws, userMessage)

        this.services.Get("user-devices").devices.push({
          id: userMessage.data.device,
          user: userId
        })
      }
    }
  }
}
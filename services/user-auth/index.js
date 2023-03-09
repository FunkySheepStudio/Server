const Service = require('../service');

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
      console.log("2 keys found")
    }
  }
}
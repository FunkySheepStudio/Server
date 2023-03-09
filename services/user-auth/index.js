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

      let userMessage = {
        service: "user-auth",
        function: "GetUser",
        data: {
          user: 'test'
        }
      }
      console.log(token.ws)
      console.log(message.ws)
      this.services.Get("network-ws").Send(token.ws, userMessage)
      this.services.Get("network-ws").Send(message.ws, userMessage)
    }
  }
}
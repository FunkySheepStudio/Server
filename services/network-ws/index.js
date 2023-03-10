const Service = require('../service');
const Ws =  require('ws');

module.exports = class NetworkWs extends Service
{
    connections = []

    constructor(name, services)
    {
        super(name, services)
        this.Start()
    }

    Start()
    {
        super.Start()
        this.wss = new Ws.WebSocketServer({ server: this.services.Get('network-http').server });

        const ref = this
        this.wss.on('connection', function connection(ws) {
          ws.on('error', console.error);
        
          ws.on('message', function message(data) {
            var message = JSON.parse(data.toString())

            if (ws.key)
            {
              message.ws = ws.key
              ref.services.DispatchMessage(message)
            } else if (message.service === 'network-ws' && message.function === 'Register')
            {
              ws.key = message.data.wsKey
              ref.connections.push(ws)

              message = {
                service: "network-ws",
                function: "RegistrationOk"
              }
              ref.Send(ws.key, message)
            }
          });

          ws.on('close', function close() {
            if (ws.key)
            {
              ref.services.eventEmitter.emit('network-ws-connection-closed', ws.key)
              ref.connections = ref.connections.filter((item) => {
                return item.key !== ws.key
              })
            }
          });
        });
    }

    Send(wsToken, message)
    {
      let ws = this.connections.find((item) => {
        return item.key === wsToken
      })
      if (ws)
      {
        ws.send(JSON.stringify(message))
      }
    }
}
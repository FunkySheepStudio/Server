const Service = require('../service');
const Ws =  require('ws');

module.exports = class NetworkWs extends Service
{
    constructor(name, services)
    {
        super(name, services)
        this.Start()
    }

    Start()
    {
        super.Start()
        this.wss = new Ws.WebSocketServer({ server: this.services.Get('network-http').server });
    }
}
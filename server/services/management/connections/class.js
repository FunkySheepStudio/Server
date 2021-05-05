const ServiceClass = require('../../service.class')

exports.Connections = class Connections extends ServiceClass {
  setup (app) {
    this.app = app
    this.app.connections = []

    app.gameServer.on('connection', (socket, req) => {
      //  Create the socket
      this.app.connections.push(socket)
      socket.startedAt = new Date().getTime()

      this.create({
        startedAt: socket.startedAt,
        user: ''
      })
        .then((data) => {
          socket._id = data._id
        })

      socket.on('message', (data) => {
        //  Create the message
        const msg = JSON.parse(Buffer.from(data).toString())
        msg.direction = 'incoming'
        msg.receiveAt = new Date().getTime()
        msg.data.socket = socket._id
        this.app.service('/api/management/messages').create(msg)
      })

      socket.on('close', () => {
        // Delete the socket
        this.remove(socket._id)
        this.app.connections = this.app.connections.filter(s => s !== socket)
      })
    })
  }
}

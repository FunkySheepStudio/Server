const ServiceClass = require('../service.class')

class Message {
  constructor (data) {
    this.time = new Date().getTime()
    this.data = data
  }
}

exports.Messages = class Messages extends ServiceClass {
  setup (app) {
    this.app = app
    this.sockets = []

    app.gameServer.on('connection', (socket) => {
      socket.startedAt = new Date().getTime()
      this.sockets.push(socket)

      socket.on('message', (data) => {
        const msg = new Message(JSON.parse(Buffer.from(data).toString()))
        //  await this.create(msg)
        msg.socket = socket

        if (this.app.service(msg.data.service)) {
          this.app.service(msg.data.service).receive(msg)
        } else {
          this.app.log('The service do not exist')
        }
      })

      socket.on('close', () => {
        if (socket.userId) {
          this.app.service('/api/users').setOffline(socket.userId)
        }

        this.sockets = this.sockets.filter(s => s !== socket)
      })
    })
  }

  send (userId, data) {
    const message = new Message(data)
    const playerSockets = this.sockets.filter(socket => socket.userId === userId)

    if (playerSockets.length >= 1) {
      const msg = JSON.stringify(message)
      playerSockets.forEach((socket) => {
        socket.send(msg)
      })
    } /*  else {
      this.sockets = this.sockets.filter(s => s !== playerSocket)
    } */
  }
}

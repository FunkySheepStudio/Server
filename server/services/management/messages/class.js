const ServiceClass = require('../../service.class')

exports.Messages = class Messages extends ServiceClass {
  sendToUser (user, data, from) {
    this.app.service('/api/management/connections').find({
      query: {
        user
      }
    })
      .then((connections) => {
        //  If from is defined, we don't return the message to the sender
        if (from) {
          connections.data = connections.data.filter(connection => connection._id !== from)
        }

        connections.data.forEach((connection) => {
          this.sendToSocket(connection._id, data, from)
        })
      })
  }

  sendToSocket (socket, data, from) {
    const msg = {}
    msg.direction = 'outgoing'
    msg.sentAt = new Date().getTime()
    msg.socket = from
    msg.data = data

    const to = this.app.connections.find(connection => connection._id === socket)
    to.send(JSON.stringify(msg))

    //  Save the message
    this.app.service('/api/management/messages').create(msg)
  }
}

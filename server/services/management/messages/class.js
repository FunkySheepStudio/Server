const ServiceClass = require('../../service.class')

exports.Messages = class Messages extends ServiceClass {
  sendToUser (user, msg, from) {
    this.app.service('/api/management/connections').find({
      query: {
        user,
        type: 'game',
        _id: {
          $ne: from
        }
      }
    })
      .then((connections) => {
        //  If from is defined, we don't return the message to the sender
        /* if (from) {
          connections.data = connections.data.filter(connection => connection._id !== from)
        } */

        connections.data.forEach((connection) => {
          this.sendToSocket(connection._id, msg, from)
        })
      })
  }

  sendToSocket (socket, msg, from) {
    msg.direction = 'outgoing'
    msg.sentAt = new Date().getTime()
    msg.from = from
    msg.socket = socket

    const to = this.app.connections.find(connection => connection._id === socket)
    to.send(JSON.stringify(msg))

    //  Save the message
    this.app.service('/api/management/messages').create(msg)
  }
}

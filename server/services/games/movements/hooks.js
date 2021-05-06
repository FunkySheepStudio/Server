const cleanMessage = require('../../../hooks/cleanMessage')

function getSocket (context) {
  context.data.data.socket = context.data.socket
  return context
}

function sendPosition (context) {
  const message = {
    data: {}
  }
  Object.assign(message.data, context.data.data)
  message.data.service = '/' + context.path
  message.data.method = context.method

  context.app.service('/api/management/messages').sendToUser(message.data._id, message.data, message.data.socket)
  return context
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [getSocket, sendPosition, cleanMessage],
    update: [getSocket, sendPosition, cleanMessage],
    patch: [getSocket, sendPosition, cleanMessage],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}

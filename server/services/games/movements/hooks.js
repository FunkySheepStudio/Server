const cleanMessage = require('../../../hooks/cleanMessage')
const saveSocket = require('../../../hooks/saveSocket')

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
    create: [saveSocket, sendPosition, cleanMessage],
    update: [saveSocket, sendPosition, cleanMessage],
    patch: [saveSocket, sendPosition, cleanMessage],
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

const sendResult = require('../../../hooks/sendResult')

function sendMovement (context) {
  const message = {
    method: context.method,
    service: '/' + context.path
  }

  if (context.result) {
    message.data = context.data
    context.app.service('/api/management/messages').sendToUser(context.result._id, message, context.params.socket)
  }
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [sendMovement],
    update: [],
    patch: [sendMovement],
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

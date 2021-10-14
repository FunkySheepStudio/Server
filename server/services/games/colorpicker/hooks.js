const sendResult = require('../../../hooks/sendResult')

function sendColor (context) {
  const message = {
    method: context.method,
    service: '/' + context.path
  }

  if (context.result) {
    message.data = context.data
    context.app.service('/api/system/messages').sendToUser(context.result._id, message, context.params.socket)
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
    get: [sendResult],
    create: [sendColor],
    update: [sendColor],
    patch: [sendColor],
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

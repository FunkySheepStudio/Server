function cleanMessage (context) {
  context.data.data.socket = context.data.socket
  context.data = context.data.data
  return context
}

function sendPosition (context) {
  context.data.service = '/' + context.path
  context.data.method = context.method
  context.app.service('/api/management/messages').sendToUser(context.data._id, context.data, context.data.socket)
  return context
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [cleanMessage, sendPosition],
    update: [cleanMessage, sendPosition],
    patch: [cleanMessage, sendPosition],
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

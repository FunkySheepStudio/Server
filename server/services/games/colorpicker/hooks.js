function sendColor (context) {
  const message = {
    data: {}
  }
  Object.assign(message.data, context.data)
  message.data.service = '/' + context.path
  message.data.method = context.method

  context.app.service('/api/management/messages').sendToUser(message.data._id, message.data)
  return context
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [sendColor],
    update: [sendColor],
    patch: [sendColor],
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

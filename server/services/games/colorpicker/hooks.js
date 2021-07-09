function sendColor (context) {
  const message = {
    method: context.method,
    service: '/' + context.path
  }

  if (context.result && context.params) {
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

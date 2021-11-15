// Dispatch the incoming messages to the others services

function dispatch (context) {
  //  Only for incoming messages to avoid loops
  if (context.data.direction == 'outgoing')
    return context

  if (!context.data.params) {
    context.data.params = {}
  }

  context.data.params.socket = context.data.socket

  //  Clean the data
  switch (context.data.request) {
    case 'find':
      context.app.service(context.data.service).find(context.data.params)
        .catch((err) => {
          console.log(err)
        })
      break
    case 'get':
      context.app.service(context.data.service).get(context.data.key, context.data.params)
        .catch((err) => {
          console.log(err)
        })
      break
    case 'create':
      context.app.service(context.data.service).create(context.data.data, context.data.params)
        .catch((err) => {
          console.log(err)
        })
      break
    case 'update':
      context.app.service(context.data.service).update(context.data.key, context.data.data, context.data.params)
        .catch((err) => {
          console.log(err)
        })
      break
    case 'patch':
      context.app.service(context.data.service).patch(context.data.key, context.data.data, context.data.params)
        .catch((err) => {
          console.log(err)
        })
      break
    case 'remove':
      context.app.service(context.data.service).remove(context.data.key, context.data.params)
        .catch((err) => {
          console.log(err)
        })
      break
    default:
      break
  }

  return context
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [dispatch],
    update: [],
    patch: [],
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

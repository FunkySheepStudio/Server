async function colorChanged (context) {
  return await context.service.get(context.id)
    .then((record) => {
      if (record.color !== context.data.color) {
        console.log("changed")
        return context
      } else {
        console.log("not changed")
        context.result = null
      }
    })
}

function sendColor (context) {
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
    update: [colorChanged],
    patch: [colorChanged],
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

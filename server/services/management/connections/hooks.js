//  Set default creation values
function create (context) {
  if (context.data.user === undefined) {
    context.data.user = ''
  }
  return context
}

// Set user online
function setOnline (context) {
  if (context.data.user !== '') {
    context.app.service('/api/management/users').patch(context.data.user, {
      online: true
    })
  }
}

// Set user offline
function setOffline (context) {
  if (context.result.user !== '') {
    context.app.service('/api/management/connections').find({
      query: {
        user: context.result.user
      }
    })
      .then((connections) => {
        if (connections.total === 0) {
          context.app.service('/api/management/users').patch(context.result.user, {
            online: false
          })
        }
      })
  }
}

async function clean (context) {
  //  Recmove messages associated to a connection
  await context.app.service('/api/management/messages').remove(null, {
    query: {
      socket: context.id
    }
  })

  // If we gonna remove last connection for given user, remove the associated records
  await context.app.service('/api/management/connections').get(context.id)
    .then((connection) => {
      if (connection.user !== '') {
        context.app.service('/api/management/connections').find({
          query: {
            user: connection.user
          }
        })
          .then((connections) => {
            if (connections.total === 1) {
              context.app.service('/api/games/movements').remove(null, { query: { _id: connection.user } })
              context.app.service('/api/games/colorpicker').remove(null, { query: { _id: connection.user } })
              context.app.service('/api/management/users').patch(connection.user, { _id: connection.user, online: false })
            }
          })
      }
    })

  return context
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [create, setOnline],
    update: [setOnline],
    patch: [setOnline],
    remove: [clean]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [setOffline]
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

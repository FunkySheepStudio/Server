//  Set default creation values
function create (context) {
  if (context.data.user === undefined) {
    context.data.user = ''
  }
  return context
}

//  Set the user online field depending on the numbers of connections left
async function userOnline(context) {
  //  If the record exist
  if (context.id) {
    await context.service.get(context.id) // We get the current record
      .then(async (connection) => {
        if (connection.user != '') {
          await context.service.find({
            query: {
              user: connection.user
            }
          })
            .then((oldUserConnections) => {
              if (oldUserConnections.total === 1) { // If just on connection left, we set user to offline
                context.app.service('/api/management/users').patch(connection.user, {
                  online: false
                })
              }
            })
        }
      })
  }
  
  if (context.data && context.data.user !== '') { // If no old user but new one still
    context.app.service('/api/management/users').patch(context.data.user, {
      online: true
    })
  }

  return context
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
    create: [create, userOnline],
    update: [userOnline],
    patch: [userOnline],
    remove: [clean]
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

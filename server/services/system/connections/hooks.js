const { disallow } = require('feathers-hooks-common');

//  Set the user online field depending on the numbers of connections left
async function userOnline(context) {
  //  If the record exist
  if (context.id) {
    await context.service.get(context.id, {socket: 'system'}) // We get the current record
      .then(async (connection) => {
        if (connection.user != '') {
          await context.service.find({
            query: {
              user: connection.user
            },
            socket: 'system'
          })
            .then((oldUserConnections) => {
              if (oldUserConnections.total === 1) { // If just on connection left, we set user to offline
                context.app.service('/api/system/users').patch(connection.user, {
                  online: false
                },
                {
                  socket: 'system'
                }
                )
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
  }
  
  if (context.data && context.data.user !== '') { // If no old user but new one still
    context.app.service('/api/system/users').patch(context.data.user, {
      online: true
    },
    {
      socket: 'system'
    })
  }

  return context
}

async function clean (context) {
  //  Recmove messages associated to a connection
  await context.app.service('/api/system/messages').remove(null, {
    query: {
      socket: context.id
    },
    socket: 'system'
  })

  // If we gonna remove last connection for given user, remove the associated records
  await context.app.service('/api/system/connections').get(context.id, {socket: 'system'})
    .then((connection) => {
      if (connection.user !== '') {
        context.app.service('/api/system/connections').find({
          query: {
            user: connection.user
          },
          socket: 'system'
        })
          .then((connections) => {
            if (connections.total === 1) {
              context.app.service('/api/system/users').patch(
                connection.user,
                { _id: connection.user, online: false },
                {
                  socket: 'system'
                }
              )
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
    create: [disallow('external')],
    update: [disallow('external')],
    patch: [disallow('external')],
    remove: [disallow('external')]
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

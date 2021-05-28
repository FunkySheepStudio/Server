const { hashPassword } = require('@feathersjs/authentication-local').hooks

function setUserToConnection (context) {
  if (context.data.socket) {
    context.app.service('/api/management/connections').get(context.data.socket)
      .then((connection) => {
        if (connection.user === '') {
          context.app.service('/api/management/connections').patch(connection._id, {
            user: context.data.data._id
          })
        }
      })
  }

  return context
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [hashPassword('password'), setUserToConnection],
    update: [hashPassword('password'), setUserToConnection],
    patch: [hashPassword('password'), setUserToConnection],
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

const { hashPassword } = require('@feathersjs/authentication-local').hooks
const setOnline = require('../../../hooks/setOnline')

function setUserToConnection (context) {
  if (context.data.socket) {
    context.app.service('/api/management/connections').get(context.data.socket)
      .then((connection) => {
        if (connection.user === '') {
          context.app.service('/api/management/connections').patch(connection._id, {
            user: context.id
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
    create: [hashPassword('password'), setOnline(), setUserToConnection],
    update: [hashPassword('password'), setOnline(), setUserToConnection],
    patch: [hashPassword('password'), setOnline(), setUserToConnection],
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

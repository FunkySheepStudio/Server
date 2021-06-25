const { hashPassword } = require('@feathersjs/authentication-local').hooks
const sendResult = require('../../../hooks/sendResult')

//  Set default creation values
function create (context) {
  context.data.online = false

  if (context.data._id !== 'admin') {
    context.data.admin = false
    context.data.guest = true
    context.data.nickname = ''
  } else {
    context.data.admin = true
    context.data.guest = false
    context.data.nickname = 'Administrator'
  }

  return context
}

function setUserToConnection (context) {
  if (context.params.socket) {
    context.app.service('/api/management/connections').get(context.params.socket)
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
    find: [setUserToConnection],
    get: [setUserToConnection],
    create: [hashPassword('password'), create, setUserToConnection],
    update: [hashPassword('password'), setUserToConnection],
    patch: [hashPassword('password'), setUserToConnection],
    remove: []
  },

  after: {
    all: [],
    find: [sendResult],
    get: [sendResult],
    create: [sendResult],
    update: [sendResult],
    patch: [sendResult],
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

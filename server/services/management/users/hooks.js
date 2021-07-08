const { hashPassword } = require('@feathersjs/authentication-local').hooks
const sendResult = require('../../../hooks/sendResult')

//  Set default creation values
async function create (context) {
  // Check if admin exist
  return await context.service.find({
    query: {
      login: context.data.login
    }
  })
    .then((admins) => {
      if (admins.total === 1) {
        throw new Error(context.data.login + ' user already exist');
      } else {
        context.data.online = false

        if (context.data.login !== 'admin') {
          context.data.admin = false
          context.data.nickname = ''
        } else {
          context.data.admin = true
          context.data.nickname = 'Administrator'
          context.data.login = 'admin'
          context.data.password = 'admin'
        }

      return context
      }
    })
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
    create: [create, hashPassword('password'), setUserToConnection],
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

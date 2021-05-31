const { hashPassword } = require('@feathersjs/authentication-local').hooks
const cleanMessage = require('../../../hooks/cleanMessage')

function setUserToConnection (context) {
  if (context.data.socket) {
    context.app.service('/api/management/connections').get(context.data.socket)
      .then((connection) => {
        if (connection.user === '') {
          context.app.service('/api/management/connections').patch(connection._id, {
            user: context.data._id
          })
        }
      })
  }

  return context
}

//  Send to updates to the connected user connections
function sendUser (context) {
  const message = {
    data: {}
  }

  // If the data is coming from web or message
  if (context.data && context.data.data) {
    Object.assign(message.data, context.data.data)
  } else {
    Object.assign(message.data, context.data)
  }

  message.data.service = '/' + context.path
  message.data.method = context.method

  context.app.service('/api/management/messages').sendToUser(message.data._id, message.data, message.data.socket)

  return context
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [sendUser],
    create: [hashPassword('password'), setUserToConnection],
    update: [hashPassword('password'), setUserToConnection],
    patch: [hashPassword('password'), setUserToConnection, sendUser, cleanMessage],
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

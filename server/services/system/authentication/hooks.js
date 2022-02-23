const sendResult = require('../../../hooks/sendResult')

//  After a successfull login, we bind the user to the WS connection
function connectionSetUser (context) {
  // Get the socket depending on game ws connection or web page socket connection
  const socket = context.params.socket ?? context.params.connection.headers['sec-websocket-key']
  context.app.service('/api/system/connections').setUser(socket, context.result.user._id)
  return context
}

//  On logout, remove the user from the connection
function connectionUnSetUser (context) {
  // Get the socket depending on game ws connection or web page socket connection
  const socket = context.params.socket ?? context.params.connection.headers['sec-websocket-key']
  context.app.service('/api/system/connections').unSetUser(socket)
  return context
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [sendResult, connectionSetUser],
    update: [],
    patch: [],
    remove: [connectionUnSetUser]
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

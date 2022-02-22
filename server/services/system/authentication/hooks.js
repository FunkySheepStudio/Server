const sendResult = require('../../../hooks/sendResult')

//  After a successfull login, we bind the user to the WS connection
function setUserToConnection (context) {
  // Get the socket depending on game ws connection or web page socket connection
  const socket = context.params.socket ?? context.params.connection.headers['sec-websocket-key']
  context.app.service('/api/system/connections').patch(
    socket,
    {
      user: context.result.user._id
    },
    {socket: 'system'}
  )
  
  return context
}

//  After a successfull login, we bind the user to the WS connection
function removeUserFromConnection (context) {
  // Get the socket depending on game ws connection or web page socket connection
  const socket = context.params.socket ?? context.params.connection.headers['sec-websocket-key']
  context.app.service('/api/system/connections').patch(
    socket,
    {
      user: ''
    },
    {socket: 'system'}
  )
  
  return context
}

function setAdmin (context) {
  context.params.user = {
    login: 'admin'
  }

  return context
}

module.exports = {
  before: {
    all: [setAdmin],
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
    create: [setUserToConnection, sendResult],
    update: [],
    patch: [],
    remove: [removeUserFromConnection]
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

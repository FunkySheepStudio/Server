const sendResult = require('../../../hooks/sendResult')

//  After a successfull login, we bind the user to the WS connection
function setUserToConnection (context) {
  // Get the socket depending on game ws connection or web page socket connection
  const socket = context.params.socket ?? context.params.connection.headers['sec-websocket-key']
  context.app.service('/api/management/connections').patch(
    socket,
    {
      user: context.result.user._id
    }
  )
  
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
    create: [setUserToConnection, sendResult],
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

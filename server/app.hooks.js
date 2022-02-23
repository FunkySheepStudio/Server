const noNullID = require('./hooks/noNullID')
const setSocket = require('./hooks/setSocket')
const setUser = require('./hooks/setUser')

function error(context) {
  console.error(`Error in '${context.path}' service method '${context.method}'`, context.error.stack);
}

// Global feathers Hooks
module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [noNullID],
    update: [],
    patch: [],
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
    all: [error],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}

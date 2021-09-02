const noNullID = require('./hooks/noNullID')

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
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}

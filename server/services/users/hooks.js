const { hashPassword } = require('@feathersjs/authentication-local').hooks
const setOnline = require('../../hooks/setOnline')

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [hashPassword('password'), setOnline()],
    update: [hashPassword('password'), setOnline()],
    patch: [hashPassword('password'), setOnline()],
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

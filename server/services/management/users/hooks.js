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

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [create, hashPassword('password')],
    update: [hashPassword('password')],
    patch: [hashPassword('password')],
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

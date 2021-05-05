const logger = require('./logger/service')
const users = require('./users/service')
const authentication = require('./authentication/service')
const connections = require('./connections/service')
const messages = require('./messages/service')

module.exports = function (app) {
  app.configure(logger)
  app.configure(users)
  app.configure(authentication)
  app.configure(connections)
  app.configure(messages)
}

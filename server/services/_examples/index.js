const Example1 = require('./example1/service')

module.exports = function (app) {
  app.configure(Example1)
}

const movements = require('./movements/service')

module.exports = function (app) {
  app.configure(movements)
}

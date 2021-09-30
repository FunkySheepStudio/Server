const System = require('./system')
const games = require('./games')

module.exports = function (app) {
  app.configure(System)
  app.configure(games)
}

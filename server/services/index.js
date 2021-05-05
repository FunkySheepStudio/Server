const management = require('./management')
const games = require('./games')

module.exports = function (app) {
  app.configure(management)
  app.configure(games)
}

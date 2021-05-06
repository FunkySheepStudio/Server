const movements = require('./movements/service')
const colorpicker = require('./colorpicker/service')

module.exports = function (app) {
  app.configure(movements)
  app.configure(colorpicker)
}

const movements = require('./movements')
const colorpicker = require('./colorpicker')

module.exports = function (app) {
  app.configure(movements)
  app.configure(colorpicker)
}

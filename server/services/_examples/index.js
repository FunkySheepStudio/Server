const ColorPicker = require('./colorpicker/service')
const Movements = require('./movements/service')

module.exports = function (app) {
  app.configure(ColorPicker)
  app.configure(Movements)
}

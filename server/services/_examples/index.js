const ColorPicker = require('./colorpicker/service')

module.exports = function (app) {
  app.configure(ColorPicker)
}

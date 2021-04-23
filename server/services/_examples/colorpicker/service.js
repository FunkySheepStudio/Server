
const createModel = require('../../../models/_examples/ColorPicker.model')
const { ColorPicker } = require('./class')
const hooks = require('./hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true
  }

  app.use('/api/colorpicker', new ColorPicker(options, app))
  const service = app.service('/api/colorpicker')

  service.hooks(hooks)
}

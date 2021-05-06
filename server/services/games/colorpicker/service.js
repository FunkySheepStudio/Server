
const createModel = require('./model')
const { Colorpicker } = require('./class')
const hooks = require('./hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true
  }

  app.use('/api/games/colorpicker', new Colorpicker(options, app))
  const service = app.service('/api/games/colorpicker')

  service.hooks(hooks)
}

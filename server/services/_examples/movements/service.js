
const createModel = require('../../../models/_examples/Movements.model')
const { Movements } = require('./class')
const hooks = require('./hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true
  }

  app.use('/api/movements', new Movements(options, app))
  const service = app.service('/api/movements')

  service.hooks(hooks)
}

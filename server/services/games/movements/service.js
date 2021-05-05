
const createModel = require('./model')
const { Movements } = require('./class')
const hooks = require('./hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true
  }

  app.use('/api/games/movements', new Movements(options, app))
  const service = app.service('/api/games/movements')

  service.hooks(hooks)
}

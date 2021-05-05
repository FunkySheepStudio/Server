
const createModel = require('./model')
const { Logger } = require('./class')
const hooks = require('./hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true
  }

  app.use('/api/management/logger', new Logger(options, app))
  const service = app.service('/api/management/logger')

  service.hooks(hooks)
}

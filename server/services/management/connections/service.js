
const createModel = require('./model')
const { Connections } = require('./class')
const hooks = require('./hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true
  }

  app.use('/api/management/connections', new Connections(options, app))
  const service = app.service('/api/management/connections')

  service.hooks(hooks)
}

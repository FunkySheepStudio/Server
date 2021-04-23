
const createModel = require('../../../models/_examples/example1.model')
const { Example1 } = require('./class')
const hooks = require('./hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true
  }

  app.use('/api/example1', new Example1(options, app))
  const service = app.service('/api/example1')

  service.hooks(hooks)
}

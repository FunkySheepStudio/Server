
const createModel = require('./model')
const { Messages } = require('./class')
const hooks = require('./hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true
  }

  app.use('/api/management/messages', new Messages(options, app))
  const service = app.service('/api/management/messages')

  service.hooks(hooks)
}

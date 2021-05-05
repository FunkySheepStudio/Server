
const createModel = require('../../models/messages.model')
const { Messages } = require('./class')
const hooks = require('./hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true
  }

  app.use('/api/messages', new Messages(options, app))
  const service = app.service('/api/messages')

  service.hooks(hooks)
}

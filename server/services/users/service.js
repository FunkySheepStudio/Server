
const createModel = require('../../models/users.model')
const { Users } = require('./class')
const hooks = require('./hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true
  }

  app.use('/api/users', new Users(options, app))
  const service = app.service('/api/users')

  service.hooks(hooks)
}

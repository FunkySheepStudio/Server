
const createModel = require('./model')
const { Users } = require('./class')
const hooks = require('./hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true
  }

  app.use('/api/management/users', new Users(options, app))
  const service = app.service('/api/management/users')

  service.hooks(hooks)
}

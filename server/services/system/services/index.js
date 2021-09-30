const path = require('path');
const slash = require('slash');

const createModel = require('./model')
const { Service } = require('./class')
const hooks = require('./hooks')

// Build dynamicly the api path
const api = slash(path.relative(process.cwd(), __dirname)).replace('server/services', '/api');

module.exports = (app) => {
  const options = {
    _id: api,
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true
  }

  app.use(options._id, new Service(options, app))
  const service = app.service(options._id)

  service.hooks(hooks)
}

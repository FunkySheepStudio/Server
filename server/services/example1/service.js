
const createModel = require('../../models/games.model')
const { Games } = require('./class')
const hooks = require('./hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true
  }

  app.use('/api/games', new Games(options, app))
  const service = app.service('/api/games')

  service.hooks(hooks)
}

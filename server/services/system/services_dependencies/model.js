const path = require('path')
const NeDB = require('nedb')

module.exports = function (app) {
  const Model = new NeDB({
    filename: path.join(app.get('homePath'), 'db', 'services_dependencies.db'),
    autoload: true
  })

  return Model
}

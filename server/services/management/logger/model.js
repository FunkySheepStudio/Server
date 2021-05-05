const NeDB = require('nedb')

module.exports = function (app) {
  const Model = new NeDB({
    inMemoryOnly: true
  })

  return Model
}

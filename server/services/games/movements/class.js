const ServiceClass = require('../../service.class')

exports.Movements = class Movements extends ServiceClass {
  create (data, params) {
    return this.find({
      query: {
        _id: data._id
      }
    })
      .then((results) => {
        if (results.total === 0) {
          return super.create(data, params)
        }
      })
  }
}

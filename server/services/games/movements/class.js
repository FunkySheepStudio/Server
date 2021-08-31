const ServiceClass = require('../../service.class')

exports.Movements = class Movements extends ServiceClass {
  patch(id, data, params) {
    if (id !== null) {
      return this.find({
        query: {
          _id: data._id
        }
      })
        .then((results) => {
          if (results.total === 0) {
            return super.create(data, params)
          } else {
            return super.patch(id, data, params)
          }
        })
    }
  }
}

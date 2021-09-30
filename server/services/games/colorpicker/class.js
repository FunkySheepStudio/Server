const ServiceClass = require('../../service.class')

exports.Service = class Service extends ServiceClass {
  create (data, params) {
    // Discard a creation if already created
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

const ServiceClass = require('../../service.class')

exports.Colorpicker = class Movements extends ServiceClass {
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

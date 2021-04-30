const ServiceClass = require('../../network.service.class')

exports.Movements = class Movements extends ServiceClass {
  patch (id, data, params) {
    return super.patch(id, data, params)
      .then((data) => {
        this.send(id, 'patch', data)
        return data
      })
  }
}

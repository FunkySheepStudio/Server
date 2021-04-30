const ServiceClass = require('../../network.service.class')

exports.Movements = class Movements extends ServiceClass {
  setPosition (msg) {
    this.exist(msg.data._id)
      .then((exist) => {
        if (exist) {
          return this.patch(msg.data._id, msg.data)
        } else {
          return this.create(msg.data)
        }
      })
      .then((data) => {
        this.send(data._id, 'setPosition', data)
      })
  }
}

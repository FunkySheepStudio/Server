const ServiceClass = require('../../network.service.class')

exports.ColorPicker = class ColorPicker extends ServiceClass {
  patch (id, data, params) {
    return super.patch(id, data, params)
      .then((data) => {
        this.send(id, 'patch', data)
        return data
      })
  }
}

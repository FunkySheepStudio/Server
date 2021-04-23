const ServiceClass = require('./service.class')

module.exports = class NetServiceClass extends ServiceClass {
  patch (id, data, params) {
    data.request = 'patch'
    return super.patch(id, data, params)
    /*  .then((data) => {
        this.send(id, 'patch', data)
        return data
      }) */
  }

  receive (msg) {
    delete msg.data.service
    if (msg.data.request) {
      this[msg.data.request](msg)
    } else {
      this.patch(msg.data._id, msg.data)
        .catch((err) => {
          this.app.log(err)
        })
    }
  }

  send (userId, request, data, service) {
    if (service === undefined) {
      data.service = '/api/' + this.name
    } else {
      data.service = service
    }
    data.request = request

    this.app.service('/api/messages').send(userId, data)
  }
}

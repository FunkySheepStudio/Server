const ServiceClass = require('../../service.class')

exports.Service = class Service extends ServiceClass {
  setup (app) {
    app.log = this.log.bind(this)
    super.setup(app)
  }

  log (log) {
  /*  log.time = new Date().getTime()
    if (log.socket) {
      log.user = log.socket.userId
    }

    if (log.data) {
      log.type = log.data.type
    } else {
      log.type = 'Log'
    }

    if (log.type === 'Error') { //  || this.app.get('env') === 'development') {
      this.create(log)
        .catch((err) => {
          console.log(err)
        })
    } else {
      console.log(log.message)
    } */
  }
}

const ServiceClass = require('../network.service.class')

exports.Logger = class Logger extends ServiceClass {
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

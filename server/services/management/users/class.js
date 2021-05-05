const ServiceClass = require('../../service.class')

exports.Users = class Users extends ServiceClass {
  setup (app) {
    this.patch(null, { online: false }, { query: { online: true } })
    this.patch(null, { game: '' }, { query: { game: { $ne: null } } })
    this.patch(null, { request: '' }, { query: { request: { $ne: null } } })
    app.on('login', this.onConnect.bind(this))
    app.on('disconnect', this.onDisconnect.bind(this))

    super.setup(app)
  }

  //  On user connection
  onConnect (authResult) {
    //  this.setOnline(authResult.user)
  }

  //  On user diconnection
  onDisconnect (connection) {
    if (connection.user) {
      this.setOffline(connection.user._id)
    } else {
      return false
    }
  }
}

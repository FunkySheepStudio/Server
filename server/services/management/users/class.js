const ServiceClass = require('../../service.class')

exports.Users = class Users extends ServiceClass {
  setup (app) {
    //  Create the admin user
    this.exist('admin')
      .then((exist) => {
        if (!exist) {
          this.create({
            _id: 'admin',
            password: 'admin',
          })
        }
      })
    
    this.patch(null, { online: false }, { query: { online: true } })
    app.on('login', this.onConnect.bind(this))
    app.on('disconnect', this.onDisconnect.bind(this))

    super.setup(app)
  }

  //  On user connection
  onConnect (authResult) {
    this.app.service('/api/management/connections').create({
      _id: authResult.accessToken,
      startedAt: Date.now(),
      user: authResult.user._id,
      type: 'web'
    })
  }

  //  On user diconnection
  onDisconnect (connection) {
    console.log(connection)
    if (connection.authentication && connection.authentication.accessToken) {
      this.app.service('/api/management/connections').remove(connection.authentication.accessToken)
    }
  }
}

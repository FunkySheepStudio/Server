const ServiceClass = require('../../service.class')

exports.Users = class Users extends ServiceClass {
  setup (app) {
    //  Create the admin user
    this.exist('admin')
      .then((exist) => {
        if (!exist) {
          this.create({
            login: 'admin',
            password: 'admin'
          })
        }
      })

    this.patch(null, { online: false }, { query: { online: true } })
    app.on('connection', this.onConnect.bind(this))
    app.on('login', this.onLogin.bind(this))
    app.on('disconnect', this.onDisconnect.bind(this))

    super.setup(app)
  }

  // On connection
  onConnect (connection) {
    this.app.service('/api/management/connections').create({
      _id: connection.headers['sec-websocket-key'],
      startedAt: Date.now(),
      type: 'web'
    })
  }

  //  On user connection
  onLogin (authResult, { connection }) {
    this.app.service('/api/management/connections').patch(
      connection.headers['sec-websocket-key'],
      {
        user: authResult.user._id
      }
    )
  }

  //  On user diconnection
  onDisconnect (connection) {
    this.app.service('/api/management/connections').remove(connection.headers['sec-websocket-key'])
  }
}

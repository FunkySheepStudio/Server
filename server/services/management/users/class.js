const ServiceClass = require('../../service.class')

exports.Users = class Users extends ServiceClass {
  setup (app) {
    //  Create the admin user
    this.find({
      query: {
        login: 'admin'
      }
    })
      .then((record) => {
        if (record.total === 0) {
          this.create({
            login: 'admin',
            password: 'admin'
          })
        }
      })
      .catch((err) => {
        this.app.log(err, true)
      })

    this.patch(null, { online: false }, { query: { online: true } })
    
    app.on('login', this.onLogin.bind(this))
    app.on('logout', this.onLogout.bind(this))

    super.setup(app)
  }

  //  On user login
  onLogin (authResult, { connection }) {
    this.app.service('/api/management/connections').patch(
      connection.headers['sec-websocket-key'],
      {
        user: authResult.user._id
      }
    )
  }

  //  On user logout
  onLogout (authResult, { connection }) {
    this.app.service('/api/management/connections').patch(
      connection.headers['sec-websocket-key'],
      {
        user: ''
      }
    )
  }
}

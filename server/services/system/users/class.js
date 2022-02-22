const ServiceClass = require('../../service.class')

exports.Service = class Service extends ServiceClass {
  setup (app) {
    //  Create the admin user
    this.find({
      query: {
        login: 'admin'
      },
      socket: 'system'
    })
    .then((record) => {
      if (record.total === 0) {
        this.create({
          login: 'admin',
          password: 'admin'
        },
        {
          socket: 'system'
        }
        )
        .catch((err) => {
          console.log(err)
        })
      }
    })
    .catch((err) => {
      this.app.log(err, true)
    })

    this.patch(null, { online: false },
      {
        query: { online: true },
        socket: 'system'
      })
      .catch((err) => {
        console.log(err)
      })
    
    app.on('login', this.onLogin.bind(this))
    app.on('logout', this.onLogout.bind(this))

    super.setup(app)
  }

  //  On user login
  onLogin (authResult, { connection }) {}

  //  On user logout
  onLogout (authResult, { connection }) {
    this.app.service('/api/system/connections').patch(
      connection.headers['sec-websocket-key'],
      {
        user: ''
      },
      {socket: 'system'}
    )
  }
}

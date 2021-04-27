const ServiceClass = require('../network.service.class')

exports.Users = class Users extends ServiceClass {
  setup (app) {
    this.patch(null, { online: false }, { query: { online: true } })
    this.patch(null, { game: '' }, { query: { game: { $ne: null } } })
    this.patch(null, { request: '' }, { query: { request: { $ne: null } } })
    app.on('login', this.onConnect.bind(this))
    app.on('disconnect', this.onDisconnect.bind(this))

    super.setup(app)
  }

  setOffline (userId) {
    this.patch(
      userId,
      { online: false }
    )
      .then((result) => {
        this.app.service('/api/lobby').quit(userId)
        if (result.game !== undefined) {
          this.app.service('/api/games').quit(result.game, userId)
        }
      })
      .catch((err) => {
        this.app.log(err)
      })
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

  setId (msg) {
    msg.socket.userId = msg.data._id
    this.exist(msg.data._id)
      .then((exist) => {
        if (exist) {
          this.patch(msg.data._id, msg.data)
        } else {
          msg.data.nickname = ''
          this.create(msg.data)
        }
      })
  }

  setGame (id, gameId) {
    this.patch(id,
      {
        _id: id,
        game: gameId
      })
      .catch((err) => {
        this.app.log(err)
      })
  }

  unsetGame (id) {
    this.patch(id,
      {
        _id: id,
        game: ''
      })
      .catch((err) => {
        this.app.log(err)
      })
  }
}

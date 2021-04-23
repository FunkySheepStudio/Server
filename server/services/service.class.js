const { Service } = require('feathers-nedb')

module.exports = class ServiceClass extends Service {
  constructor (options, app) {
    super(options, app)
    this.name = this.constructor.name.toLowerCase()
  }

  setup (app) {
    this.app = app
    this.started()
  }

  // Service started event
  started () {
    this.emit('started', this.name)
  }

  // Service stopped event
  stopped () {
    this.emit('stopped', this.name)
  }

  //  Check if the record exist
  exist (_id) {
    return this.find({
      query: {
        _id
      }
    })
      .then((record) => {
        if (record.total === 0) {
          return false
        } else {
          return true
        }
      })
      .catch((err) => {
        this.app.log(err, true)
      })
  }
}

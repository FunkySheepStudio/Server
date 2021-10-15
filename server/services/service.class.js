const { Service } = require('feathers-nedb')
const errors = require('@feathersjs/errors')

module.exports = class ServiceClass extends Service {
  constructor (options, app) {
    super(options, app)
    this._id = options._id

    if (this._id !== "/api/system/services") {
      app.service('/api/system/services').register(this)
    } else {
      this.register(this)
    }
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

  create(data, params) {
    return this.exist(data._id)
      .then(exist => {
          if (!exist) {
            return super.create(data, params)
          } else {
            return super.patch(data._id, data, params)
          }
      })
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

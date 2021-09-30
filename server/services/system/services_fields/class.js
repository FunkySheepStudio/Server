const ServiceClass = require('../../service.class')
const errors = require('@feathersjs/errors')

exports.Service = class Service extends ServiceClass {
    register(service, field) {
        this.create({
            service,
            field
        })
    }

    create(data, params) {
        return this.find({
            service: data.service,
            field: data.field
        })
            .then(data => {
                if (data.count > 0) {
                    return errors.GeneralError('The record with _id ${data._id} allready exist')
                } else {
                    return super.create(data, params)
                }
            })
      }
}

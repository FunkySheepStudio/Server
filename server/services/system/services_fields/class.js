const ServiceClass = require('../../service.class')
const errors = require('@feathersjs/errors')
const system = require('..')

exports.Service = class Service extends ServiceClass {
    register(service, field) {
        this.create({
            service,
            field
        },
        {
            socket: 'system'
        }
        )
    }

    create(data, params) {
        return this.find({
            query: {
                service: data.service,
                field: data.field
            },
            socket: 'system'
        })
            .then(data => {
                if (data.count > 0) {
                    return errors.GeneralError('The record with _id ${data._id} allready exist')
                } else {
                    params.socket = 'system'
                    return super.create(data, params)
                }
            })
      }
}

const ServiceClass = require('../../service.class')

exports.Service = class Service extends ServiceClass {
    register(service) {
        this.create({
            _id: service._id
        })
    }
}

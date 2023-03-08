module.exports = class Services {
    constructor(name, services) {
        this.name = name
        this.services = services
        this.config = require('./' + this.name + '/config.json')
    }

    Start()
    {
        console.log('Starting: ' + this.name)
    }
}
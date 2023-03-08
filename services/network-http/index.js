const Service = require('../service');
const http = require("http");

module.exports = class NetworkHttp extends Service
{
    constructor(name, services)
    {
        super(name, services)
        this.server = http.createServer((req, res) => {
            this.services.LoadClientFile(req, res)
        })

        this.Start()
    }

    Start()
    {
        super.Start()
        this.server.listen(this.config.port);
    }
}
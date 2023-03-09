const fs = require('fs');
var path = require('path');
var events = require('events');

module.exports = class Services {
    config = require('./config.json')
    eventEmitter = new events.EventEmitter();

    constructor() {
      this.all = []
      this.config.services.forEach(name => {
        this.Register(name)
      });
    }

    Register(name)
    {
        const Service = require('./' + name);
        var service = new Service(name, this)
        this.all.push(service)
    }

    Get(name)
    {
      return this.all.find((service) => service.name === name)
    }

    LoadClientFile(req, res)
    {
      var splitedUrl = req.url.split('/')
      splitedUrl.shift()
      if (splitedUrl.length === 1)
      {
        if (splitedUrl[0] === '')
        {
          splitedUrl.push('index.html')
        } else {
          splitedUrl.push(splitedUrl[0])
        }
        splitedUrl[0] = 'network-http'
      }
      var filepath = path.join(__dirname, splitedUrl[0], 'client', splitedUrl[1]);
      
      fs.readFile(filepath, (err, data) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end('404: File not found');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data);
        }
      })
    }

    DispatchMessage(message)
    {
      let service = this.Get(message.service)
      if (service)
      {
        service.ExecuteMessage(message)
      }
    }
};

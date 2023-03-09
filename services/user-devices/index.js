const Service = require('../service');

module.exports = class UserDevices extends Service
{
  devices = []
  constructor(name, services)
  {
    super(name, services)
    super.Start()
  }
}
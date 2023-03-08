const Service = require('../service');

module.exports = class UserAuth extends Service
{
  constructor(name, services)
    {
      super(name, services)
      super.Start()
    }
}
const Service = require('../service');

module.exports = class Users extends Service
{
  users = []
  constructor(name, services)
  {
    super(name, services)
    super.Start()
  }

  Get(id)
  {

  }
}
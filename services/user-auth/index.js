const Service = require('../service');

module.exports = class UserAuth extends Service
{
  constructor(name, services)
  {
    super(name, services)
    super.Start()
  }

  AddAuthKey(message)
  {
    console.log(message)
  }
}
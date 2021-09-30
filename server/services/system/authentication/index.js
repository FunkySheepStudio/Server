const path = require('path');
const slash = require('slash');
const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication')
const { LocalStrategy } = require('@feathersjs/authentication-local')
//  const { expressOauth } = require('@feathersjs/authentication-oauth')
const hooks = require('./hooks')

module.exports = (app) => {
  const api = slash(path.relative(process.cwd(), __dirname)).replace('server/services', '/api');
  const authentication = new AuthenticationService(app)
  
  authentication.register('jwt', new JWTStrategy())
  authentication.register('local', new LocalStrategy())

  app.use(api, authentication)
  //  app.configure(expressOauth())

  const service = app.service(api)

  service.hooks(hooks)
  //  Since the classe used for the service is custom auth, we register the service manually
  service._id = api
  app.service('/api/system/services').register(service)
}

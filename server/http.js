const http = require('http')

module.exports = (app) => {
  const server = http.createServer(app).listen(3002)

  app.setup(server)
}

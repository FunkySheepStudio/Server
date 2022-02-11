const http = require('http')
const WebSocket = require('ws')
const consola = require('consola')

module.exports = (app) => {
  const gameServer = http.createServer().listen(app.get('wsport'), '0.0.0.0')

  app.gameServer = new WebSocket.Server({
    server: gameServer
  })

  const server = http.createServer(app).listen(app.get('port'), '0.0.0.0')
  app.setup(server)

  consola.ready({
    message: `Feathers http application started on ${app.host}:${app.get('port')}`,
    badge: true
  })
}

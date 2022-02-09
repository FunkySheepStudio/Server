const https = require('https')
const WebSocket = require('ws')
const consola = require('consola')
const certif = require('./certif')

module.exports = (app) => {
  app.configure(certif)

  const credentials = {
    key: app.certificate.private, cert: app.certificate.cert
  }

  const gameServer = https.createServer(credentials).listen(5000, '0.0.0.0')

  app.gameServer = new WebSocket.Server({
    server: gameServer
  })

  const server = https.createServer(credentials, app).listen(app.get('port'), '0.0.0.0')
  app.setup(server)

  consola.ready({
    message: `Feathers https application started on ${app.host}:${app.get('port')}`,
    badge: true
  })
}

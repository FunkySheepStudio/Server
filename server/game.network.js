const https = require('https')
const WebSocket = require('ws')

module.exports = (app) => {
  const credentials = {
    key: app.certificate.private, cert: app.certificate.cert
  }

  const server = https.createServer(credentials).listen(8081)

  app.gameServer = new WebSocket.Server({
    server
  })
}

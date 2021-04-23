'use strict'
const path = require('path')
const https = require('https')
const consola = require('consola')
const feathers = require('@feathersjs/feathers')
const socketio = require('@feathersjs/socketio')
const express = require('@feathersjs/express')
const configuration = require('@feathersjs/configuration')

const middleware = require('./middleware')
const services = require('./services')
const channels = require('./channels')
const gameNetwork = require('./game.network')
const certif = require('./certif')
//  const http = require('./http')

process.env.NODE_CONFIG_DIR = path.join(__dirname, 'config/')

exports.start = function start () {
  const app = express(feathers())
  app.configure(socketio())

  // Parse HTTP JSON bodies
  app.use(express.json())
  // Parse URL-encoded params
  app.use(express.urlencoded({ extended: true }))
  // Add REST API support
  app.configure(express.rest())

  app.configure(configuration())
  const env = process.env.NODE_ENV || 'production'
  app.set('env', env)
  app.set('homePath', path.join(require('os').homedir(), '.protfolio-game-server', app.get('env')))

  app.configure(services)
  app.configure(channels)
  app.configure(gameNetwork)
  app.hooks(require('./app.hooks'))
  app.configure(middleware)
  app.configure(certif)
  //  app.configure(http)

  const host = app.get('host')
  const port = app.get('port')
  const credentials = {
    key: app.certificate.private, cert: app.certificate.cert
  }

  const server = https.createServer(credentials, app).listen(port)

  app.setup(server)

  consola.ready({
    message: `Feathers application started on ${host}:${port}`,
    badge: true
  })
}

this.start()

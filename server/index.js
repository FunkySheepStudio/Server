'use strict'
const path = require('path')
const feathers = require('@feathersjs/feathers')
const socketio = require('@feathersjs/socketio')
const express = require('@feathersjs/express')
const configuration = require('@feathersjs/configuration')

const middleware = require('./middleware')
const services = require('./services')
const channels = require('./channels')

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
  app.set('homePath', path.join(require('os').homedir(), '.funky-sheep-server', app.get('env')))

  app.configure(services)
  app.configure(channels)
  app.hooks(require('./app.hooks'))
  app.configure(middleware)

  app.host = app.get('host')

  if (env === 'production') {
    const https = require('./https')
    app.configure(https)
  } else {
    const http = require('./http')
    app.configure(http)
  }
}

this.start()

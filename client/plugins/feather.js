import feathers from '@feathersjs/feathers'
import auth from '@feathersjs/authentication-client'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'
import feathersVuex from 'feathers-vuex'

// Setup the Feathers client
const socket = io(process.env.localApiURL, { transports: ['websocket'] })
const feathersClient = feathers()
  .configure(socketio(socket))
  .configure(auth({
    storage: window.localStorage,
    path: '/api/system/authentication'
  }))

// Setup feathers-vuex
const {
  makeServicePlugin,
  makeAuthPlugin,
  BaseModel,
  models,
  clients,
  FeathersVuex
} = feathersVuex(feathersClient)

//  Set user and password in the browser if they does not exist
/*  if (!localStorage.getItem('user')) {
  localStorage.setItem('user', Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))
}
const user = localStorage.getItem('user')

if (!localStorage.getItem('password')) {
  localStorage.setItem('password', Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))
}
const password = localStorage.getItem('password')

// Authenticate
socket.on('connect', (socket) => {
  const credentials = {
    _id: user,
    password
  }

  feathersClient.service('/api/system/users').create(credentials)
    .then(() => {
      //  feathersClient.authenticate({ ...credentials, strategy: 'local' })
      //  feathersClient.service('/api/system/authentication').create({ ...credentials, strategy: 'local' })
    })
    .catch(() => {
      //  feathersClient.authenticate({ ...credentials, strategy: 'local' })
      //  feathersClient.service('/api/system/authentication').create({ ...credentials, strategy: 'local' })
    })
})  */

export {
  feathersClient,
  makeAuthPlugin,
  makeServicePlugin,
  BaseModel,
  models,
  clients,
  FeathersVuex
}

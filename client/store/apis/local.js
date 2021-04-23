import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'
import feathersVuex from 'feathers-vuex'

// Setup the Feathers client
const socket = io(process.env.localApiURL, { transports: ['websocket'] })
const feathersClient = feathers()
  .configure(socketio(socket))

export default feathersClient

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
if (!localStorage.getItem('user')) {
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

  feathersClient.service('/api/users').create(credentials)
    .then(() => {
      feathersClient.service('/api/authentication').create({ ...credentials, strategy: 'local' })
    })
    .catch(() => {
      feathersClient.service('/api/authentication').create({ ...credentials, strategy: 'local' })
    })
})

export {
  makeAuthPlugin,
  makeServicePlugin,
  BaseModel,
  models,
  clients,
  FeathersVuex
}

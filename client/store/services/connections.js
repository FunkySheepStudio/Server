import {
  feathersClient,
  makeServicePlugin,
  BaseModel
} from '../../plugins/feather'

const serviceName = '/api/system/connections'

// Extend the base class
class Model extends BaseModel {
  static modelName = serviceName
}

const servicePlugin = makeServicePlugin({
  Model,
  service: feathersClient.service(serviceName),
  serviceName,
  namespace: serviceName
})

// Optionally add service-level hooks, here:
feathersClient.service(serviceName).hooks({
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
})

export default servicePlugin

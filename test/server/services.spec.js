const NeDB = require('nedb')
const Service = require('../../server/services/service.class.js')

it('Class is defined', () => {
  expect(Service).not.toBeUndefined()
})

it('Instanciate', () => {
  const app = {
    service: jest.fn()
  }
  const options = {
    _id: 'ID',
    Model: new NeDB({
      inMemoryOnly: true
    })
  }

  const service = new Service(options, app)

  expect(service._id).toBe('ID')
})
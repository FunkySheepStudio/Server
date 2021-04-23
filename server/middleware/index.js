const { render } = require('./nuxt')

module.exports = function (app) {
  app.use((req, res, next) => {
    const accepts = req.accepts('html', 'json')
    if (accepts === 'json') {
      return next()
    }
    render(req, res, next)
  })
}

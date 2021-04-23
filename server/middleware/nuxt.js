const { Nuxt, Builder } = require('nuxt')
const nuxtConfig = require('../../nuxt.config')

nuxtConfig.dev = process.env.NODE_ENV !== 'production'

const nuxt = new Nuxt(nuxtConfig)

if (nuxtConfig.dev) {
  const builder = new Builder(nuxt)
  builder.build()
} else {
  nuxt.ready()
}

module.exports = nuxt

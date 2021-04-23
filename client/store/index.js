//  Feather services
const requireModule = require.context('./services', false, /.js$/)
const servicePlugins = requireModule
  .keys()
  .map(modulePath => requireModule(modulePath).default)

export const plugins = [
  ...servicePlugins
]

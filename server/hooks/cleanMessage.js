module.exports = (context) => {
  context.data = context.data.data
  delete context.data.service
  delete context.data.method
  return context
}

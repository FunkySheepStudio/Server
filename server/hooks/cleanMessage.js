module.exports = (context) => {
  if (context.data.data) {
    context.data = context.data.data
    delete context.data.service
    delete context.data.method
    return context
  }
}

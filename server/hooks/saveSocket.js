module.exports = (context) => {
  if (context.data && context.data.data) {
    context.data.data.socket = context.data.socket
  }
  return context
}

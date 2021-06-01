module.exports = (context) => {
  const message = {
    method: context.method,
    service: '/' + context.path
  }

  if (context.result && context.params) {
    switch (context.method) {
      case 'find':
        if (context.params.socket) {
          message.data = context.result
          context.app.service('/api/management/messages').sendToSocket(context.params.socket, message, context.params.socket)
        }
        break
      case 'get':
        if (context.params.socket) {
          message.data = context.result
          context.app.service('/api/management/messages').sendToSocket(context.params.socket, message, context.params.socket)
        }
        break
      default:
        message.data = context.data
        context.app.service('/api/management/messages').sendToUser(context.result._id, message, context.params.socket)
        break
    }
  }
}

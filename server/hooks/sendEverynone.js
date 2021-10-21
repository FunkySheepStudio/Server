module.exports = (context) => {
    const message = {
      method: context.method,
      service: '/' + context.path
    }
  
    if (context.result && context.params) {
      if (context.method === 'create' || context.method === 'update' || context.method === 'patch' || context.method === 'remove') {
        message.data = context.result
        context.app.service('/api/system/messages').sendToEveryone(message, context.params.socket)
      }
    }
  }
  
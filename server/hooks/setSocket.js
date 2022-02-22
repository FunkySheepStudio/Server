module.exports = (context) => {
    if (!context.params.socket)
    {
        
        if (context.params.connection)
        {
            context.params.socket = context.params.connection.headers['sec-websocket-key']
        }
    }

    if (!context.params.socket)
    {
        console.log('Service: ' + context.service._id)
        console.log('Method: ' + context.method)
        console.log(context.params)

    } else {
        console.log(context.params.socket)
        return context
    }
}
  
  
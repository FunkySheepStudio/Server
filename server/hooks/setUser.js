module.exports = (context) => {
    if (!context.params.user)
    {
        if (context.params.socket)
        {
            if (context.params.socket == 'system')
            {
                context.params.user = {
                    _id: 'system'
                }
            } else {
                try {
                    context.app.service('/api/system/connections').get(
                        context.params.socket,
                        {socket: 'system'}
                        )
                        .then((connection) => {
                            if (connection.user != '')
                            {
                                context.params.user = {
                                    _id: connection.user
                                }
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                    
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }
    
    console.log(context.params.user)

    return context
}
  
  
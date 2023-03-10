const Service = require('../service');
const http = require("http");

module.exports = class NetworkHttp extends Service
{
    constructor(name, services)
    {
        super(name, services)
        this.server = http.createServer((req, res) => {
            this.AddRequestParams(req, res)
            this.services.LoadClientFile(req, res)
        })

        this.Start()
    }

    Start()
    {
        super.Start()
        this.server.listen(this.config.port);
    }

    // Extract the request parameters from the URL
    AddRequestParams(req)
    {
      let q=req.url.split('?'),result={};
        if(q.length>=2){
            q[1].split('&').forEach((item)=>{
                 try {
                   result[item.split('=')[0]]=item.split('=')[1];
                 } catch (e) {
                   result[item.split('=')[0]]='';
                 }
            })
        }
      
      if (q.length > 1)
      {
        req.url = q[0]
      }

      req.params=result;
    }
}
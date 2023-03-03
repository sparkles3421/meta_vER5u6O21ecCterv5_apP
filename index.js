const thisVER = process.env.Latest;
var http = require('http');
var data = {
  "STATUS":200,
  "ERROR":"null"
}
http.createServer(function (req, res) {
    console.log(`Request to > root${req.url}`)
    if(req.url=="/")  {
      res.write(JSON.stringify(data, null, 3));
    } else {
      res.write(JSON.stringify({"STATUS":404,"ERROR":"Invalid path"},null,3));
    }
    if(process.env.Latest==thisVER){
      res.redirect(req.get('referer'));
    }
    res.end();
}).listen(process.env.PORT || 3000);

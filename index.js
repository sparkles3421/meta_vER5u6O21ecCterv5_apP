const thisVER = process.env.Latest;
var fs   = require('fs')
var http = require('http');
var data = {
  "STATUS":200,
  "ERROR":"null",
  "pi":{
    "STATUS":200,
    "ERROR":"null",
    "TYPE":"FUNCTION",
    "Value":Math.PI
  }
};
const commands = [
  ["PI","pi"]
];
http.createServer(function (req, res) {
    console.log(`Request to > root${req.url}`);
    var resid = 200;
    if(req.url=="/")  {
      res.setHeader('Content-Type', 'application/json')
      res.write(JSON.stringify(data, null, 3));
    } else if(req.url=="/client.js"){
      res.write(fs.readFileSync("client.js", "utf8"))
    } else {
      console.log(`No base url`);
      var found = false;
      var fdata = '';
      for(var tableIndexCMD=0;tableIndexCMD<commands.length;tableIndexCMD++){
        if(commands[tableIndexCMD][1]){
          if(commands[tableIndexCMD][1]==req.url.substring(2)){
            console.log(commands[tableIndexCMD][2]);
            data = commands[tableIndexCMD][2]
            found=true;
          }
        }
      }
      if(found){
        if(fdata){
          const responsef = null;
          const index = fdata.split('/');
          if(index.length==1){
            if(data[index[1]]){
              responsef = data[index[1]];
            }
          }
          if(index.length==2){
            if(data[index[1]][index[2]]){
              responsef = data[index[1]][index[2]];
            }
          }
          if(index.length==3){
            if(data[index[1]][index[2]][index[3]]){
              responsef = data[index[1]][index[2]][index[3]];
            }
          }
          if(index.length==4){
            if(data[index[1]][index[2]][index[3]][index[4]]){
              responsef = data[index[1]][index[2]][index[3]][index[4]];
            }
          }
          if(index.length==5){
            if(data[index[1]][index[2]][index[3]][index[4]][index[5]]){
              responsef = data[index[1]][index[2]][index[3]][index[4]][index[5]];
            }
          }
          res.write(responsef);
        }
      }else{
        res.setHeader('Content-Type', 'application/json')
        resid=404;
        res.write(JSON.stringify({"STATUS":404,"ERROR":"Invalid path"},null,3));
      }
    }
    res.statusCode = resid;
    res.end();
}).listen(process.env.PORT || 3000);

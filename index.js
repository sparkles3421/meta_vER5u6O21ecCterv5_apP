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
      var fdata = 'err';
      for(var tableIndexCMD=0;tableIndexCMD<commands.length;tableIndexCMD++){
        console.log(`check`);
        if(commands[tableIndexCMD][0]){
          console.log(req.url.substring(1));
          if(commands[tableIndexCMD][0]==req.url.substring(1)){
            console.log(commands[tableIndexCMD][2]);
            console.log(commands[tableIndexCMD][2]);
            fdata = commands[tableIndexCMD][2]
            found=true;
          }
        }
      }
      if(found){
        if(fdata){
          console.log(`scan responsef`);
          const responsef = null;
          const index = fdata.split('/');
          console.log(index);
          if(index.length==1){
            if(data[index[0]]){
              responsef = data[index[0]];
            }
          }
          if(index.length==2){
            if(data[index[0]][index[1]]){
              responsef = data[index[0]][index[1]];
            }
          }
          if(index.length==3){
            if(data[index[0]][index[1]][index[2]]){
              responsef = data[index[0]][index[1]][index[2]];
            }
          }
          if(index.length==4){
            if(data[index[0]][index[1]][index[2]][index[3]]){
              responsef = data[index[0]][index[1]][index[2]][index[3]];
            }
          }
          if(index.length==5){
            if(data[index[0]][index[1]][index[2]][index[3]][index[4]]){
              responsef = data[index[0]][index[1]][index[2]][index[3]][index[4]];
            }
          }
          console.log(`data:`+responsef);
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

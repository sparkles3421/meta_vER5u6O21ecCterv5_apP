var http = require('http');
const fetch = require('node-fetch');
var jsondata = [];

fetch("https://raw.githubusercontent.com/sparkles3421/meta_vER5u6O21ecCterv5_apP/main/data.json", {method:"Get"})
    .then(res => res.json())
    .then((dataget) => {
        jsondata = dataget;
    });

http.createServer(function (req, res) {
    console.log(`Request to > root ${req.url}!`)
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(JSON.stringify(jsondata, null, 3));
}).listen(process.env.PORT || 3000);

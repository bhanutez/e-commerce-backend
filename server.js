const http = require('http');
const fs = require('fs');
const PORT = 8080;

let respond = function(req, res) {
  const fileName = '.' + req.url + '.json';
  console.log(fileName);
  if (req.method == 'GET' && fs.existsSync(fileName)) {
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      res.setHeader('content-type', 'application/json');
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.statusCode = 200;
      res.write(data);
      res.end();
    });
  }
}

let requestHandler = function(req, res) {
  respond(req, res);
  return;
}

let server = http.createServer(requestHandler);
server.listen(PORT);
console.log(`listening at ${PORT}`);

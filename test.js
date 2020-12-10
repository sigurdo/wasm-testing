const wasm = require("webassembly");
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

// wasm.load("test.wasm").then(module => {
//     console.log("1 + 14 = " + module.exports.add(1, 14));
// });

http.createServer(function (req, res) {
  let q = url.parse(req.url, true);
  let filename = "." + q.pathname;
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }
    if (path.extname(filename) == ".html") {
        res.writeHead(200, {'Content-Type': 'text/html'});
    }
    else if (path.extname(filename) == ".wasm") {
        res.writeHead(200, {'Content-Type': 'application/wasm'})
    }
    else if (path.extname(filename) == ".js") {
        res.writeHead(200, {'Content-Type': 'text/javascript'})
    }
    res.write(data);
    return res.end();
  });
}).listen(8080);

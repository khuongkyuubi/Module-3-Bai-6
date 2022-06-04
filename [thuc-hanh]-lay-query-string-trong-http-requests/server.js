const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const server = http.createServer(function (req, res) {
    //get url and parse
   let parseUrl = url.parse(req.url, true);
  // sau khi parser sẽ nhận được 1 object chứa các thông tin của url

    // dùng property query để nhận lại được query parameter (là 1 object , nhưng k có protoype)
   let queryStringObject = parseUrl.query;

    res.end('Hello Node Js');
    console.log(queryStringObject);
})
//server start
server.listen(3000, function () {
    console.log("the server is listening on port 3000 now ");
})
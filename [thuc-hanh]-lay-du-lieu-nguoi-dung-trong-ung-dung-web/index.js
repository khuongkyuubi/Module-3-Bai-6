//dependence
let http = require('http');
let url = require('url');
let StringDecoder = require('string_decoder').StringDecoder;

let server = http.createServer(function (req, res) {
    let decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', function (data) {
        // decoder dùng để đọc data của request , decode data theo mã utf-8
        buffer += decoder.write(data);
    });
    req.on('end', function (end) {
        buffer += decoder.end();
        res.end('Hello Node Js');
        console.log(buffer);
    });
})
//server start
server.listen(3000, function () {
    console.log("the server is listening on port 3000 now ");
})

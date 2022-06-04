//dependence
let http = require('http');
let url = require('url');
let StringDecoder = require('string_decoder').StringDecoder;
//definer the handler
let handlers = {};

// add method to handle routes
//sample handlers
handlers.sample = function (data, callback) {
// call back
    callback(406, {'name': 'sample handle'})
};
//not found sample
handlers.notFound = function (data, callback) {
    callback(404);
};

//home
handlers.home = function (data, callback) {
// call back
    callback(200, 'home page');
};
//definer the request router
let router = {
    'sample': handlers.sample,
    'home': handlers.home,
}

let server = http.createServer(function (req, res) {
    //get url and parse
    let parseUrl = url.parse(req.url, true);
    // //get the path
    let path = parseUrl.pathname;

    // trim ra đoạn pathname ngay sau domain (ngăn cách bởi dấu //)
    // example http://localhost:3000/sample thì trim ra sample
    let trimPath = path.replace(/^\/+|\/+$/g, '');
    req.on('data', function (data) {
    });
    req.on('end', function (end) {
        let chosenHandler = (typeof (router[trimPath]) !== 'undefined') ? router[trimPath] : handlers.notFound;
        let data =
            {
                "trimPath": trimPath
            }
        ;
        chosenHandler(data, function (statusCode, payload) {
            statusCode = typeof (statusCode) == 'number' ? statusCode : 200;
            payload = typeof (payload) == 'object' ? payload : {};
            let payLoadString = JSON.stringify(payload);
            res.writeHead(statusCode)
            res.end(payLoadString);
            //log the request
            console.log("status " + statusCode + "payload" + payload);
        });
    });
})

//server start
server.listen(3000, function () {
    console.log("server running at localhost:3000 ");
})

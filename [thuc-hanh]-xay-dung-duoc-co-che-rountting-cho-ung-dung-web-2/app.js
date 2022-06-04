let http = require('http');
let url = require('url');
let fs = require('fs');

let handlers = {};
// products page
handlers.products = function (req, res) {
    fs.readFile('./view/products.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
};
// handlers.users page
handlers.users = function (req, res) {
    fs.readFile('./view/users.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
};

// not found
handlers.notFound = function (req, res) {
    fs.readFile('./view/notfound.html', function(err, data) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
};

//definer the request router
let router = {
    'users': handlers.users,
    'products': handlers.products
}

let server = http.createServer(function (req, res) {
    //get url and parse
    let parseUrl = url.parse(req.url, true);
    // //get the path
    let path = parseUrl.pathname;
    let trimPath = path.replace(/^\/+|\/+$/g, '');
    let chosenHandler = (typeof (router[trimPath]) !== 'undefined') ? router[trimPath] : handlers.notFound;
    chosenHandler(req, res);
});

server.listen(3000, function () {
    console.log('server running at localhost:3000 ')
});

const http = require('http');
const fs = require('fs');
const qs = require('qs');
const port = 5000;

const server = http.createServer((req, res) => {
    if (req.method === "GET") {
        fs.readFile("./views/calc.html", (err, data) => {
            if (err) console.log(err.message);
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(data);
            return res.end();
        })
    } else {
        let data = "";
        req.on("data", (chunk) => {
            data += chunk;
        });


        req.on("end", () => {
            const calcData = qs.parse(data);
            let result = 0;
            if (isNaN(calcData.number1) || isNaN(calcData.number1)) {
                result = "input invaild"
            } else {
                switch (calcData.calc) {
                    case "sum":
                        result = (+calcData.number1) + (+calcData.number2);
                        break;
                    case "sub":
                        result = (+calcData.number1) - (+calcData.number2);
                        break;
                    case "multi":
                        result = (+calcData.number1) * (+calcData.number2);
                        break;
                    case "div":
                        try {
                            result = (+calcData.number1) / (+calcData.number2);
                        } catch (err) {
                            result = err.message;
                        }
                        break;
                    case "mod":
                        try {
                            result = (+calcData.number1) % (+calcData.number2);
                        } catch (err) {
                            result = err.message;
                        }
                        break;
                }
            }
            fs.readFile("./views/result.html", "utf-8", (err, dataHtml) => {
                if (err) {
                    console.log(err)
                }
                dataHtml = dataHtml.replace("{number1}", calcData.number1);
                dataHtml = dataHtml.replace("{number2}", calcData.number2);
                dataHtml = dataHtml.replace("{result}", result.toString());
                dataHtml = dataHtml.replace(`{${calcData.calc}}`, "selected");
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(dataHtml)
                return res.end();
            })
        })
    }
    req.on("error", (err) => {
        console.log(err)
    })
})

server.listen(port, () => {
    console.log('server running at port http://localhost:' + port)
})
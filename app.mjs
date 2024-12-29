import * as http from "http"; // node.js 標準で装備しているhttp(簡易的なサーバーを立ち上げる)

const server = http.createServer(function (req, res) {
    console.log(req.url);
    res.end("hello");
});

server.listen(8080);
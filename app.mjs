import * as http from "http"; // node.js 標準で装備しているhttp(簡易的なサーバーを立ち上げる)
import express from "express";

const PORT = 8080;
const app = express(PORT);

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send(`
        <a href="/result?param1=1">Get Method Link</a>
        <form action="/result" method="POST">
        <input type="text" name="title">
        </form>`)
})

app.get("/result", (req, res) => {
    const params = req.query;
    console.log(params);
    res.send({ message: "hello" });
})

app.post("/result", (req, res) => {
    const params = req.body;
    console.log(params);
    res.send(`get end`);
})

app.listen(PORT, () => {
    console.log(`Server Start: http://localhost:${PORT}`);
});

// const server = http.createServer(function (req, res) {
//     console.log(req.url);
//     res.end("hello");
// });

// server.listen(8080);
const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const app = express()
//we are configuring dist to serve site files
app.use('/', serveStatic(path.join(__dirname, '/docs')))
// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
    res.sendFile(path.join(__dirname, '/docs/index.html'))
})
const port = process.env.PORT || 8080
app.listen(port)
console.log(`site is listening on port: ${port}`)

// const jsonServer = require("json-server");
// const path = require("path");

// const server = jsonServer.create();
// const router = jsonServer.router("./db.json");
// const middlewares = jsonServer.defaults({
//     static: "./docs",
// });

// const port = process.env.PORT || 9000

// server.use(middlewares);

// server.use(jsonServer.bodyParser);
// server.use(router);
// server.listen(port, () => {
//     console.log('JSON Server is running');
// });
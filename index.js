// const express = require('express')
// const serveStatic = require('serve-static')
// const path = require('path')
// const app = express()
// //we are configuring dist to serve site files
// app.use('/', serveStatic(path.join(__dirname, 'docs')))
// // this * route is to serve project on different page routes except root `/`
// app.get(/.*/, function (req, res) {
//     res.sendFile(path.join(__dirname, 'docs/index.html'))
// })
// const port = process.env.PORT || 9000
// app.listen(port)
// console.log(`site is listening on port: ${port}`)

const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router("./db.json");
const middlewares = jsonServer.defaults({
    static: "./docs",
});

const port = process.env.PORT || 9000

server.use(middlewares);

server.use(jsonServer.bodyParser);
server.use(router);
server.listen(port, () => {
    console.log('JSON Server is running');
});

// db.json를 조작하기 위해 lowdb를 사용
// const low = require('lowdb');
// const FileSync = require('lowdb/adapters/FileSync');
// const adapter = new FileSync('db.json');
// const db = low(adapter);

// // Set default middlewares (logger, static, cors and no-cache)

// Add custom routes before JSON Server router
// server.delete('/todos/completed', (req, res) => {
//     // lowdb를 사용해서 db.json에서 completed: true인 todo를 제거
//     db.get('todos')
//         .remove({
//             completed: true
//         })
//         .write();

//     // todos를 응답
//     res.send(db.get('todos').value());
// })

// Use default router
// server.use(router);

// server.listen(port, () => {
//     console.log('JSON Server is running')
// });
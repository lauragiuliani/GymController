const express = require('express')
const nunjucks = require('nunjucks')
const routes = require("./controller/routes")

const server = express()

server.use(express.urlencoded({extended:true}))
server.use(routes)
server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server, 
    autoescape: false,
    noCache: true
})

server.listen("5000", function() {
    console.log("server is running")
 })
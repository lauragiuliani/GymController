const express = require('express')
const routes = express.Router()
const instructors = require('../instructors')

routes.get('/', function(req, res) { return res.redirect("/instructors") })

//PAGE INSTRUCTORS
routes.get('/instructors', function(req, res) { return res.render("instructors/instructorsPage") })
routes.post("/instructors", instructors.post)

//PAGE CREATE
routes.get('/instructors/create', function(req, res) { return res.render("instructors/create") })

//PAGE ID
routes.get('/instructors/:id', instructors.show)
routes.get('/instructors/:id/edit', function(req , res) { return res.render('instructors/edit') })

//PAGE MEMBERS
routes.get('/members', function(req, res) { return res.send("members") })

//EXPORTS
module.exports = routes
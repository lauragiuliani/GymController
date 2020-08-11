const express = require('express')
const routes = express.Router()
const instructors = require('../instructors')

routes.get('/', function(req, res) { return res.redirect("/instructors") })

//PAGE INSTRUCTORS
routes.get('/instructors', instructors.index)
routes.post("/instructors", instructors.post)
routes.put('/instructors', instructors.put)
routes.delete('/instructors', instructors.delete)

//PAGE CREATE
routes.get('/instructors/create', function(req, res) { return res.render("instructors/create") })

//PAGE ID
routes.get('/instructors/:id', instructors.show)

//PAGE EDIT
routes.get('/instructors/:id/edit', instructors.edit)

//PAGE MEMBERS
routes.get('/members', function(req, res) { return res.send('members') })

//EXPORTS
module.exports = routes
const fs = require('fs') //file system
const data = require('../data.json')
const { age, date } = require('../utils')
const Intl = require('intl')


exports.index = function (req, res) {
    return res.render('instructors/instructorsPage', { instructors: data.instructors } )
}
//SHOW
exports.show = function (req, res) { //gerar link com o ID dos instrutores cadastrados
    const { id } = req.params

    const foundInstructor = data.instructors.find(function(instructor){  //Dados do instrutor
        return instructor.id == id
    })
    
    if (!foundInstructor) return res.send ("Instructor not found") //Caso não ache o ID

    const instructor = {
        ...foundInstructor, //espalhar o resto dos dados, e o que está sendo espalhado irá sobrescrever 
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(','),  //split: pega string e transforma em um array e onde estiver uma vírgula, ele irá criar uma nova posição no array
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at)
    } //correção de dados

    return res.render('instructors/show', { instructor } ) //Enviar dados
}
exports.create = function(req, res) { return res.render("instructors/create") }
//CREATE
exports.post = function(req, res) {
    const keys = Object.keys(req.body)
    for (key of keys) {
        if (req.body[key] == "")
            return res.send('Please, fill all fields!')
    }

    let {avatar_url, birth, name, services, gender} = req.body //dados vindos da req.body(form)

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.instructors.length + 1)

    data.instructors.push({
        id,
        created_at,
        avatar_url,
        name,
        birth,
        gender,
        services,   
    }) //adicionar coisas em um array (push)

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send('Write file error')

        return res.redirect('/instructors')
    })
}
//EDIT
exports.edit = function(req, res) {
    const { id } = req.params

    const foundInstructor = data.instructors.find(function(instructor){  //Dados do instrutor
        return instructor.id == id
    })

    if (!foundInstructor) return res.send ("Instructor not found")

    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth).iso
    }

    return res.render('instructors/edit', { instructor })
}
//UPDATE
exports.put = function(req, res) {
    const { id } = req.body
    let index = 0

    const foundInstructor = data.instructors.find(function(instructor, foundIndex){  //Dados do instrutor
        if (id == instructor.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundInstructor) return res.send ("Instructor not found") 

    const instrcutor = { 
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.instructors[index] = instructor

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write error")

        return res.redirect(`/instructors/${id}`)
    })

}
//DELETE
exports.delete = function(req, res) {
    const { id } = req.body

    const filteredInstructors = data.instructors.filter(function(instructor) {
        return instructor.id != id 
    })

    data.instructors = filteredInstructors

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send('Write file error!')

        return res.redirect('/instructors')
    })
}

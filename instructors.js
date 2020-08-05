const fs = require('fs') //file system
const data = require('./data.json')
const { age } = require('./utils')
const Intl = require('intl')

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
//POST
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


//UPDATE

//DELETE

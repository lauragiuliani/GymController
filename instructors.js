const fs = require('fs') //file system
const data = require('./data.json')

//SHOW
exports.show = function (req, res) {
    
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

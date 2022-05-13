const mysql = require('mysql2')
const express = require('express')
const routes = express.Router()


//config conexao
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "desafio-dev-jr-pl"
});



//gets
routes.get('/graph/:id', (req, res) => {
    const id = String(req.params.id)
    con.query('select * from graphs where id = ?', [id], (err, result) => {
        if (result.length == 0) {
            return res.send('Grafo não encontrado')
        }
        else {
         return res.json(result)
        }
    })
})

routes.get('/graph', (req, res) => {
    con.query('select * from graphs', (err, result) => {
        return res.json(result)
    })
})

//posts
routes.post('/graph', (req, res) => {
    const {
        source, target, distance
    } = req.body
    if(distance == 0) { res.send('Distancia = 0 não permitido')}
    else {
    con.query('INSERT INTO graphs(source,target,distance) values (?,?,?)', [source, target, distance], (err, result) => {
        res.send('Grafo gravado com sucesso'+result)
    })
    }

})

//delete
routes.delete('/graph/delete/:id', (req, res) => {
    const id = String(req.params.id)

        con.query('delete from graphs where id = ?', [id], (err, result) => {
           if(result.affectedRows == 00) {
               res.send('Grafo de ID: '+id+' não deletado pois não foi localizado no banco')
           }
           else{
            return res.send('Grafo de ID: ' + id + ' deletado com sucesso')
           }
    })

})


//rota nao encontrada
routes.use(function(req, res) {
    res.status(404).send("Esta página não existe");
});

module.exports = routes
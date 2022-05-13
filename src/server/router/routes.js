const mysql = require('mysql2')
const express = require('express')
const routes = express.Router()


//criar separado as funcoes em outro arquivo
const checkDuplicate = (obj, source, target) => {
    let duplicate = false
    Object.entries(obj).forEach(([key, val]) => {
        if (val.source == source.toUpperCase() && val.target == target.toUpperCase()) {
            duplicate = true
            return
        }
    })
    return duplicate
}

const calcSimpleDistance = (obj, source, target) => {
    let totalDistance
    source = source.toUpperCase()
    target = target.toUpperCase()
    Object.entries(obj).forEach(([key, val]) => {
        if (val.source == source && val.target == target) {
            totalDistance = val.distance

        }
    })
    return totalDistance
}

const calcMultipleDistance = (obj, source, target) => {
    let noAnterior
    let distAnterior
    let totalDistance = []
    Object.entries(obj).forEach(([key, val]) => {
        if (val.target == target) {
            noAnterior = val.source
            distAnterior = Number(val.distance)
            Object.entries(obj).forEach(([key, valor]) => {
                if (valor.source == source && valor.target == noAnterior) {

                    totalDistance = [{
                        "distance": distAnterior + valor.distance,
                        path: [source, noAnterior, target]
                    }]
                } else {
                    return false
                }
            })
        }
    })

    return totalDistance
}


//config conexao
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "desafio-dev-jr-pl-graphs"
});

//remover caracteres especiais do json
const removeBackSlashes = json => JSON
    .parse(JSON.stringify(json)
        .replace(/[\\]/g, '')
        .replaceAll('"[', '[')
        .replaceAll(']"', "]"))


//posts
routes.post('/graph/', (req, res) => {
    const {
        source,
        target,
        distance,
        graphId
    } = req.body
    const select = 'select id,data from graphs where id = ?'
    if (distance == 0) {
        res.send('Distancia = 0 não permitido')
    } else {

        con.query(select, [graphId], (err, result) => {
            let json = removeBackSlashes(result)[0].data
            if (json.length == 0) json = []
            if (checkDuplicate(json, source, target, graphId)) {
                return res.send('Rota já cadastrada')
            } else {
                json.push({
                    source: source,
                    target: target,
                    distance: Number(distance)
                })
                // console.log(json)
                con.query('update graphs set data = ? where id = ?', [JSON.stringify(json), graphId], (err, result) => {
                    return res.send('Grafo gravado com sucesso')
                })
            }

        })
    }
})

routes.post('/routes/:graphId/from/:source/to/:target', (req, res) => {

    const graphId = req.params.graphId
    const source = req.params.source.toUpperCase()
    const target = req.params.target.toUpperCase()
    const select = 'select id,data from graphs where id = ?'
    let json = ''
    con.query(select, [graphId], (err, result) => {

        json = removeBackSlashes(result)[0].data
        // console.log(json)
        let totalDistance = calcSimpleDistance(json, source, target)
        if (totalDistance == 0 || totalDistance == undefined) {
            totalDistance = calcMultipleDistance(json, source, target)
            console.log(totalDistance)
            if (totalDistance.length == 0) return res.status(404).send("Esta rota não existe")
            return res.send(totalDistance)
        } 
        else{
            console.log(totalDistance)
            let route = {
                "distance": totalDistance,
                "path": [source, target]
            }
            // console.log(json)
            return res.json(route)
        }
    })
})

//gets
routes.get('/graph/:id', (req, res) => {
    const id = String(req.params.id)
    con.query('select id, data from graphs where id = ?', [id], (err, result) => {
        if (result.length == 0) {
            return res.send('Grafo não encontrado')
        } else {
            return res.json(removeBackSlashes(result))
        }
    })
})

routes.get('/graph/', (req, res) => {

    con.query('select id, data from graphs', (err, result) => {
        return res.send(removeBackSlashes(result))

    })
})

//delete
routes.delete('/graph/delete/:id', (req, res) => {
    const id = String(req.params.id)

    con.query('delete from graphs where id = ?', [id], (err, result) => {
        if (result.affectedRows == 00) {
            res.send('Grafo de ID: ' + id + ' não deletado pois não foi localizado no banco')
        } else {
            return res.send('Grafo de ID: ' + id + ' deletado com sucesso')
        }
    })

})


//rota nao encontrada
routes.use(function (req, res) {
    res.status(404).send("Esta página não existe")
});

module.exports = routes
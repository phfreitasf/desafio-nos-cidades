
const express = require('express')
const bodyparser = require('body-parser')
const routes = require('../router/routes')
const cors = require('cors')



var app = express()
app.use(express.json())
app.use(cors())
app.use(bodyparser.urlencoded({extended:false}))
app.use(routes)
app.listen(8081, () => console.log('Express server rodando na porta 8081'))

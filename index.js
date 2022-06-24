
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
var jsonParser = bodyParser.json()

const database = require("./db") 
const Users = require("./model/users")
const Agendas = require("./model/agendas")
const Salas = require("./model/salas")
// database.sync({force:true})
database.sync()


function verifyJwt(req, res, next){
const  jwtSecret = "clinaapi"
 const token = req.headers['x-access-token'];
 jwt.verify(token, jwtSecret , (err,decoded)=>{
     if(err) return res.status(401).end();

     res.userId = decoded.userId;
     next();
 })
}

app.get('/',verifyJwt,  function (req, res) {
  res.status(200).send("");
});

app.get('/salas/:id',verifyJwt,  async  function (req, res) {
  const sala = await Salas.findByPk(req.params.id)
  res.send(sala)
});

app.get('/salas', verifyJwt, async  function (req, res) {
  const dataQuery = req.query.date
  const dataSala = await Salas.findAll({
    where:{disponibilidade: dataQuery},
    raw:true
  })
  res.send(dataSala)
});

app.post('/auth',jsonParser, function(req, res){
  const jwtSecret = "clinaapi"
  if(req.body.nome === 'Timber' && req.body.senha === 27){
    const token =  jwt.sign({userId:1},jwtSecret,{expiresIn:3000} )
     return res.json({ token});
 }
 response.statu(401).end()

})

app.post('/agendas',jsonParser, verifyJwt, async function(req, res){
  const novaAgenda = await Agendas.create(req.body)
  res.send(novaAgenda)
})

app.get('/agendas/:id', verifyJwt, async function(req, res){
  const sala = await Agendas.findByPk(req.params.id)
  res.send(sala)
})

app.listen(3000, async function () {
  return "servidor rodando"
})


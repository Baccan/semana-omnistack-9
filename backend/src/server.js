const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const socketio = require('socket.io')
const http = require('http')

const routes = require('./routes')

const app = express()
const server = http.Server(app)
const io = socketio(server)
const port = 3333

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack9-pzby4.mongodb.net/semana09?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// Não realizar isso em produção
// Deve-se utilizar banco de dados como REDIS
const connectedUsers = {};

// socket = dados da conexão do usuário
io.on('connection', socket => {
  // query da conexão recebida
  console.log(socket.handshake.query)

  // socket.id = id da conexão
  console.log('Usuário conectado', socket.id)

  const { user_id } = socket.handshake.query

  // Array pois armazena no objecto como (connectedUsers{1234123412312412}) por exemplo
  // a ideia é armazenar o id do usuario (user_id) com o id da conexão
  connectedUsers[user_id] = socket.id;

  // Emitir
  // setTimeout(() => {
  //   socket.emit('hello', 'World')
  // }, 4000)

  // Ouvir
  // socket.on('omni', data => {
  //   console.log(data)
  // })
})

// Middleware para todas as rotas
app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next()
})

app.use(cors())
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes)


server.listen(port, () => console.log(`Example app listening on port ${port}!`))

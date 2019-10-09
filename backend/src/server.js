const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const logger = require('morgan')

const socketio = require('socket.io')
const http = require('http')

const routes = require('./routes')

const app = express()
const server = http.Server(app)
const io = socketio(server)

mongoose.connect('mongodb://URHOST/URDocker/URDBEXPSS/',{ 
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB-express Connected'))
.catch(err => console.error(err))

mongoose.connect('mongodb:/URHOST/URDB?authSource=URMasteruser',{ 
  user: process.env.user,
  pass: process.env.pass,
  keepAlive: true,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MongoDB connected')
});

mongoose.model('Test', new mongoose.Schema({ name: String }));


const connectedUsers = {}

io.on('connection', socket => {
  const { user_id } = socket.handshake.query;

  connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
})

app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors())

app.use(logger('dev'))

app.use(express.json())

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(routes)

server.listen(3333, function () {
    console.log('Enabled and web serv list on port 3333')
})

app.use(function(req, res, next) {
  next(console.error(404));
});

module.exports = server

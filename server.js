// require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3000
const sequelize = require('./config/connection')
const session = require('express-session')
const exphbs  = require('express-handlebars')
const helpers = require('./utils/helpers')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const http = require('http')
const server = http.createServer(app)
const socketio = require('socket.io')
const io = socketio(server)
const sharedsession = require("express-socket.io-session")
const {userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
    users} = require('./utils/users')

const sess = {
    secret: 'fdsajki',
    resave: false,
    saveUninitialized: false,
    cookie: {},
    store: new SequelizeStore({
        db: sequelize
    })
}
io.use(sharedsession(session(sess), {
    autoSave:true
}))

app.use(session(sess))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require('./controllers'))
const hbs = exphbs.create({helpers})
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// socket.handshake.session
io.on('connection', socket => {
    socket.on('joinRoom', (roomId)=>{
        const user = userJoin(socket.id,'timmy',roomId)
        socket.join(roomId)

        socket.to(roomId).emit('joinRoom', user)

        socket.emit('message', "You entered the room.")
        console.log('joined')

        socket.broadcast.to(roomId).emit('message', 'Someone entered the room.')

        socket.on('chatMessage', (message)=>{
            io.to(roomId).emit('message', message)
        })


        socket.on('disconnect', ()=>{
            io.to(roomId).emit('message', 'Someone left the room.')
            io.to(roomId).emit('leaveRoom', user)
            console.log('left')
        })
        
    })
})


sequelize.sync({force: false})
.then(()=>{
    server.listen(PORT, ()=>{
        console.log(`Now listening on port: ${PORT}`)
    })
})

module.exports = {users}
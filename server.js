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
// socket
const http = require('http');
const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);

const sess = {
    secret: 'fdsajki',
    resave: false,
    saveUninitialized: false,
    cookie: {},
    store: new SequelizeStore({
        db: sequelize
    })
}
app.use(session(sess))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require('./controllers'))
const hbs = exphbs.create({helpers})
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const botName = 'ChatCord Bot';

// Run when a client connects
io.on('connection', socket => {

    socket.on('joinRoom', () => {
        // const user = userJoin(socket.id, username, room);

        // socket.join(user.room)

        // Broadcast just to connecting user
        socket.emit('message', 'Hello!')

        // Broadcast when a user connects (but not to the user connecting)
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`));

        // Send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });

    // Listen for chatMessage
    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit('message', formatMessage(user.username, msg))
    })

    // Runs when client disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id)

        if(user) {
            io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`)) 
        
            // Send users and room info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            }) 
        }    
    })
});


sequelize.sync({force: false})
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Now listening on port: ${PORT}`)
    })
})

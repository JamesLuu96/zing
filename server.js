// require('dotenv').config()
const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3001;
const sequelize = require("./config/connection");
const session = require("express-session");
const exphbs = require("express-handlebars");
const helpers = require("./utils/helpers");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);
const sharedsession = require("express-socket.io-session");
const {
	userJoin,
	getCurrentUser,
	userLeave,
	getRoomUsers,
	getUsersInRoom,
	users,
	getAllUsersInRoom,
	getUsers,
} = require("./utils/users");

const sess = {
	secret: "fdsajki",
	resave: false,
	saveUninitialized: false,
	cookie: {},
	store: new SequelizeStore({
		db: sequelize,
	}),
};
io.use(
	sharedsession(session(sess), {
		autoSave: true,
	})
);

app.use(session(sess));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use(require("./controllers"));
const hbs = exphbs.create({
    helpers
})
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
const botName = "zingBot"

// socket.handshake.session
io.on("connection", (socket) => {
	socket.on("joinRoom", (data) => {
		socket.join(data.roomId);
		socket.emit("currentUsers", getUsersInRoom(data.roomId));
		const user = userJoin(socket.id, data.username, data.roomId);
		
		socket.to(data.roomId).emit("joinRoom", user);
		
        socket.emit('message', {user: botName , message:"You entered the room"})
		
		
        socket.broadcast.to(data.roomId).emit('message', {user:botName, message:`${user.username} entered the room`})
		
        socket.on('chatMessage', (message) => {
		
			io.to(data.roomId).emit('message', {user: user.username, message})
			
			
        })
		
		socket.on("typing", function (data) {
			socket.broadcast.emit("typing", user.username);
		});
		
		io.to("lobby").emit('renderRooms', getAllUsersInRoom())
		io.to("lobby").emit('getUsers', getUsers())

        socket.on('disconnect', () => {
            userLeave(socket.id)
            io.to(data.roomId).emit('message', {user: botName, message:' left the room'})
            io.to(data.roomId).emit('leaveRoom', user)
			io.to("lobby").emit('renderRooms', getAllUsersInRoom())
			io.to("lobby").emit('getUsers', getUsers())
            console.log('left')
        })
    })
})

sequelize.sync({
        force: false
    })
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Now listening on port: ${PORT}`)
        })
    })

module.exports = {users}

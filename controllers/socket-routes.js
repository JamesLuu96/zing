const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('../utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('../utils/users'); 

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Come up with a better name once we have a proper title for the site
const botName = 'ChatAdmin';




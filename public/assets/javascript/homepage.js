const socket = io()
const {
    user_id,
    username
} = JSON.parse(sessionStorage.getItem("userInfo"))

socket.emit('joinRoom', {roomId: 'lobby', username})

// Render Rooms


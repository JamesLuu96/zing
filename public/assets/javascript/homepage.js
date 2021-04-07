const socket = io()
const {
    user_id,
    username
} = JSON.parse(sessionStorage.getItem("userInfo"))

socket.emit('joinRoom', {roomId: 'lobby', username})

// Render Rooms

socket.on('renderRooms', function(roomsArray){
    document.querySelectorAll('.room-info .active-users').forEach((room)=>{
        room.textContent = 0
    })
    roomsArray.forEach((room)=>{
        if(room.roomId !== "lobby"){
            document.querySelector(`.room-info[data-id="${room.roomId}"] .active-users`).textContent = room.onlineUsers
        }
    })
})

socket.on('getUsers', function(usersArray){
    document.querySelector('.online-users-list').innerHTML = ""
    usersArray.forEach((user)=>{
        const userEl = `
        <span><i class="fas fa-user-secret mr-3"></i>${user.username} </span>
        <span><i class="fas fa-circle online-users"></i></span>`
        const divEl = document.createElement('div')
        divEl.className = "d-flex justify-content-between pr-4"
        divEl.innerHTML = userEl
        document.querySelector('.online-users-list').append(divEl)
    })
})


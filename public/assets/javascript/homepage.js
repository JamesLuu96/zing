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

async function newRoomHandler(event) {
	event.preventDefault();

	const room_name = document.querySelector("#room-name").value;
	const type_id = document.querySelector("#room-type").value;

	const response = await fetch(`/api/rooms`, {
		method: "POST",
		body: JSON.stringify({
			room_name,
			type_id,
			user_id: 1,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
        socket.emit('refreshPage', {})
		document.location.replace("/");
	} else {
		// console.log(response.statusText);	
	}
}

const deleteEl = document.querySelectorAll('.trash')


async function deleteRoom(event){
    event.preventDefault();
    const roomId = event.target.getAttribute('data-id')
    const response = await fetch(`api/rooms/${roomId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'DELETE'
    })
    if (response.ok) {
        socket.emit('deleteRoom', roomId)
		document.location.replace("/");
	} else {
		alert(response.statusText);
	}
}

if(deleteEl){
    deleteEl.forEach(room=>{
        room.addEventListener('click', deleteRoom)
    })
}

document
	.querySelector("#chat-input")
	.addEventListener("submit", newRoomHandler);

socket.on('refreshPage', ()=>{
    document.location.replace("/")
})
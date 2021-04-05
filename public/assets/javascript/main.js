const chatList = document.querySelector('#chatList')
const chatInput = document.querySelector('#chatInput')
const socket = io()
const roomId = document.querySelector('.chat-room-title').getAttribute('data-id')
const form = document.querySelector('.chat-form')
const {
    user_id,
    username
} = JSON.parse(sessionStorage.getItem("userInfo"))

// socket.emit('joinRoom', {roomId,username})
socket.emit('joinRoom', {
    roomId,
    username
})

form.addEventListener('submit', (event) => {
    event.preventDefault()
    const message = chatInput.value
    chatHistory(message, roomId)
    socket.emit('chatMessage', message)
    // chatInput.value = ''
    // chatInput.focus()
})

function outputMessage(message) {
    // console.log(message)
    const list = document.createElement('li')
    list.textContent = message
    //   messages.push(message)
    chatList.append(list)
}

//join room
socket.on('joinRoom', user => {
    const list = document.createElement('li')
    list.setAttribute('data-id', user.id)
    list.innerHTML = `<i class="far fa-user pull-right mr-2" id=""></i>${user.username}`
    document.querySelector('#room-users ul').append(list)
})


socket.on('message', message => {
    outputMessage(message)
})

//leave chat room
socket.on('leaveRoom', user => {
    document.querySelector(`#room-users li[data-id="${user.id}"`).remove()
})

//post chat history
async function chatHistory(message) {
    let room_id = getRoomId()
    const response = await fetch("/api/chats", {
        method: "POST",
        body: JSON.stringify({
            room_id,
            user_id,
            message
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok) {
        console.log("")
    } else {
        alert(response.statusText);
    }
}

//fetch and render the data when the page reloads 
if (window.performance) {
    let room_id = getRoomId()
    fetch(`/api/chats/${room_id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(data => {
        return data.json()
    }).then(data => {
        let newData = data.filter(item => item.room_id === room_id)
        renderData(newData)
    })
}

//get room id 
function getRoomId() {
    let room_id = window.location.toString().split("/");

    //check if the url last is '/' or not
    if (room_id[room_id.length - 1] === "") {
        room_id = room_id[room_id.length - 2];
    } else {
        room_id = room_id[room_id.length - 1];
    }
    return room_id;
}

//render data 
function renderData(data) {
    console.log(data)
    data.map(data => {
        const list = document.createElement('li')
        list.textContent = data.message
        chatList.append(list)
    })
}
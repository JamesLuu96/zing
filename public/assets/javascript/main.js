
const chatList = document.querySelector('#chatList')
const chatInput = document.querySelector('#chatInput')
const socket = io()
const roomId = document.querySelector('.chat-room-title').getAttribute('data-id')
const form = document.querySelector('.chat-form')
const {user_id,username}=JSON.parse(sessionStorage.getItem("userInfo"))

// socket.emit('joinRoom', {roomId,username})
socket.emit('joinRoom', {roomId,username})

form.addEventListener('submit', (event)=>{
    event.preventDefault()
    const message = chatInput.value
    chatHistory(message,roomId)
    socket.emit('chatMessage', message) 
    // chatInput.value = ''
    // chatInput.focus()
})

function outputMessage(message){
    // console.log(message)
    const list = document.createElement('li')
    list.textContent = message
//   messages.push(message)
    chatList.append(list)
}


socket.on('joinRoom', user => {
    const list = document.createElement('li')
    list.setAttribute('data-id', user.id)
    list.innerHTML = `<i class="far fa-user pull-right mr-2" id=""></i>${user.username}`
    document.querySelector('#room-users ul').append(list)
})


socket.on('message', message => {
  // console.log(message,"hiii")
  console.log(message)
    outputMessage(message)
})
  
socket.on('leaveRoom', user => {
     document.querySelector(`#room-users li[data-id="${user.id}"`).remove()
})


async function chatHistory(message){
  let room_id = getRoomId()
 const response = await fetch("/api/chats", {
    method: "POST",
    body: JSON.stringify({ room_id, user_id,message}),
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





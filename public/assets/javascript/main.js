const chatList = document.querySelector('#chatList')
const chatInput = document.querySelector('#chatInput')
const socket = io()
const roomId = document.querySelector('.chat-room-title').getAttribute('data-id')

const form = document.querySelector('.chat-form')

socket.emit('joinRoom', roomId)

form.addEventListener('submit', (event)=>{
    event.preventDefault()
    const chatMessage = chatInput.value
    socket.emit('chatMessage', chatMessage)
    chatInput.value = ''
    chatInput.focus()
})

function outputMessage(message){
    const list = document.createElement('li')
    list.textContent = message
    chatList.append(list)
}

socket.on('joinRoom', user => {
    const list = document.createElement('li').setAttribute('data-id', user.id)
    list.innerHTML = `<i class="far fa-user pull-right mr-2" id=""></i>${user.username}`
    document.querySelector('#room-users ul').append(list)
})

socket.on('message', message => {
    outputMessage(message)
})

socket.on('leaveRoom', user => {
    document.querySelector(`#room-users li[data-id="${user.id}"`).remove()
})
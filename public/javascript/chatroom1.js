var chatBox = document.getElementById("chatBox")
const {username,room}=JSON.parse(sessionStorage.getItem("userInfo"))

const currentRoom=document.querySelector('.active-room') //show the current room
const usersDiv=document.querySelector('.users') //display current online users in a room

const chatContainer=document.querySelector('#chatBox')
const roomUsers=document.querySelector('#room-users')

var socket=io();

socket.emit('joinRoom',{username,room}) 

socket.on('roomUsers',({room,users})=>{
     displayRoomName(room);
     displayUsers(users)
 })
 
 socket.on('message',message=>{
     renderMessage(message)
     
 })
 
function sendMessage () {
     var message = document.getElementById("chatInput").value;
     // alert(x);
     // chatBox.innerHTML = x;
     if(message){
          socket.emit('chatMessage',message)  
         }
         
     // var node = document.createElement("LI");                 // Create a <li> node
     // var textnode = document.createTextNode(message);         // Create a text node
     // node.appendChild(textnode);                              // Append the text to <li>
     // document.getElementById("chatList").appendChild(node);     // Append <li> to <ul> with id="myList"
};

function renderUserMessage(message){
     const textNode=document.createElement('div')
     // message.classList.add('message')

     textNode.textContent=`${message.text} ${message.time},${message.username}`
     chatContainer.appendChild(textNode)
     
}
// var node = document.createElement("LI");                 // Create a <li> node
// var textnode = document.createTextNode(message);         // Create a text node
// node.appendChild(textnode);                              // Append the text to <li>
// document.getElementById("chatList").appendChild(node);     // Append <li> to <ul> with id="myList"

function displayRoomName(room){
     currentRoom.innerHTML=room
 }
 
 function displayUsers(users){
     roomUsers.textContent=`${users.map(user=>`<li>${user.username}</li>`).join('')}`;
 }


document.getElementById("send-chat").addEventListener("click",sendMessage)
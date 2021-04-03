$(function() {

var chatBox = document.getElementById("chatBox")
// const {username,room}=JSON.parse(sessionStorage.getItem("userInfo"))
const btnSend=document.getElementById("send-chat")
var socket=io();

const currentRoom=document.querySelector('.active-room') //show the current room
const usersDiv=document.querySelector('.users') //display current online users in a room

const chatContainer=document.querySelector('#chatBox')
const roomUsers=document.querySelector('#room-users')

//add emoji to the input panel
     $("#chatInput").emojioneArea({
      tonesStyle: "bullet",
       searchPlaceholder: "Search",
       searchPosition: "top",
     
     });
    
//send username and room to the server 
socket.emit('joinRoom',{username,room}) 

//accept room and server from server
socket.on('roomUsers',({room,users})=>{
     displayRoomName(room);
     displayUsers(users)
 })
 //accept message from server and render to the dom
 socket.on('message',message=>{
     renderUserMessage(message)
     
 })
 
 //send message
function sendMessage () {
     var message = document.getElementById("chatInput").value;
     if(message){
          socket.emit('chatMessage',message)  
         }
};
//render message to the dom
function renderUserMessage(message){
     const textNode=document.createElement('div')
     textNode.textContent=`${message.text} ${message.time},${message.username}`
     chatContainer.appendChild(textNode)
     
}

//display room name 
function displayRoomName(room){
     currentRoom.innerHTML=room
 }
 
 function displayUsers(users){
     roomUsers.textContent=`${users.map(user=>`<li>${user.username}</li>`).join('')}`;
 }

//Listen event when a user type on the input 
 btnSend.addEventListener("onchange",sendMessage)
})
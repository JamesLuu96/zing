var chatBox = document.getElementById("chatBox")
const {username,room}=JSON.parse(sessionStorage.getItem("userInfo"))

var socket=io();

socket.emit('joinRoom',{username,room}) 

socket.on('roomUsers',({room,users})=>{
     displayRoomName(room);
     displayUsers(users)
 })
 
function sendMessage () {
     var message = document.getElementById("chatInput").value;
     // alert(x);
     // chatBox.innerHTML = x;

     var node = document.createElement("LI");                 // Create a <li> node
     var textnode = document.createTextNode(message);         // Create a text node
     node.appendChild(textnode);                              // Append the text to <li>
     document.getElementById("chatList").appendChild(node);     // Append <li> to <ul> with id="myList"
};


var node = document.createElement("LI");                 // Create a <li> node
var textnode = document.createTextNode(message);         // Create a text node
node.appendChild(textnode);                              // Append the text to <li>
document.getElementById("chatList").appendChild(node);     // Append <li> to <ul> with id="myList"



document.getElementById("send-chat").addEventListener("click",sendMessage)
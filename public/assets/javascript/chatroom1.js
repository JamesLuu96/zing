var chatBox = document.getElementById("chatBox")

document.getElementById("send-chat").addEventListener("click", function () {
     var x = document.getElementById("chatInput").value;
     // alert(x);
     // chatBox.innerHTML = x;

     var node = document.createElement("LI");                 // Create a <li> node
     var textnode = document.createTextNode(x);         // Create a text node
     node.appendChild(textnode);                              // Append the text to <li>
     document.getElementById("chatList").appendChild(node);     // Append <li> to <ul> with id="myList"
});


var node = document.createElement("LI");                 // Create a <li> node
var textnode = document.createTextNode(x);         // Create a text node
node.appendChild(textnode);                              // Append the text to <li>
document.getElementById("chatList").appendChild(node);     // Append <li> to <ul> with id="myList"

var chatBox = document.getElementById("chatBox")

document.getElementById("send-chat").addEventListener("click", function() {
     var x = document.getElementById("chatInput").value;
     alert(x);
     chatBox.innerHTML = x;
   });




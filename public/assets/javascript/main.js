const chatList = document.querySelector("#chatList");
const chatInput = document.querySelector("#chatInput");
const chatBox = document.querySelector("#chatBox");
const socket = io();
const roomId = document
	.querySelector(".chat-room-title")
	.getAttribute("data-id");
// console.log(roomId);
const form = document.querySelector(".chat-form");
const feedback = document.getElementById("feedback");
const type_name = document.querySelector(".chat-room-type").textContent;

function change(input) {
	input.classList.add("test");
}

const { user_id, username } = JSON.parse(sessionStorage.getItem("userInfo"));

socket.emit("joinRoom", {
	roomId,
	username,
});

form.addEventListener("submit", (event) => {
	event.preventDefault();
	const message = chatInput.value;
	socket.emit("chatMessage", message);
	event.target.elements.chatInput.value = "";
	event.target.elements.chatInput.focus();
});
function alterMessage(chatEl) {
	if (type_name === "tiny") {
		chatEl.classList.add("tiny");
	} else if (type_name === "angry") {
		chatEl.classList.add("angry");
	} else if (type_name === "backwards") {
		chatEl.classList.add("backwards");
	} else if (type_name === "excited") {
		chatEl.classList.add("excited");
	} else if (type_name === "blurry") {
		chatEl.classList.add("blurry");
	} else if (type_name === "dark") {
		chatEl.classList.add("dark");
	}
}
function alterBackground(backgroundEl) {
	// console.log(type_name);
	if (type_name === "tiny") {
		backgroundEl.classList.add("tiny-background");
	} else if (type_name === "angry") {
		backgroundEl.classList.add("angry-background");
	} else if (type_name === "backwards") {
		backgroundEl.classList.add("backwards-background");
	} else if (type_name === "excited") {
		backgroundEl.classList.add("excited-background");
	} else if (type_name === "blurry") {
		backgroundEl.classList.add("blurry-background");
	} else if (type_name === "dark") {
		backgroundEl.classList.add("dark");
	}
}
alterBackground(chatBox);
// "Typing" section
chatInput.addEventListener("keypress", function () {
	socket.emit("typing");
});

socket.on("typing", function (data) {
	feedback.innerHTML = `<div class="chat-bubble">
                    <div class="typing">
                         <div class="dot"></div>
                         <div class="dot"></div>
                         <div class="dot"></div>
                         <span class="writing"></span>
                    </div>
               </div><p><em> ${data} is typing</em></p>`;
});

function outputMessage(message) {
	const list = document.createElement("li");
	const divEl = document.createElement("div");
	const name = document.createElement("p");
	name.textContent = `${message.user}: `;
	name.classList.add("chatName");
	list.textContent = message.message;
	change(list);
	if (message.user === username) {
		list.classList.add("yours");
		divEl.classList.add("your-message");
	} else {
		divEl.classList.add("their-message");
		list.classList.add("theirs");
	}
	alterMessage(list);
	divEl.append(name, list);
	chatList.append(divEl);
	feedback.innerHTML = "";
}

socket.on('leaveRoomFromDelete', ()=>{
    document.location.replace("/");
})

//join room
socket.on("joinRoom", (user) => {
	const list = document.createElement("li");
	list.setAttribute("data-id", user.id);
	list.innerHTML = `<i class="far fa-user pull-right mr-2 chat-text" id=""></i>${user.username}`;
	document.querySelector("#room-users ul").append(list);

});



socket.on("currentUsers", (allUsers) => {
	// console.log(allUsers);
	allUsers.forEach((user) => {
		const list = document.createElement("li");
		list.setAttribute("data-id", user.id);
		list.innerHTML = `<i class="far fa-user pull-right mr-2 chat-text" id=""></i>${user.username}`;
		document.querySelector("#room-users ul").append(list);
	});
});

socket.on("message", (message) => {
	outputMessage(message);
	chatBox.scrollTop = chatBox.scrollHeight;
});

//leave chat room
socket.on("leaveRoom", (user) => {
	document.querySelector(`#room-users li[data-id="${user.id}"`).remove();
});

//post chat history

// Adds user to page
const list = document.createElement("li");
list.setAttribute("data-id", user_id);
list.innerHTML = `<i class="far fa-user pull-right mr-2 chat-text" id=""></i>${username}`;
document.querySelector("#room-users ul").append(list);

//fetch and render the data when the page reloads

//render data
function renderData(data) {
	data.map((data) => {
		const list = document.createElement("li");
		list.textContent = data.message;
		chatList.append(list);
	});
}


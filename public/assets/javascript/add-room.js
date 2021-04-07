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
		document.location.replace("/");
	} else {
		alert(response.statusText);
	}
}

document
	.querySelector("#chat-input")
	.addEventListener("submit", newRoomHandler);

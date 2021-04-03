async function newRoomHandler(event) {
	event.preventDefault();

	const room_name = document.querySelector(".room-name").value;

	const response = await fetch(`/api/rooms`, {
		method: "POST",
		body: JSON.stringify({
			room_name,
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

document.querySelector("#chatInput").addEventListener("submit", newRoomHandler);

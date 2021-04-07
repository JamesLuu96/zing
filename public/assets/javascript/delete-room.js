const deleteEl = document.querySelector('.trash')


async function deleteRoom(event){
    event.preventDefault();
    const roomId = event.target.getAttribute('data-id')
    const response = await fetch(`api/rooms/${roomId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'DELETE'
    })
    if (response.ok) {
		document.location.replace("/");
	} else {
		alert(response.statusText);
	}
}

deleteEl.addEventListener('click', deleteRoom)
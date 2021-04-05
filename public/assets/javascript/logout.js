async function logout(event) {
	event.preventDefault()
	const response = await fetch("/api/users/logout", {
		method: "post",
		headers: { "Content-Type": "application/json" },
	});

	if (response.ok) {
		document.location.replace("/login");
	} else {
		document.location.replace('/');
	}
	
}

document.querySelector("#logout").addEventListener("click", logout);

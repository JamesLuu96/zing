
 myStorage = window.sessionStorage;
 
function openTab(tabName) {
	var i;
	var x = document.getElementsByClassName("form");
	for (i = 0; i < x.length; i++) {
		x[i].style.display = "none";
	}
	document.getElementById(tabName).style.display = "block";
}

async function loginFormHandler(event) {
	event.preventDefault();

	const username = document.querySelector("#username").value.trim();
	const password = document.querySelector("#password-login").value.trim();

	if (username && password) {
		const response = await fetch("/api/users/login", {
			method: "post",
			body: JSON.stringify({
				username,
				password,
			}),
			headers: { "Content-Type": "application/json" },
		});

		if (response.ok) {
			// sessionStorage.setItem('userInfo', JSON.stringify(data));
			document.location.replace("/");
		} else {
			document.location.reload()
		}
	}
}


document
	.querySelector(".login-form")
	.addEventListener("submit", loginFormHandler);


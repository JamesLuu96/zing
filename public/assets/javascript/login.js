myStorage = window.sessionStorage;

function openTab(tabName) {
	var i;
	var x = document.getElementsByClassName("form");
	for (i = 0; i < x.length; i++) {
		x[i].style.display = "none";
	}
	document.getElementById(tabName).style.display = "block";
}
let alert = document.createElement("i");

async function loginFormHandler(event) {
	event.preventDefault();
	alert.className="fas fa-exclamation-circle errror-icon";
	const username = document.querySelector("#username").value.trim();
	const password = document.querySelector("#password-login").value;

	if (username && password) {
		const response = await fetch("/api/users/login", {
			method: "post",
			body: JSON.stringify({
				username,
				password,
			}),
			headers: { "Content-Type": "application/json" },
		})
			.then((data) => {
				return data.json();
			})
			.then((data) => {
				sessionStorage.setItem(
					"userInfo",
					JSON.stringify({
						username: data.user.username,
						user_id: data.user.id,
					})
				);
				document.location.replace("/");
			}).catch(err=>{
				document.body.appendChild(alert);
		
			})
	}
}

document.querySelector("#login-tab")
	.addEventListener("submit", loginFormHandler);

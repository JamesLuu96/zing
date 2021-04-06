

async function signupFormHandler(event) {
	event.preventDefault();

	const username = document.querySelector("#username-signup").value.trim();
	
	const password = document.querySelector("#password-signup").value.trim();

	if (username  && password) {
		const response = await fetch("/api/users", {
			method: "post",
			body: JSON.stringify({
				username,
				password,
			}),
			headers: { "Content-Type": "application/json" },
		})
		.then((data)=>{
			return data.json()
		})
		.then((data)=>{
			console.log(data)
			sessionStorage.setItem(
				"userInfo",
				JSON.stringify({
					username: data.user.username,
					user_id: data.user.id,
				})
			)
			document.location.replace("/");
		})
	}
}

document.querySelector(".signup-form").addEventListener("submit", signupFormHandler);




	
	let alert = document.createElement("i");
async function signupFormHandler(event) {
	event.preventDefault();

	const username = document.querySelector("#username-signup").value.trim();
	const password = document.querySelector("#password-signup").value.trim();

	alert.className = "fas fa-exclamation-circle errror-icon";
	// alert.setAttribute('data-bs-toggle','tooltip')
	// alert.setAttribute('data-bs-placement','top')
	// alert.setAttribute('title','test')
	

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
			// console.log(data)
			sessionStorage.setItem(
				"userInfo",
				JSON.stringify({
					username: data.user.username,
					user_id: data.user.id,
				})
			)
			document.location.replace("/");
			
		}).catch(err=>{
			document.body.appendChild(alert);
			
		})
	}
}

document.querySelector("#signup-tab").addEventListener("submit", signupFormHandler);



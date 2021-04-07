

async function signupFormHandler(event) {
	event.preventDefault();

	const username = document.querySelector("#username-signup").value.trim();
	
	const password = document.querySelector("#password-signup").value.trim();
	
	let alert = document.createElement("p");
	alert.className = "error-input";
	
  
	
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
			
		}).catch(err=>{
			// alert.textContent = "User already exsist please change your user name!!!";
			// document.body.appendChild(alert);
			
		})
	}
}

document.querySelector("#signup-tab").addEventListener("submit", signupFormHandler);



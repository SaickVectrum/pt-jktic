const form = document.getElementById('loginForm')
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const loginBtn = document.getElementById('loginBtn')
const logoutBtn = document.getElementById('logoutBtn')
const errorMessage = document.getElementById('errorMessage')

// Verificar si ya hay sesión iniciada
const userSession = localStorage.getItem('user')
if (userSession) {
	showWelcomeMessage(userSession)
}

form.addEventListener('submit', e => {
	e.preventDefault()

	const email = emailInput.value.trim()
	const password = passwordInput.value.trim()

	if (!validateEmail(email)) {
		errorMessage.textContent = 'Correo inválido.'
		return
	}

	if (password.length < 6) {
		errorMessage.textContent = 'La contraseña debe tener al menos 6 caracteres.'
		return
	}

	// Simular autenticación con un efecto de carga
	loginBtn.textContent = 'INGRESANDO...'
	loginBtn.disabled = true

	setTimeout(() => {
		fetch("auth.php", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password })
		})
			.then(response => response.json())
			.then(data => {
				if (data.success) {
					localStorage.setItem("user", email);
					showWelcomeMessage(email);
				} else {
					errorMessage.textContent = data.message;
					loginBtn.textContent = "Ingresar";
					loginBtn.disabled = false;
				}
			})
			.catch(error => console.error("Error:", error));
	}, 1500)
})

logoutBtn.addEventListener('click', () => {
	localStorage.removeItem('user')
	location.reload()
})

function showWelcomeMessage(user) {
	document.body.innerHTML = `<div class="message"><h2>Bienvenido, ${user}</h2><button id="logoutBtn">CERRAR SESIÓN</button></div>`
	document.getElementById('logoutBtn').addEventListener('click', () => {
		localStorage.removeItem('user')
		location.reload()
	})
}

function validateEmail(email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

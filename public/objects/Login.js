import { 
	getAuth, 
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	GoogleAuthProvider,
	signInWithPopup,
	signInWithRedirect,
	getRedirectResult,
	updateProfile,
	updatePassword,
	updateEmail, 
	reauthenticateWithCredential,
	EmailAuthProvider,
	sendPasswordResetEmail,
	setPersistence,
	browserLocalPersistence
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'

class Login {
	constructor(app) {		
		this.auth = getAuth(app)
		this.googleProvider = new GoogleAuthProvider()
		this.googleProvider.setCustomParameters({
			prompt: 'select_account'
		})
		
		this.currentUser = null
		this.uid = null
		this.displayName = null
		this.email = null
		this.photoURL = null
		this.emailVerified = false
		
		this.messageBox = null
		this.loadingMessage = null
		this.authView = null
		this.dashboardView = null
		
		this.setupPersistence()
		this.handleRedirectResult()
		this.initAuthObserver()
	}
	
	async setupPersistence() {
		try {
			await setPersistence(this.auth, browserLocalPersistence)
		} catch (error) {
		}
	}
	
	async handleRedirectResult() {
		try {
			const result = await getRedirectResult(this.auth)
			if (result && result.user) {
				setTimeout(() => {
					if (this.messageBox) {
						this.showMessage('¡Sesión iniciada con Google!', 'success')
					}
				}, 100)
			}
		} catch (error) {
			setTimeout(() => {
				if (this.messageBox) {
					let errorMessage = 'Error al iniciar sesión con Google'
					if (error.code === 'auth/account-exists-with-different-credential') {
						errorMessage = 'Ya existe una cuenta con este correo'
					} else if (error.code === 'auth/popup-closed-by-user') {
						errorMessage = 'Inicio de sesión cancelado'
					}
					this.showMessage(errorMessage, 'error')
				}
			}, 100)
		}
	}
	
	showMessage(message, type) {
		if (!this.messageBox) return
		this.messageBox.textContent = message
		this.messageBox.className = `message ${type}`
		this.messageBox.style.display = 'block'
		setTimeout(() => {
			this.messageBox.style.display = 'none'
		}, 5000)
	}
	
	showLoading(show) {
		if (!this.loadingMessage) return
		this.loadingMessage.classList.toggle('hidden', !show)
	}
	
	switchTab(tab) {
		const loginForm = document.getElementById('loginForm')
		const registerForm = document.getElementById('registerForm')
		const tabs = document.querySelectorAll('.tab-btn')
		const login_init_botton = document.getElementById("login_init_botton")

		tabs.forEach(t => t.classList.remove('active'))

		if (tab === 'login') {
			loginForm.classList.remove('hidden')
			registerForm.classList.add('hidden')
			tabs[0].classList.add('active')   			
			login_init_botton.style.display = "flex"  
		} else {
			loginForm.classList.add('hidden')
			registerForm.classList.remove('hidden')
			tabs[1].classList.add('active')
			login_init_botton.style.display = "none"
		}
	}
	
	async handleRegister(e) {
		e.preventDefault()
		this.showLoading(true)

		const name = document.getElementById('registerName').value
		const email = document.getElementById('registerEmail').value
		const password = document.getElementById('registerPassword').value

		try {
			const userCredential = await createUserWithEmailAndPassword(this.auth, email, password)
			await updateProfile(userCredential.user, { displayName: name })
			this.showMessage('¡Cuenta creada exitosamente!', 'success')
			e.target.reset()
			
			setTimeout(() => {
				this.switchTab('login')
			}, 1500)
		} catch (error) {
			let errorMessage = 'Error al crear la cuenta'
			if (error.code === 'auth/email-already-in-use') {
				errorMessage = 'Este correo ya está registrado'
			} else if (error.code === 'auth/weak-password') {
				errorMessage = 'La contraseña debe tener al menos 6 caracteres'
			} else if (error.code === 'auth/invalid-email') {
				errorMessage = 'Correo electrónico inválido'
			} else if (error.code === 'auth/operation-not-allowed') {
				errorMessage = 'El registro con email/contraseña no está habilitado en Firebase'
			} else if (error.code === 'auth/admin-restricted-operation') {
				errorMessage = 'Esta operación requiere configuración adicional en Firebase Console'
			}
			this.showMessage(errorMessage, 'error')
		} finally {
			this.showLoading(false)
		}
	}
	
	async handleLogin(e) {
		e.preventDefault()
		this.showLoading(true)

		const email = document.getElementById('loginEmail').value
		const password = document.getElementById('loginPassword').value

		try {
			await signInWithEmailAndPassword(this.auth, email, password)
			this.showMessage('¡Sesión iniciada correctamente!', 'success')
			e.target.reset()
		} catch (error) {
			let errorMessage = 'Error al iniciar sesión'
			if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
				errorMessage = 'Correo o contraseña incorrectos'
			} else if (error.code === 'auth/invalid-email') {
				errorMessage = 'Correo electrónico inválido'
			} else if (error.code === 'auth/invalid-credential') {
				errorMessage = 'Credenciales inválidas'
			} else if (error.code === 'auth/too-many-requests') {
				errorMessage = 'Demasiados intentos fallidos. Espera unos minutos'
			}
			this.showMessage(errorMessage, 'error')
		} finally {
			this.showLoading(false)
		}
	}
	
	async loginWithGoogle() {
		this.showLoading(true)
		try {
			try {
				const result = await signInWithPopup(this.auth, this.googleProvider)
				this.showMessage('¡Sesión iniciada con Google!', 'success')
			} catch (popupError) {
				if (popupError.code === 'auth/popup-blocked' || 
				    popupError.code === 'auth/popup-closed-by-user') {
					await signInWithRedirect(this.auth, this.googleProvider)
				} else {
					throw popupError
				}
			}
		} catch (error) {
			let errorMessage = 'Error al iniciar sesión con Google'
			if (error.code === 'auth/popup-closed-by-user') {
				errorMessage = 'Inicio de sesión cancelado'
			} else if (error.code === 'auth/account-exists-with-different-credential') {
				errorMessage = 'Ya existe una cuenta con este correo usando otro método'
			}
			this.showMessage(errorMessage, 'error')
		} finally {
			this.showLoading(false)
		}
	}
	
	async logout() {
		try {
			await signOut(this.auth)
			this.showMessage('Sesión cerrada correctamente', 'success')
		} catch (error) {
			this.showMessage('Error al cerrar sesión', 'error')
		}
	}
	
	async changePassword(currentPassword, newPassword) {
		if (!this.currentUser) {
			this.showMessage('No hay usuario autenticado', 'error')
			return false
		}

		try {
			const credential = EmailAuthProvider.credential(
				this.currentUser.email,
				currentPassword
			)
			
			await reauthenticateWithCredential(this.currentUser, credential)
			await updatePassword(this.currentUser, newPassword)
			
			this.showMessage('Contraseña actualizada correctamente', 'success')
			return true
		} catch (error) {
			let errorMessage = 'Error al cambiar la contraseña'
			if (error.code === 'auth/wrong-password') {
				errorMessage = 'La contraseña actual es incorrecta'
			} else if (error.code === 'auth/weak-password') {
				errorMessage = 'La nueva contraseña debe tener al menos 6 caracteres'
			}
			this.showMessage(errorMessage, 'error')
			return false
		}
	}
	
	async changeEmail(newEmail, password) {
		if (!this.currentUser) {
			this.showMessage('No hay usuario autenticado', 'error')
			return false
		}

		try {
			const credential = EmailAuthProvider.credential(
				this.currentUser.email,
				password
			)
			
			await reauthenticateWithCredential(this.currentUser, credential)
			await updateEmail(this.currentUser, newEmail)
			
			this.email = newEmail
			this.showMessage('Correo actualizado correctamente', 'success')
			return true
		} catch (error) {
			let errorMessage = 'Error al cambiar el correo'
			if (error.code === 'auth/email-already-in-use') {
				errorMessage = 'Este correo ya está en uso'
			} else if (error.code === 'auth/invalid-email') {
				errorMessage = 'Correo electrónico inválido'
			} else if (error.code === 'auth/wrong-password') {
				errorMessage = 'La contraseña es incorrecta'
			}
			this.showMessage(errorMessage, 'error')
			return false
		}
	}
	
	async sendPasswordReset(email) {
		try {
			await sendPasswordResetEmail(this.auth, email)
			this.showMessage('Correo de recuperación enviado', 'success')
			return true
		} catch (error) {
			let errorMessage = 'Error al enviar correo de recuperación'
			if (error.code === 'auth/user-not-found') {
				errorMessage = 'No existe una cuenta con este correo'
			} else if (error.code === 'auth/invalid-email') {
				errorMessage = 'Correo electrónico inválido'
			}
			this.showMessage(errorMessage, 'error')
			return false
		}
	}
	
	async updateDisplayName(newName) {
		if (!this.currentUser) {
			this.showMessage('No hay usuario autenticado', 'error')
			return false
		}

		try {
			await updateProfile(this.currentUser, { displayName: newName })
			this.displayName = newName
			this.showMessage('Nombre actualizado correctamente', 'success')
			return true
		} catch (error) {
			this.showMessage('Error al actualizar el nombre', 'error')
			return false
		}
	}
	
	updateUserData(user) {
		if (user) {
			this.currentUser = user
			this.uid = user.uid
			this.displayName = user.displayName || 'Usuario'
			this.email = user.email
			this.photoURL = user.photoURL
			this.emailVerified = user.emailVerified
		} else {
			this.currentUser = null
			this.uid = null
			this.displayName = null
			this.email = null
			this.photoURL = null
			this.emailVerified = false
		}
	}
	
	updateUI() {
		if (!this.authView || !this.dashboardView) {
			return
		}
		
		if (this.currentUser) {
			this.authView.style.display = "none"
			this.dashboardView.style.display = "flex"

			const userNameEl = document.getElementById('userName')
			const userEmailEl = document.getElementById('userEmail')
			const userIdEl = document.getElementById('userId')
			const userAvatarEl = document.getElementById('userAvatar')
			
			if (userNameEl) userNameEl.textContent = this.displayName
			if (userEmailEl) userEmailEl.textContent = this.email
			if (userIdEl) userIdEl.textContent = this.uid
			if (userAvatarEl) {
				if (this.photoURL) {
					userAvatarEl.innerHTML = `<img src="${this.photoURL}" alt="Avatar" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`
				} else {
					userAvatarEl.textContent = this.displayName.charAt(0).toUpperCase()
				}
			}
		} else {
			this.authView.style.display = "flex"
			this.dashboardView.style.display = "none"
		}
	}
	
	initAuthObserver() {
		onAuthStateChanged(this.auth, (user) => {
			this.updateUserData(user)
			this.updateUI()
		})
	}
	
	getUserData() {
		return {
			uid: this.uid,
			displayName: this.displayName,
			email: this.email,
			photoURL: this.photoURL,
			emailVerified: this.emailVerified
		}
	}
	
	isAuthenticated() {
		return this.currentUser !== null
	}
	
	static createLoginInterface() {
		const container = document.getElementById("login_cont")
		
		container.innerHTML = `
			<div id="authView" style="display: flex;"> 	
				<div id="messageBox" class="message" style="display: none;"></div>

				<form id="loginForm">
					<div class="input-group">
						<input type="email" id="loginEmail" required autocomplete="email">
						<label class="user-label">Correo electrónico</label>
					</div>
					<div class="input-group">
						<input type="password" id="loginPassword" required autocomplete="current-password">
						<label class="user-label">Contraseña</label>
					</div>       
				</form>

				<form id="registerForm" class="hidden">
					<div class="input-group">
						<input type="text" id="registerName" required autocomplete="name">
						<label class="user-label">Tu nombre</label>
					</div>
					<div class="input-group">
						<input type="email" id="registerEmail" required autocomplete="email">
						<label class="user-label">Correo electrónico</label>
					</div>
					<div class="input-group">
						<input type="password" id="registerPassword" required autocomplete="new-password">
						<label class="user-label">Contraseña</label>
					</div>
					<button type="submit" class="btn-primary" id="login_new_botton">Crear Cuenta</button>
				</form>		
				<div class="login_buttons_container">
					<div class="tab-buttons">
						<button type="button" class="tab-btn active" data-tab="login">Iniciar Sesión</button>
						<button type="button" class="tab-btn" data-tab="register">Registrarse</button>
					</div>
					<button type="submit" class="btn-primary" id="login_init_botton">Ingresar</button>
				</div> 		

				<div class="social-buttons">
					<label>O ingresa con</label>
					<button type="button" class="btn-social btn-google" id="googleLoginBtn">
						<svg width="18" height="18" viewBox="0 0 18 18">
							<path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"/>
							<path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z"/>
							<path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z"/>
							<path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z"/>
						</svg>
						Google
					</button>
				</div>

				<div id="loadingMessage" class="loading hidden">Cargando...</div>
			</div>			
		` 		
		
		const generalCont = document.getElementById('general_cont')
		if (generalCont) {
			generalCont.style.display = "none"
		}
	}

	initDOM() {
		this.messageBox = document.getElementById('messageBox')
		this.loadingMessage = document.getElementById('loadingMessage')
		this.authView = document.getElementById('login_cont')
		this.dashboardView = document.getElementById('general_cont')
		
		if (!this.messageBox || !this.loadingMessage || !this.authView || !this.dashboardView) {
			return
		}
		
		this.attachAllEventListeners()
		this.updateUI()
	}

	attachAllEventListeners() {
		const tabButtons = document.querySelectorAll('.tab-btn')
		tabButtons.forEach(btn => {
			btn.addEventListener('click', () => {
				const tab = btn.getAttribute('data-tab')
				this.switchTab(tab)
			})
		})

		const googleLoginBtn = document.getElementById('googleLoginBtn')
		if (googleLoginBtn) {
			googleLoginBtn.addEventListener('click', () => {
				this.loginWithGoogle()
			})
		}

		const logoutBtn = document.getElementById('logoutBtn')
		if (logoutBtn) {
			logoutBtn.addEventListener('click', () => {
				this.logout()
			})
		}

		const loginForm = document.getElementById('loginForm')
		const loginInitButton = document.getElementById('login_init_botton')
		if (loginForm && loginInitButton) {
			loginForm.addEventListener('submit', (e) => {
				e.preventDefault()
			})
			
			loginInitButton.addEventListener('click', (e) => {
				e.preventDefault()
				const submitEvent = new Event('submit', { cancelable: true, bubbles: true })
				this.handleLogin(submitEvent)
			})
		}

		const registerForm = document.getElementById('registerForm')
		if (registerForm) {
			registerForm.addEventListener('submit', (e) => {
				this.handleRegister(e)
			})
		}
	}

	main() {		
		this.initDOM()
	}
}

export default Login
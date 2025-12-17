import ExtT from "../objects/ExtT.js"

class Subject {
	constructor(SB, usuarioId) {
		this.SB = SB
		this.usuarioId = usuarioId
		this.wp = document.getElementById("workplace")
		this.viewer_section = document.querySelector(".subject_viewer")
		this.create_section = document.querySelector(".subject_create")
		this.cancel_button = document.getElementById("subject_cancel")
		this.add_button = document.getElementById("subject_add")
		this.title_val = document.getElementById("subject_title")
		this.description_val = document.getElementById("subject_description")
		this.header_right = document.querySelector('.header_right')
		this.subjects = []
	}

	async searchSubjectImage(subjectName) {
		const imageMap = {
			'matemática': 'https://images.pexels.com/photos/3729557/pexels-photo-3729557.jpeg?auto=compress&cs=tinysrgb&w=800',
			'física': 'https://images.pexels.com/photos/714698/pexels-photo-714698.jpeg?auto=compress&cs=tinysrgb&w=800',
			'química': 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=800',
			'biología': 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=800',
			'historia': 'https://images.pexels.com/photos/415071/pexels-photo-415071.jpeg?auto=compress&cs=tinysrgb&w=800',
			'geografía': 'https://images.pexels.com/photos/335393/pexels-photo-335393.jpeg?auto=compress&cs=tinysrgb&w=800',
			'literatura': 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800',
			'idioma': 'https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?auto=compress&cs=tinysrgb&w=800',
			'inglés': 'https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?auto=compress&cs=tinysrgb&w=800',
			'programación': 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
			'arte': 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800',
			'música': 'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=800',
			'economía': 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=800',
			'filosofía': 'https://images.pexels.com/photos/256559/pexels-photo-256559.jpeg?auto=compress&cs=tinysrgb&w=800',
			'psicología': 'https://images.pexels.com/photos/7176325/pexels-photo-7176325.jpeg?auto=compress&cs=tinysrgb&w=800',
			'derecho': 'https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=800',
			'medicina': 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=800',
			'ingeniería': 'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=800',
			'arquitectura': 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=800',
			'estadística': 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
			'probabilidad': 'https://images.pexels.com/photos/6963944/pexels-photo-6963944.jpeg?auto=compress&cs=tinysrgb&w=800',
			'cálculo': 'https://images.pexels.com/photos/6238050/pexels-photo-6238050.jpeg?auto=compress&cs=tinysrgb&w=800',
			'álgebra': 'https://images.pexels.com/photos/5905857/pexels-photo-5905857.jpeg?auto=compress&cs=tinysrgb&w=800',
			'geometría': 'https://images.pexels.com/photos/1329296/pexels-photo-1329296.jpeg?auto=compress&cs=tinysrgb&w=800',
			'informática': 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800',
			'robótica': 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800',
			'astronomía': 'https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=800'
		}
		
		const normalizedName = subjectName.toLowerCase()
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.trim()
		
		for (const [key, value] of Object.entries(imageMap)) {
			if (normalizedName.includes(key)) {
				return value
			}
		}
		
		const seed = subjectName.toLowerCase().replace(/\s+/g, '-') 
		return `https://picsum.photos/seed/${encodeURIComponent(seed)}/800/600`
	}

	async loadSubjects() {
		const result = await this.SB.getAllSubjects()
		
		if (result.success && result.data) {
			this.subjects = result.data
			await this.renderSubjects()
		}
	}

	async renderSubjects() {
		// this.viewer_section.innerHTML = ''
		
		for (const subject of this.subjects) {
			const subjectElement = await this.createSubjectElement(subject)
			this.viewer_section.appendChild(subjectElement)
		}
		ExtT.loaderStop() 
	}

	async createSubjectElement(subject) {
		const element = document.createElement('div')
		element.className = 'subject_element'
		element.dataset.subjectId = subject.id
		
		const imageUrl = await this.searchSubjectImage(subject.name)
		
		element.innerHTML = `
			<div class="subject_element_top">
				<img class="subject_element_ico" src="./img/ico/subject.svg">
				<p class="subject_element_title">${ExtT.escapeHtml(subject.name)}</p>
			</div>
			<div class="subject_element_description">
				<img src="${imageUrl}">
				<p>${ExtT.escapeHtml(subject.description || '')}</p>
			</div>
		`
		
		element.addEventListener('click', () => {
			this.onSubjectClick(subject)
		})
		
		return element
	}

	onSubjectClick(subject) {
		console.log('Materia seleccionada:', subject)
	}

	showCreateForm() {
		this.viewer_section.style.display = "none"
		this.create_section.style.display = "block"
		this.header_right.style.display = "none"
	}

	hideCreateForm() {
		this.viewer_section.style.display = "flex"
		this.create_section.style.display = "none"
		this.header_right.style.display = "flex"
		this.title_val.value = ""
		this.description_val.value = ""
	}

	setupCreateButton() {
		this.header_right.onclick = () => {
			this.showCreateForm()
		}
	}

	async handleCreate() {
		const title = this.title_val.value.trim()
		const description = this.description_val.value.trim()
		
		if (!title) {
			alert("El título es obligatorio")
			return
		}
		
		this.add_button.disabled = true
		this.add_button.textContent = "Creando..."
		
		const r = await this.SB.createSubject({
			name: title,
			description: description,
			created_by: this.usuarioId,
			created_at: new Date().toISOString()
		})
		
		this.add_button.disabled = false
		this.add_button.textContent = "Crear"
		
		if (!r.success) {
			alert("Error al crear la materia")
		} else {
			this.subjects.push(r.data)
			const newElement = await this.createSubjectElement(r.data)
			this.viewer_section.appendChild(newElement)
			
			this.hideCreateForm()
		}
	}

	setupEventListeners() {
		this.add_button.onclick = async () => {
			await this.handleCreate()
		}
		
		this.cancel_button.onclick = () => {
			this.hideCreateForm()
		}
	}

	static createSubjectWorkplace() {
		const workplace = document.getElementById("workplace")
		workplace.innerHTML = `
		<div class="subject_viewer"></div>
		<div class="subject_create">
			<H3>Nueva Materia</H3>  
			<div class="input-group" >
				<input id="subject_title" required="" type="text">
				<label class="user-label">Titulo</label>              
			</div>
			<div class="input-group"  >
				<input id="subject_description" required="" type="text">
				<label class="user-label">Descripcion</label>              
			</div>
			<div class="subject_buttons">              
				<button id="subject_cancel" >Cancelar</button> 
				<button id="subject_add" >Crear</button>
			</div>              
		</div>
		`
	}


	async init() {
		this.create_section.style.display = "none"
		await this.loadSubjects()
		this.setupEventListeners()
		this.setupCreateButton()
	}
}

export default Subject
import ExtT from "../objects/ExtT.js"

class Room {
	constructor(SB, usuarioId) {
		this.SB = SB
		this.usuarioId = usuarioId
		this.room = null
		this.roomId = null
		this.isTeacher = false
		this.forms = []
		this.students = []
		this.activeSession = null
		this.channelRoom = null
		this.channelTimes = null
	}

	async load(roomId) {
		this.roomId = roomId
		const det = await this.SB.getSectionWithDetails(roomId)
		if (!det.success) return false
		this.room = det.data
		const role = await this.SB.checkIfUserIsTeacher(this.usuarioId, roomId)
		this.isTeacher = role.isTeacher
		await this.loadForms()
		await this.loadStudents()
		await this.loadActiveSession()
		this.subscribe()
		return true
	}

	async loadForms() {
		const f = await this.SB.getFormsBySection(this.roomId)
		this.forms = f.success ? f.data : []
	}

	async loadStudents() {
		const s = await this.SB.getSectionUsers(this.roomId, "student")
		this.students = s.success ? s.data : []
	}

	async loadActiveSession() {
		const r = await this.SB.getActiveSession(this.usuarioId, this.roomId)
		this.activeSession = r.success ? r.data : null
	}

	subscribe() {
		this.channelRoom = this.SB.subscribeToSection(this.roomId, () => {
			this.load(this.roomId)
			if (this.onUpdate) this.onUpdate()
		})
		this.channelTimes = this.SB.subscribeToUserTimes(this.roomId, () => {
			if (this.onTimesUpdate) this.onTimesUpdate()
		})
	}

	unsubscribe() {
		if (this.channelRoom) this.SB.unsubscribe(this.channelRoom)
		if (this.channelTimes) this.SB.unsubscribe(this.channelTimes)
	}

	onUpdate(f) {
		this.onUpdate = f
	}

	onTimesUpdate(f) {
		this.onTimesUpdate = f
	}

	async startSession() {
		if (this.activeSession) return this.activeSession
		const r = await this.SB.startSession(this.usuarioId, this.roomId)
		if (r.success) this.activeSession = r.data
		return r
	}

	async endSession() {
		if (!this.activeSession) return null
		const r = await this.SB.endSession(this.activeSession.id)
		if (r.success) this.activeSession = null
		return r
	}

	async createForm(name) {
		const obj = {
			name,
			room_id: this.roomId,
			created_at: new Date().toISOString()
		}
		const r = await this.SB.createForm(obj)
		if (r.success) {
			await this.loadForms()
			if (this.onUpdate) this.onUpdate()
		}
		return r
	}

	async deleteForm(id) {
		const r = await this.SB.deleteForm(id)
		if (r.success) {
			await this.loadForms()
			if (this.onUpdate) this.onUpdate()
		}
		return r
	}

	async updateRoom(changes) {
		const r = await this.SB.updateSection(this.roomId, changes)
		if (r.success) {
			await this.load(this.roomId)
			if (this.onUpdate) this.onUpdate()
		}
		return r
	}

	async enrollStudent(userId) {
		const r = await this.SB.enrollUserInSection(userId, this.roomId)
		if (r.success) {
			await this.loadStudents()
			if (this.onUpdate) this.onUpdate()
		}
		return r
	}

	async unenrollStudent(userId) {
		const r = await this.SB.unenrollUserFromSection(userId, this.roomId)
		if (r.success) {
			await this.loadStudents()
			if (this.onUpdate) this.onUpdate()
		}
		return r
	}

	async getStudentProgress(userId) {
		const r = await this.SB.getStudentProgress(userId, this.roomId)
		return r
	}

  async createRoom(data) {
    if (!data || !data.name || !data.subject_id) return { success: false }
    const r = await this.SB.createRoom({
      name: data.name,
      subject_id: data.subject_id,
      created_by: this.usuarioId,
      created_at: new Date().toISOString()
    })
    if (!r.success) return r
    this.roomId = r.data.id
    await this.load(this.roomId)
    if (this.onUpdate) this.onUpdate()
    return r
  }

	render(containerId) {
		const cont = document.getElementById(containerId)
		cont.innerHTML = ""
		const title = ExtT.createElement("h2", "", cont)
		title.textContent = this.room.name
		const info = ExtT.createElement("p", "", cont)
		info.textContent = this.isTeacher ? "Profesor" : "Estudiante"
		const fList = ExtT.createElement("div", "", cont)
		this.forms.forEach(v => {
			const item = ExtT.createElement("div", "form_item", fList)
			item.textContent = v.name
		})
	}
}

export default Room

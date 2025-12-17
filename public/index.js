import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
import Firebase from  "./objects/Firebase.js"
import Supabase from  "./objects/Supabase.js"
import Background from  "./objects/Backgraund.js" 
import ExtT from  "./objects/ExtT.js"
import Login from  "./objects/Login.js"
import Room from  "./objects/Room.js"
import Subject from  "./objects/Subject.js"
import Form from './objects/Form.js'
import Tool from './objects/Tool.js' 

// import Arpia from  "./js/Arpia.js"
// import Zorro from  "./js/Zorro.js"

const user_ico = document.getElementById('user_ico')
user_ico.src = "./img/ico/account_circle.svg"

const slidebar_top = document.getElementById('slidebar_top')
const slidebar_bottom_cont = document.getElementById('slidebar_bottom_cont')
const b_home = ExtT.buttonIco('./img/favicon.svg', 'Sobre Harpias', slidebar_top, () => {}, true)
const b_home_ico = b_home.querySelector('.button_ico') 
const b_home_level = b_home.querySelector('.button_level') 

const b_session = ExtT.buttonIco('./img/ico/session.svg', 'Sesiónes', slidebar_top, () =>{
} )

const b_student = ExtT.buttonIco('./img/ico/group.svg', 'Estudiantes', slidebar_top, () =>{
} )
const b_form = ExtT.buttonIco('./img/ico/form.svg', 'Formularios', slidebar_top, () => {
})
const b_tool = ExtT.buttonIco('./img/ico/handyman.svg', 'Herramientas', slidebar_top, () => {
})
const b_subject = ExtT.buttonIco('./img/ico/subject.svg', 'Materias', slidebar_top, () => {
})

const b_settings = ExtT.buttonIco('./img/ico/settings.svg', 'Ajustes', slidebar_bottom_cont, () => {
})

const header_right = document.querySelector('.header_right')
const header_right_text = header_right.querySelector('.button_text')
const header_right_ico = header_right.querySelector('.button_ico')

const header_left_cont = document.getElementById('header_left_cont')
const header_left_main_title = document.getElementById('main_title')
const header_left_button = ExtT.buttonIco('./img/ico/arrow_back.svg', 'Volver', header_left_cont, ()=>{})

const workplace = document.querySelector('.workplace')

function adjustHeader(menu_type) {
    workplace.innerHTML = ""
    ExtT.loaderStart()
    if (menu_type === 'home') {
        header_left_button.style.display = "none" 
        main_title.textContent = "Harpias"
        b_home_ico.src = "./img/favicon.svg" 
        b_home_level.textContent = "Sobre Harpias"        
        header_right_text.textContent = "Nueva sesión"
        return
    }
    b_home_ico.src = "./img/ico/home.svg" 
    b_home_level.textContent = "Inicio" 
    header_left_button.style.display = "none" 
    header_right.style.display = "block" 

    if (menu_type === 'subject') {        
        main_title.textContent = "Materias"
        header_right_text.textContent = "Nueva materia"
    }

    if (menu_type === 'form') {
        main_title.textContent = "Markdawn"
        header_right_text.textContent = "Nuevo ...?" 
        header_right.style.display = "none"
    }

    if (menu_type === 'tool') {
        main_title.textContent = "Python Compiler"
        header_right_text.textContent = "Nuevo ...?" 
        header_right.style.display = "none"
    }
}

adjustHeader("home")

Background.main()  
let FB = new Firebase()
let SB = new Supabase()

Login.createLoginInterface()
let login = new Login(FB.app)
login.main() 

async function syncUserToSupabase(firebaseUser) {
    try {
        const userData = {
            name: firebaseUser.displayName || 'Usuario',
            email: firebaseUser.email,
            password: 'firebase_auth',
            uid: firebaseUser.uid,
            photo_url: firebaseUser.photoURL || './img/ico/account_circle.svg',
            is_active: true,
            is_online: true
        }
        
        const existingUser = await SB.getUserByEmail(firebaseUser.email)

        if (existingUser.success && existingUser.data) {
            const updateResult = await SB.updateUser(existingUser.data.id, {
                name: userData.name,
                uid: userData.uid,
                photo_url: userData.photo_url,
                is_online: true,
                is_active: true
            })

            if (updateResult.success) {
                SB.currentUser = updateResult.data
                return updateResult.data
            }
        } else {
            const createResult = await SB.createUser(userData)

            if (createResult.success) {
                SB.currentUser = createResult.data
                return createResult.data
            }
        }
    } catch (error) {
        return null
    }
}

let authUnsubscribe = null

if (authUnsubscribe) {
    authUnsubscribe()
}

authUnsubscribe = onAuthStateChanged(login.auth, async (user) => {
    if (user) {        
        let DU = login.getUserData()
        
        const userIcon = document.getElementById('user_ico')
        if (userIcon) {
            userIcon.src = DU.photoURL || "./img/ico/account_circle.svg"
        }
        
        const supabaseUser = await syncUserToSupabase(user)        
        if (supabaseUser) {
            afterLogin(supabaseUser.id)
        }
    } else {        
        SB.currentUser = null
    }
})

let isUnloading = false

window.addEventListener('beforeunload', async (e) => {
    if (isUnloading) return
    isUnloading = true
    
    if (SB.currentUser) {
        navigator.sendBeacon(
            `${SB.supabaseUrl}/rest/v1/usuario?id=eq.${SB.currentUser.id}`,
            JSON.stringify({ is_online: false })
        )
    }
})

window.addEventListener('visibilitychange', async () => {
    if (document.visibilityState === 'hidden' && SB.currentUser) {
        try {
            await SB.setUserOnlineStatus(SB.currentUser.id, false)
        } catch (error) {
        }
    }
}) 








async function afterLogin(user_id) {
    b_home.onclick = () => {        
        adjustHeader('home')        
        header_right.onclick = null
    }

    b_session.onclick = async () => {        
        adjustHeader('session')
    }

    b_student.onclick = async () => {        
        adjustHeader('student')
    }

    b_subject.onclick = async () => {        
        adjustHeader('subject')  
        Subject.createSubjectWorkplace() 
        ExtT.loaderStart()
        const subject = new Subject(SB, user_id)
        await subject.init()
    }

    b_form.onclick = async () => {        
        adjustHeader('form')   
        const form = new Form(SB, user_id) 
        await form.init()        
    }

    b_tool.onclick = async () => {        
        adjustHeader('tool')          
        const tool = new Tool(SB, user_id)                 
    }
}
 
// afterLogin(10)
// document.getElementById("login_cont").style.display = "none" 
// b_tool.click() 
  












function openFullscreen() {
	const elem = document.documentElement
	if (elem.requestFullscreen) {
		elem.requestFullscreen()
	} else if (elem.webkitRequestFullscreen) {
		elem.webkitRequestFullscreen()
	} else if (elem.msRequestFullscreen) {
		elem.msRequestFullscreen()
	}
}

function closeFullscreen() {
	if (document.exitFullscreen) {
		document.exitFullscreen()
	} else if (document.webkitExitFullscreen) {
		document.webkitExitFullscreen()
	} else if (document.msExitFullscreen) {
		document.msExitFullscreen()
	}
}

function toggleFullscreen(element) {
    element.style.display = 'none'
	if (!document.fullscreenElement) {
		openFullscreen()
        element.src = "./img/ico/fullscreen_exit.svg"
        ExtT.changeIcoColor(element, '--c1') 
	} else {
		closeFullscreen()
        element.src = "./img/ico/fullscreen.svg"  
        ExtT.changeIcoColor(element, '--c2')
	}
    element.onload = () => {
    	element.style.display = 'block'    	
    }
}

const b_fullscreen = ExtT.buttonIco('./img/ico/fullscreen.svg', 'Pantalla completa', slidebar_bottom_cont, () => {
    toggleFullscreen(b_fullscreen.querySelector('.button_ico'))
})

function adjustSpacerWidth() {
	const sidebar = document.querySelector('.sidebar')
	const spacer = document.querySelector('.spacer')
	const sidebarWidth = sidebar.offsetWidth
	const windowWidth = window.innerWidth
	spacer.style.width = `${windowWidth - sidebarWidth}px`
}

window.addEventListener('load', adjustSpacerWidth)
window.addEventListener('resize', adjustSpacerWidth)
adjustSpacerWidth()

header_right.addEventListener('mouseover', () => {
    ExtT.changeIcoColor(header_right_ico, "--c2")
})
header_right.addEventListener('mouseout', () => {
    ExtT.changeIcoColor(header_right_ico, "--c1")
})
ExtT.changeIcoColor(header_right_ico, "--c1")
import Background from "../objects/Backgraund.js" 
import ExtT from "../objects/ExtT.js"

const rootStyles = getComputedStyle(document.documentElement)
const c1 = rootStyles.getPropertyValue('--c1').trim() 
const c2 = rootStyles.getPropertyValue('--c2').trim() 
const c3 = rootStyles.getPropertyValue('--c3').trim()
const ct = rootStyles.getPropertyValue('--ct').trim()

const menuButtonClicker = document.getElementById("menuBottonClickerMain")
const menu = document.getElementById("menuMain")
const menuIndicator = document.getElementById("menuIndicatorMain")
// const todo = ["Inicio", "Juanma", "Codigos", "Proyectos", "Herramientas", "Contacto", "Juegos"]
const todo = ["Inicio", "Codigos", "Proyectos", "Herramientas", "Contacto", "Juegos"] 
const dicTodoNum = {"Proyectos": 13, "Herramientas": 3, "Juegos": 5} 
window.typeOfUser = (/android|webos|iphone|ipad|ipod|blackberry|windows phone/i.test(navigator.userAgent.toLowerCase())) ? 1 : 0

export function ajustarTituloContenido(nombre) {
  const button = document.getElementById(nombre)
  const contenido = document.getElementById(`c${nombre}`)
  contenido.style.display = "none"
  button.addEventListener("click", ()=>{
    if (contenido.style.display == "block") {
      contenido.style.display = "none"
    } else {
      contenido.style.display = "block"
    }
  })
}

export function ajustarHover(element, img, imgHV) {
  const cont = document.querySelector(`.${element}A`)  
  const imagen = document.querySelector(`.${element}`)  
  cont.addEventListener("mouseleave", ()=>{
    imagen.src = img        
  })
  cont.addEventListener("mouseenter", ()=>{
    imagen.src = imgHV       
  })
}

function ajustarSelectorInterno(numero, nombre, sub){
  const contenidoSelector = document.querySelector(`.selecccion${nombre}`)
  contenidoSelector.style.display = "flex"  
  for (let i = 1; i <= numero; i++){
    const cont = document.querySelector(`.${sub}${i}Cont`)    
    const cardh = document.getElementById(`card${sub}${i}`)  
    cont.style.display = "none"
    cardh.addEventListener("click", ()=>{
      contenidoSelector.style.display = "none"
      cont.style.display = "block"      
    })    
  }
}

function ajustarSeccion(nombre, todo) {
  document.getElementById(`b${nombre}`).addEventListener("click", ()=>{    
    for (let i of todo){
      document.querySelector(`.cont${i}`).style.display = "none"
    }
    document.getElementById("menuButtonMain").click()
    menuIndicator.textContent = "0"
    menu.style.display = "none"  
    document.querySelector(`.cont${nombre}`).style.display = "block"
    const titulo = document.querySelector(`.titulo`)
    titulo.textContent = nombre
    document.querySelector(`.header`).style.display = "block"
    switch (nombre) {
      case "Inicio":
        document.querySelector(`.header`).style.display = "none"
        break
      case "Proyectos":
        ajustarSelectorInterno(dicTodoNum["Proyectos"], "Proyectos", "p")      
        titulo.addEventListener("click", ()=>{ 
          ajustarSelectorInterno(dicTodoNum["Proyectos"], "Proyectos", "p")
        })
        break
      case "Herramientas":        
        ajustarSelectorInterno(dicTodoNum["Herramientas"], "Herramientas", "h")
        titulo.addEventListener("click", ()=>{
          ajustarSelectorInterno(dicTodoNum["Herramientas"], "Herramientas", "h")
        }) 
        break
      case "Juegos":
        ajustarSelectorInterno(dicTodoNum["Juegos"], "Juegos", "j")
        titulo.addEventListener("click", ()=>{
          ajustarSelectorInterno(dicTodoNum["Juegos"], "Juegos", "j")  
        })
        break
      default:
        break
    }
  })
}

menuButtonClicker.addEventListener("click", ()=>{
  if (menuIndicator.textContent == "0") {
    menuIndicator.textContent = "1"    
    menu.style.display = "block"
  } else {      
    menuIndicator.textContent = "0"
    menu.style.display = "none"    
  }
})

for (let i of todo){
  ajustarSeccion(i, todo)
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("bInicio").click()  
  // document.getElementById("bJuegos").click()
  // document.getElementById("cardj1").click()
  // document.getElementById("cardj2").click()
  // document.getElementById("cardj3").click() 
  // document.getElementById("cardj4").click()
  // document.getElementById("cardj5").click() 
  document.getElementById("bProyectos").click()
  // document.getElementById("cardp1").click()     
  // document.getElementById("cardp2").click()
  // document.getElementById("cardp3").click()  
  // document.getElementById("cardp4").click() 
  // document.getElementById("cardp5").click()
  // document.getElementById("cardp6").click() 
  // document.getElementById("cardp7").click() 
  // document.getElementById("cardp8").click() 
  // document.getElementById("cardp9").click() 
  // document.getElementById("cardp10").click() 
  // document.getElementById("cardp11").click()   
  // document.getElementById("cardp12").click()    
  document.getElementById("cardp13").click()     
  // document.getElementById("bHerramientas").click()                
  // document.getElementById("cardh1").click()  
  // document.getElementById("cardh2").click()
  // document.getElementById("cardh3").click()  
  // document.getElementById("bJuanma").click()
  // document.getElementById("bCodigos").click()        
  // document.getElementById("bContacto").click()  
  // document.getElementById("menuButtonMain").click()    
  try {
    var urlActual = window.location.href.split("/");    
    switch (urlActual[urlActual.length - 1].toString().toLowerCase()) {
      case "projects":
        document.getElementById("bProyectos").click()    
        document.getElementById("menuButtonMain").click()        
        break
      case "fanctal":
        document.getElementById("bProyectos").click()    
        document.getElementById("menuButtonMain").click()
        document.getElementById("cardp11").click()
        break
      case "bernoulli":
        document.getElementById("bProyectos").click()    
        document.getElementById("menuButtonMain").click()
        document.getElementById("cardp10").click()      
        break
      case "sorting":   
        document.getElementById("bProyectos").click()    
        document.getElementById("menuButtonMain").click()
        document.getElementById("cardp12").click()
        break
      case "thc":        
        document.getElementById("bProyectos").click()    
        document.getElementById("menuButtonMain").click()
        document.getElementById("cardp1").click()
        break      
      case "hillcipher":        
        document.getElementById("bProyectos").click()    
        document.getElementById("menuButtonMain").click()
        document.getElementById("cardp1").click()
        break
      case "matrixcross":        
        document.getElementById("bProyectos").click()    
        document.getElementById("menuButtonMain").click()
        document.getElementById("cardp13").click()
        break
      default:
        break
      }      
  } catch (_) {}
}) 

document.querySelectorAll('.input-group input[type=number]').forEach(input => {
  const controls = document.createElement('div')
  controls.classList.add('custom-controls')
  const up = document.createElement('button')   
  up.innerHTML = `<svg viewBox="0 0 24 24" fill="${c1}"><path d="M12.07,21.51c5.06,0,7.24,1.48,7.82,0S18.51,18,16,11.6s-2.75-9.91-3.91-9.91S10.69,5.18,8.15,11.6,3.66,20,4.24,21.51,7,21.51,12.07,21.51Z"/></svg>`
  const down = document.createElement('button')
  down.innerHTML = `<svg viewBox="0 0 24 24" fill="${c1}"><path d="M12.07,2.35c5.06,0,7.24-1.48,7.82,0S18.51,5.84,16,12.26s-2.75,9.91-3.91,9.91-1.38-3.49-3.92-9.91S3.66,3.83,4.24,2.35,7,2.35,12.07,2.35Z"/></svg>` 
  controls.appendChild(up)
  controls.appendChild(down)
  input.parentNode.appendChild(controls)
  up.addEventListener('click', () => {
    input.stepUp()
    input.dispatchEvent(new Event("input"))
  })
  down.addEventListener('click', () => {
    input.stepDown()
    input.dispatchEvent(new Event("input"))
  })
})

document.addEventListener('wheel', e => {
   if(e.target.type === 'range'){
      e.preventDefault()
      let v = Number(e.target.value)
      e.target.value = v + (e.deltaY < 0 ? 1 : -1)
      e.target.dispatchEvent(new Event('input', {bubbles:true}))
   }
}, {passive:false})

document.addEventListener('keydown', e => {
   if(document.activeElement.type === 'range'){
      let el = document.activeElement
      let v = Number(el.value)
      if(e.key === 'ArrowUp'){
         el.value = v + 0.5
         el.dispatchEvent(new Event('input', {bubbles:true}))
      }
      if(e.key === 'ArrowDown'){  
         el.value = v - 0.5
         el.dispatchEvent(new Event('input', {bubbles:true}))
      }
   }
})



Background.main()

// import React, { useEffect, useState, useRef, createElement as h } from "https://esm.sh/react@18"
// import ReactDOM from "https://esm.sh/react-dom@18"
// import { BrowserRouter, Routes, Route, useParams, useNavigate } from "https://esm.sh/react-router-dom@6"
 
// function SectionRouter() {
//    const { id } = useParams()
//    const navigate = useNavigate()
//    useEffect(() => {
//       const routes = { sorting: "/tools/sorting", about: "/about-me" }
//       if (routes[id]) navigate(routes[id], { replace: true })
//       else navigate("/not-found", { replace: true })
//    }, [id])
//    return null
// }

// function SortingTool() { return h("div", null, "Sorting section") }
// function AboutMe() { return h("div", null, "About me section") }
// function NotFound() { return h("div", null, "404 not found") }

// function App() {
//    return h(BrowserRouter, null,
//       h(Routes, null,
//          h(Route, { path: "/:id", element: h(SectionRouter) }),
//          h(Route, { path: "/tools/sorting", element: h(SortingTool) }),
//          h(Route, { path: "/about-me", element: h(AboutMe) }),
//          h(Route, { path: "/not-found", element: h(NotFound) })
//       )
//    )
// }

// ReactDOM.createRoot(document.getElementById("root")).render(h(App))
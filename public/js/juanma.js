import { ajustarTituloContenido, ajustarHover } from "./index.js"
    
ajustarTituloContenido("jqs")
ajustarTituloContenido("jlqph")
ajustarTituloContenido("jlqph_p")
ajustarTituloContenido("jlqph_d")
ajustarTituloContenido("jlqph_o")
ajustarTituloContenido("jlqhh")
ajustarTituloContenido("jlqhh_icfes")
ajustarTituloContenido("jlqhh_arcur")

const jt11 = document.getElementById("jt11")
const jt21 = document.getElementById("jt21")
const jt31 = document.getElementById("jt31")

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))    
}

function random(max) {
    return parseInt(Math.random()*max)    
}

const img = document.createElement("img")    
img.classList.add("icoLenguajes")

jt31.appendChild(img)  

while (true) {
    const colStr = "0123456789ABCDEF"        
    var rand = `#${colStr[random(16)]}${colStr[random(16)]}${colStr[random(16)]}`
    jt11.style.color = rand    
    jt21.textContent = String.fromCodePoint(`0x1F6${colStr[random(6)]}${colStr[random(16)]}`)
    const imgSrc = ["./img/word.svg", "./img/excel.svg", "./img/powerPoint.svg", "./img/word.svg", "./img/publisher.svg"]    
    img.src = imgSrc[random(5)]            
    await delay(100)   
}
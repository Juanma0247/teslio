import Background from "../objects/Backgraund.js" 
import ExtT from "../objects/ExtT.js"
import DataBase from "../objects/DataBase.js"
import Arpia from "../js/Arpia.js"
import Zorro from "../js/Zorro.js"

Background.main()
let db = new DataBase()

const zorro = new Zorro(db)
zorro.main()

window.typeOfUser = (/android|webos|iphone|ipad|ipod|blackberry|windows phone/i.test(navigator.userAgent.toLowerCase())) ? 1 : 0
 

const contArpia = document.getElementById('contArpia')
const contZorro = document.getElementById('contZorro')

const loginArpia = document.getElementById('loginArpia')
const loginPanel = document.getElementById('loginPanel')
const lpi1 = document.getElementById('lpi1')
const lpb1 = document.getElementById('lpb1')
const lpb2 = document.getElementById('lpb2')

lpi1.addEventListener("input", e => {
   e.target.value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "")
})

lpb1.addEventListener('click', () => {
    console.log(lpi1.value)
    if (lpi1.value == "") {
        loginPanel.classList.remove('active')
        contArpia.style.display = "block"
        contZorro.style.display = "none"
        const arpia = new Arpia(db)
        arpia.main()
    }
})

loginArpia.addEventListener('click', () => {
   loginPanel.classList.add('active')
})

lpb2.addEventListener('click', () => {
   loginPanel.classList.remove('active')
})
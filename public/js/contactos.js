import { ajustarTituloContenido, ajustarHover } from "./index.js"
    
ajustarHover("whatsApp", "./img/whatsapp.svg", "./img/whatsappHV.svg")
ajustarHover("gmail", "./img/gmail.svg", "./img/gmailHV.svg")
ajustarHover("discord", "./img/discord.svg", "./img/discordHV.svg")

const discord = document.querySelector(".contDiscord")
const discordCont = document.querySelector(".discrodInfoCont")
const discordImg = document.querySelector(".discordImg")

discord.addEventListener("click", ()=> {    
    discordCont.style.display = (discordCont.style.display == "block") ? "none" : "block"
})

discordImg.addEventListener("click", () => {
    navigator.clipboard.writeText("juanma247")  
    alert("Id del perfil copiado correctamente.")
})
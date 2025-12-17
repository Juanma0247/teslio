import J3 from "../objects/J3.js"
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const dfltH = window.typeOfUser ? 12 : 10
const dfltW = window.typeOfUser ? 8 : 24

async function setDocument(id, campos, colection, db) {  
  try {        
    await setDoc(doc(collection(db, colection), id), campos);    
    return true
  } catch (e) {  
    alert(`Error: ${e}`)     
    return false
  }
}

async function getCollection(colection, db) {
  try {
    const res = {};
    const querySnapshot = await getDocs(collection(db, colection))
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const contenido = {}
      for (const key in data) {
        const value = data[key];                
        contenido[key] = value                
      }
      res[doc.id] = contenido      
    });    
    return res;
  } catch (e) {
    alert(`Error: ${e}`)    
  }
}

class J3_ { // Minesweeper    
    constructor () {
        this.i1 = document.getElementById("j3i1")
        this.i2 = document.getElementById("j3i2")
        this.i3 = document.getElementById("j3i3")
        this.b1 = document.getElementById("j3b1") 
        this.t1 = document.getElementById("j3t1") 
        this.p3 = document.getElementById("j3p3")
        this.b2 = document.getElementById("j3b2")
        this.ngi1 = document.getElementById("j3ngi1")
        this.ngi2 = document.getElementById("j3ngi2")
        this.ngb1 = document.getElementById("j3ngb1")
        this.grid = document.querySelector(".j3Grid")
        this.options = document.querySelector(".j3Options")        
        this.newGamer = document.querySelector(".j3NewGamer")
        this.statistics = document.querySelector(".j3Statistics")
        this.game = null
        this.id = null
        this.documents = null
    }
    
    createGame(heightBoard, widthBoard, data, seconds, score) {      
        if (this.game) {    
            this.game.deleteGame()
            this.game = null
        }        
        if (data) {               
            this.game = new J3(heightBoard, widthBoard, data, seconds, score)              
            this.game.restart()
            this.game.placeGame(data)            
            this.game.setStatistics()
        } else {
            this.game = new J3(heightBoard, widthBoard)                       
            this.game.restart()
            this.game.setMines()
            this.game.setValues()
            this.game.setGame()
            this.game.setStatistics() 
        }        
        this.i1.value = heightBoard
        this.i2.value = widthBoard
        return this.game
    }
    
    async addGamer(db) { 
      if (!this.ngi1.value) {
        alert("Debe ingresar un nombre")
        return
      }
      if (this.ngi2.value.length != 4) {
          alert("El codigo debe tener 4 caracteres numericos")
          return
      }
      const randNum = () => Math.floor(Math.random() * 10)
      const formName = (name) => name.split(" ").map((n) => n[0].toUpperCase()).join("")
      const password = formName(this.ngi1.value) + this.ngi2.value                  
      this.ngi2.value = `${randNum()}${randNum()}${randNum()}${randNum()}`                          
      const id = password
      const name = this.ngi1.value          
      if (this.documents[id]) {
          alert("El usuario ya existe")
          this.ngi2.value = `${randNum()}${randNum()}${randNum()}${randNum()}`
      } else {
          const res = await setDocument(id, {
              "password": password,
              "name": name,
              "game": "",
              "time": 0,
              "score": 0
          }, "juanma_co_minesweeper_gamers", db)
          if (res) {
              alert(`Almacene o memorice bien su id de jugador: ${password}`)
              this.grid.style.display = "block"
              this.options.style.display = "block"
              this.statistics.style.display = "block" 
              this.newGamer.style.display = "none" 
              this.documents = await getCollection("juanma_co_minesweeper_gamers", db)
              this.loadMensage()
              this.i3.value = id 
          }
      }
    }
    
    loadMensage() {      
      const mensajes = ["Tú puedes, ",                  
        "A por la victoria, ",
        "Cree en ti mismo, ",        
        "Haz historia hoy, ",        
        "Es tu día, ",        
        "Diviértete, ",
        "Haz que cuente, ",
        "Juega con pasión, ",        
        "Hazlo increíble, ",
        "Mantén el enfoque, ",        
        "Hazlo por diversión, ",
        "Vas a sorprendernos, ",        
        "Eres imparable, ",
        "Eres pura energía, ",        
        "Nunca te rindas, ",
        "Hazlo épico, ",
        "Vas a lograrlo, ",
        "A romper récords, ",   
        "Sigue avanzando, ",
        "El éxito te espera, ",
        "Vamos con todo, ",
        "A brillar, ",
        "Es tu juego, ",
        "A demostrar tu magia, ",    
        "A dejarlo todo, "]
      const ma = Math.floor(Math.random() * mensajes.length)
      this.t1.textContent = `${mensajes[ma]}${this.documents[this.i3.value]["name"].split(" ")[0]}`
      console.log(this.t1.textContent)     
    }

    async main () {      
        const db = getFirestore(initializeApp({
            apiKey: "AIzaSyA-FjN6g5NSdmnmChCnGXiPJby4WwIZjRY",
            authDomain: "my-page-76aa2.firebaseapp.com",
            projectId: "my-page-76aa2",
            storageBucket: "my-page-76aa2.firebasestorage.app",
            messagingSenderId: "794663582673",
            appId: "1:794663582673:web:830862e5d1d7a90bd03ef0",
            measurementId: "G-PDJCCQTD82"
        }));                
        
        const toString = (a) => JSON.stringify(a)
        const toArray = (s) => JSON.parse(s)        
        this.documents = await getCollection("juanma_co_minesweeper_gamers", db)
        this.game = this.createGame(dfltH, dfltW)
        
        this.p3.addEventListener("click", () => {
          this.grid.style.display = "none"
          this.options.style.display = "none"
          this.statistics.style.display = "none"
          this.newGamer.style.display = "block" 
          this.t1.textContent = "Regístrese"     
        }) 
        
        this.ngb1.addEventListener("click", async () => { 
            this.addGamer(db)
        })         
        
        this.b2.addEventListener("click", async () => {
            if (this.b2.textContent.toLowerCase() == "cargar") {
                if (!this.documents[this.i3.value]) {
                    alert("El usuario no existe")                    
                    return 
                } else {
                  try {
                    const data = toArray(this.documents[this.i3.value]["game"])
                    const w = data[0].length
                    const h = data.length 
                    this.id = this.i3.value
                    this.b2.textContent = "GUARDAR PARTIDA"
                    this.loadMensage()
                    this.game = this.createGame(h, w, data, this.documents[this.i3.value]["time"], this.documents[this.i3.value]["score"]) 
                  } catch (e) {
                    this.id = this.i3.value  
                    this.b2.textContent = "GUARDAR PARTIDA"
                    this.game = this.createGame(dfltH, dfltW) 
                    this.loadMensage()  
                    alert("El jugador no tiene un juego guardado")
                  }              
                }
            } else {              
              console.log(this.id) 
              const res = await setDocument(this.id, {
              "game": toString(this.game.data),
              "time": this.game.seconds,
              "score": this.documents[this.i3.value]["score"] + this.game.score,
              "password": this.documents[this.i3.value]["password"],
              "name": this.documents[this.i3.value]["name"]
              }, "juanma_co_minesweeper_gamers", db)
              if (res) {
                  alert(`Juego guardado correctamente`)
              }
            }
        })
        
        this.i3.addEventListener("input", () => {
          this.b2.textContent = "CARGAR"
        })  
                
        this.b1.addEventListener("click", () => {
            this.createGame(this.i1.value ? this.i1.value : dfltH,
                this.i2.value ? this.i2.value : dfltW)
            try {
              this.loadMensage()
            } catch (_) {  
              this.t1.textContent = "Minesweeper"
            }              
        })
    }
}

export default J3_
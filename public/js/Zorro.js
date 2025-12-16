import ExtT from "../objects/ExtT.js"
import Content from "../js/Content.js" 

class Zorro {
    constructor(dataBase) {      
      this.zorro = document.getElementById("contZorro")
      this.zh1 = document.getElementById("zh1")
      this.zList = document.getElementById("zList")
      this.esb1 = document.getElementById("esb1")
      this.loged = false

      this.colection = "cristian"

      this.db = dataBase

      this.wakeLock = null

      this.isOut = false
    }

    async getDataOne(f) {
      this.db.getCollection(this.colection, data => {
          f(data)
      })
    }
  
    diffInSeconds(d1, d2) {
      return Math.abs((new Date(d2) - new Date(d1)) / 1000)
    }

    async updateTime(id, isIn) { 
      this.getDataOne(async (data) => {
        try {
          let prev = data[id]["times"] || ""  
          let now = new Date()
          if ((prev.endsWith(";") && isIn) || prev.endsWith(",") && !isIn) {
            return
          }
          let end = prev.endsWith(";") && !isIn ? "," : ";"  
          this.db.updateDocument(this.colection, id, {
          times: `${prev}${now.toISOString()}${end}`})       
        } catch (e) {
          if (e.message && e.message.includes("times")) {
            location.reload()
          }            
        }          
      })
    }

    formData(str) {
      return str.split("\n").map(line => line.trim()).filter(line => line.length > 0)
    }

    showList() {
      this.getDataOne(async (data) => {
        if (Object.keys(data).length != 0) {            
          this.zList.innerHTML = "" 
          for (let key in data) {            
            if (
              (!data[key]["times"] || data[key]["times"].endsWith(","))  
              && !document.getElementById("z" + key.replace(/ /g, "_"))
              && !data[key]["section"].includes(";") 
              ) {
              this.loged = true              
              const div = document.createElement("div")                 
              div.classList.add("zListItem") 
              div.key = "z" + key.replace(/ /g, "_")
              const par = document.createElement("p")
              par.textContent = key                               
              par.addEventListener("click", () => {     
                ExtT.confirmDialog(`Iniciarás como ${key}.`).then(conf0=>{ 
                  this.requestWakeLock()   
                  if(conf0){              
                    this.updateTime(key)
                    let cont = new Content()
                    cont.main()
                    this.zorro.style.display = "none"
                    this.eye(key) 
                    let now = new Date()    
                    this.db.updateDocument(this.colection, key, {section: now.toISOString()}, ()=> {                  
                      this.esb1.addEventListener("click", () => { 
                        ExtT.confirmDialog('¿Estás seguro de finalizar la sección?').then(conf1=>{
                          if(conf1){ 
                            let endNow = new Date()  
                            this.db.updateDocument(this.colection, key, {section: `${now.toISOString()};${endNow.toISOString()}`}, 
                              () => {
                                location.reload() 
                              }
                            )
                          }
                        });                   
                      })    
                    })                                
                  }
                })                
              });               
              div.appendChild(par)
              this.zList.appendChild(div) 
            }            
          } 
          this.zh1.innerHTML = "Seleccione su nombre."
        } else {
          this.zh1.innerHTML = "Esperé a que dé inicio la sección."  
        }          
      })
    }

    setOut(key) {
      if (!this.isOut) {
        this.updateTime(key, false)  
        this.isOut = true
      } 
    }

    setIn(key) {
      if (this.isOut) {
        this.updateTime(key, true)  
        this.isOut = false
      } 
    }

    eye(key) {     
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) { this.setOut(key) } else { this.setIn(key) }  
      })  
      document.addEventListener("click", (event) => {
        this.setIn(key)         
      })
      window.addEventListener("beforeunload", () => {
        this.setOut(key)
      }) 
      window.addEventListener("unload", () => {
        this.setOut(key)
      })
      window.addEventListener("pagehide", () => {
        this.setOut(key)
      })
      window.addEventListener("pageshow", () => {
        this.setIn(key)
      })      
      window.addEventListener("blur", () => {
        this.setOut(key)
      })
      window.addEventListener("focus", () => {
        this.setIn(key)
      })
      window.addEventListener("offline", () => {
        this.setOut(key) 
      })
      window.addEventListener("online", () => {
        this.setIn(key)
      })            
    }    

    async requestWakeLock() {
      try {
          this.wakeLock = await navigator.wakeLock.request('screen')
          this.wakeLock.addEventListener('release', () => {            
          })
      } catch (err) {
          alert("Reinicie la página, su dispositivo podría apagarse automáticamente por suspensión durante la sección.")
      }
    }

    releaseWakeLock() { 
      if (this.wakeLock) {
          this.wakeLock.release()
          this.wakeLock = null 
      }
    }

    main() {
      this.db.onChangeDocs(this.colection, (changedDocs) => {     
        // if (!this.loged) {
          this.showList()          
        // }                                   
      })

      this.showList()
      this.requestWakeLock()    
    }
}

export default Zorro
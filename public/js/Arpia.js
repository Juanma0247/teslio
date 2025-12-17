import ExtT from "../objects/ExtT.js"
import Content from "../js/Content.js"

class Arpia {         
    constructor(dataBase) {      
      this.ata1 = document.getElementById("ata1")
      this.ab1 = document.getElementById("ab1")
      this.ab2 = document.getElementById("ab2")
      this.aList = document.getElementById("aList")

      this.colection = "cristian"

      this.db = dataBase
    }

    async onChangeDoc(f) {
      this.db.onChangeDocs(this.colection, (changedDocs) => {                 
        const modified = changedDocs
            .filter(doc => doc.type === "modified") 
            .map(doc => doc.id)        
        for (let i of modified) {                    
          f(i)
        }
      })
    }

    async getDataOne(f) {
      this.db.getCollection(this.colection, data => {
          f(data)
      })
    }    
  
    initReport() {       
      this.getDataOne(async (data) => {
        ExtT.confirmDialog(`¡CUIDADO! Eliminarás todos los datos luego de generar el reporte.`).then(async (conf0)=>{    
          if(conf0){              
            const { jsPDF } = window.jspdf
            const doc = new jsPDF() 
            const response = await fetch("font/productSans_bold.ttf") 
            const buffer = await response.arrayBuffer()
            const base64String = btoa(
              new Uint8Array(buffer).reduce((data0, byte) => data0 + String.fromCharCode(byte), "")
            )
            doc.addFileToVFS("ps.ttf", base64String)
            doc.addFont("ps.ttf", "ps", "normal") 
            doc.setFont("ps") 
            let y = 20
            doc.setFontSize(12) 
            doc.setTextColor(0, 128, 128)
            doc.text("Tiempo fuera.", 10, 10)
            doc.text(`NOMBRE`, 10, y) 
            doc.text(`TIEMPO`, 110, y)
            doc.text(`VECES`, 150, y)  
            y += 10 
            doc.setTextColor(0, 0, 0)
            for (let key in data) { 
                const times = data[key]["times"] || ""
                if (!times) continue        
                const groups = times.split(",")                
                let total = 0
                for (let i = 0; i < groups.length - 1; i++) {
                  const endPrev = groups[i].split(";")[1]
                  const startNext = groups[i + 1].split(";")[0]
                  if (endPrev && startNext) {
                      total += ExtT.diffInSeconds(endPrev, startNext)
                  }
                } 
                if (total > 0) { 
                  doc.text(`${ExtT.capitalizeName(key)}`, 10, y)
                  doc.text(`${ExtT.formatTime(total)}`, 110, y)  
                  doc.text(`${groups.length - 2}`, 150, y)   
                  y += 10
                }
                if (y > 280) {
                  doc.addPage()
                  y = 20
                }
            } 
            doc.addPage()
            y = 20
            doc.setTextColor(0, 128, 128)
            doc.text("Tiempo en sección.", 10, 10)            
            doc.text(`NOMBRE`, 10, y)
            doc.text(`INICIO`, 110, y)
            doc.text(`FINAL`, 130, y)
            doc.text(`TOTAL`, 150, y)
            doc.setTextColor(0, 0, 0)
            y += 10 
            for (let key in data) {
                const section = data[key]["section"] || ""
                doc.text(`${ExtT.capitalizeName(key)}`, 10, y)
                console.log(section)
                if (section.includes(";")) {
                  const sectionList = section.split(";")                                     
                  doc.text(`${ExtT.extractHHMM(sectionList[0])}`, 110, y)                   
                  doc.text(`${ExtT.extractHHMM(sectionList[1])}`, 130, y)  
                  console.log(ExtT.extractHHMM(sectionList[1]) )
                  doc.text(`${ExtT.formatTime(ExtT.diffInSeconds(sectionList[0], sectionList[1]))}`, 150, y)
                } else if (section != "") {
                  doc.text(`${ExtT.extractHHMM(section)}`, 110, y)   
                  doc.text("0", 130, y)
                  doc.text("0", 150, y)
                } else {
                  doc.text("0", 110, y) 
                  doc.text("0", 130, y)
                  doc.text("0", 150, y)  
                } 
                y += 10
                if (y > 280) { 
                  doc.addPage()
                  y = 20
                }
            }
            
            doc.save("reporte.pdf") 
            this.db.deleteAllDocuments(this.colection, ()=>{
              location.reload()
            }) 
          }
        })         
      })
    }

    formData(str) { 
      return str.split("\n").map(line => line.trim()).filter(line => line.length > 0)
    }    

    addElement(data, key, type, element = null) {      
      const div = document.createElement("div")
      div.classList.add("aListItem")
      div.id = "a" + key.replace(/ /g, "_")
      const par = document.createElement("p")            
      par.textContent = key
      const stat = document.createElement("p")  
      stat.classList.add("aListStatus")      
      switch (type) {
        case "logeds":
          div.style.background = "#080"
          stat.style.background = "#080" 
          stat.textContent = "online"  
          break
        case "logouts":
          div.style.background = "#f00"
          stat.style.background = "#f00"
          window.scrollTo({ top: 0, behavior: "smooth" })
          window.scrollTo(0, 0)
          if (element == key) { ExtT.playSound("./song/ding.mp3") } 
          let timeoutVal = data[key]["times"].split(",").slice(-2, -1)[0].split(";")[1]
          let updateStat = () => {
            stat.textContent = `${ExtT.formatTime(ExtT.diffInSeconds(timeoutVal, new Date()))} fuera`
          } 
          updateStat()
          let intervalId = setInterval(updateStat, 1000)      
          const observer = new MutationObserver(() => {
            if (!document.body.contains(stat)) {
              clearInterval(intervalId);
              observer.disconnect();
            }
          });
          observer.observe(document.body, { childList: true, subtree: true });          
          
          break
        case "finifheds": 
          div.style.background = "#088"
          stat.style.background = "#088" 
          stat.textContent = "finalizó"
          break
        default:
          stat.textContent = ""
          break          
      }      
      div.appendChild(par)
      div.appendChild(stat)       
      this.aList.appendChild(div)       
    }

    updateList(element = null) {
      this.getDataOne(async (data) => {    
        this.aList.innerHTML = "" 
        let names = ""
        let logeds = {}
        let logouts = {}
        let finifheds = {}
        let others = {}

        for (let key in data) {   
            names += key + "\n" 
            let isFinishid = data[key]["section"].includes(";")
            if (data[key]["times"].endsWith(";") && !isFinishid) {          
              logeds[key] = data[key]
            } else if (data[key]["times"].endsWith(",") && !isFinishid) {
              logouts[key] = data[key]
            } else if (isFinishid) {
              finifheds[key] = data[key]
            } else { 
              others[key] = data[key]  
            }
        }

        this.ata1.value = names.trim() 

        for (let key in logouts) { 
          this.addElement(data, key, "logouts", element)            
        }            
        for (let key in logeds) { 
          this.addElement(data, key, "logeds", element)            
        }
        for (let key in finifheds) { 
          this.addElement(data, key, "finifheds", element)     
        }       
        for (let key in others) {           
          this.addElement(data, key, "others", element)            
        }                

        if (element) {          
          const item = document.getElementById("a" + element.replace(/ /g, "_"))          
          this.aList.insertBefore(item, this.aList.firstChild)
        }
        
      })
    }

    async requestWakeLock() {
      try {
          this.wakeLock = await navigator.wakeLock.request('screen')
          this.wakeLock.addEventListener('release', () => { })          
      } catch (err) {
          alert("Reinicie la página.")
      }
    }

    releaseWakeLock() {
      if (this.wakeLock) {
          this.wakeLock.release()
          this.wakeLock = null
      }
    }

    main() {            
      this.ata1.addEventListener("input", () => {
        const start = this.ata1.selectionStart
        const end = this.ata1.selectionEnd

        this.ata1.value = this.ata1.value
            .toUpperCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/[^A-Z \n]/g, "")

        this.ata1.setSelectionRange(start, end)
      })

      this.ab1.addEventListener("click", async () => {
        let taData = this.formData(this.ata1.value) 
        if (taData.length != 0) {
          this.getDataOne(async (data) => {
            for (let i of taData) { 
              if (!data[i]) {
                this.db.setDocument(this.colection, i, {times: "", section: ""}) 
              }
            }
            this.ab1.disabled = true
            setTimeout(() => {
              this.getDataOne(async (data) => {    
                this.aList.innerHTML = "" 
                for (let key in data) {
                  try {                
                    if (!taData.includes(key)) {
                      await this.db.delDocument(key, this.colection, `¿Eliminar ${key}?`)
                    } else {
                      const p = key
                      const div = document.createElement("div")
                      div.classList.add("aListItem")
                      div.id = "a" + p.replace(/ /g, "_") 
                      const par = document.createElement("p")
                      par.textContent = p
                      div.appendChild(par)  
                      this.aList.appendChild(div)
                    }
                  } catch (error) {
                    console.log(taData.includes(key), error)
                  }              
                }
                this.ab1.disabled = false
              })
            }, 3000)
          })          
        } else {
          alert("Ingrese al menos un participante.")
        }
      })

      this.ab2.addEventListener("click",()=> { 
        this.initReport()
      })

      this.updateList()

      this.onChangeDoc(element => {
        this.updateList(element)        
      }) 

      this.requestWakeLock()   
      console.log(`
        ANA SOFIA GIRALDO FRANCO
        ANDRES SEBASTIAN GUEVARA ORTIZ
        CAMILO ANDRES JAIME ROJAS
        DANIEL ALEJANDRO BERRIO RESTREPO 
        DANIEL FELIPE CASTELLANOS ARIAS
        JEISSON ANDRES CARVAJAL RAMIREZ
        JUAN DAVID BARCO RUIZ
        JUAN JOSE GALINDO MARQUEZ
        JUAN JOSE VALENCIA MONTES
        JUAN MANUEL DIAZ GOMEZ
        LEIDY ESTEFANIA LOPEZ MONTES
        MATIAS SILVA PALOMO
        PAULA VALENTINA BARBOSA CAMACHO
        SANTIAGO ESCARRAGA VALLEJO
        SEBASTIAN RODRIGUEZ GIRALDO
        THOMAS GIRALDO AGUIRRE
        THOMAS JARAMILLO AGUIRRE
        VALENTINA CASTANEDA HENAO
        VANESSA OSORIO AGUDELO
        `)       
    }
}

export default Arpia

class ExtT {
    static tex(res, id) {          
        if (typeof id === "string") {             
            katex.render(res, document.getElementById(id),{
                throwOnError: false
            }); 
        } else {            
            katex.render(res, id,{
                throwOnError: false
            });
        }        
    }

    static addTexToElement(res, contId, id_) {  
        const dv = document.createElement("div")         
        if (typeof id === "string") {                 
            katex.render(res, dv,{
                throwOnError: false
            }); 
        } else { 
            katex.render(res, dv,{  
                throwOnError: false
            });
        }        
        document.getElementById(contId).append(dv)
    }
    
    static createElement(type, styleClass, to) {
        const res =  document.createElement(type)
        if (styleClass != "") { 
            res.classList.add(styleClass)
        }        
        if (to != "") {
            to.appendChild(res)    
        }        
        return res
    }
    
    static fillSVG(img, color, styleClass) {                    
        const parent = img.parentElement
        const div = this.createElement("div", styleClass, "")                                
        fetch(img.src + "")
          .then(response => response.text())
          .then(svgText => {
            div.innerHTML = svgText;        
            const path = div.querySelector('svg').querySelectorAll("path")       
            for (let i of path) {
              i.style.fill = color
            }
        });         
        parent.replaceChild(div, img)        
    }
    
    static block(element, id) {  
        const overlay = document.createElement("div")
        if (id) {
            overlay.id = id
        }
        overlay.style.position = "absolute"
        overlay.style.top = "0"
        overlay.style.left = "0"
        overlay.style.width = "100%"
        overlay.style.height = "100%"                
        overlay.style.zIndex = "9999"
        overlay.style.cursor = "default"
        overlay.style.background = "rgba(0, 0, 0, 0)"
        element.appendChild(overlay)
    }
    
    static unlock(element, id) {  
        element.removeChild(element.getElementById(id))
    }

    static eventListenerAddElement(e, f) {
        const observer = new MutationObserver(function(mutationsList, observer) {
            mutationsList.forEach(function(mutation) {                
                if (mutation.type === 'childList') {
                    f() 
                    console.log('Se ha agregado un nuevo elemento:', mutation.addedNodes);
                    alert('Nuevo elemento agregado!');
                }
            });
        });        
        observer.observe(e, { childList: false });
    }

    static restrictNI(input, start, end, set) { // Restrict Numeric Imput
        input.addEventListener("keydown", e => {
            if (e.key === "ArrowDown" && input.value.trim() === "") {
                input.value = end
                e.preventDefault()
            }
        })
        input.addEventListener("input", ()=> {
            let value = input.value.trim()            
            if (!/^-?\d*\.?\d*$/.test(value)) {
                input.value = value.slice(0, -1)
                return
            }
            if (value === "" || value === "-" || value === ".") return
            let num = Number(value)            
            if (set === "N" && (!Number.isInteger(num) || num < 0)) {
                input.value = ""
                return
            }
            if (set === "Z" && !Number.isInteger(num)) {
                input.value = ""
                return
            }
            if (set === "Q" && isNaN(num)) {
                input.value = ""
                return
            }            
            if (num < start || num > end) {
                input.value = ""
                return
            }
        })
    }

    static ajustarTituloContenido(nombre) {
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

    static ajustarHover(element, img, imgHV) {        
        const imagen = document.getElementById(`${element}`)  
        imagen.addEventListener("mouseleave", ()=>{
            imagen.src = img        
        })
        imagen.addEventListener("mouseenter", ()=>{
            imagen.src = imgHV        
        })
    }

    static nowDate() {
        const now = new Date()
        const year = now.getFullYear()
        const month = String(now.getMonth() + 1).padStart(2, "0")
        const day = String(now.getDate()).padStart(2, "0")
        const hours = String(now.getHours()).padStart(2, "0")
        const minutes = String(now.getMinutes()).padStart(2, "0")
        const seconds = String(now.getSeconds()).padStart(2, "0")
        const millis = String(now.getMilliseconds()).padStart(3, "0")

        return `${year}${month}${day}${hours}${minutes}${seconds}${millis}`
    }
    
    static playSound(src) {
      const audio = new Audio(src);
      audio.play();
    }  

    static confirmDialog(message){
        return new Promise((resolve)=>{
            const result = window.confirm(message);
            resolve(result);
        });
    }

    static extractHHMM(timeStr) {      
        const date = new Date(timeStr)
        let hours = date.getHours()
        let minutes = date.getMinutes()     
        hours = hours % 12
        hours = hours ? hours : 12 
        const hh = String(hours).padStart(2, "0") 
        const mm = String(minutes).padStart(2, "0")

        return `${hh}:${mm}`;
    }

    static formatTime(seconds) {
      const units = [
          ["a", 365 * 24 * 3600],
          ["M", 30 * 24 * 3600],
          ["d", 24 * 3600],
          ["h", 3600],
          ["m", 60],
          ["s", 1]
      ]
      let parts = []
      let remaining = seconds
      for (let i = 0; i < units.length; i++) {
          const [label, length] = units[i]
          if (label === "s") {
            if (remaining < 60) {
                parts.push(`${remaining.toFixed(2)}${label}`)
            } else {
                parts.push(`${Math.floor(remaining)}${label}`)
            }
            break
          }
          const value = Math.floor(remaining / length)
          if (value > 0) {
            parts.push(`${value}${label.toLowerCase()}`)
            remaining -= value * length
          }
          if (parts.length === 2) break    
      }
      return parts.join(" ")
    }

    static diffInSeconds(d1, d2) {
      return Math.abs((new Date(d2) - new Date(d1)) / 1000)
    } 

    static capitalizeName(name) {
        return name
            .toLowerCase()
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
    }

    static async loadSvgAsBase64Png(path) {
        const response = await fetch(path)
        const svgText = await response.text()        
        const img = new Image()
        const svgBlob = new Blob([svgText], { type: "image/svg+xml" })
        const url = URL.createObjectURL(svgBlob)
        return new Promise((resolve) => {
            img.onload = () => {
            const canvas = document.createElement("canvas")
            canvas.width = img.width
            canvas.height = img.height
            const ctx = canvas.getContext("2d")
            ctx.drawImage(img, 0, 0)
            const base64 = canvas.toDataURL("image/png")
            URL.revokeObjectURL(url)
            resolve(base64)
            }
            img.src = url
        })
    }

    static remToPx(rem) {
        return rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
    }

    static buttonIco(icoPath, level, to, on_click) {
        const container = document.createElement("div")
        container.classList.add("button_container")
        
        const button = document.createElement("button")
        button.classList.add("button_button")
        
        const img = document.createElement("img")
        img.classList.add("button_ico")
        img.src = icoPath        
        
        button.appendChild(img)
        button.addEventListener("click", on_click)
        
        const label = document.createElement("p")
        label.classList.add("button_level")
        label.textContent = level
        container.appendChild(button)
        container.appendChild(label)
        
        button.addEventListener("mouseenter", () => {            
            label.style.display = "block"
        })
        
        button.addEventListener("mouseleave", () => {            
            label.style.display = "none"
        })
        
        to.appendChild(container)
        return container
    }

    static buttonIcoText(icoPath, level, to, on_click) {
        const container = document.createElement("div")
        container.classList.add("button_container")
        
        const button = document.createElement("button")
        button.classList.add("button_button")
        
        const img = document.createElement("img")
        img.classList.add("button_ico")
        img.src = icoPath        
        
        button.appendChild(img)
        button.addEventListener("click", on_click)
        
        const label = document.createElement("p")
        label.classList.add("button_text")
        label.textContent = level
        button.appendChild(label)
        container.appendChild(button)        
        label.style.display = "block"                
        to.appendChild(container)
        return container
    }

    static changeIcoColor(imgElement, colorVar) {
        const color = getComputedStyle(document.documentElement).getPropertyValue(colorVar).trim()        
        fetch(imgElement.src)
            .then(res => res.text())
            .then(svg => {
                const modifiedSvg = svg.replace(/fill="[^"]*"/g, `fill="${color}"`)
                const blob = new Blob([modifiedSvg], { type: 'image/svg+xml' })
                const url = URL.createObjectURL(blob)
                imgElement.src = url
            })
    }

    static diffInSeconds(d1, d2) {
      return Math.abs((new Date(d2) - new Date(d1)) / 1000)
    }

    static escapeHtml(text) {
        if (!text) return ''
        const div = document.createElement('div')
        div.textContent = text
        return div.innerHTML
    }

    static loaderStart() {
        const workplace = document.getElementById("workplace")
         
        const loader = this.createElement("div", "loaderCont", workplace)
        loader.innerHTML = `
            <div class="clouds">
              <div class="cloud cloud1"></div>
              <div class="cloud cloud2"></div>
              <div class="cloud cloud3"></div>
              <div class="cloud cloud4"></div>
              <div class="cloud cloud5"></div>
            </div>            
            <div class="loader">
              <span><span></span><span></span><span></span><span></span></span>
              <div class="base">
                <span></span>
                <div class="face"></div>
              </div>
            </div>
            <div class="longfazers">
              <span></span><span></span><span></span><span></span>
            </div>            
            ` 
        workplace.appendChild(loader)
    }

    static loaderStop() {
        document.querySelector(".loaderCont").remove()
    }
}

export default ExtT

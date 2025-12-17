
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

    static restrictNI(input, start, end, set, f = null, g = null) { // Restrict Numeric Imput
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
            if (f && !f(num)) {
                if (num) {
                    input.value = g(num)
                } else {
                    input.value = 0
                }                
                return
            }
        })
    }

    static botonContent(button, content) {        
        content.style.display = "none"
        button.addEventListener("click", ()=>{
            if (content.style.display == "block") {
            content.style.display = "none"
            } else {
            content.style.display = "block"
            }
        })
    }

    static linkButton(button, url) {
        button.addEventListener("click", ()=>{
            window.open(url, "_blank")
        })
    }
}

export default ExtT

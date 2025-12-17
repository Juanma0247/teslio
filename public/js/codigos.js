const contCodigos = document.querySelector(".contCodigos")
const ccb1 = document.getElementById("ccb1")
const ccb2 = document.getElementById("ccb2")

ccb1.addEventListener("click", ()=>{
  navigator.clipboard.writeText(`https://jm-247.web.app/jm.py`)
})

ccb2.addEventListener("click", ()=>{
  navigator.clipboard.writeText(
`!wget jm-247.web.app/jm.py
import jm`) 
})


function addCode(nombre, codigo, language) {
    const div = document.createElement("div")
    div.classList.add("codigo")
    const mostrar = document.createElement("p")
    mostrar.style.display = "none"
    mostrar.textContent = "block"

    const title = document.createElement("h3") 
    title.style.display = "flex"

    const h3 = document.createElement("h3")
    h3.textContent = nombre 
    h3.style.cursor = "pointer"

    const ico = document.createElement("img")
    ico.src = `./img/languages/${language.split("-")[1]}.svg`
    ico.classList.add("icoTitle")

    const code = document.createElement("code")
    code.classList.add("tCode")
    code.classList.add(language)
    code.textContent = codigo
       
    const buttonCopy = document.createElement("img")
    buttonCopy.classList.add("bCode")
    buttonCopy.src = "./img/copy.svg"    
    
    buttonCopy.addEventListener("click", ()=> {
        navigator.clipboard.writeText(code.textContent)
    })
    
    h3.addEventListener("click", ()=>{
        if (mostrar.textContent == "block") {
            mostrar.textContent = "none"
            code.style.display = "none"
            buttonCopy.style.display = "none"
        } else {
            mostrar.textContent = "block"
            code.style.display = "block"
            buttonCopy.style.display = "block"
        }      
    })
    mostrar.textContent = "none"
    code.style.display = "none"
    buttonCopy.style.display = "none"

    div.appendChild(mostrar)
    title.appendChild(h3)
    title.appendChild(ico)
    div.appendChild(title)
    const pre = document.createElement("pre")
    pre.appendChild(code) 
    div.appendChild(pre)
    div.appendChild(buttonCopy)
    contCodigos.appendChild(div)    
}

addCode("Sets Proyect", `class Venn { // Sets
    constructor (a, b) {
        this.a = this.setToList(a)
        this.b = this.setToList(b)  
    }

    setToTex(set) {
        var res = ""
        if (set instanceof Set) {
            if (set.size == 0) {
                res = "\\varnothing" 
            } else {
                res += "\\{"
                for (let i of set) {
                    res += this.setToTex(i) + ","  
                }
                res = res.slice(0,-1)
                res += "\\}"
            }                        
        } else {
            res += set + ""
        }
        return res        
    }
    
    setToList(set) {
        var res = []
        for (let i of set) {            
            res.push((i instanceof Set) ? JSON.stringify({...i}) : i)
        }        
        return res        
    }

    draw() {
        document.getElementById("p2VeenDiagram").innerHTML = "" 
        new p5((p) => {            

            p.setup = () => {
                    p.createCanvas(300, 200)
                    p.textAlign(p.CENTER, p.CENTER)                                  
                    p.dibujarDiagramaVenn() 
            }
    
            p.dibujarDiagramaVenn = () => {
                p.background(0,0,0,0)
                let centroA = { x: 100, y: 100 }
                let centroB = { x: 200, y: 100 }
                let radio = 60
            
                p.stroke(255,255,255); 
                p.strokeWeight(2);
                p.fill(p.color(0, 128, 128))
                p.ellipse(centroA.x, centroA.y, radio * 2)
                
                p.fill(p.color(255, 255, 255, 100)) 
                p.ellipse(centroB.x, centroB.y, radio * 2)
                p.strokeWeight(0);

                p.textSize(18)
                p.fill(255, 255, 255)
                p.text("A", centroA.x, centroA.y - radio - 20)
                p.fill(255, 255, 255) 
                p.text("B", centroB.x, centroB.y - radio - 20)
            
                let soloA = this.a.filter(e => !this.b.includes(e))
                let soloB = this.b.filter(e => !this.a.includes(e))
                let interseccion = this.a.filter(e => this.b.includes(e))
                            
                p.fill(255, 255, 255)
                p.textSize(16)
                
                soloA.forEach((e, i) => p.text(e, centroA.x - 25, centroA.y - 25 + i * 20))
                soloB.forEach((e, i) => p.text(e, centroB.x + 25, centroB.y - 25 + i * 20))     
                interseccion.forEach((e, i) => p.text(e, (centroA.x + centroB.x) / 2, centroA.y + i * 20)) 
                
            }                
        }, 'p2VeenDiagram')
    }    
}

class P2 { // Sets
    constructor () {        
        this.i1 =  document.getElementById("p2i1")
        this.i2 =  document.getElementById("p2i2")                          
        this.ggb = null

        this.inputOnFocus = this.i1
        this.i1.addEventListener("focus", () => {
            this.inputOnFocus = this.i1
        });     
        this.i2.addEventListener("focus", () => {
            this.inputOnFocus = this.i2
        }); 
    }        
    
    isSet(str) {
        const srt_ = str.replace(/\s+/g, '') 
        var res = this.isClosed(srt_)        
        if (res) {            
            for (let i of this.split(srt_)) {                        
                if (i.charAt(0) == "{" && i.slice(-1) == "}") {                                    
                    res = this.isSet(i)                            
                } else {
                    res = !(i.includes("{") || i.includes("}"))                     
                }                
            }
        }
        return res
    }
    
    isClosed(str) {        
        var cont = 0        
        for (let i of str) { (i == "{") ? cont++ : (i == "}") ? cont-- : cont }                 
        return cont == 0;
    }
    
    split(str) {
        var res = []
        var aux = ""
        var cont = 0        
        const str_ = (str.charAt(0) == "{" && str.slice(-1) == "}") ? str.slice(1,-1) : str                   
        for (let i of str_) {        
            if (i != "," ) {
                aux += i
            }
            if (cont != 0 && i == ",") {
                aux += ","                
            }
            (i == "{") ? cont++ : (i == "}") ? cont-- : cont
            if (i == "," && cont == 0) {
                res.push(aux)
                aux = ""
            }           
        }
        if (aux != "") {
            res.push(aux)
        }
        return res
    }
    
    strToSet(str) { 
        var set = new Set()
        if (str == "{}") {            
            return new Set()
        }
        var str_ =  str.replace(/\s+/g, '')        
        if (str_.charAt(0) == "{" && !str_.slice(1,-1).includes("{")) {                    
            str_ = str_.slice(1,-1)
        }                              
        for (let i of this.split(str_)) {
            if (i.charAt(0) == "{") {                       
                set.add(this.strToSet(i))            
            } else {
                set.add(i)
            }
        }        
        return set
    }
    
    setToTex(set) {
        var res = ""
        if (set instanceof Set) {
            if (set.size == 0) {
                res = "\\varnothing" 
            } else {
                let set_ = [...set]
                if (set_.length == 2) { 
                    if (set_[1] instanceof Set) { 
                        res += ({set_[0]},{(set_[1].size == 2) ? [...set_[1]][1] : set_[0]})
                    } else {
                        res += "\\{"
                        for (let i of set) {
                            res += this.setToTex(i) + "," 
                        }            
                        res = res.slice(0,-1)
                        res += "\\}"    
                    }
                } else {
                    res += "\\{"
                    for (let i of set) {
                        res += this.setToTex(i) + ","
                    }            
                    res = res.slice(0,-1)
                    res += "\\}"
                }                
            }                        
        } else {
            res += set + ""                        
        }
        return res        
    }

    
    equality(a, b) {
        if (a.size  !== b.size) {
            return false
        }
        for (let i of a) {            
            if(!b.has(i)){    
                return false
            }
        }
        return true
    }
    
    containment(a, b){
        if(!(b instanceof Set)) {
            if (a instanceof Set) {
                return false
            } else {
                return a == b
            }
        }
        if (b.size == 0) {
            return false
        }
        for(let i of a){
            if (i instanceof Set)  {
                let flag = false
                for (let j of b) {                    
                    if(j instanceof Set && j.size == i.size){
                        if(this.containment(i,j)){
                            flag = true
                            break
                        } 
                    }
                }
                if (!flag){
                    return false
                }
            } else {
                if (!b.has(i)) {
                    return false
                } 
            }
        }
        return true
    } 

    colapse(a) {
        const r_ = new Set()
        const res = new Set()    
        for (let i of a) {            
            if (i instanceof Set) {
                const r__ = Array.from(i).sort().join(',')
                if (!r_.has(r__)) {
                    r_.add(r__)
                    res.add(i)
                }
            } else {
                res.add(i)
            }          
            
        }    
        return res;
    }

    belonging(a,b){
        let aux = a
        return(b.has(aux)) ? true : false
    }
    
    union(a, b) {
        var res = a                    
        for(let j of b){
            res.add(j)            
        }
        if(res.size == 0){
            return new Set()
        }
        return this.colapse(res) 
    }

    intersection(a, b) {        
        const aStr = new Set([...a].map(e => JSON.stringify(e)));
        const bStr = new Set([...b].map(e => JSON.stringify(e)));              
        const interseccionStr = new Set([...aStr].filter(e => bStr.has(e)));
        return new Set([...interseccionStr].map(e => JSON.parse(e)));
    }
    
    difference(a,b) {
        var res = new Set() 
        for(let i of a){
            if(!b.has(i)) {
                res.add(i)
            }
        }
        if(res.size == 0){
            return new Set()
        }
        return res; 
    }
    
    symmetricDifference(a,b) {
        var res = new Set() 
        for(let i of a){
            if(!b.has(i)) {
                res.add(i)
            }
        }
        for(let i of b){
            if(!a.has(i)) {
                res.add(i)
            }
        }
        if(res.size == 0){
            return new Set()
        }
        return res;         
    }                      
 
    partsOf(set) {
        const aux = Array.from(set);
        const res = new Set();                          
        for (let i = 0; i < 2**aux.length; i++) {        
            const e = new Set();
            for (let j = 0; j < aux.length; j++) {                             
                if (i & (1 << j)) {
                    e.add(aux[j]);
                }
            }                        
            (e.size != 0) 
                ? res.add(e)                
                : res.add(new Set())            
        }        
        return this.colapse(res)
    }               
    
    
    
    generalizedUnion(set){ 
        const res = new Set()        
        for(let i of set){
            if (i instanceof Set)  {
                for (let j of this.generalizedUnion(i)) {
                    res.add(j)
                }
            } else {
                res.add(i)  
            }
        }        
        return res
    }                     

    generalizedIntersection(set) {
        let sToL = [...set]
        for (let i of sToL) {
            if (!(i instanceof Set)) {
                return new Set()
            }
        }

        if (set.size === 0) return new Set()
                      
        let firstSubset = set.values().next().value
              
        let res = new Set()
              
        for (let elem of set.values().next().value) {      
          let belongsToAll = true
          for (let subset of set) {
            if (!subset.has(elem)) {
              belongsToAll = false
              break
            }
          }          
          if (belongsToAll) {
            res.add(elem)
          }
        }
         
        return res
      }
            
    cartesianProduct(a,b){
        let res = new Set()
        for(let i of a){
            for(let j of b){
                let aux = new Set()
                let aux2 = new Set()
                aux.add(i)
                aux2.add(i)
                aux2.add(j)
                aux.add(aux2)
                res.add(aux)  
            }
        }
        return res
    }
    
    difference(a,b) { 
        var res = new Set() 
        for(let i of a){ 
            if (i instanceof Set){                   
                let contain 
                for (let j of b) {
                    contain = this.containment(j,i)  
                    if (contain) {
                        break
                    } 
                }
                if (!contain){ 
                    res.add(i)
                }
            } else {
                if(!b.has(i)){
                    res.add(i)
                }
            }            
        }
        if(res.size == 0){
            return new Set()
        }
        return res; 
    }

    cardinal(a) {
        return a.size
    }  

    differenceCardinal(a,b){        
        return this.difference(a, b).size
    }

    intersectionCardinal(a,b){
        const aux = this.intersection(a, b)
        return (aux.size == 0) ? a.size + b.size : a.size + b.size - aux.size        
    }

    unionCardinal(a,b){        
        return this.union(a, b).size
    }
    
    cartesianCardinal(a,b){        
        return a.size * b.size
    }        

    numericRandomSet(n, a){
        var res = new Set()         
        for (let f = 0; f < n; f++){                
            res.add(Math.floor(Math.random() * a))
        }
        return res
    }

    alphabetRandomSet(n){
        var res = new Set()    
        let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
        for (let i = 0; i < n; i++){
            let randomIndex = Math.floor(Math.random() * alphabet.length)
            let randomLetter = alphabet[randomIndex]
            res.add(randomLetter)
        }
        return res
    }
    
    collectAlphabetic(a, b){
        let res = new Set()
        while (res.size < a) {
            res.add(this.alphabetRandomSet(b))
        }
        return res
    }
    
    collectNumeric(t, n, a){
        let res = new Set() 
        while (res.size < t) {                        
            res.add(this.numericRandomSet(n, a))
        }
        return res
    }
    
    getA() { 
        return this.strToSet(this.i1.value)
    }
    
    getB() {
        return this.strToSet(this.i2.value)
    }
    
    setResOnLong(key, set) {
        document.getElementById("p2Res").innerHTML = "" 
        ExtT.addTexToElement({key}: \\{, "p2Res", "p2LaTex0") 
        let s = [...set]
        let sL = s.length - 1
        let sum = 0
        let str = ""
        let end = 0

        console.log(s)

        while (sL >= 0 || !end) { 
            end = sL < 0            
            if (sum < 50 && !end) {  
                if (sL > 0) {                    
                    let sF = (!end) ? "," : ""
                    str += this.setToTex(s[sL]) + sF 
                    sum += this.setToTex(s[sL]).length
                }
                sL--
            } else {
                str = (!end) 
                ? str 
                : (str.substring(0, str.length - 1) 
                + {(str.includes(")")) ? "" : ", \\varnothing"}\\})
                ExtT.addTexToElement(str, "p2Res", p2LaTex{sL})                                  
                sum = 0  
                str = ""
            }
            console.log(sum, sL)
        }               
    }
    
    setRes(key, set) {
        let sTT = this.setToTex(set)        
        if (sTT.length > 100) {
            this.setResOnLong(key, set)
        } else {
            ExtT.tex({key}:\\,\\,  + sTT, "p2Res")
        }        
    }
    
    makeOption(val, f, optNum) {
        const o = ExtT.createElement("button", p2Option, document.getElementById(p2Options{optNum}))        
        ExtT.tex(val, o)
        o.addEventListener("click", ()=> {             
            this.setRes(val, f())
        })
    }        

    makeTopOption(val, f, optNum, options) {
        const b = ExtT.createElement("button", "p2OptionTopButton", document.getElementById("p2Options{optNum}"))
        let inputsRes = []
        for (let i = 0; i < options.length; i++) { 
            const input = ExtT.createElement("input", "p2InputOption", document.getElementById("p2Options{optNum}"))
            input.setAttribute('type', 'number')
            input.value = options[i]
            inputsRes.push(input)
        }
        ExtT.tex(val, b)        
        b.addEventListener("click", ()=> {
            const inputValues = Array.from(inputsRes).map(input => parseInt(input.value)); 
            this.i1.value = "" 
            this.i1.value = this.setToTex(f(...inputValues)).replaceAll(//g, "") 
        })
    }   
      
    createOptions() {
        document.getElementById("p2Options1").innerHTML = ""
        document.getElementById("p2Options2").innerHTML = "" 


        this.makeTopOption("\\text{Rndm Num}", (n, a)=> {    
            return this.numericRandomSet(n, a)
        }, 0, [6, 100]) 

        this.makeTopOption("\\text{\\{Rndm Num\\}}", (t, n, a)=> {    
            return this.collectNumeric(t, n, a)
        }, 0, [3, 3, 100]) 

        this.makeTopOption("\\text{Rndm Alpha}", (n)=> {    
            return this.alphabetRandomSet(n)
        }, 0, [6])

        this.makeTopOption("\\text{\\{Rndm Alpha\\}}", (n, a)=> {    
            return this.collectAlphabetic(n, a)
        }, 0, [2, 5])    
        

        this.makeOption("A \\cup B", ()=> {    
            return this.union(this.getA(), this.getB())
        }, 1)
        this.makeOption("A \\cap B", ()=> {              
            return this.intersection(this.getA(), this.getB())
        }, 1)
        this.makeOption("A \\times B", ()=> {              
            return this.cartesianProduct(this.getA(), this.getB())
        }, 1)
        this.makeOption("A \\setminus B", ()=> {              
            return this.difference(this.getA(), this.getB())
        }, 1)  
        this.makeOption("A \\bigtriangleup B", ()=> {              
            return this.symmetricDifference(this.getA(), this.getB())
        }, 1)
        

        this.makeOption("|A|", ()=> {              
            return this.cardinal(this.getA())
        }, 2)
        this.makeOption("|A \\cup B|", ()=> {    
            return this.union(this.getA(), this.getB()).size
        }, 2)
        this.makeOption("|A \\cap B|", ()=> {              
            return this.intersection(this.getA(), this.getB()).size
        }, 2)
        this.makeOption("|A \\times B|", ()=> {              
            return this.cartesianProduct(this.getA(), this.getB()).size
        }, 2)
        this.makeOption("|A \\setminus B|", ()=> {              
            return this.difference(this.getA(), this.getB()).size
        }, 2)  
        this.makeOption("|A \\bigtriangleup B|", ()=> {              
            return this.symmetricDifference(this.getA(), this.getB()).size
        }, 2)
        this.makeOption("|B|", ()=> {              
            return this.cardinal(this.getB()) 
        }, 2)


        this.makeOption("\\bigcup A_i", ()=> {              
            return this.generalizedUnion(this.getA())
        }, 3)
        this.makeOption("\\bigcap A_i", ()=> {              
            return this.generalizedIntersection(this.getA())
        }, 3)
        this.makeOption("\\mathscr{P}(A)", ()=> {              
            return this.partsOf(this.getA())
        }, 3)
        this.makeOption("\\bigcup B_i", ()=> {              
            return this.generalizedUnion(this.getB())
        }, 3)        
        this.makeOption("\\bigcap B_i", ()=> {              
            return this.generalizedIntersection(this.getB())
        }, 3)        
        this.makeOption("\\mathscr{P}(B)", ()=> {              
            return this.partsOf(this.getB())
        }, 3)


        this.makeOption("\\text{Diagrama de Venn}", ()=> {    
            const veen = new Venn(this.getA(), this.getB())
            veen.draw() 
            return ""
        }, 4)
        
    }    
    
    main() {        
        const this_ = this
        this.i1.value = "{0,1,2,3,4}" 
        this.i2.value = "{3,4,5,6,7}" 
        this.createOptions()
        
        document.getElementById("p2bchange").addEventListener("click", ()=> {
            let a = this.i1.value 
            this.i1.value = this.i2.value
            this.i2.value = a
        })

        let setKeys = () => {
            const pos1 = this.inputOnFocus.selectionStart
            const pos2 = this.inputOnFocus.selectionEnd
            this.inputOnFocus.focus(); 
            if (pos1 == pos2) {
                this.inputOnFocus.value = this.inputOnFocus.value.slice(0, pos1) + "{}" + this.inputOnFocus.value.slice(pos1)
                this.inputOnFocus.setSelectionRange(pos1 + 1, pos2 + 1);
            } else {
                this.inputOnFocus.value = this.inputOnFocus.value.slice(0, pos1) 
                + "{" + this.inputOnFocus.value.slice(pos1, pos2)
                + "}" + this.inputOnFocus.value.slice(pos2) 
                this.inputOnFocus.setSelectionRange(pos1 + 1, pos2 + 1);
            } 
        }

        document.getElementById("p2bsetSet").addEventListener("click", ()=> {
            setKeys()                                   
        })

        document.addEventListener('keydown', function(event) {            
            if (event.key == 'quote') {  
                setKeys()    
                this_.i1.value = this_.i1.value.replaceAll("´", "").replace("á", "a").replace("é", "e").replace("í", "i").replace("ó", "o").replace("ú", "u")
            }
        });               
    }
}

export default P2`, "language-javascript") 

addCode("Cantor Paring Sequence Proyect", `class P3 { // Cantor Paring Sequence
    constructor () {        
        this.ggb = null
        this.i1 = document.getElementById("p3i1")
        this.i2 = document.getElementById("p3i2")
        this.b1 = document.getElementById("p3b1")
    }            

    cantorParing(p, q) {
        let n = (q_) => {
            return q >= 0 ? 2 * q : -1 * 2 * 1 - 1 
        }
        return ((n(q) + p - 1) * (n(q) + p)/ 2) * (p - 1)
    }

    CPTG(p, q) {
        return (((parseInt(p) + parseInt(q)) * (parseInt(p) + parseInt(q) + 1) ) / 2 ) + parseInt(q)   
    }

    cantorParingSequence(p, q, res) {
        let dot = (c1_, c2_, name) => {
            this.ggb.evalCommand(P{c1_}Y{c2_} = ({c1_}, {c2_}))
            this.ggb.evalCommand(SetCaption[P{c1_}Y{c2_}, "{name}"])
            this.ggb.setColor(P{c1_}Y{c2_}, 0, 128, 128);
            if (name == res) {
                this.ggb.evalCommand(SetCaption[P{c1_}Y{c2_}, "{name}"])
                this.ggb.setColor(P{c1_}Y{c2_}, 255, 0, 0)  
            }
        }
 
        let arrow = (c11_, c12_, c21_, c22_) => { 
            this.ggb.evalCommand(V{c11_}Y{c12_}Y{c21_}Y{c22_} = Vector(P{c11_}Y{c12_},P{c21_}Y{c22_})) 
            this.ggb.evalCommand(SetCaption[V{c11_}Y{c12_}Y{c21_}Y{c22_}, "\u200B"]) 
        }
        var direction = 1
        var c1 = 1
        var c2 = 0       
        var cont = 0
        dot(0, 0, 0)
        this.ggb.evalCommand(VC = Vector((0,0),(1,0)))
        this.ggb.evalCommand(SetCaption[VC, "\u200B"])
        while (c1 < p || c2 < q) {               
            const c1_ = c1
            const c2_ = c2
            if (direction) { 
                direction = 0                
                c1 = c2 + 1
                c2 = 0 
                cont++
                dot(c1, c2, cont)   
                arrow(c1_, c2_, c1, c2) 
            } else { 
                if (c1 != 0) {                      
                    c2++ 
                    c1--
                    cont++
                    dot(c1, c2, cont)  
                    arrow(c1_, c2_, c1, c2) 
                } else {
                    direction = 1 
                }                
            }            
        }      
        return cont
    } 

    clean() {
      let objectCount = this.ggb.getObjectNumber() 
      for (let i = objectCount - 1; i >= 0; i--) {
          let objectName = this.ggb.getObjectName(i)
          let objectType = this.ggb.getObjectType(objectName)
          if (objectType === "point" || objectType === "vector") {
              this.ggb.deleteObject(objectName)
          }
      }
    }

    makeProcces(x, y) {
      const p2 = document.getElementById("p3Prosessp2")
      const p4 = document.getElementById("p3Prosessp4")
      ExtT.tex(f(p,q)=\\frac{(p+q)(p+q+1)}{2} + q, p2)  
      ExtT.tex(f({x},{y})=\\frac{({x}+{y})({x}+{y}+1)}{2} + {y} = \\frac{{(parseInt(x) + parseInt(y)) * (parseInt(x) + parseInt(y) + 1)}}{2} + {y} = \\textcolor{red}{\\text{{this.CPTG(x,y)}}}, p4)
      document.getElementById("p3Prosessp5").innerHTML = Por lo tanto, la posición para el punto {x} y {y} será <a style="color: red">{this.CPTG(x,y)}.</a>
    }

    execute(x, y) {
      const res = this.cantorParingSequence(x, y, this.CPTG(x,y))        
      this.ggb.setPerspective("G"); 
      const x_ = parseInt(x) - 5
      const x__ = parseInt(x) + 5
      const y_ = parseInt(y) - 5
      const y__ = parseInt(y) + 5       
      this.ggb.setCoordSystem(x_, x__, y_, y__)    
      this.makeProcces(x, y, res) 
    }
    
    main() {
        const this_ = this
        
        const ggbElement = document.querySelector("ggbContainer")
        var applet = new GGBApplet({
                appName: "graphing", 
                width: window.innerHeight - 6,
                height: window.innerHeight - 6,
                showToolbar: false,
                showAlgebraInput: false,
                showMenuBar: false, 
                showAlgebraView: false 
            }, false);
        
        applet.inject("ggbContainer");
        
        var tried = 0
        let tryPerSecond = (x, y) => {          
          setTimeout(function() {      
            tried++
            this_.ggb = applet.getAppletObject();
            if (this_.ggb) {            
                try {
                    this_.clean() 
                } catch (_) {}                
                this_.execute(x, y)
            } else {
                
                tryPerSecond(x, y)  
            }
          }, 1000);
        }
         
        setTimeout(function() {      
            tryPerSecond(this_.i1.value, this_.i2.value)
        }, 2000); 
        
 
        this.b1.addEventListener("click", ()=> {          
          tryPerSecond(this.i1.value, this.i2.value)
        })
    }
}

export default P3`, "language-javascript") 

addCode("numeroANombre", `millones = [
  ('sextillónes',   1000000000000000000),
  ('quintillónes',  1000000000000000),
  ('trillones',     1000000000000),
  ('billónes',      1000000000),
  ('millones',      1000000),
  ('mil',           1000),
  ]
cientos = [
  ('novecientos', 900),
  ('ochocientos', 800),
  ('setecientos', 700),
  ('seiscientos', 600),
  ('quinientos', 500),
  ('cuatroscientos', 400),
  ('trescientos', 300),
  ('doscientos', 200),
  ('ciento', 100),
  ('noventa', 90),
  ('ochenta', 80),
  ('setenta', 70),
  ('sesenta', 60),
  ('cincuenta', 50),
  ('cuarenta', 40),
  ('treinta', 30),
  ('veinte', 20),
  ('diecinueve', 19),
  ('dieciocho', 18),
  ('diecisiete', 17),
  ('dieciseis', 16),
  ('quince', 15),
  ('catorce', 14),
  ('trece', 13),
  ('doce', 12),
  ('once', 11),
  ('diez', 10),
  ]
unidades = [
  ('nueve', 9),
  ('ocho', 8),
  ('siete', 7),
  ('seis', 6),
  ('cinco', 5),
  ('cuatro', 4),
  ('tres', 3),
  ('dos', 2),
  ('uno', 1),
  ]

def name999(num):
  r = ""
  while num > 0 and num < 1000000000000000000:
    if num == 100:
      r += "cien "
      num -= 100
    if num >= 10:
      for n, v in cientos:
        while num >= v:
          r += f"{n} "
          num -= v
    if r != "" and num < 10 and num != 0:
      r += "y "
    if num < 10:
      for n, v in unidades:
        while num >= v:
          r += f"{n} "
          num -= v
  return r

def numeroANombre(num):
  r = ""
  while num > 0:
    for n, v in millones:
      if num > v:
        auxnum = int(num / v)
        num -= auxnum * v
        r += f"{name999(auxnum)}{n} "
    else:
      r += name999(num)
      num -= num
  return r

print(numeroANombre(241374))`, "language-python")

addCode("esPrimo", `import math

def esPrimo(n):
  if n == 2 or n == 3 or n == 5:
    return True
  elif n == 1 or n == 4 or n % 5 == 0 or n % 2 == 0:
    return False
  else:
    d = 5
    r = math.isqrt(n)
    while d <= r and n % d != 0:
        d += 2
    return d > r`, "language-python")

addCode("naturalARomano", `def naturalARomano(num):
    values = [
        (1000000, 'm'), (900000, 'cm'), 
        (500000, 'd'), (400000, 'cd'), 
        (100000, 'c'), (90000, 'xc'),
        (50000, 'l'), (40000, 'xl'), 
        (10000, 'x'),  (9000, 'ix'), 
        (5000, 'v'), (4000, 'iv'), 
        (1000, 'M'), (900, 'CM'), 
        (500, 'D'), (400, 'CD'), 
        (100, 'C'), (90, 'XC'), 
        (50, 'L'), (40, 'XL'), 
        (10, 'X'),  (9, 'IX'), 
        (5, 'V'), (4, 'IV'), 
        (1, 'I')
        ]
    romano, auxnum = "", num
    while num > 0:
       for i, r in values:
          while num >= i:
             romano += r
             num -= i
    print(f"{auxnum} en numeros romanos es: {romano}")`, "language-python")

addCode("Tablas de multiplicar", `def cen(s):
    t = 15 - len(s)
    sp = " " * t
    spc = " " * int(t/2)
    spc2 = 20 - len(s) - int(t/2)
    r = f"{s}{sp}"
    return r

def tab(a, b):
    for f in range(a, b + 1):
      print(cen(f"Tabla del {f}"), end=(""))
    print()
    for f in range(1, 10):
     for c in range(a, b + 1):
       print(cen(f"{c} x {f} = {c*f}"), end=(""))
     print()

tab(1, 4)
print()
tab(5, 9)`, "language-python")

addCode("Triangulo numerico", `n = int(input("Ingrese el número: "))
for f in range(1, n+1):
  if n > 9:
    if len(str(f)) == 1:
      for _ in range(2*n-f-10):
        print(" ", end=(""))
    else:
      for _ in range(n-f):
        print("  ", end=(""))
  else:
    for _ in range(n-f):
        print(" ", end=(""))
  for a in range(1, f+1):
    print(a, end=(""))
  for d in range(f-1, 0, -1):
    print(d, end=(""))
  print()`, "language-python")

addCode("Máxima suma de subvector contiguo", `x = [31, -41, 59, 26,-53, 58, 97, -93, -23, 84]
n = len(x)
sum, res, ma = 0, 0, 0
for i in range(n):
  ma = max(ma + x[i], 0)
  res = max(res, ma)
print(res)`, "language-python")

addCode("Texto tridimensional", `$once$

local config = {
    width = $int(Altura,15, 1, 50)$,
    length = $int(length, 20, 1, 50)$,
    height = $int(height, 3, 1, 50)$, 
    n_floors = $int(n_floors, 2, 1, 50)$,    
    m_wall = $blockState(Block:, quarz_block)$,
    m_window =  $blockState(Block:, glass)$,
    m_floor = $blockState(Block:, dark_oak_planks)$,
    m_root = $blockState(Block:, stone_bricks)$,
    m_door = $blockState(Block:, oak_door)$
}

local function fill(x1, y1, z1, x2, y2, z2, block)
    for x = x1, x2 do
        for y = y1, y2 do
            for z = z1, z2 do
                setBlock(x, y, z, block)
            end
        end
    end
end

local function crearMuroHueco(x1, y1, z1, x2, y2, z2, block)
    fill(x1, y1, z1, x2, y2, z1, block)
    fill(x1, y1, z2, x2, y2, z2, block)
    fill(x1, y1, z1, x1, y2, z2, block)
    fill(x2, y1, z1, x2, y2, z2, block)
end

local function crearVentanas(x1, y, z1, x2, z2, direccion)
    local ventana = config.m_window
    if direccion == "norte" or direccion == "sur" then
        local z = (direccion == "norte") and z1 or z2
        for x = x1 + 2, x2 - 2, 3 do
            setBlock(x, y + 1, z, ventana)
            setBlock(x, y + 2, z, ventana)
        end
    else
        local x = (direccion == "oeste") and x1 or x2
        for z = z1 + 2, z2 - 2, 3 do
            setBlock(x, y + 1, z, ventana)
            setBlock(x, y + 2, z, ventana)
        end
    end
end

function construirEdificio()
    local x_inicio = x
    local y_inicio = y
    local z_inicio = z
    local x1 = x_inicio
    local z1 = z_inicio
    local x2 = x_inicio + config.width - 1
    local z2 = z_inicio + config.length - 1
    for piso = 0, config.n_floors - 1 do
        local y_base = y_inicio + (piso * config.height)
        local y_techo = y_base + config.height - 1
        fill(x1, y_base, z1, x2, y_base, z2, config.m_floor)
        crearMuroHueco(x1, y_base + 1, z1, x2, y_techo - 1, z2, config.m_wall)
        if config.con_ventanas and piso > 0 then
            crearVentanas(x1, y_base, z1, x2, z2, "norte")
            crearVentanas(x1, y_base, z1, x2, z2, "sur")
            crearVentanas(x1, y_base, z1, x2, z2, "este")
            crearVentanas(x1, y_base, z1, x2, z2, "oeste")
        end
        if piso == 0 then
            local x_puerta = x1 + math.floor(config.width / 2)
            setBlock(x_puerta, y_base + 1, z1, "minecraft:air")
            setBlock(x_puerta, y_base + 2, z1, "minecraft:air")
            setBlock(x_puerta, y_base + 1, z1, config.material_puerta .. "[half=lower,facing=south]")
            setBlock(x_puerta, y_base + 2, z1, config.material_puerta .. "[half=upper,facing=south]")
        end
         if config.con_balcones and piso > 0 then
             for x = x1 + 2, x2 - 2 do
                setBlock(x, y_base, z1 - 1, "minecraft:stone_slab")
                setBlock(x, y_base + 1, z1 - 1, "minecraft:oak_fence")
            end
        end
        fill(x1 + 1, y_techo, z1 + 1, x2 - 1, y_techo, z2 - 1, config.m_floor)
    end
    local y_techo_final = y_inicio + (config.n_floors * config.height)    
    if config.con_techo_plano then
        fill(x1, y_techo_final, z1, x2, y_techo_final, z2, config.m_root)
        crearMuroHueco(x1 - 1, y_techo_final + 1, z1 - 1, x2 + 1, y_techo_final + 1, z2 + 1, "minecraft:stone_brick_slab")
    else
        local altura_techo = math.floor(config.length / 2)        
        for i = 0, altura_techo do
            local z_offset = z1 + i
            if z_offset <= z2 - i then
                fill(x1, y_techo_final + i, z_offset, x2, y_techo_final + i, z2 - i, config.m_root)
            end
        end
    end
    local x_escalera = x1 + 2
    local z_escalera = z1 + 2    
    for piso = 0, config.n_floors - 2 do
        local y_base = y_inicio + (piso * config.height) + 1        
        for i = 0, config.height - 1 do
            setBlock(x_escalera, y_base + i, z_escalera, "minecraft:oak_stairs[facing=north]")
        end
    end    
end

construirEdificio()`, "language-lua")

addCode("Texto tridimensional", `$once$

--Allowed letters: 
--ABCDEFGHIJKLMNOPQRSTVWXYZ
--abcdefghijklmnopqrstuvwxyz
--0123456789
-- _.,?¿#
--ñÑÁáÉéÍíÓóÚú

local text = "juamdg.web.app"

function utf8Iter(str) -- UTF-8 Iterator
	local i = 1
	return function()
		if i > #str then return nil end
		local c = string.byte(str, i)
		local char_len = 1
		if c >= 0xF0 then char_len = 4
		elseif c >= 0xE0 then char_len = 3
		elseif c >= 0xC0 then char_len = 2
		end
		local char = string.sub(str, i, i + char_len - 1)
		i = i + char_len
		return char
	end
end

local space =$int(Space,1,1,10)$
local with = $int(With,1,1,10)$
local block = $blockState(Block:, white_concrete)$
local standing = $boolean(Standing, false)$

local leterData = {
A  = "0000010001100011000110001111111000101110000000000000000",
B  = "0000011110100011000110001111101000111110000000000000000",
C  = "0000001110100011000010000100001000101110000000000000000",
D  = "0000011110100011000110001100011000111110000000000000000",
E  = "0000011111100001000010000111001000011111000000000000000",
F  = "0000010000100001000010000111001000011111000000000000000",
G  = "0000001110100011000110001100111000001111000000000000000",
H  = "0000010001100011000110001111111000110001000000000000000",
I  = "000111010010010010010111000000000",
J  = "0000001110100010000100001000010000100001000000000000000",
K  = "0000010001100011000110010111001001010001000000000000000",
L  = "0000011111100001000010000100001000010000000000000000000",
M  = "0000010001100011000110001101011101110001000000000000000",
N  = "0000010001100011000110011101011100110001000000000000000",
O  = "0000001110100011000110001100011000101110000000000000000",
P  = "0000010000100001000010000111101000111110000000000000000",
Q  = "0000001101100101000110001100011000101110000000000000000",
R  = "0000010001100011000110001111101000111110000000000000000",
S  = "0000001110100010000100001011101000001111000000000000000",
T  = "0000000100001000010000100001000010011111000000000000000",
U  = "0000001110100011000110001100011000110001000000000000000",
V  = "0000000100010100101010001100011000110001000000000000000",
W  = "0000010001110111010110001100011000110001000000000000000",
X  = "0000010001100011000101010001000101010001000000000000000",
Y  = "00000001000010000100001000010001010100010000000000000000",
Z  = "0000011111100000100000100000100000111111000000000000000",
a  = "0000001111100010111100001011100000000000000000000000000",
b  = "0000011110100011000111001101101000010000000000000000000",
c  = "0000001110100011000010001011100000000000000000000000000",
d  = "0000001111100011000110011011010000100001000000000000000",
e  = "0000001111100001111110001011100000000000000000000000000",
f  = "00000100010001000100111101000011000000000000",
g  = "1111000001011111000110001011110000000000000000000000000",
h  = "0000010001100011000111001101101000010000000000000000000",
i  = "01111101000",
j  = "0111010001100010000100001000010000000001000000000000000",
k  = "00001001101011001010100110001000000000000000",
l  = "0001101010101010000000",
m  = "0000010001100011010110101110100000000000000000000000000",
n  = "0000010001100011000110001111100000000000000000000000000",
o  = "0000001110100011000110001011100000000000000000000000000",
p  = "1000010000111101000111001101100000000000000000000000000",
q  = "0000100001011111000110011011010000000000000000000000000",
r  = "0000010000100001000011001101100000000000000000000000000",
s  = "0000011110000010111010000011110000000000000000000000000",
t  = "000001010010010111010010000000000",
u  = "0000001111100011000110001100010000000000000000000000000",
v  = "0000000100010101000110001100010000000000000000000000000",
w  = "0000001111101011010110001100010000000000000000000000000",
x  = "0000010001010100010001010100010000000000000000000000000",
y  = "1111000001011111000110001100010000000000000000000000000",
z  = "0000011111010000010000010111110000000000000000000000000",
_0 = "0000001110100011100110101100111000101110000000000000000",
_1 = "0000011111001000010000100001000110000100000000000000000",
_2 = "0000011111100010100000110000011000101110000000000000000",
_3 = "0000001110100010000100110000011000101110000000000000000",
_4 = "0000000001000011111110001010010010100011000000000000000",
_5 = "0000001110100010000100001111101000011111000000000000000",
_6 = "0000001110100011000111110100000100000110000000000000000",
_7 = "0000000100001000010000010000011000111111000000000000000",
_8 = "0000001110100011000101110100011000101110000000000000000",
_9 = "0000001100000100000101111100011000101110000000000000000",
_ = "0000000000000000000000000000000000000000000000000000000",
_ask = "0000000100000000010000010000011000101110000000000000000'",
_point  = "01000000000",
_comma  = "11000000000",
_askLeft = "0000001110100011000001000001000000000100000000000000000",
_numeral = "0000001010010101111101010111110101001010000000000000000",
_n  = "0000010001100011000110001111100000001010001010000000000",
_N  = "0000010001100011000110011101011100110001000000101000101",
_a = "0000001111100010111100001011100000000100000100000000000",
_A = "0000010001100011000110001111111000101110000000010000010",
_e = "0000001111100001111110001011100000000100000100000000000",
_E = "0000011111100001000010000111001000011111000000010000010",
_i = "0010101010100010010000",
_I = "000111010010010010010111000010001",
_o = "0000001110100011000110001011100000000100000100000000000",
_O = "0000001110100011000110001100011000101110000000010000010",
_u = "00000011111000110001100011000100000001000001000000000000",
_U = "0000001110100011000110001100011000110001000000010000010",

}

local spc = 0
local f_ = 11
for char in utf8Iter(text) do
	if tonumber(char) ~= nil then
	    char = "_"..char
	end
	if char == "?" then char = "_ask" end
	if char == "." then char = "_point" end
	if char == "," then char = "_comma" end	
	if char == "¿" then char = "_askLeft" end
	if char == "#" then char = "_numeral" end
	if char == "ñ" then char = "_n" end
	if char == "Ñ" then char = "_N" end
	if char == "á" then char = "_a" end
	if char == "Á" then char = "_A" end
	if char == "é" then char = "_e" end
	if char == "É" then char = "_E" end
	if char == "í" then char = "_i" end
	if char == "Í" then char = "_I" end
	if char == "ó" then char = "_o" end
	if char == "Ó" then char = "_O" end
	if char == "ú" then char = "_u" end
	if char == "Ú" then char = "_U" end
	if leterData[char] == nil then char = "_" end
	local str =  leterData[char]
	local c_ = string.len(str) / 11
	for i = 0, f_ - 1 do
		for j = 0, c_ - 1 do
			local charPos = ( (i*c_) + j + 1)
		    local val = tonumber(string.sub(str,  charPos, charPos))			
			local z_ = z 
			local x_ = x +  j*with + spc*with
			local y_ = y 
			if standing then 
				y_ = y_ + i*with + with
			else 
				z_ = z_ - i*with - with
			end 
			if val == 1 then
				for f = 0, with - 1 do
					for g = 0, with - 1 do
						for h = 0, with - 1 do
							setBlock(x_ + f,  y_ + g, z_+ h, block)
						end
					end		
				end
			end
		end
	end
  spc = spc + c_ + space
end`, "language-lua")

addCode("Hilo bajo bloques de gravedad", `local gravity_blocks = {
   	blocks.sand,
    blocks.red_sand,
    blocks.gravel,
    blocks.anvil,
    blocks.chipped_anvil,
    blocks.damaged_anvil,
    blocks.dragon_egg,
    blocks.scaffolding,
    blocks.white_concrete_powder,
    blocks.orange_concrete_powder,
    blocks.magenta_concrete_powder,
    blocks.light_blue_concrete_powder,
    blocks.yellow_concrete_powder,
    blocks.lime_concrete_powder,
    blocks.pink_concrete_powder,
    blocks.gray_concrete_powder,
    blocks.light_gray_concrete_powder,
    blocks.cyan_concrete_powder,
    blocks.purple_concrete_powder,
    blocks.blue_concrete_powder,
    blocks.brown_concrete_powder,
    blocks.green_concrete_powder,
    blocks.red_concrete_powder,
    blocks.black_concrete_powder
}

local function put_here(this, top)
    for i, j in ipairs(gravity_blocks) do
        if top == j and this == blocks.air then
            return true
        end
    end
    return false
end

if put_here(getBlock(x, y, z), getBlock(x, y + 1, z)) then
    return blocks.tripwire
end `, "language-lua")

addCode("Ajedrez tridimensional", `if getBlock(x,y,z) == blocks.obsidian and (x + y + z) % 2 == 0 then
	setBlock(x,y,z, blocks.air)
end`, "language-lua")

addCode("Espada Golpeo 255", `/give @s netherite_sword[enchantments={"minecraft:smite":255}]`, "function-minecraft")
addCode("Espada Filo 255", `/give @s netherite_sword[enchantments={"minecraft:sharpness":255}]`, "function-minecraft")
const div_ = document.createElement("div")
div_.classList.add("buttonSpace")
contCodigos.appendChild(div_)   

// QUE HACE ESTO ??
// const c = "identificador-16@dom1.dom2.cod"
// console.log((c == c.replace(/^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/, c.split("@")[0] + "@gov.co")) ? false : true)
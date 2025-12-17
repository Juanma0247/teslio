// Herramienta 1 (Strings)
const h1i1 =  document.getElementById("h1i1")
const h1i2 =  document.getElementById("h1i2")
const h1i3 =  document.getElementById("h1i3")
const h1i4 =  document.getElementById("h1i4")
const h1i5 =  document.getElementById("h1i5")
const h1i6 =  document.getElementById("h1i6")
const h1i7 =  document.getElementById("h1i7")
const h1i8 =  document.getElementById("h1i8")
const h1i9 =  document.getElementById("h1i9")
const h1ta1 = document.getElementById("h1ta1")
const h1p1 = document.getElementById("h1p1")

function h1CrearStr() {
    try {        
        var result = ""            
        if (h1i1.value.toString().includes(h1i8.value) && h1i8.value != "") {            
            const palabras = h1i1.value.split(h1i8.value);            
            h1ta1.value = palabras.filter(text => text !== h1i8.value).join(`${h1i9.value}`);
        }
        for (let i in h1i1.value.toString()){
            result += `${h1i4.value}${h1i1.value[i]}${h1i5.value}`               
        }    
        result = `${h1i2.value}${result}${h1i3.value}`
        if (h1i6.value) {
            result = result.repeat(h1i6.value)
        }   
        if (h1i7.value) {
            result = result.substring(0, result.length / h1i7.value)
        }                        
        h1ta1.textContent = result                
        h1p1.textContent = h1i1.value.toString().length
    } catch (error) {
        alert(error)        
    }     
}

function h1CrearStrListener(elemnt){
    elemnt.addEventListener("input", ()=> {
        h1CrearStr()
    })
}



h1CrearStrListener(h1i1)
h1CrearStrListener(h1i2)
h1CrearStrListener(h1i3)
h1CrearStrListener(h1i4)
h1CrearStrListener(h1i5)
h1CrearStrListener(h1i6)
h1CrearStrListener(h1i7)

// Herramienta 2 (Coords Minecraft)
const h2i1 = document.getElementById("h2i1")
const h2r1 = document.getElementById("h2r1")
const h2r2 = document.getElementById("h2r2")
const h2b1 = document.getElementById("h2b1")
const h2b2 = document.getElementById("h2b2")
function optenerCoords(texto) {
    const spc = texto.split(" ")
    var res1 = ""
    var res2 = ""
    for (let i = 0; i<spc.length;i++) {
        const auxR = parseInt(spc[i])
        if (auxR) {
            res1 += `${parseInt(auxR*8)} `
            res2 += `${parseInt(auxR/8)} `
        }   
    }
    return [res1, res2]
}

h2i1.addEventListener("input",()=>{
    const res = optenerCoords(h2i1.value)
    h2r1.value = res[0]
    h2r2.value = res[1]
})

h2b1.addEventListener("click", ()=>{
    navigator.clipboard.writeText(h2r1.value)
})

h2b2.addEventListener("click", ()=>{
    navigator.clipboard.writeText(h2r2.value)
})
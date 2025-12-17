import ExtT from "../objects/ExtT.js"

class P5 { // Fractions        

  fLtx(f) {          
    if (f.d == 1) {
      ExtT.tex(`\\displaystyle${f.n}`, "p5ShowImput")
    } else {
      ExtT.tex(`\\displaystyle\\x^3 + frac{${f.n}}{${f.d}}`, "p5ShowImput")
    }
  } 

  ifSplit(txt, ch) {
    if (Array.isArray(txt)) {
      if (txt.length == 1) {
        return txt[0].split(ch)
      } else {
        const res = []
        for (i of txt) {
          res.push(i.split("ch"))
        }
        return res
      }

    } else {
      return (txt.includes(ch)) ? txt.split(ch) : [txt]
    }
  }

  txtToMath(txt) {
    const sf = this.ifSplit(txt, " ")    
    console.log(sf)
    var pf = []
    for (let i of sf) {      
      var frac_ = this.ifSplit(this.ifSplit(i, "+"), "-")
      var frac = this.ifSplit(i, "/")
      console.log(frac_ + " - " + frac)      
      // pf.push(math.fraction(frac[0], frac[1]))
    }
    return pf
    // return math.fraction(lf[0], lf[1])
  }

  decToFrac(dVal) {
    var n = 0, d = 1
    const d_ = dVal.split(".")            
    n = parseInt(`${d_[0]}${d_[1]}`)
    d = parseInt("1" + "0".repeat(d_[1].length))
    return math.fraction(n, d)
  }

  perDecToFrac(dVal) {
    var n = 0, d = 1    
    const d_ = dVal.split("..")
    const d_intenger = d_[0].split(".")[0]
    const d_decimal = d_[0].split(".")[1]
    const d_period = d_[1]                
    n = parseInt(`${d_intenger}${d_decimal}${d_period}`) - parseInt(`${d_intenger}${d_decimal}`)
    d = parseInt("9".repeat(d_period.length) + "0".repeat(d_decimal.length))
    return math.fraction(n, d)
  }

  formatPerDec(val) {
    const d_ = val.split("..")        
    d_[0] = d_[0].split(".")            
    return `${d_[0][0]}.${d_[0][1]}..${(d_[1] == "") ? d_[0][1] : d_[1]}..` 
  }

  toFrac(val) {
    if (val.includes("..")) {
      return this.perDecToFrac(this.formatPerDec(val))
    } else {
      return this.decToFrac(val)
    }
  }

  i1Action(i1) {
    try {  
      i1.value = i1.value.replace(/[^0-9\/\-+.()]/g, ''); 
      this.fLtx(this.txtToMath(i1.value))
      this.fLtx(this.toFrac(i1.value))  
    } catch (_) { }
  }

  main() {
    const i1 = document.getElementById("p5i1")
    i1.value = "12.45..45.."
    i1.addEventListener("input", ()=> {
      this.i1Action(i1)
    })
    this.i1Action(i1)
  }
}

export default P5


// 232.31445445... + 1/5+4/5 1/5(3/5) -5/7 + 4
// Convertir a fraccion el decimal empezando desde atras 
// Evaluar si hay espacios entre los operadores para asi generar una estructura 1/2 1/2 = (1/2)(1/2) != 1/2(1/2) = 1/(2(1/2))
// Añadir la posivilidad de sumar valores enteros  
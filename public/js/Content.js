// import ExtT from "../objects/ExtT.js"  

// class Content {     
//     constructor () {        
//         this.i1 = document.getElementById("rci1")
//         this.i2 = document.getElementById("rci2")        
//         this.r1 = document.getElementById("rcRes1")        
//         this.r2 = document.getElementById("rcRes2")        
//         this.r3 = document.getElementById("rcRes3")        
//         this.r4 = document.getElementById("rcRes4")        
//         this.r5 = document.getElementById("rcRes5")        
//         this.r6 = document.getElementById("rcRes6")       
//         this.reCont = document.getElementById("realContent")       
//     }

//     action() {           
//         const x = parseFloat(this.i1.value) 
//         const df = parseInt(this.i2.value)  
//         ExtT.tex(`\\Phi(${x})   
//           = ${jStat.normal.cdf(x, 0, 1)}`, this.r1)
//         ExtT.tex(`\\Phi^{-1}(${x})  
//           = ${jStat.normal.inv(x, 0, 1)}`, this.r2)
//         ExtT.tex(`T_{${df}}(${x}) 
//           = ${jStat.studentt.cdf(x, df)}`, this.r3)
//         ExtT.tex(`T_{${df}}^{-1}(${x}) 
//           = ${jStat.studentt.inv(x, df)}`, this.r4)        
//         ExtT.tex(`(\\chi^2)_{${df}}(${x}) 
//           = ${jStat.chisquare.cdf(x, df)}`, this.r5)
//         ExtT.tex(`(\\chi^2)_{${df}}^{-1}(${x}) 
//           = ${jStat.chisquare.inv(x, df)}`, this.r6)         
//     }    
    
//     show() {
//       this.reCont.style.display = "block"
//     }

//     hide() {
//       this.reCont.style.display = "none"
//     }

//     main() {
      
//       this.i1.addEventListener("input", ()=> {
//           this.i1.value = this.i1.value.replace(/[^0-9.-]/g, '');
//           this.action()           
//       })

//       this.i2.addEventListener("input", ()=> { 
//           this.i2.value = this.i2.value.replace(/[^0-9-]/g, '');
//           this.action()          
//       })  

//       this.i1.value = "0.99" 
//       this.i2.value = "10"  
//       this.action()
//       this.show() 
//     }

    
// }

// export default Content


import ExtT from "../objects/ExtT.js"  

jStat.geom = {
   pdf: function(k, p) {
      if (k < 0) return 0
      return Math.pow(1 - p, k) * p
   },
   cdf: function(k, p) {
      if (k < 0) return 0
      return 1 - Math.pow(1 - p, k + 1)
   },
   inv: function(q, p) {
      if (q < 0 || q > 1) return NaN
      return Math.ceil(Math.log(1 - q) / Math.log(1 - p)) - 1
   }
} 

class Content {     
   constructor () {
      this.reCont = document.getElementById("realContent")       
      this.titleContent = document.getElementById("titleContent")       
      this.formContent = document.getElementById("formContent")       
   }   

   actionTool(type, i, res1, res2) {
      const q = parseFloat(i[0].value)
      const isProb = !isNaN(q) && q > 0 && q < 1 && q !== 0.5 

      switch(type) {
         case "normal":
            ExtT.tex(`\\Phi(${i[0].value})
               = ${jStat.normal.cdf(parseFloat(i[0].value), parseFloat(i[1].value), parseFloat(i[2].value))}`, res1)
            if (isProb) {
               res2.style.display = "block"
               ExtT.tex(`\\Phi^{-1}(${i[0].value})  
                  = ${jStat.normal.inv(parseFloat(i[0].value), parseFloat(i[1].value), parseFloat(i[2].value))}`, res2)
            } else res2.style.display = "none"
            break

         case "t":
            ExtT.tex(`T_{${i[1].value}}(${i[0].value}) 
               = ${jStat.studentt.cdf(parseFloat(i[0].value), parseFloat(i[1].value))}`, res1)
            if (isProb) {
               res2.style.display = "block"
               ExtT.tex(`T_{${i[1].value}}^{-1}(${i[0].value}) 
                  = ${jStat.studentt.inv(parseFloat(i[0].value), parseFloat(i[1].value))}`, res2)
            } else res2.style.display = "none"
            break

         case "chi2":
            ExtT.tex(`(\\chi^2)_{${i[1].value}}(${i[0].value}) 
               = ${jStat.chisquare.cdf(parseFloat(i[0].value), parseFloat(i[1].value))}`, res1)
            if (isProb) {
               res2.style.display = "block"
               ExtT.tex(`(\\chi^2)_{${i[1].value}}^{-1}(${i[0].value}) 
                  = ${jStat.chisquare.inv(parseFloat(i[0].value), parseFloat(i[1].value))}`, res2)
            } else res2.style.display = "none"
            break

         case "f":
            ExtT.tex(`F_{${i[1].value},${i[2].value}}(${i[0].value}) 
               = ${jStat.centralF.cdf(parseFloat(i[0].value), parseFloat(i[1].value), parseFloat(i[2].value))}`, res1)
            if (isProb) {
               res2.style.display = "block"
               ExtT.tex(`F^{-1}_{${i[1].value},${i[2].value}}(p) 
                  = ${jStat.centralF.inv(parseFloat(i[0].value), parseFloat(i[1].value), parseFloat(i[2].value))}`, res2)
            } else res2.style.display = "none"
            break

         case "uniform":
            ExtT.tex(`U(${i[1].value},${i[2].value})(${i[0].value}) 
               = ${jStat.uniform.cdf(parseFloat(i[0].value), parseFloat(i[1].value), parseFloat(i[2].value))}`, res1)
            if (isProb) {
               res2.style.display = "block"
               ExtT.tex(`U^{-1}(${i[0].value}; ${i[1].value},${i[2].value}) 
                  = ${jStat.uniform.inv(parseFloat(i[0].value), parseFloat(i[1].value), parseFloat(i[2].value))}`, res2)
            } else res2.style.display = "none"
            break

         case "beta":
            ExtT.tex(`\\Beta(${i[1].value},${i[2].value})(${i[0].value}) 
               = ${jStat.beta.cdf(parseFloat(i[0].value), parseFloat(i[1].value), parseFloat(i[2].value))}`, res1)
            if (isProb) {
               res2.style.display = "block"
               ExtT.tex(`\\Beta^{-1}(${i[0].value};${i[1].value},${i[2].value}) 
                  = ${jStat.beta.inv(parseFloat(i[0].value), parseFloat(i[1].value), parseFloat(i[2].value))}`, res2)
            } else res2.style.display = "none"
            break

         case "gamma": 
            ExtT.tex(`\\gamma(${i[1].value},${i[2].value})(${i[0].value})
               = ${jStat.gamma.cdf(parseFloat(i[0].value), parseFloat(i[1].value), parseFloat(i[2].value))}`, res1)
            if (isProb) {
               res2.style.display = "block"
               ExtT.tex(`\\gamma^{-1}(${i[0].value};${i[1].value},${i[2].value})
                  = ${jStat.gamma.inv(parseFloat(i[0].value), parseFloat(i[1].value), parseFloat(i[2].value))}`, res2)
            } else res2.style.display = "none"
            break

         case "exponential":
            ExtT.tex(`Exp(${i[1].value})(${i[0].value})
               = ${jStat.exponential.cdf(parseFloat(i[0].value), parseFloat(i[1].value))}`, res1)
            if (isProb) {
               res2.style.display = "block"
               ExtT.tex(`Exp^{-1}(${i[0].value};${i[1].value})
                  = ${jStat.exponential.inv(parseFloat(i[0].value), parseFloat(i[1].value))}`, res2)
            } else res2.style.display = "none"
            break

         case "lognormal":
            ExtT.tex(`LogNormal(${i[1].value},${i[2].value})(${i[0].value})
               = ${jStat.lognormal.cdf(parseFloat(i[0].value), parseFloat(i[1].value), parseFloat(i[2].value))}`, res1)
            if (isProb) {
               res2.style.display = "block"
               ExtT.tex(`LogNormal^{-1}(${i[0].value};${i[1].value},${i[2].value})
                  = ${jStat.lognormal.inv(parseFloat(i[0].value), parseFloat(i[1].value), parseFloat(i[2].value))}`, res2)
            } else res2.style.display = "none"
            break

         case "weibull":
            ExtT.tex(`Weibull(${i[1].value},${i[2].value})(${i[0].value})
               = ${jStat.weibull.cdf(parseFloat(i[0].value), parseFloat(i[1].value), parseFloat(i[2].value))}`, res1)
            if (isProb) {
               res2.style.display = "block"
               ExtT.tex(`Weibull^{-1}(${i[0].value};${i[1].value},${i[2].value})
                  = ${jStat.weibull.inv(parseFloat(i[0].value), parseFloat(i[1].value), parseFloat(i[2].value))}`, res2)
            } else res2.style.display = "none"
            break

         case "cauchy":
            ExtT.tex(`Cauchy(${i[1].value},${i[2].value})(${i[0].value})
               = ${jStat.cauchy.cdf(parseFloat(i[0].value), parseFloat(i[1].value), parseFloat(i[2].value))}`, res1)
            if (isProb) {
               res2.style.display = "block"
               ExtT.tex(`Cauchy^{-1}(${i[0].value}; ${i[1].value},${i[2].value}) 
                  = ${jStat.cauchy.inv(parseFloat(i[0].value), parseFloat(i[1].value), parseFloat(i[2].value))}`, res2)
            } else res2.style.display = "none"
            break

         case "arcsine":
            ExtT.tex(`Arcsine(${i[1].value},${i[2].value})(${i[0].value}) 
               = ${jStat.arcsine.cdf(parseFloat(i[0].value), parseFloat(i[1].value), parseFloat(i[2].value))}`, res1)
            if (isProb) {
               res2.style.display = "block"
               ExtT.tex(`Arcsine^{-1}(p; ${i[1].value},${i[2].value}) 
                  = ${jStat.arcsine.inv(parseFloat(i[0].value), parseFloat(i[1].value), parseFloat(i[2].value))}`, res2)
            } else res2.style.display = "none"
            break

         case "triangular":
            ExtT.tex(`Triangular(${i[1].value},${i[2].value},${i[3].value})(${i[0].value}) 
               = ${jStat.triangular.cdf(parseFloat(i[0].value), parseFloat(i[1].value), parseFloat(i[2].value), parseFloat(i[3].value))}`, res1)
            res2.style.display = "none"
            break

         case "poisson":
            ExtT.tex(`Poisson(${i[1].value})(${i[0].value}) 
               = ${jStat.poisson.cdf(parseFloat(i[0].value), parseFloat(i[1].value))}`, res1)
            res2.style.display = "none"
            break

         case "binomial":
            ExtT.tex(`Binomial(${i[1].value},${i[2].value})(${i[0].value}) 
               = ${jStat.binomial.cdf(parseFloat(i[0].value), parseFloat(i[1].value), parseFloat(i[2].value))}`, res1) 
            res2.style.display = "none"          
            break

         case "geometric":
            const k = parseInt(i[0].value)
            const p = parseFloat(i[1].value)
            ExtT.tex(`Geometric(${p})(${k})  
               = ${jStat.geom.cdf(k, p)}`, res1)
            res2.style.display = "none"
            break

         case "negbin":
            ExtT.tex(`NegBin(${i[1].value},${i[2].value})(${i[0].value})
               = ${jStat.negbin.cdf(parseFloat(i[0].value), parseFloat(i[1].value), parseFloat(i[2].value))}`, res1)
            res2.style.display = "none"
            break

         case "hypgeom":
            ExtT.tex(`Hypergeom(${i[1].value},${i[2].value},${i[3].value})(${i[0].value})
               = ${jStat.hypgeom.cdf(parseFloat(i[0].value), parseFloat(i[1].value), parseFloat(i[2].value), parseFloat(i[3].value))}`, res1)
            res2.style.display = "none"
            break

         default:
            break
      } 
   }


   addInputs(to, types) {
      let res = []
      types.forEach(t => {
         const div = ExtT.createElement("div", to, "input-group")
         const input = ExtT.createElement("input", div)      
         res.push(input)
         input.required = true
         input.type = "number"
         input.step = "any"
         const label = ExtT.createElement("label", div, "user-label")
         let dataTypes = {
            "x": "X \\text{ ó } P(X) ",
            "u": "\\mu",
            "o": "\\sigma",
            "df": "\\text{Grados de libertad } (\\nu)",  
            "num": "\\text{GL Numerador}",
            "den": "\\text{GL Denominador}",
            "a_": "\\alpha",
            "b_": "\\beta",
            "l": "\\lambda",
            "g": "\\gamma",
         }
         if (!dataTypes[t]) dataTypes[t] = t
         ExtT.tex(dataTypes[t], label)     
      })
      return res
   }

   makeTool(nombre, type, inputTypes, defaultValues = null) {
      const b = ExtT.createElement("button", this.titleContent, "toolP")
      b.textContent = nombre
      const div = ExtT.createElement("div", this.formContent, "toolContainer")          
      b.addEventListener("click", () => {
         div.classList.toggle("show")
         b.classList.toggle("show")
      })
      const sep = ExtT.createElement("div", div, "separator")
      const divFormula = ExtT.createElement("div", div, "formula")    
      const latexFormulas = {   
          normal: `f(x; \\mu, \\sigma) = \\frac{1}{\\sqrt{2\\pi\\sigma^2}} e^{-\\tfrac{(x-\\mu)^2}{2\\sigma^2}}`,
          t: `f(x; \\nu) = \\frac{\\Gamma\\big((\\nu+1)/2\\big)}{\\sqrt{\\nu\\pi}\\,\\Gamma(\\nu/2)} \\Big(1+\\tfrac{x^2}{\\nu}\\Big)^{-(\\nu+1)/2}`,
          chi2: `f(x; \\nu) = \\frac{1}{2^{\\nu/2}\\Gamma(\\nu/2)} x^{\\nu/2-1} e^{-x/2}, \\; x>0`, 
          f: `f(x; d_1,d_2) = \\frac{\\sqrt{\\tfrac{(d_1 x)^{d_1} d_2^{d_2}}{(d_1 x + d_2)^{d_1+d_2}}}}{x B(d_1/2,d_2/2)}`,
          uniform: `f(x;a,b) = \\frac{1}{b-a}, \\; a \\le x \\le b`,
          beta: `f(x;\\alpha,\\beta) = \\frac{1}{B(\\alpha,\\beta)} x^{\\alpha-1} (1-x)^{\\beta-1}, \\; 0<x<1`,
          gamma: `f(x;\\alpha,\\beta) = \\frac{\\beta^\\alpha}{\\Gamma(\\alpha)} x^{\\alpha-1} e^{-\\beta x}, \\; x>0`,
          exponential: `f(x;\\lambda) = \\lambda e^{-\\lambda x}, \\; x>0`,
          lognormal: `f(x;\\mu,\\sigma) = \\frac{1}{x\\sigma\\sqrt{2\\pi}} e^{-\\tfrac{(\\ln x - \\mu)^2}{2\\sigma^2}}, \\; x>0`,
          weibull: `f(x; k, \\lambda) = \\frac{k}{\\lambda} \\Big(\\tfrac{x}{\\lambda}\\Big)^{k-1} e^{-(x/\\lambda)^k}, \\; x>0`,
          cauchy: `f(x; x_0, \\gamma) = \\frac{1}{\\pi \\gamma \\big[1 + (\\tfrac{x-x_0}{\\gamma})^2\\big]}`,
          arcsine: `f(x;a,b) = \\frac{1}{\\pi \\sqrt{(x-a)(b-x)}}, \\; a<x<b`,
          triangular: `f(x;a,b,c) = \\begin{cases}
          \\tfrac{2(x-a)}{(b-a)(c-a)}, & a\\le x<c \\\\
          \\tfrac{2(b-x)}{(b-a)(b-c)}, & c\\le x\\le b
          \\end{cases}`,
          poisson: `P(X=k;\\lambda) = \\frac{\\lambda^k e^{-\\lambda}}{k!}`,
          binomial: `P(X=k;n,p) = \\binom{n}{k} p^k (1-p)^{n-k}`,
          geometric: `P(X=k;p) = (1-p)^{k-1} p, \\; k=1,2,\\dots`,
          negbin: `P(X=k;r,p) = \\binom{k+r-1}{k} (1-p)^k p^r, \\; k=0,1,2,\\dots`, 
          hypgeom: `P(X = x; N, m, n) = \\frac{\\binom{m}{x} \\binom{N - m}{n - x}}{\\binom{N}{n}}` 
      }
      if (latexFormulas[type]) {
          ExtT.tex(latexFormulas[type], divFormula)
      }
      
      const divInputs = ExtT.createElement("div", div, "inputs")      
      const inputs  = this.addInputs(divInputs, inputTypes)      
      const divResults = ExtT.createElement("div", div, "results")    
      const res1 = ExtT.createElement("div", divResults)
      const res2 = ExtT.createElement("div", divResults)      
      inputs.forEach(inp => {
         if (defaultValues) {
            inp.value = defaultValues[inputs.indexOf(inp)]
         }
         divResults.style.display = "none"         
         inp.addEventListener("input", ( )=> {
            let valid = true          
            inputs.forEach(inp => {
               if (inp.value.trim() === "") valid = false
            })
            if (valid) {            
               divResults.style.display = "block"
               this.actionTool(type, inputs, res1, res2) 
            }
         })         
      })      
   }
   
   main() {      
      this.makeTool("Normal", "normal", ["x","u","o"], [null, 0, 1])
      this.makeTool("T de Student", "t", ["x","df"], [null, 10])
      this.makeTool("Chi Cuadrado", "chi2", ["x","df"], [null, 10])
      this.makeTool("F de Snedecor", "f", ["x","num","den"], [null, 1, 1])
      this.reCont.style.display = "block" 
   }  
}

export default Content

import ExtT from "../objects/ExtT.js"  

class Content {     
    constructor () {        
        this.i1 = document.getElementById("rci1")
        this.i2 = document.getElementById("rci2")        
        this.r1 = document.getElementById("rcRes1")        
        this.r2 = document.getElementById("rcRes2")        
        this.r3 = document.getElementById("rcRes3")        
        this.r4 = document.getElementById("rcRes4")        
        this.r5 = document.getElementById("rcRes5")        
        this.r6 = document.getElementById("rcRes6")       
        this.reCont = document.getElementById("realContent")       
    }

    action() {           
        const x = parseFloat(this.i1.value) 
        const df = parseInt(this.i2.value)  
        ExtT.tex(`\\Phi(${x})   
          = ${jStat.normal.cdf(x, 0, 1)}`, this.r1)
        ExtT.tex(`\\Phi^{-1}(${x})  
          = ${jStat.normal.inv(x, 0, 1)}`, this.r2)
        ExtT.tex(`T_{${df}}(${x}) 
          = ${jStat.studentt.cdf(x, df)}`, this.r3)
        ExtT.tex(`T_{${df}}^{-1}(${x}) 
          = ${jStat.studentt.inv(x, df)}`, this.r4)        
        ExtT.tex(`(\\chi^2)_{${df}}(${x}) 
          = ${jStat.chisquare.cdf(x, df)}`, this.r5)
        ExtT.tex(`(\\chi^2)_{${df}}^{-1}(${x}) 
          = ${jStat.chisquare.inv(x, df)}`, this.r6)         
    }    
    
    show() {
      this.reCont.style.display = "block"
    }

    hide() {
      this.reCont.style.display = "none"
    }

    main() {
      
      this.i1.addEventListener("input", ()=> {
          this.i1.value = this.i1.value.replace(/[^0-9.-]/g, '');
          this.action()           
      })

      this.i2.addEventListener("input", ()=> { 
          this.i2.value = this.i2.value.replace(/[^0-9-]/g, '');
          this.action()          
      })  

      this.i1.value = "0.99" 
      this.i2.value = "10"  
      this.action()
      this.show() 
    }

    
}

export default Content

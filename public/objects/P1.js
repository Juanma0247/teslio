import ExtT from "../objects/ExtT.js"

class P1 { // Cifrado Hill
    constructor () {        
        this.i1 =  document.getElementById("p1i1")
        this.i2 =  document.getElementById("p1i2")
        this.i3 =  document.getElementById("p1i3")
        this.ta1 = document.getElementById("p1ta1")
        this.r1 = document.getElementById("p1r1")
        this.r2 = document.getElementById("p1r2")        
        this.e1 = document.getElementById("p1e1")        
    }    
    
    multiplicarMatrices(mA, mB) {
      try {
          if (mA[0].length !== mB.length) {            
              return 0
          } else {
              const filas = mA.length;
              const columnas = mB[0].length;
              const res = new Array(filas).fill(0).map(() => new Array(columnas).fill(0));
              for (let i = 0; i < filas; i++) {
                  for (let j = 0; j < columnas; j++) {
                      for (let k = 0; k < filas; k++) {
                          res[i][j] += mA[i][k] * mB[k][j];
                      }                                        
                  }
              }
              return res
          }
      } catch (error) {        
          return 0        
      }  
    }
    
    multiplicarMCporMatrices(mc, matrices){
      var res = []
      for (let i = 0; i < matrices.length; i++){
          res.push(this.multiplicarMatrices(mc, matrices[i]))
      }
      return res
    }
    
    crearMatrizMC(caracteres, frace, tamano, filas){
      try {
          var todo = []
          for (let i = 0; i < tamano; i++) {      
              todo.push(caracteres.indexOf(frace[i]))
          }
          const matriz = [];
          for (let i = 0; i < todo.length; i += filas) {
              const sublista = todo.slice(i, i + filas);
              matriz.push(sublista);
          }
          return matriz
      } catch (error) {
          return 0        
      }    
    }
    
    crearMatrices(caracteres, frace, tamano, filas){
      try {
          var todo = []
          for (let i = 0; i < tamano; i++) {      
              todo.push(caracteres.indexOf(frace[i]))
          }
          
          const matriz = [];        
    
          for (let i = 0; i < todo.length; i += filas) {            
              var sublista = todo.slice(i, i + filas);
              for (let j = 0; j < sublista.length; j++) {
                  sublista[j] = [sublista[j]]
              }
              matriz.push(sublista);
          }
    
          if (matriz[matriz.length - 1][filas - 1] >= 0) {
              return matriz
          } else {
              for (let i = 0; i < filas - matriz[matriz.length - 1].length + 1; i++){
                  matriz[matriz.length - 1].push([caracteres.length - 1])                
              }
              return matriz
          }
      } catch (error) {
          return 0        
      }    
    }
    
    modularMatrices(matrices, modulo){
      var res = []
      for (let i = 0; i < matrices.length; i++){
          var matrizModulada = [] 
          for (let j = 0; j < matrices[0].length; j++){
              const fila = []
              for (let k = 0; k < matrices[0][0].length; k++) {
                  fila.push(matrices[i][j][k] % modulo)              
              }
              matrizModulada.push(fila)            
          }
          res.push(matrizModulada)        
      }       
      return res
    }
    
    
    crearStrListener(elemnt){
      elemnt.addEventListener("input", ()=> {  
          this.main()          
          const regex = new RegExp("[^" + this.i1.value + "\\s]");        
          this.i2.value = this.i2.value.replace(regex, "")
          this.i3.value = this.i3.value.replace(regex, "")
      })
    }
    
    matricesAMensaje(matrices, caracteres) {
      var res = ""
      for (let i = 0; i < matrices.length; i++){        
          for (let j = 0; j < matrices[0].length; j++){            
              for (let k = 0; k < matrices[0][0].length; k++) {
                  res += caracteres[matrices[i][j][k]]
              }            
          }
      }       
      return res
    }
    
    determinanteSarrus(matriz) {     
      const matrizExpa = matriz
      var tamano = matriz.length    
      if (tamano > 2){
          var sumas = 0
          var restas = 0    
          for (let i = 0; i < tamano; i++){
              const aux = matriz[i].slice(0, tamano - 1)
              for (let j = 0; j < tamano - 1; j++) {
                  matrizExpa[i].push(aux[j])
              }        
          }            
          for (let i = 0; i < tamano; i++) {
              var auxMulti = 1
              for (let j = 0; j < tamano; j++) {
                  auxMulti *= matrizExpa[j][j+i]
              }   
              sumas += auxMulti    
          }    
          for (let i = 0; i < tamano; i++) {
              var auxMulti = 1
              for (let j = 0; j < tamano; j++) {
                  auxMulti *= matrizExpa[tamano-j-1][j+i]
              }   
              restas -= auxMulti  
          }
          return sumas + restas        
      } else {
          if (tamano == 2) {
              return matriz[0][0] * matriz[1][1] - matriz[0][1] * matriz[1][0]
          } else {
              return matriz[0][0]
          }         
      }
      
    }
    
    matrizInversa(_matriz){
      const matriz = _matriz
      if (true) {
          const tamano = matriz.length
          const res = this.crearIdentidad(tamano)
          for (let i = 0; i < tamano; i++) {
              if (matriz[i][i] == 0){
                  for (let j = i + 1; i < tamano; i++){
                      if (matriz[j][i] != 0) {
                          this.intercambiarFilas(matriz, i, j)
                          this.intercambiarFilas(res, i, j)
                          break
                      }
                  }
              }
              const pivot = matriz[i][i]
              for (let j = 0; j < tamano; j++) {            
                  matriz[i][j] = matriz[i][j] / pivot
                  res[i][j] = res[i][j] / pivot
              }
              for (let j = 0; j < tamano; j++) {
                  if (j != i){
                      const factor = matriz[j][i]
                      for (let k = 0; k < tamano; k++) {
                          matriz[j][k] = matriz[j][k] - (factor * matriz[i][k])
                          res[j][k] = res[j][k] - (factor * res[i][k])
                      }
                  }
              }
          }
          return res
      } else {        
          return matriz
      }
    }
    
    intercambiarFilas(matriz, f1, f2){
      const aux = matriz[f1]
      matriz[f1] = matriz[f2]
      matriz[f2] = aux
      return matriz
    }
    
    crearIdentidad(tamano) {
      var res = []
      for (let i = 0; i < tamano; i++) {
          var fila = []
          for (let j = 0; j < tamano; j++) {
              if (j == i) {
                  fila.push(1)
              } else {
                  fila.push(0)
              }            
          }
          res.push(fila)
      }
      return res
    }
    
    matizAFraciones(matriz) {
      const res = []
      const tamano = matriz.length
      for (let i = 0; i < tamano; i++){
          const fila = []
          for (let j = 0; j < tamano; j++){
              const frac = math.fraction(matriz[i][j])
              fila.push(`${frac.s * frac.n}/${frac.d}`)
          }   
          res.push(fila)        
      }
      return res
    }
    
    modularFraccion(fraccion, modulo) {
      const numerador = fraccion.split("/")[0]
      const denominador = fraccion.split("/")[1]
      let numeradorMod = numerador % modulo;
      if (numerador < 0){
          numeradorMod = modulo - ((numerador * -1) % modulo)
      } else {
          numeradorMod = numerador % modulo
      }
      let denominadorMod = this.encontrarInversoModular(denominador % modulo, modulo);
      const resultado = (numeradorMod * denominadorMod) % modulo;
    
      return resultado;
    
    }
    
    inversaModulada(mi, modulo){
      const res = []
      for (let i = 0; i < mi.length; i++) {
          const fila = []
          for (let j = 0; j < mi.length; j++) {
              fila.push(this.modularFraccion(mi[i][j], modulo))
          }   
          res.push(fila)
      }
      return res
    }
    
    encontrarInversoModular(numero, modulo) {
      for (let x = 1; x < modulo; x++) {
          if (((numero % modulo) * (x % modulo)) % modulo === 1) {
              return x;
          }
      }
      return 1;
    }                    
    
    crearLtxTablaCaracteres(caracteres) {      
      var res = ""
      for (let i = 0; i < caracteres.length / 10; i++){
          var c = ""
          var car = ""
          var pos = ""
          for (let j = 0; j < 10; j++){
              if (caracteres[(10*i)+(j)]) {
                  c += "c"
                  car += `${caracteres[(10*i)+(j)]}&`
                  pos += `${(10*i)+(j+1)-1}&`  
              }                  
          }
          res += `\\begin{array}{${c}}${car.slice(0, car.length - 1)} \\\\ ${pos.slice(0, pos.length - 1)} \\\\ \\end{array}\\\\`
      }    
      ExtT.tex(res, "p1TablaDeCaracteres")
    }
    
    crearLtxMC(MC, mensajeDeCifrado, tamano) {      
      var res1 = ""
      var res2 = ""
      for (let i = 0; i < tamano; i++){                
          for (let j = 0; j < tamano; j++){        
              res1 += `${mensajeDeCifrado[(tamano*i)+j]}&`
              res2 += `${MC[i][j]} &`
          }
          res1 = res1.slice(0, res1.length - 1)
          res2 = res2.slice(0, res2.length - 1)
          res1 += "\\\\"
          res2 += "\\\\"
      }
      const res = `\\begin{matrix}${res1}\\end{matrix} = \\begin{bmatrix}${res2}\\end{bmatrix}`
      ExtT.tex(res, "p1MatrizDeCifrado")
    }
    
    crearLtxMatrices(matrices) {      
      var res = ""
      var cont = 0
      for (let f = 0; f < matrices.length; f++){        
          var res2 = ""
          for (let i = 0; i < matrices[0].length; i++){                    
              res2 += `${matrices[f][i][0]} \\\\`       
          }        
          var res1 = `\\begin{bmatrix}${res2}\\end{bmatrix}`
          res += `${res1}, \\,`
          cont += 1
          if (cont > 7) {
              res += "\\\\"
              cont = 0            
          }
      }
      res = res.slice(0, res.length - 4)     
      ExtT.tex(res, "p1Matries")
    }
    
    crearLtxMCPorMatrices(mc, matrices, matricesPorMC, matricesPorMCModulada, tamano, modulo) {      
      var res = ""
      for (let f = 0; f < matrices.length; f++){
          var res1 = ""
          var res2 = ""
          var res3 = ""
          var res4 = ""
          for (let i = 0; i < tamano; i++){                
              for (let j = 0; j < tamano; j++){                    
                  res1 += `${mc[i][j]} &`
              }        
              res1 = res1.slice(0, res1.length - 1)        
              res1 += "\\\\"        
              res2 += `${matrices[f][i][0]} \\\\`
              res3 += `${matricesPorMC[f][i][0]}\\,\\, mod(${modulo})\\\\`
              res4 += `${matricesPorMCModulada[f][i][0]} \\\\`
          }        
          res  += `\\begin{bmatrix}${res1}\\end{bmatrix} \\times \\begin{bmatrix}${res2}\\end{bmatrix}` +
          `= \\begin{bmatrix}${res3}\\end{bmatrix} = \\begin{bmatrix}${res4}\\end{bmatrix}\\\\`        
      }        
      ExtT.tex(res, "p1MCPorMatrices")
    }
    
    crearLtxMCInversa(mc, inversa, inversaModulada, tamano, modulo) {      
      var res1 = ""
      var res2 = ""
      var res3 = ""
      for (let i = 0; i < tamano; i++){                
          for (let j = 0; j < tamano; j++){        
              res1 += `${mc[i][j]}&`
              const d = inversa[i][j].split("/")[0]
              const n = inversa[i][j].split("/")[1]
              res2 += `\\frac{${d}}{${n}} \\,\\, mod(${modulo}) &`
              res3 += `${inversaModulada[i][j]} &`
          }
          res1 = res1.slice(0, res1.length - 1)
          res2 = res2.slice(0, res2.length - 1)
          res3 = res3.slice(0, res3.length - 1)
          res1 += "\\\\"
          res2 += "\\\\\\\\"
          res3 += "\\\\"
      }
      const res = `=\\begin{bmatrix}${res1}\\end{bmatrix}^{-1} \\\\ = \\begin{bmatrix}${res2}\\end{bmatrix}` + 
      `\\\\ = \\begin{bmatrix}${res3}\\end{bmatrix}`
      ExtT.tex(res, "p1MCInversa")
    }
    
    crearLtxMCIPorMatrices(mci, matrices, matricesPorMCI, matricesPorMCIModulada, tamano, modulo) {      
      var res = ""
      for (let f = 0; f < matrices.length; f++){
          var res1 = ""
          var res2 = ""
          var res3 = ""
          var res4 = ""
          for (let i = 0; i < tamano; i++){                
              for (let j = 0; j < tamano; j++){                    
                  res1 += `${mci[i][j]} &`
              }        
              res1 = res1.slice(0, res1.length - 1)        
              res1 += "\\\\"        
              res2 += `${matrices[f][i][0]} \\\\`
              res3 += `${matricesPorMCI[f][i][0]}\\,\\, mod(${modulo})\\\\`
              res4 += `${matricesPorMCIModulada[f][i][0]} \\\\`
          }        
          res  += `\\begin{bmatrix}${res1}\\end{bmatrix} \\times \\begin{bmatrix}${res2}\\end{bmatrix}` +
          `= \\begin{bmatrix}${res3}\\end{bmatrix} = \\begin{bmatrix}${res4}\\end{bmatrix}\\\\`        
      }    
      ExtT.tex(res, "p1MCIPorMatrices")
    }
    
    starter() {
      this.i1.value = "abcdefghijklmnopqrstuvwxyz1234567890 "
      this.i2.value = "2024"
      this.i3.value = ""
      this.crearStrListener(this.i1)
      this.crearStrListener(this.i2)
      this.crearStrListener(this.i3)
    }

    contextSeters() {
        const options = [
            document.getElementById("p1Process"),
            document.getElementById("p1Introduction"),
            document.getElementById("p1Instructions")            
        ]

        const contents = [
            document.getElementById("p1ContProcess"),
            document.getElementById("p1ContIntroduction"),
            document.getElementById("p1ContInstructions")         
        ]

        options.forEach((option, i) => {
            option.addEventListener("click", () => {                
                options.forEach((opt, j) => {
                    if (i === j) {                        
                        const isActive = opt.classList.contains("p1OptionActive")
                        opt.classList.toggle("p1OptionActive")
                        contents[j].style.display = isActive ? "none" : "block"
                    } else {                        
                        opt.classList.remove("p1OptionActive")
                        contents[j].style.display = "none"
                    }
                })
            })
        })        
    }
        
    main() {      
        this.contextSeters() 
        document.getElementById("p1ContProcess").click() 
        this.e1.style.display = "none"        
        if (this.i2.value.length > 3) {
            const caracteres = this.i1.value
            const textoDeCifrado = this.i2.value
            const texto = this.i3.value    
            const i = Math.floor(Math.sqrt(textoDeCifrado.length))
            const tMC = Math.pow(i, 2)
            const modulo = this.i1.value.length    
            const mc = this.crearMatrizMC(caracteres, textoDeCifrado, tMC, i)        
            const auxMC = this.crearMatrizMC(caracteres, textoDeCifrado, tMC, i)
            const aux2MC = this.crearMatrizMC(caracteres, textoDeCifrado, tMC, i)
            const matrices = this.crearMatrices(caracteres, texto, texto.length, i)
            const matricesPorMC = this.multiplicarMCporMatrices(aux2MC, matrices)
            const matricesPorMCModulada = this.modularMatrices(matricesPorMC, modulo)
            const mensajeCifrado = this.matricesAMensaje(matricesPorMCModulada, caracteres)
            const determinante = this.determinanteSarrus(auxMC)
            var inversa = []
            if (determinante != 0){
                inversa = this.matrizInversa(auxMC)
                const auxMatricesCifradas = this.crearMatrices(caracteres, mensajeCifrado, mensajeCifrado.length, i)    
                const auxinversaModulada = this.inversaModulada(this.matizAFraciones(inversa), modulo)              
                const auxMatricesPorMCI = this.multiplicarMCporMatrices(auxinversaModulada, auxMatricesCifradas)
                const auxMatricesPorMCIModulada = this.modularMatrices(auxMatricesPorMCI, modulo)
                const auxMensajeDecifrado = this.matricesAMensaje(auxMatricesPorMCIModulada, caracteres)    
                const matricesCifradas = this.crearMatrices(caracteres, texto, texto.length, i)    
                const inversaModulada = this.inversaModulada(this.matizAFraciones(inversa), modulo)
                const matricesPorMCI = this.multiplicarMCporMatrices(inversaModulada, matricesCifradas)
                const matricesPorMCIModulada = this.modularMatrices(matricesPorMCI, modulo)
                const mensajeDecifrado = this.matricesAMensaje(matricesPorMCIModulada, caracteres)
                if (texto.slice(0, parseInt(texto.length / 2)) == auxMensajeDecifrado.slice(0, parseInt(texto.length / 2))){
                    this.r1.value = mensajeCifrado
                    this.r2.value = mensajeDecifrado  
                    this.crearLtxTablaCaracteres(caracteres)   
                    this.crearLtxMC(mc, textoDeCifrado, i)                       
                    this.crearLtxMatrices(auxMatricesCifradas)                  
                    this.crearLtxMCPorMatrices(mc, matrices, matricesPorMC, matricesPorMCModulada, i, modulo)      
                    this.crearLtxMCInversa(mc, this.matizAFraciones(inversa), this.inversaModulada(this.matizAFraciones(inversa), modulo), i, modulo)                  
                    this.crearLtxMCIPorMatrices(inversaModulada, matricesCifradas, matricesPorMCI, matricesPorMCIModulada, i, modulo)
                } else {            
                    this.e1.style.display = "block"
                    this.e1.textContent = "Sin inverso modular"
                }        
            } else {        
                    this.e1.style.display = "block"
                    this.e1.textContent = "Determinante = 0"
            }      
        }    
    }
}

export default P1
import ExtT from "../objects/ExtT.js"

class J3 { // Minesweeper    
    constructor(heightBoard, widthBoard, data, seconds, score) {        
        this.widthBoard = widthBoard
        this.heightBoard = heightBoard                                 
        this.gridElement = document.querySelector(".j3Grid")                
        this.t1 = document.getElementById("j3t1")
        this.grid = Array.from({ length : heightBoard }, (_) => 
            Array.from({ length : widthBoard }, () => 0)
        );
        this.numberOfMines = Math.floor(((this.widthBoard * this.heightBoard) * 20) / 100)
        this.sp1 = document.getElementById("j3Statisticsp1")
        this.sp2 = document.getElementById("j3Statisticsp2")
        this.sp3 = document.getElementById("j3Statisticsp3")
        this.sp4 = document.getElementById("j3Statisticsp4")
        if (data) {           
            this.data = data
        } else {
            this.data = Array.from({ length : heightBoard }, (_) => 
                Array.from({ length : widthBoard }, () => 0)
            );
        }  
        if (seconds) {
            this.seconds = seconds
        } else {
            this.seconds = 0        
        }
        if (score) {    
            this.score = score
        } else {
            this.score = 0
        }
        
        this.loseGame = this.loseGame.bind(this);
        this.time = null    
    }
    
    startTime() {
        if (this.time) {
            clearInterval(this.time);
        }
        this.time = setInterval(() => {
            this.seconds++;            
            this.setStatistics(this.seconds);
        }, 1000);
    }
    
    loseGame = () => {       
        clearInterval(this.time) 
        this.setStatistics(this.seconds); 
        this.block(this.gridElement)         
        this.gridElement.classList.add("j3GridLose")    
        this.t1.textContent = "¡Ka-Boom!"
        this.t1.style.color = "#ff3939"        
        this.sp1.style.color = "#ff3939"
        this.sp2.style.color = "#ff3939"
        this.sp3.style.color = "#ff3939"
        this.sp4.style.color = "#ff3939"
        this.grid.forEach(i => {
            i.forEach(j => {                          
                this.removeFlag(j.parentElement)
                if (j.parentElement.querySelector(".j3ElementMine") != null) {                    
                    j.parentElement.querySelector(".j3ElementMine").style.display = "block"
                    j.parentElement.style.backgroundColor = "#88000015"                    
                } else {                                     
                    j.parentElement.querySelector("p").style.display = "block"                    
                    j.parentElement.style.backgroundColor = "#88000015"         
                }
            })
        })        
    }
    
    winGame() {                      
        clearInterval(this.time)
        this.setStatistics(this.seconds);       
        this.gridElement.classList.add("j3GridWin")        
        this.t1.textContent = "Tablero limpio"
        this.t1.style.color = "#39ff39"        
        this.sp1.style.color = "#39ff39"
        this.sp2.style.color = "#39ff39"
        this.sp3.style.color = "#39ff39"
        this.sp4.style.color = "#39ff39"  
        this.grid.forEach(i => {
            i.forEach(j => {                          
                this.removeFlag(j.parentElement)
                const mineElement = j.parentElement.querySelector(".j3ElementMine")
                if (mineElement != null) {                    
                    mineElement.style.display = "block"                    
                    j.parentElement.style.backgroundColor = "#00880015"
                    ExtT.fillSVG(mineElement, "#39ff39", "j3ElementMine")                                                            
                } else {                                     
                    j.parentElement.querySelector("p").style.display = "block"                    
                    j.parentElement.style.backgroundColor = "#00880015"                             
                }
            })
        })        
    }      
        
    dataIsNull() {
        var res = true        
        this.data.forEach(i => {
            i.forEach(j => {                
                res = (j == 0) ? true : false                
                if (!res) {
                    return res
                }
            })
        })
        return res
    }
    
    verifyWin() {
        var res = true
        this.data.forEach(i => {
            i.forEach(j => {
                res = j > 8 && res                
            })
        })
        return res
    }
    
    block(element) {
        const overlay = document.createElement("div")
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
    
    setMines() {
        for (let i = 0; i < this.numberOfMines; i++) {             
            const w_ = Math.abs(Math.floor(Math.random() * (this.widthBoard)))
            const h_ = Math.abs(Math.floor(Math.random() * (this.heightBoard)))            
            if (this.data[h_][w_] == 0) {            
                this.data[h_][w_] = 9
            } else {
                i--                
            }            
        }
    }
    
    get(i, j) {        
        if ((0 <= i && i < this.heightBoard && 0 <= j && j < this.widthBoard)) {            
            return this.data[i][j]
        } else {
            return -1
        } 
    }
    
    checkAndSetUp(i, j) {           
        for (let i_ = -1; i_ < 2; i_++) {  
            for (let j_ = -1; j_ < 2; j_++) {  
                if (this.get(i + i_, j + j_) != 9 && this.get(i + i_, j + j_) >= 0) {
                    this.data[i + i_][j + j_] = this.data[i + i_][j + j_] + 1                    
                }                    
            }
        }
    }
    
    setValues() {
        for (let i = 0; i < this.heightBoard; i++) {
            for (let j = 0; j < this.widthBoard; j++) {                              
                if (this.data[i][j] == 9) {   
                    this.checkAndSetUp(i, j)
                }
            }
        }
    }
    
    removeFlag(element) {
        if (element.querySelector(".j3ElementFlag") != null) {                    
            element.removeChild(element.querySelector(".j3ElementFlag"))                                                                                           
        }
    }
    
    
    checkAndSetCeroAux(i, j) {            
        this.grid[i][j].style.display = "block"        
        this.grid[i][j].parentElement.style.backgroundColor = "#00888815"                
        this.block(this.grid[i][j].parentElement)        
        if (this.get(i, j) == 0) {
            this.data[i][j] = 10
            this.checkAndSetCero(i, j)
            
            this.removeFlag(this.grid[i][j].parentElement)
        } else {
            if (this.data[i][j] < 9) {
                this.data[i][j] = this.data[i][j] + 10
                this.removeFlag(this.grid[i][j].parentElement)
            }               
        }
        
    }    
    
    checkAndSetCero(i, j) {   
        if (this.get(i, j) == 0) {        
            this.data[i][j] = 10                
            this.grid[i][j].style.display = "block"              
            this.grid[i][j].parentElement.style.backgroundColor = "#00888815"
            this.removeFlag(this.grid[i][j].parentElement)
            this.block(this.grid[i][j].parentElement)
        }
        for (let i_ = -1; i_ < 2; i_++) {  
            for (let j_ = -1; j_ < 2; j_++) {  
                if (this.get(i + i_, j + j_) < 9 && this.get(i + i_, j + j_) > -1) {
                    this.checkAndSetCeroAux(i + i_, j + j_)
                }                    
            }
        }        
    }                              
    
    verifyElement(i, j, element){
        if (this.get(i, j) == 0) {
            this.checkAndSetCero(i, j)
        } else {
            if (this.get(i, j) != 9) {                                
                if (this.data[i][j] < 9) {
                    this.data[i][j] = this.data[i][j] + 10                                                
                }                                
                this.grid[i][j].style.display = "block"  
                element.style.backgroundColor = "#00888815"
                this.block(element)                                
            } else {
                this.loseGame()                  
            }
        }
        if (this.verifyWin()) {                                    
            this.winGame()                                                                     
        }         
    }
    
    onClick(i, j, element) {
        let mousedownDetected = false;
        let timer;
        const this_ = this  
        element.addEventListener("mousedown", function(event) {                    
            timer = setTimeout(() => {
                mousedownDetected = true;
                if (element.querySelector(".j3ElementFlag") == null
                && this_.data[i][j] < 10) {
                    const flag = ExtT.createElement("img", "j3ElementFlag", element)
                    flag.src = "./img/frag2.svg"
                    const p =  element.querySelector("p")
                    p.style.display = "none"
                    element.style.backgroundColor = "#00000000"                      
                } else {                    
                    this_.verifyElement(i, j, element)                            
                    this_.removeFlag(element)        
                }
            }, 400);
        });
        
        element.addEventListener("mouseup", () => {
          clearTimeout(timer);                  
        });
        
        element.addEventListener("click", function(event) {                      
            if (mousedownDetected) {                                  
                event.preventDefault();
                event.stopImmediatePropagation();
                mousedownDetected = false;
            } else {                        
              if (element.querySelector(".j3ElementFlag") != null) {
               const p =  element.querySelector("p")                        
               p.style.display = "none"
              } else {                        
                  this_.verifyElement(i, j, element)                
              }                    
            }            
        });
    }  
    
    placeGame() {        
        this.startTime()
        for (let i = 0; i < this.heightBoard; i++) {
            const row = ExtT.createElement("div", "j3Row", this.gridElement)
            for (let j = 0; j < this.widthBoard; j++) {
                const element = ExtT.createElement("div", "j3Element", row)
                element.style.position = "relative"
                var elementValue = ExtT.createElement("p", "j3ElementValue", element)
                if (this.data[i][j] == 9) {
                    elementValue = ExtT.createElement("img", "j3ElementMine", element)
                    elementValue.src = "./img/mine.svg"                    
                    elementValue.style.display = "none"  // <<< - - - See Game
                } else {                
                    if (this.data[i][j] > 9) {
                        elementValue.textContent = this.data[i][j] - 10
                        elementValue.style.display = "block"  
                        element.style.backgroundColor = "#00888815"
                        this.block(element)
                    } else {
                        elementValue.textContent = this.data[i][j]
                        elementValue.style.display = "none" // <<< - - - See Game                    
                    }
                }
                this.grid[i][j] = elementValue                                                                   
                this.onClick(i, j, element)                
            }
        }
    }

    setGame() {                
        this.startTime()
        for (let i = 0; i < this.heightBoard; i++) {
            const row = ExtT.createElement("div", "j3Row", this.gridElement)
            for (let j = 0; j < this.widthBoard; j++) {
                const element = ExtT.createElement("div", "j3Element", row)
                element.style.position = "relative"
                var elementValue = ExtT.createElement("p", "j3ElementValue", element)
                if (this.data[i][j] == 9) {
                    elementValue = ExtT.createElement("img", "j3ElementMine", element)
                    elementValue.src = "./img/mine.svg"                    
                } else {
                    elementValue.textContent = this.data[i][j]
                }
                this.grid[i][j] = elementValue    
                elementValue.style.display = "none" // <<< - - - See Game
                this.onClick(i, j, element) 
            }
        }
    }
    
    deleteGame() {
        clearInterval(this.time)
    }
    
    restart(t1Value) {        
        this.gridElement.innerHTML = ""        
        this.gridElement.classList.remove("j3GridLose")        
        this.gridElement.classList.remove("j3GridWin")                
        this.t1.style.color = "var(--c1)"
        this.sp1.textContent = `Tiempo: 00s`
        this.sp2.textContent = `Porcentaje: 0%`
        this.sp3.textContent = `Minas: 0` 
        this.sp4.textContent = `Puntaje: 0` 
        this.sp1.style.color = "var(--c1)"
        this.sp2.style.color = "var(--c1)"
        this.sp3.style.color = "var(--c1)"
        this.sp4.style.color = "var(--c1)"
        this.deleteGame()
        if (t1Value) {
            this.t1.textContent = t1Value            
        }        
    }
    
    calcPercent() {
        var sum = 0
        this.data.forEach(i => {
            i.forEach(j => {
                (j > 9) ? sum++ : null
            })
        })         
        return Math.floor(sum * 100 / (this.widthBoard * this.heightBoard - this.numberOfMines))
        
    }
    
    formTiempo(s) {        
        var res = ""
        if (s > 3600) {
            res += Math.floor(s / 3600).toString().padStart(2, "0") + "h:"
        }
        if (s > 60) {
            res += Math.floor((s % 3600) / 60).toString().padStart(2, "0") + "m:"
        }
        res += s % 60 + "s"
        return (s) ? res : "00s"
    }
    
    
    calcScore(s, p) {
        const w = this.widthBoard
        const h = this.heightBoard
        const r = Math.floor(w * h * p / 100) * 20 - s 
        return (r > 0) ? r : 0
    }
    
    setStatistics(seconds) {
        const percent = this.calcPercent()  
        this.sp1.textContent = `Tiempo: ${this.formTiempo(seconds)}`
        this.sp2.textContent = `Porcentaje: ${percent}%`
        this.sp3.textContent = `Minas: ${this.numberOfMines}` 
        this.sp4.textContent = `Puntaje: ${this.calcScore(seconds, percent)}`
        this.score += this.calcScore(seconds, percent) 
    }
    
    getData() {
        return this.data
    }
}

export default J3

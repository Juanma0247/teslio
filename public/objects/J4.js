import ExtT from "../objects/ExtT.js"

class J4 { // Sudoku
    constructor() {  
        this.VALUES = []
        for (let i = 1; i <= 3**2; i++) { this.VALUES.push(i) }         
        this.gridContainer = document.getElementById("j4Grid")
        this.grid = Array.from({ length : 3 }, () => 
            Array.from({ length : 3 }, () => 
                Array.from({ length : 3 }, () => 
                    Array.from({ length : 3 }, () => 0) 
                ) 
            ) 
        ) 

        this.data = Array.from({ length : 3 }, () => 
            Array.from({ length : 3 }, () => 
                Array.from({ length : 3 }, () => 
                    Array.from({ length : 3 }, () => 0) 
                ) 
            ) 
        ) 

        this.dataPossible = Array.from({ length : 3 }, () => 
            Array.from({ length : 3 }, () => 
                Array.from({ length : 3 }, () => 
                    Array.from({ length : 3 }, () => []) 
                ) 
            ) 
        )
    }    

    rN(n) {
        return Math.floor(Math.random() * n)        
    }

    getLocalValues(i, j) {
        const res = []
        this.data[i][j].forEach(f => {
            f.forEach(c => {
                if (c != 0) {
                    res.push(c)
                }
            })
        })
        return res
    }

    getAssociatedValues(i, j, f, c) {
        const res = []
        this.getLocalValues(i,j).forEach(e => {
            res.push(e)
        }) 
        this.data[i].forEach(i_ => {              
            i_[f].forEach(f_ => {                
                if (f_ !== 0 && !res.includes(f_)) {     
                    res.push(f_)  
                }
                
            })
        }) 
        this.data.forEach(i_ => {              
            i_[j].forEach(f_ => {                                
                if (f_[c] !== 0 && !res.includes(f_[c])) {     
                    res.push(f_[c])   
                }
                
            })
        }) 
        return res
    }

    possibleValues(i, j, f, c) {        
        const associateValues = this.getAssociatedValues(i, j, f, c)
        return this.VALUES.filter(e => !associateValues.includes(e))
    }    

    setPossibles() {
        for (let i = 0; i < 3; i++) {            
            for (let j = 0; j < 3; j++) {                
                for (let f = 0; f < 3; f++) {                    
                    for (let c = 0; c < 3; c++) {
                        this.dataPossible[i][j][f][c] = this.possibleValues(i, j, f, c) 
                    } 
                }
            } 
        }
    }

    setFirstValues() {
        var cont = 1
        while (cont < 10) {
            if (this.data[this.rN(3)][this.rN(3)][this.rN(3)][this.rN(3)] == 0) {
                this.data[this.rN(3)][this.rN(3)][this.rN(3)][this.rN(3)] = cont
                cont++ 
            }            
        }        
    }

    valIsComplete(val) {
        var res = 0
        this.data.forEach(i => {
            i.forEach(j => {
                j.forEach(f => {
                    f.forEach(c => {
                        if (c == val) res++
                    })
                })
            })
        })
        return res == this.VALUES.length
    }

    setAllValues() {
        this.VALUES.forEach(val => {             
            for (let i = 0; i < 3; i++) {            
                for (let j = 0; j < 3; j++) { 
                    var f_c = []
                    for (let o = 0; o < 9; o++) { f_c.push(o) }
                    // console.log(f_c)  
                    while (!this.getLocalValues(i, j).includes(val)) {
                        try {
                            let f__c = f_c.splice(this.rN(f_c.length),1)[0] 
                            const c_ = f__c % 3     
                            const f_ = Math.floor(f__c / 3) 
                            if (!(typeof f_ == "number") || !(typeof c_ == "number")) {                            
                                break
                            }
                            // console.log(i) 
                            // console.log(j) 
                            // console.log(f_) 
                            // console.log(c_)   
                            // console.log(this.data[i][j][f_][c_])  
                            // console.log(this.possibleValues(i, j, f_, c_))
                            
                            if (this.data[i][j][f_][c_] == 0 && this.possibleValues(i, j, f_, c_).includes(val)) {  
                                this.data[i][j][f_][c_] = val
                            } 
                        } catch (e) {
                            this.data[i][j][1][1] = -1
                            break                            
                        }                        
                    }
                    // console.log("--GridInterno---")
                } 
                // console.log("--Fila---")
            }       
        })        
    }

    setInterface() {
        for (let i = 0; i < 3; i++) {
            const row = ExtT.createElement("div", "j4Row", this.gridContainer)
            for (let j = 0; j < 3; j++) {
                const internalGrid = ExtT.createElement("div", "j4InternalGrid", row)
                for (let f = 0; f < 3; f++) {
                    const internalRow = ExtT.createElement("div", "j4InternalRow", internalGrid)
                    for (let c = 0; c < 3; c++) {
                        const element = ExtT.createElement("div", "j4Element", internalRow)
                        element.textContent = this.data[i][j][f][c] 
                        this.grid[i][j][f][c] = element 
                    } 
                }
            } 
        }
    }
    
    main() {
        this.setFirstValues()
        // console.log(this.data) 
        this.setAllValues()
        this.setInterface() 
        // this.setPossibles()
    }
    
}

export default J4

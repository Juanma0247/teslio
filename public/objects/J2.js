import ExtT from "../objects/ExtT.js"

class J2 { // SnaiL Game
    // constructor(widthBoard, heightBoard) {    
    //     const thisClass = this
    //     this.widthBoard = widthBoard
    //     this.heightBoard = heightBoard        
    //     this.attempts = 0                
    //     this.points = Array.from({ length: heightBoard }, (_) => 
    //         Array.from({ length: widthBoard }, () => 0)
    //     );        
    //     const numbers = Array.from({length: widthBoard}, (_, i)=> i)        
    //     for (let i = 1; i < heightBoard - 1; i++) {        
    //         const position = Math.abs(Math.floor(Math.random() * (numbers.length)) )            
    //         const element = numbers.splice(position, 1)[0]                        
    //         this.points[i][element] = 1           
    //     }                         
    //     this.points[heightBoard-1][Math.floor(widthBoard / 2) - 1] = 2
    //     this.position = [heightBoard-1, Math.floor(widthBoard / 2) - 1]
    //     document.addEventListener("keydown", function(e) {                                
    //         const k = e.key.toString()
    //         k == "a" || k == "ArrowLeft"? thisClass.move("l") : null
    //         k == "d" || k == "ArrowRight"? thisClass.move("r") : null
    //         k == "w" || k == "ArrowUp"? thisClass.move("t") : null
    //         k == "s" || k == "ArrowDown"? thisClass.move("b") : null   
    //     });        
    // }
    
    // printPoints() {
    //     this.points.forEach(i => {            
    //         console.log(i)            
    //     })                        
    //     this.position
    // }        
    
    // isPossible(coords) {        
    //     console.log(this.widthBoard, coords)        
    //     return (
    //     coords[0] <= this.heightBoard - 1 &&
    //     coords[0] > -1 &&
    //     coords[1] <= this.widthBoard - 1 &&
    //     coords[1] > -1
    //     )
    // }
    
    // updatePos(val) {
    //     if (val != 0) {
    //         if (this.points[this.position[0]][this.position[1]] == 0) {
    //             this.points[this.position[0]][this.position[1]] = val
    //         } else {
    //             this.points[this.position[0]][this.position[1]] = 3
    //             this.points[this.heightBoard-1][Math.floor(this.widthBoard / 2) - 1] = 2
    //             this.position = [this.heightBoard-1, Math.floor(this.widthBoard / 2) - 1]
    //             console.log("Monstruo")
    //         }    
    //     } else {
    //         this.points[this.position[0]][this.position[1]] = 0
    //     }
        
        
    // }
    
    // move(to) {
    //     const p = this.position
    //     switch (to) {        
    //         case "l":
    //             if (this.isPossible([p[0], p[1]-1])) {
    //                 this.updatePos(0)
    //                 this.position[1] = this.position[1] - 1 
    //                 this.updatePos(2)
    //             }                                                    
    //             break
    //         case "r":                
    //             if (this.isPossible([p[0], p[1]+1])) {
    //                 this.updatePos(0)
    //                 this.position[1] = this.position[1] + 1 
    //                 this.updatePos(2)
    //             }
    //             break
    //         case "t":                
    //             if (this.isPossible([p[0], p[1]-1])) {                
    //                 this.updatePos(0)
    //                 this.position[0] = this.position[0] - 1 
    //                 this.updatePos(2)
    //             }
    //             break                
    //         case "b":                
    //             if (this.isPossible([p[0], p[1] + 1])) {
    //                 this.updatePos(0)
    //                 this.position[0] = this.position[0] + 1 
    //                 this.updatePos(2)
    //             }
    //             break                            
    //     }           
    //     this.printPoints()        
    // }        
    
    // main () {
    //     const j2Grid = document.querySelector(".j2Grid")
    // }
}

export default J2
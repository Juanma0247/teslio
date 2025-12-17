import ExtT from "../objects/ExtT.js"

let snake
let food
let walls
let gridSize = 10
let cols, rows

class Snake {
    constructor(p) {
        this.p5 = p
        this.body = []
        this.setStarPosition()
        this.xdir = 0
        this.ydir = 0
        this.length = 1
    }

    setStarPosition() {
        this.body[0] = this.p5.createVector(0 * gridSize, 0)
        this.body.push(this.p5.createVector(1 * gridSize, 0))
        this.body.push(this.p5.createVector(2 * gridSize, 0))
        this.body.push(this.p5.createVector(3 * gridSize, 0))
        this.body.push(this.p5.createVector(4 * gridSize, 0))
        this.body.push(this.p5.createVector(5 * gridSize, 0))
        this.body.push(this.p5.createVector(6 * gridSize, 0))
    }

    setDirection(x, y) {
        if (this.xdir !== 0 && x !== 0) return
        if (this.ydir !== 0 && y !== 0) return
        this.xdir = x
        this.ydir = y
    }

    update() {
        let head = this.body[this.body.length - 1].copy()
        head.x += this.xdir * gridSize
        head.y += this.ydir * gridSize

        this.body.shift()
        this.body.push(head)
        
        if (head.x < 0) {
            head.x = this.p5.width - gridSize
        }

        if (head.y < 0) {
            head.y = this.p5.height - gridSize
        }

        if (head.x >= this.p5.width) {
            head.x = 0
        }

        if (head.y >= this.p5.height) {
            head.y = 0
        }

        // if (this.collidesWithSelf()) {
        //     this.reset();
        // }
    }

    reset() {
        this.body = []
        this.setStarPosition()
        this.xdir = 0
        this.ydir = 0
        this.length = 1
    }

    collidesWithSelf() {
        let head = this.body[this.body.length - 1]
        for (let i = 0; i < this.body.length - 1; i++) {
            let part = this.body[i]
            if (part.x === head.x && part.y === head.y) {
                return true;
            }
        }
        return false
    }

    eat(pos) {
        let head = this.body[this.body.length - 1]
        if (head.x === pos.x && head.y === pos.y) {
            this.length++
            this.body.push(head.copy())
            console.log(this.body)
            return true
        }
        return false
    }

    show() {
        this.p5.fill(0)
        for (let i = 0; i < this.body.length; i++) {               
            this.p5.fill(0, (128 / this.body.length)*i, 128)
            this.p5.rect(this.body[i].x, this.body[i].y, gridSize, gridSize)
        }
    }
}

class J5 { // Python
    constructor() {  
        
    }    
    
    main() {                     
        new p5((p) => {            

            p.setup = () => {
                p.createCanvas(400, 400)
                p.frameRate(10)
                cols = Math.floor(p.width / gridSize)
                rows = Math.floor(p.height / gridSize)
                snake = new Snake(p)
                p.placeFood();
            }

            // p.draw = () => {
            //     p.background(255)
            //     snake.update()
            //     snake.show()
                
            //     if (snake.eat(food)) { 
            //         p.placeFood()
            //         p.placeWalls()
            //     }
                
            //     p.fill(255, 165, 0)
            //     p.rect(food.x, food.y, gridSize, gridSize)
            //     for (let i = 0;  walls) {
                    
            //     }
            // }
 
            p.placeFood = () => {
                let x = p.floor(p.random(cols)) * gridSize
                let y = p.floor(p.random(rows)) * gridSize             
                food = p.createVector(x, y)
            }

            p.placeWalls = () => {
                let x = p.floor(p.random(cols)) * gridSize
                let y = p.floor(p.random(rows)) * gridSize            
                walls[0] = p.createVector(x, y)
            }


            p.keyPressed = () => {
                if (p.keyCode === 87) {  
                    snake.setDirection(0, -1)
                } else if (p.keyCode === 83) {
                    snake.setDirection(0, 1)
                } else if (p.keyCode === 65) {
                    snake.setDirection(-1, 0)
                } else if (p.keyCode === 68) { 
                    snake.setDirection(1, 0)
                }
            }
            

        }, 'j5p5Container')
    }
}

export default J5 

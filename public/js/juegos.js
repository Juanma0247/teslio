import J1 from "../objects/J1.js"
import J2 from "../objects/J2.js"  
import J3_ from "../objects/J3_.js"
import J4 from "../objects/J4.js"
import J5 from "../objects/J5.js"

[J1, J2, J3_, J4, J5].forEach((ProjectClass, index) => {
    const cardId = `cardj${index + 1}`
    document.getElementById(cardId).addEventListener("click", () => {
        const instance = new ProjectClass()        
        instance.main();
    })
})
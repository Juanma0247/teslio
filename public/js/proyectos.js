import P1 from "../objects/P1.js"
import P2 from "../objects/P2.js"
import P3 from "../objects/P3.js"
import P4 from "../objects/P4.js"
import P5 from "../objects/P5.js"
import P6 from "../objects/P6.js"
import P7 from "../objects/P7.js"
import P8 from "../objects/P8.js"
import P9 from "../objects/P9.js"
import P10 from "../objects/P10.js"
import P11 from "../objects/P11.js"
import P12 from "../objects/P12.js"
import P13 from "../objects/P13.js"
 
[P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12, P13].forEach((ProjectClass, index) => { 
    const cardId = `cardp${index + 1}`
    document.getElementById(cardId).addEventListener("click", () => {
        const instance = new ProjectClass()
        if (typeof instance.starter === "function") instance.starter() // P1
        instance.main();
    })
})
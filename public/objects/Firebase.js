import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"; 
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, deleteDoc, onSnapshot, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"

class Firebase {         
  constructor() {
      let key = {
      apiKey: "AIzaSyDBxMhed4eie3ShdkdHXmx8XG630lh-P7k",
      authDomain: "harpias.firebaseapp.com",
      projectId: "harpias",
      storageBucket: "harpias.firebasestorage.app",
      messagingSenderId: "485784446208",
      appId: "1:485784446208:web:a6208420de3a98d6c6ffe5",
      measurementId: "G-3547MX9SM1"
      }
      this.app = initializeApp(key)
      this.firestore = getFirestore(this.app) 
  }

  async getDataOne(f) {
    this.db.getCollection(this.colection, data => {
        f(data)
    })
  }

  async setDocument(colection, id, campos, callback = () => {}) {     
    try {
      await setDoc(doc(collection(this.firestore, colection), id), campos)  
      callback()
      return true
    } catch (e) {  
      alert(`Error: ${e}`)    
      return false
    }
  } 

  async getCollection(colection, callback) {
      try {
        const res = {}
        const querySnapshot = await getDocs(collection(this.firestore, colection))
        querySnapshot.forEach(doc => {
            res[doc.id] = doc.data()
        })    
        callback(res)
      } catch (e) {
        alert(`Error: ${e}`)    
      }
  } 

  async listenCollection(colection, callback) { 
      const colRef = collection(this.firestore, colection)
      return onSnapshot(colRef, snapshot => {
        const res = {}
        snapshot.forEach(doc => {
            res[doc.id] = doc.data()
        })
        callback(res)
      })
  }

  async updateDocument(colection, id, campos, callback = () => {}) {   
   try {
      await updateDoc(doc(this.firestore, colection, id), campos)
      callback()
      return true
   } catch (e) {
      alert(`Error: ${e}`)
      return false
   }
  }

  async onChangeDocs(colection, callback = ()=>{}) {
      const colRef = collection(this.firestore, colection)
      onSnapshot(colRef, (snapshot) => {
          const changedDocs = []
          snapshot.docChanges().forEach(change => {
            changedDocs.push({
                id: change.doc.id,
                type: change.type
            })
          })          
          callback(changedDocs)
      })
    }

  async delDocument(id, colection, mensaje) {
      try {
        const docRef = doc(collection(this.firestore, colection), id)
        const docSnapshot = await getDoc(docRef)
        if (docSnapshot.exists()) {      
            if (true) {
            // if (confirm(mensaje)) {
              await deleteDoc(docRef) 
              return true
            } else {
              return false
            }            
        } else {    
            alert("Elemento no encontrado")
            return false
        }    
      } catch (e) {
        alert(`Error: ${e}`)     
        return false
      }
  }

  async deleteAllDocuments(colection, callback = ()=>{}) {
    const querySnapshot = await getDocs(collection(this.firestore, colection))
    const promises = []
    querySnapshot.forEach(d => {
        promises.push(deleteDoc(doc(this.firestore, colection, d.id)))
    })
    await Promise.all(promises)
    callback()
  }

  async deleteCollection(colection, callback) {
    try {
        const colRef = collection(this.firestore, colection)
        const snapshot = await getDocs(colRef)
        const deletes = []

        snapshot.forEach(d => {
          deletes.push(deleteDoc(doc(this.firestore, colection, d.id)))
        })

        await Promise.all(deletes)
        callback()
    } catch (e) {
        alert(`Error eliminando colección: ${e}`)
        return false
    }
  } 
}

export default Firebase


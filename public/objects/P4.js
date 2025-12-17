
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
// import { getStorage, listAll, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js";
// import ExtT from "../objects/ExtT.js"

class P4 { // Audio
    constructor () {        
        this.i1 =  document.getElementById("p2i1") 
        this.storage = getStorage(initializeApp({
            apiKey: "AIzaSyALR43Li_8to5gVNbV4KewnTD-vzb2TO7M",
            authDomain: "adrian-9b025.firebaseapp.com",
            projectId: "adrian-9b025",
            storageBucket: "adrian-9b025.appspot.com",
            messagingSenderId: "874865052362",
            appId: "1:874865052362:web:f7261f9d8fec6af0940233",
            measurementId: "G-QHCNLD7HVS" 
          }));
    }
      
    async obtenerAudios() {
        const carpetaAudios = ref(this.storage, "audios/"); // Cambia "audios/" por la carpeta donde guardaste los audios
      
        try {
          const resultado = await listAll(carpetaAudios); // Lista todos los elementos en la carpeta
          const urls = await Promise.all(
            resultado.items.map(async (itemRef) => {              
              const url = await getDownloadURL(itemRef);
              return url;
            })
          );                
          return urls;
        } catch (error) {
          alert("Error al listar los audios:", error)
        }
    }
    
    makeAudio(url, nombre) {
        const audiosGuardados = document.getElementById("audiosGuardados");
        const audio = ExtT.createElement("audio", "", audiosGuardados);        
        audio.innerHTML = `<source src="${url}" type="audio/wav">eMM.`;
        const playButton = ExtT.createElement("button", "audioReproButton", audiosGuardados);        
        playButton.textContent = `Reproducir ${nombre}`;
        playButton.addEventListener("click", () => {
            audio.play().then().catch(err => alert("Error: ", err));
        });    
    }
    
    main() {              
        navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(stream) {              
          const audioElement = document.createElement('audio');
          audioElement.srcObject = stream;
          audioElement.play();      
        })
        .catch(function(error) {    
          alert('Micro denegado:', error);
        });
        let mediaRecorder;
        let audioChunks = [];            
        const startRecordingBtn = document.getElementById("startRecording");
        const stopRecordingBtn = document.getElementById("stopRecording");
        const uploadAudioBtn = document.getElementById("uploadAudio");
        const audioPreview = document.getElementById("audioPreview");            
        startRecordingBtn.addEventListener("click", async () => {          
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });              
          mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
          };
    
          mediaRecorder.onstop = () => {            
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            audioPreview.src = audioUrl;
            uploadAudioBtn.disabled = false;
          };
              
          mediaRecorder.start();
    
          startRecordingBtn.disabled = true;
          stopRecordingBtn.disabled = false;
        });
            
        stopRecordingBtn.addEventListener("click", () => {
          mediaRecorder.stop();
          startRecordingBtn.disabled = false;
          stopRecordingBtn.disabled = true;
        });
        const i1 = document.getElementById("p4i1");
        uploadAudioBtn.addEventListener("click", () => {        
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          const file = new File([audioBlob], `${i1.value}.wav` , { type: 'audio/wav' });                        
          const storageRef = ref(this.storage, 'audios/' + file.name);
          uploadBytes(storageRef, file).then((snapshot) => {
            this.obtenerAudios().then((urls) => {
                urls.forEach((url) => {            
                  this.makeAudio(url, url.split("/").pop().split("?")[0].split("%2F").pop().split(".")[0]); 
                });
              });
          }).catch((error) => {
            alert("Error: " + error);
          });
        });
        
        this.obtenerAudios().then((urls) => {
          urls.forEach((url) => {            
            this.makeAudio(url, url.split("/").pop().split("?")[0].split("%2F").pop().split(".")[0]); 
          });
        });
    }
}

export default P4
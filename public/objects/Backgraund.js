class Background {         
    static main() {
      const svg = document.getElementById('ocean');      
      const randomBlueShade = () => {
        const r = 0;      
        const g = Math.floor(Math.random() * 100) + 100;  
        const b = Math.floor(Math.random() * 200) + 55; 
        const a = Math.random() * 0.1 + 0.3 //+ 1;
        return `rgba(${r}, ${g}, ${b}, ${a})`;
      }; 
  
      const createWave = (y, amplitude, frequency, phase, color, bottomAmplitude, bottomFrequency, bottomPhase) => {
        const wave = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        wave.setAttribute('fill', color);   
        svg.appendChild(wave);
        return { 
          wave, 
          y, 
          amplitude, 
          frequency, 
          phase, 
          color,
          bottomAmplitude,
          bottomFrequency,
          bottomPhase
        };
      };     
                
      const waves = Array.from({ length: 10 }, () =>   
        createWave(  
          Math.random() * window.innerHeight, // * 0.9 + window.innerHeight * 0.1, // Posición Y más centrada
          Math.random() * 40 + 30, // Amplitud superior
          Math.random() * 250 + 150, // Frecuencia superior
          Math.random() * Math.PI * 2, // Fase superior
          randomBlueShade(),
          Math.random() * 35 + 25, // Amplitud inferior (ligeramente diferente)
          Math.random() * 280 + 180, // Frecuencia inferior (diferente para variación)
          Math.random() * Math.PI * 2 // Fase inferior independiente
        )
      );
  
      const updateWavePath = (waveObj, time) => {
        const { wave, y, amplitude, frequency, phase, bottomAmplitude, bottomFrequency, bottomPhase } = waveObj;
        
        // Crear el borde superior ondulado
        let path = '';
        const points = [];
        for (let x = 0; x <= window.innerWidth; x += 10) {            
          const offsetY = amplitude * Math.sin((x / frequency) + phase + time);
          points.push({ x, y: y + offsetY });
          if (x === 0) {
            path += `M ${x} ${y + offsetY}`;
          } else {
            path += ` L ${x} ${y + offsetY}`;
          }
        }
        
        // Crear el borde inferior ondulado (en dirección inversa)
        const bottomPoints = [];
        for (let x = window.innerWidth; x >= 0; x -= 10) {
          const offsetY = bottomAmplitude * Math.sin((x / bottomFrequency) + bottomPhase + time * 0.8);
          const bottomY = y + 120 + offsetY; // 80 es la altura base de la ola 
          bottomPoints.push({ x, y: bottomY });
          path += ` L ${x} ${bottomY}`;
        }
        
        path += ' Z'; // Cerrar el path
        wave.setAttribute('d', path);
      };
      
      const animate = () => {
        const time = Date.now() * 0.001;
        waves.forEach(waveObj => {
          updateWavePath(waveObj, time);
          waveObj.phase += 0.005;
          waveObj.bottomPhase += 0.003; // Velocidad ligeramente diferente para el borde inferior
        });
        requestAnimationFrame(animate);
      }; 
      
      const init = () => {              
        svg.setAttribute('width', window.innerWidth);
        svg.setAttribute('height', window.innerHeight);
        
        const resizeObserver = new ResizeObserver(entries => {
          for (let entry of entries) {            
            const { width, height } = entry.contentRect;
            svg.setAttribute('width', width);
            svg.setAttribute('height', height);
          }  
        });        
        resizeObserver.observe(document.body);
        animate();
      };     
     
      window.addEventListener('resize', () => {
        svg.innerHTML = '';
        waves.length = 0;     
        waves.push(...Array.from({ length: 10 }, () => 
          createWave(
            Math.random() * window.innerHeight * 0.6 + window.innerHeight * 0.2,
            Math.random() * 40 + 30,
            Math.random() * 250 + 150,
            Math.random() * Math.PI * 2,
            randomBlueShade(),
            Math.random() * 35 + 25,
            Math.random() * 280 + 180,
            Math.random() * Math.PI * 2
          )
        ));
        init();
      });  
    
      init();         
    }
}

export default Background
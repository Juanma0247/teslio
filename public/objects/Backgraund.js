
class Background {         
    static main() {
      const svg = document.getElementById('ocean');      
      const randomBlueShade = () => {
        // return `rgba(50, 50, 0, 50)`;  
        const r = 0;      
        const g = Math.floor(Math.random() * 100) + 100; 
        const b = Math.floor(Math.random() * 200) + 55; 
        const a = 0.2; // Opacity between 0.4 and 0.8 for soft waves
        return `rgba(${r}, ${g}, ${b}, ${a})`;
      }; 
  
      const createWave = (y, amplitude, frequency, phase, color) => {
        const wave = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        wave.setAttribute('fill', color);   
        svg.appendChild(wave);
        return { wave, y, amplitude, frequency, phase, color };
      };     
                
      const waves = Array.from({ length: 10 }, () =>  // Reduced number of waves for smoother look
        createWave( 
          Math.random() * window.innerHeight, // Random Y position
          Math.random() * 40 + 30, // Random amplitude for smaller, gentle waves
          Math.random() * 250 + 150, // Random frequency for more relaxed motion
          Math.random() * Math.PI * 2, // Random phase for variation
          randomBlueShade() // Use new soothing blue shades
        )
      );
  
      const updateWavePath = (waveObj, time) => {
        const { wave, y, amplitude, frequency, phase } = waveObj;
        let path = `M 0 ${y}`;
        for (let x = 0; x <= window.innerWidth; x += 10) {            
          const offsetY = -amplitude * Math.sin((x / frequency) + phase + time);
          path += ` L ${x} ${y + offsetY}`;
        }    
        path += ` L ${window.innerWidth} ${window.innerHeight} L 0 ${window.innerHeight} Z`;
        wave.setAttribute('d', path);   
        wave.setAttribute('transform', `rotate(180, ${window.innerWidth / 2}, ${y})`);
      };
      
      const animate = () => {
        const time = Date.now() * 0.002;
        waves.forEach(waveObj => {
          updateWavePath(waveObj, time);
          waveObj.phase += Math.random() * 0.02 - 0.01; // Slightly randomize movement
        });
        requestAnimationFrame(animate);
      }; 
      
      const init = () => {              
        svg.setAttribute('width', window.innerWidth);          
        const resizeObserver = new ResizeObserver(entries => {
          for (let entry of entries) {            
            const { width, height } = entry.contentRect;
            svg.setAttribute('height', height);
          }  
        });        
        resizeObserver.observe(document.body);
        animate();
      };     
     
      window.addEventListener('resize', () => {
        svg.innerHTML = ''; // Clear existing waves
        waves.length = 0;     
        waves.push(...Array.from({ length: 10  }, () => 
          createWave(
            Math.random() * window.innerHeight,
            Math.random() * 40 + 30,
            Math.random() * 250 + 150,
            Math.random() * Math.PI * 2,
            randomBlueShade()
          )
        ));
        init();
      });  
    
      init();         
    }
}

export default Background

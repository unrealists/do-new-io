import { Ai } from './vendor/@cloudflare/ai.js';
import { Buffer } from 'node:buffer';




export default {
  async fetch(request, env) {





    const ai = new Ai(env.AI);

    const prompt = "A vibrant and dynamic image that encapsulates the essence of exploration and discovery, designed with a color scheme that makes cyberpunk yellow stand out. The image should inspire viewers to embark on new adventures and try new things. It should be filled with bright colors, symbolizing creativity and innovation, and include elements that represent various fields such as technology, art, nature, and science.";

    console.log("hi mark")
    const inputs = { prompt };

    let response;
    try {
      response = await ai.run('@cf/stabilityai/stable-diffusion-xl-base-1.0', inputs);
    } catch (error) {
      console.error('Error running AI model:', error);
      throw new Error('Failed to generate image with AI.');
    }

    const imageB64 = Buffer.from(response).toString('base64');



    const htmlResponse = `
      <html>
        <head>
          <title>Coming Soon: Do New!</title>
          <style>
            body, html {
              height: 100%;
              margin: 0;
              font-family: Arial, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              text-align: center;
              position: relative;
              z-index: 1;
              background-color: transparent;
              background-image: radial-gradient(circle, #000 1px, transparent 1px), url('data:image/png;base64,${imageB64}');
              background-size: 10px 10px, cover;
              background-repeat: repeat, no-repeat;
              background-position: center;
            }
            .tagline, .dynamic-text {
              font-family: 'Orbitron', sans-serif;
              color: #FFFFFF; /* Changed text color to white */
              -webkit-text-stroke: 1px black; /* Added text border for better visibility */
              text-shadow: 1px 1px 2px #000000, 0 0 25px #000000, 0 0 5px #000000; /* Darker tone shadow for depth */
            }
            .tagline {
              font-size: 10vw; /* Adjusted for full page coverage */
              position: fixed; /* Ensures it covers the whole page */
              top: 8%;
              left: 0;
              right: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              z-index: 2;
            }
            .dynamic-text {
              font-size: 5vw; /* Adjusted for visibility under the main tagline */
              animation: flickerAnimation 1s infinite;
              position: fixed; /* Ensures it stays in position under the main tagline */
              top: 25%; /* Positioned right under the main tagline */
              left: 0;
              font-style: italic; /* Makes the dynamic text italic */
              right: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              z-index: 2;
              opacity: 0; /* Start invisible and flicker in */
            }
          </style>
        </head>
        <body>
        
          <script>
            const phrases = ['Adventure!', 'Challenge!', 'Journey!', 'Discovery!', 'Innovation!', 'Creativity!'];
            let currentIndex = 0;
            
            function changeWord() {
              const dynamicTextElement = document.querySelector('.dynamic-text');
              dynamicTextElement.textContent = phrases[currentIndex];
              dynamicTextElement.style.opacity = 1; // Ensure visibility for the animation
              currentIndex = (currentIndex + 1) % phrases.length;
            }
            
            setInterval(changeWord, 1000);
          </script>
          <div class="tagline">Do New</div>
          <div class="dynamic-text"></div>
        </body>
      </html>
    `;

    return new Response(htmlResponse, {
      headers: {
        'content-type': 'text/html'
      }
    });
  }
};

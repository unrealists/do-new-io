import { Ai } from './vendor/@cloudflare/ai.js';

export default {
  async fetch(request, env) {
    const ai = new Ai(env.AI);

    const inputs = {
      prompt: 'A fancy cat picture. cyberpunk style. tagline says "Do NEW!" at the every end says "by unrealists"'
    };

    const response = await ai.run(
      '@cf/stabilityai/stable-diffusion-xl-base-1.0',
      inputs
    );

    const imageB64 = btoa(String.fromCharCode(...new Uint8Array(response)));
    const htmlResponse = `
      <html>
        <head>
          <title>Do New!</title>
        </head>
        <body>
          <h1 style="position: absolute; top: 0; left: 0;">Do New!</h1>
          <img src="data:image/png;base64,${imageB64}" />
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

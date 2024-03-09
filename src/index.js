import { Ai } from './vendor/@cloudflare/ai.js';


// tagged template-string function so we can have code highlight
function html(t) {
  for (var o = [t[0]], i = 1, l = arguments.length; i < l; i++) o.push(arguments[i], t[i]);
  return o.join('');
}
const INDEX_HTML = html`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>do.new</title>
    <meta name="description" content="do.new">
    <meta name="author" content="do.new">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css?family=Raleway:400,300,600" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css">
    <link rel="stylesheet" href="https://unpkg.com/@speed-highlight/core/dist/themes/github-dark.css">
    <script src="https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js"></script>
    <style>
        body { overflow: hidden; color: #dcd9d4; background-color: #181a1b; }
        .section { position: relative; height: 95vh; }
        div a, div a:hover, span { color: #339FF0; text-decoration: none; }
        .fab, .far, .fas { padding: 5px; font-size: 20px; text-align: center; color: #222; vertical-align: middle; }
        body a:not(.highlighted-words) { color: #dcd9d4; }
        #canvas { width: 100vw; height: 75vh; position: absolute; left: 0; bottom: 0; z-index: -1;}
        textarea { background-color: #222; color: #dcd9d4; }
        button { background-color: #222; color: #dcd9d4; }
        .hidden { display: none; }
        .code { font: 1em 'Fira Code', monospace !important; max-height: 33vh; overflow: auto; border: 1px solid rgba(255,255,255,0.2);}
        .code.shj-multiline.shj-mode-header:before { content: attr(data-language); }
        .code.result { max-height: calc(76px * 4); }
        .code.result.shj-multiline.shj-mode-header:before { content: "⚙ execution result"; cursor: pointer; }
        .code.result:hover, .code.result:active, .code.result:focus { max-height: 50vh; }
    </style>
    <link rel="icon" type="image/png" href="favicon.png">
    <meta property="og:title" content="do.new">
    <meta property="og:description" content="Where you can let your imagination run free and just create. Whew!">
    <meta property="og:image" content="favicon.png">
    <meta property="og:url" content="http://www.do.new">
    <meta property="og:type" content="website">
</head>
<body>
    <div class="section" id="hero">
        <div class="container">
            <div class="row">
                <div class="one-half column" style="margin-top: 25%">
                    <div>
                        <div class="item">
                            <h4>Hi, this is <span>do.new</span>!</h4>
                        </div>
                    </div>
                    <div>
                        <p>Where you can let your imagination run free and just create.<br><span>Ooo-wee!</span></p>
                    </div>
                    <div id="social-bar">
                        <a class="fas fa-envelope" href="mailto:"></a>
                        <a class="fab fa-linkedin-in" href=""></a>
                        <a class="fab fa-github" href=""></a>
                    </div>
                </div>
                <div class="one-half column" style="margin-top: 25%">
                  <div id="form">
                      <textarea id="inputArea" name="codeRequest" rows="6" cols="50" placeholder="Enter your code request ... e.g. write a greeting function that takes a name and outputs a greeting and call it"></textarea>
                      <button id="submitButton">Submit <i class="fas fa-cog fa-spin hidden" style="color: #dcd9d4"></i></button>
                  </div>
                  <div id="result" class="hidden">
                  </div>
                </div>
            </div>
        </div>
    </div>
    <canvas id="canvas"/>
    <!-- <footer><div class="container"><div class="row"></div></div></footer> -->
<script type="module">
  import { highlightElement } from 'https://unpkg.com/@speed-highlight/core/dist/index.js';
  
  const submitBtn = document.getElementById('submitButton');
  submitBtn.addEventListener('click', function() {
    const codeRequest = document.getElementById('inputArea').value;
    const source = new EventSource('/?q='+encodeURIComponent(codeRequest));
    source.onerror = (e) => {console.error('onerror',e); source.close();}
    source.onmessage = (event) => {
      console.log(event.data);
      try{
        const data = JSON.parse(event.data);
        console.log(data);
        if (data.isFinal || data.response === undefined) {
          source.close();
          return;
        }
      }catch(err){
        console.error('catcherr',err);
        source.close();
      }
      //const data = JSON.parse(event.data);
      //el.innerHTML += data.response;
    }
    // submitBtn.disabled = true;
    // submitBtn.querySelector('.hidden').classList.toggle('hidden');
    // fetch('/', {method: 'POST', headers: { 'Content-Type': 'application/json'},
    //   body: JSON.stringify({request: codeRequest})
    // })
    // .then(resp => resp.json())
    // .then(async (data) => {
    //   console.log(data);
    //   const resultDiv = document.getElementById('result');
    //   const formDiv = document.getElementById('form');
    //   const code = data.codeBlocks?.[0]?.code || 'something went wrong';
    //   const userRequest = data.userRequest;
    //   const codeBox = document.createElement('div');
    //   codeBox.classList.add('code', 'shj-lang-py');
    //   codeBox.textContent = '"""'+userRequest+'"""'+'\\n'+code;
    //   resultDiv.appendChild(codeBox);
    //   highlightElement(codeBox);
    //   resultDiv.classList.toggle('hidden');
    //   formDiv.classList.toggle('hidden');
    //   const msgBox = document.createElement('p');
    //   msgBox.id = 'exres-msgbox';
    //   msgBox.innerHTML = "Hold on, we're executing your code ... <i class='fas fa-cog fa-spin' style='color: #dcd9d4'></i>";
    //   resultDiv.appendChild(msgBox);
    //   const pyKernel = new PyodideKernel();
    //   await pyKernel.init();
    //   document.getElementById('exres-msgbox').remove();
    //   const exresBox = document.createElement('div');
    //   exresBox.classList.add('code', 'shj-mode-header', 'shj-lang-plain', 'result');
    //   resultDiv.appendChild(exresBox);
    //   pyKernel.run(code, {stdoutCB: t=>{exresBox.textContent+=t}, stderrCB: t=>{exresBox.textContent+=t}}).then(exres=>{
    //     if(exres.result!==undefined) exresBox.textContent+="\\n>> "+exres.result;
    //     highlightElement(exresBox);
    //   });
    // })
    // .catch((error) => {
    //     console.error('Error:', error);
    // })
    // .finally(()=>{
    //   submitBtn.disabled = false;
    //   submitBtn.querySelector('.hidden').classList.toggle('hidden');
    // });
});
class PyodideKernel {
  constructor() {
    this.kernel = null;
  }
  async init() {
    this.kernel = await loadPyodide();
  }
  async run(code, {stdoutCB=console.log, stderrCB=console.warn}={}) {
    let stdout = '', stderr = '', stdmix = '';
    this.kernel.setStdout({batched: (str) => {stdout+=str+'\\n'; stdmix+=str+'\\n'; stdoutCB(str)}});
    this.kernel.setStderr({batched: (str) => {stderr+=str+'\\n'; stdmix+=str+'\\n'; stderrCB(str)}});
    const result = await this.kernel.runPythonAsync(code).catch(err => {
      stderr += err.toString();
      stdmix += err.toString();
    });
    return {stdout, stderr, stdmix, result}
  }
}
// dot wave effect:
const c = document.getElementById('canvas').getContext('2d');
const offscreenCanvas = document.createElement('canvas');
offscreenCanvas.style.display = "none";
const postctx = document.body.appendChild(offscreenCanvas).getContext('2d');
const canvas = c.canvas;
const vertices = [];
const vertexCount = 4000;
const vertexSize = 3;
const oceanWidth = 128;
const oceanHeight = -80;
const gridSize = 18;
const waveSize = 12;
const perspective = 100;
const depth = 400;//(vertexCount / oceanWidth * gridSize);
let frame = 0;
const {sin, cos} = Math;
const resizeCanvas = () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    postctx.canvas.width = postctx.canvas.offsetWidth;
    postctx.canvas.height = postctx.canvas.offsetHeight;
};
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
const loop = () => {
  frame += 0.33;
  c.fillStyle = '#181a1b';
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.save();
  c.translate(canvas.width / 2, canvas.height / 2);
  c.beginPath();
  vertices.forEach((vertex, i) => {
    let x = vertex[0] - frame % (gridSize * 2);
    const z = vertex[2] - frame * 2 % gridSize + (i % 2 === 0 ? gridSize / 2 : 0);
    const wave = (cos(frame / 45 + x / 50) - sin(frame / 20 + z / 50) + sin(frame / 30 + z*x / 10000));
    let y = vertex[1] + wave * waveSize;
    const a = Math.max(0, 1 - (Math.sqrt(x ** 2 + z ** 2)) / depth);
    y -= oceanHeight;
    x /= z / perspective;
    y /= z / perspective;
    if (a < 0.01) return;
    if (z < 0) return;
    c.globalAlpha = a;
    c.fillStyle = \`hsl(\${57 + wave * 4}deg, 86%, 27%)\`;
    c.fillRect(x - a * vertexSize / 2, y - a * vertexSize / 2, a * vertexSize, a * vertexSize);
    c.globalAlpha = 1;
  });
  c.restore();
  postctx.drawImage(canvas, 0, 0);
  postctx.globalCompositeOperation = 'screen';
  postctx.drawImage(canvas, 0, 0);
  postctx.globalCompositeOperation = 'source-over';
  requestAnimationFrame(loop);
};
for (let i = 0; i < vertexCount; i++) {
  const x = i % oceanWidth;
  const y = 0;
  const z = i / oceanWidth >> 0;
  const offset = oceanWidth / 2;
  vertices.push([(-offset + x) * gridSize, y * gridSize, z * gridSize]);
}
loop();
</script>
</body>
</html>`;

function parseMarkdownCodeBlocks(text, type = 'python') {
  const codeBlocks = [];
  const pattern = new RegExp("```(" + type + ")([^`]+)```", "gis");
  const matches = text.matchAll(pattern);
  for (let match of matches) {
    const lang = match[1] ? match[1].toLowerCase() : 'python';
    const code = match[2].trim();
    codeBlocks.push({ lang, code });
  }
  return codeBlocks;
}

export default {
  async fetch(request, env) {
    if (request.method === 'GET') {
      const params = new URL(request.url).searchParams;
      if (params.has('q') && request.headers.get('accept')?.includes("text/event-stream")) {
        const ai = new Ai(env.AI);
        const userRequest = params.get('q') || "say hi";
        const messages = [
          { role: "system", content: "You are a friendly assistant that always answers with Python code in markdown code fences. You are not including any external libraries." },
          { role: "user", content: userRequest },
        ];
        let fulltext = '';
        let codeBlocks = [];
        const stream = await ai.run("@cf/mistral/mistral-7b-instruct-v0.1", { messages, stream: true });
        const readableStream = new ReadableStream({
          async start(controller) {
            for await (const update of stream) {
              const txt = new TextDecoder("utf-8").decode(update.slice(6));
              let msg = {};
              try {
                const data = JSON.parse(txt);
                fulltext += data.response;
                codeBlocks = parseMarkdownCodeBlocks(fulltext);
                msg = { userRequest, codeBlocks, response: fulltext };
              } catch (err) {
                msg = { userRequest, codeBlocks, response: fulltext, isFinal: true }
              }
              console.log(msg)
              controller.enqueue(new TextEncoder().encode(JSON.stringify(msg)));
            }
            controller.close();
          }
        });
        const responseStream = readableStream.pipeThrough(new TransformStream());
        return new Response(responseStream, { headers: { "content-type": "text/event-stream" } });
      } else {
        return new Response(INDEX_HTML, { headers: { "content-type": "text/html" } });
      }
    }
  }
};

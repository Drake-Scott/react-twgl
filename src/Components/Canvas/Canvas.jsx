import '../../Assets/Canvas.css'
import shaders from './shaders/shaders';

const twgl = require('twgl.js');
const m4 = twgl.m4;

export const Canvas = (props) => {
  
  const onCanvasLoaded = (element) => {
    if(!element) return;
    
    const gl = element.getContext('webgl2');
    if (gl == null) return;
    gl.enable(gl.DEPTH_TEST);
    const programInfo = twgl.createProgramInfo(gl, [shaders.vs,shaders.fs], (msg) => {console.log(msg)});

    const cubeBuffer = twgl.primitives.createCubeBufferInfo(gl,2)
    const lightWorldPosition = [1, 8, -10];
    const lightColor = [1, 1, 1, 1];
    const camera = m4.identity();
    const view = m4.identity();
    const viewProjection = m4.identity();
    const tex = twgl.createTexture(gl, {
      min: gl.NEAREST,
      mag: gl.NEAREST,
      src: [
        255, 255, 255, 255,
        192, 192, 192, 255,
        192, 192, 192, 255,
        255, 255, 255, 255,
      ],
    });
    const uniforms = {
      u_lightWorldPos: lightWorldPosition,
      u_lightColor: lightColor,
      // u_diffuseMult: chroma.hsv(rand(0, 360), 0.4, 0.8).gl(),
      u_specular: [1, 1, 1, 1],
      u_shininess: 50,
      u_specularFactor: 1,
      u_diffuse: tex,
      u_viewInverse: camera,
      u_world: m4.identity(),
      u_worldInverseTranspose: m4.identity(),
      u_worldViewProjection: m4.identity(),
    };

    function render() {
      if (!gl?.canvas) return;

      twgl.resizeCanvasToDisplaySize(gl.canvas);
      gl.enable(gl.DEPTH_TEST);
      gl.enable(gl.SCISSOR_TEST);
      gl.clearColor(0.8, 0.8, 0.8, 1);
      gl.clear(gl.COLOR_BUFFER_BIT)

      const eye = [0, 0, -8];
      const target = [0, 0, 0];
      const up = [0, 1, 0];
      m4.lookAt(eye, target, up, camera);
      m4.inverse(camera, view);

      const projection = m4.perspective(
        30 * Math.PI / 180, 
        gl.canvas.width / gl.canvas.height, 
        0.5, 
        100);
      m4.multiply(projection, view, viewProjection);

      gl.useProgram(programInfo.program);
      twgl.setBuffersAndAttributes(gl, programInfo, cubeBuffer);
      twgl.setUniforms(programInfo, uniforms);
      twgl.drawBufferInfo(gl, cubeBuffer);

      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  }

  return (
    <canvas 
      id='canv'
      width={props.width || 1600}
      height={props.height || 900}
      ref={onCanvasLoaded}
    />
  )
}

export default Canvas;

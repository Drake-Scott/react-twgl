import '../../Assets/Canvas.css'
import {
  createBufferInfoFromArrays,
  createProgramInfo,
  drawBufferInfo,
  resizeCanvasToDisplaySize,
  setBuffersAndAttributes,
  setUniforms,
} from 'twgl.js';
import shaders from './shaders/shaders';

export const Canvas = (props) => {
  
  const onCanvasLoaded = (element) => {
    if(!element) return;
    
    const gl = element.getContext('webgl2');
    if (gl == null) return;

    const programInfo = createProgramInfo(gl, [shaders.vs,shaders.fs], (msg) => {
      console.log(msg)
    });

    const arrays = {
      position: [1,1,-1,1,1,1,1,-1,1,1,-1,-1,-1,1,1,-1,1,-1,-1,-1,-1,-1,-1,1,-1,1,1,1,1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1,1,-1,1,-1,-1,1,1,1,1,-1,1,1,-1,-1,1,1,-1,1,-1,1,-1,1,1,-1,1,-1,-1,-1,-1,-1],
      normal:   [1,0,0,1,0,0,1,0,0,1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,-1,0,0,-1,0,0,-1,0,0,-1],
      texcoord: [1,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1],
      indices:  [0,1,2,0,2,3,4,5,6,4,6,7,8,9,10,8,10,11,12,13,14,12,14,15,16,17,18,16,18,19,20,21,22,20,22,23],
    };
    const bufferInfo = createBufferInfoFromArrays(gl, arrays);

    function render(time) {
      if (!gl?.canvas) return;

      resizeCanvasToDisplaySize(gl.canvas);
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

      const uniforms = {
        time: time * 0.001,
        resolution: [gl.canvas.width, gl.canvas.height],
      };

      gl.useProgram(programInfo.program);
      setBuffersAndAttributes(gl, programInfo, bufferInfo);
      setUniforms(programInfo, uniforms);
      drawBufferInfo(gl, bufferInfo);

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

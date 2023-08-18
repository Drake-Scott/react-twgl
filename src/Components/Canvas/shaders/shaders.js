const shaders = {
  vs: `#version 300 es
  precision mediump float;

  uniform mat4 modelMatrix;
  uniform float aspect;

  in vec3 position;
  in vec3 normal;

  out vec3 fragColor;

  void main () {
    vec4 positionWorld = modelMatrix * vec4( position, 1.0 );
    gl_Position = vec4( positionWorld.x*aspect, positionWorld.yzw );
    mat4 normalMatrix = transpose(inverse(modelMatrix));
    vec3 newNormal = (normalMatrix*vec4(normal,0)).xyz;
    fragColor = normalize(newNormal);
  }`,

  fs: `#version 300 es
  precision mediump float;

  in vec3 fragColor;

  out vec4 outColor;

  void main () {

    outColor = vec4( 0.5f * ( fragColor + 1.0f ), 1.0f );
  }`
}

export default  shaders;
// src/MarbleCanvas.tsx
import { useEffect, useRef } from "react";

export function MarbleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    const setSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    setSize();
    window.addEventListener("resize", setSize);

    const vertexShaderSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      // ---- simplex noise ----
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                            -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;

        i = mod289(i);
        vec3 p = permute(permute(
          i.y + vec3(0.0, i1.y, 1.0)
        ) + i.x + vec3(0.0, i1.x, 1.0));

        vec3 m = max(
          0.5 - vec3(
            dot(x0,x0),
            dot(x12.xy,x12.xy),
            dot(x12.zw,x12.zw)
          ), 0.0
        );

        m = m*m;
        m = m*m;

        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;

        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;

        return 130.0 * dot(m, g);
      }

      // 少し細かめの fbm
      float fbm(vec2 p) {
        float value = 0.0;
        float amp = 0.6;
        float freq = 1.0;
        for (int i = 0; i < 5; i++) {
          value += amp * snoise(p * freq);
          freq *= 2.0;
          amp *= 0.5;
        }
        return value;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy;

        // 縦方向に流れるようにスケール調整
        vec2 p = uv;
        p.x *= 1.0;
        p.y *= 1.8;

        float t = time * 0.02;

        // 座標をノイズでねじって「かき混ぜる」
        vec2 flow = vec2(
          fbm(p + vec2(t * 0.6, t * 0.3)),
          fbm(p + vec2(-t * 0.4, t * 0.2))
        );
        p += flow * 0.35;

        // マーブルの筋
        float base = fbm(p * 1.1);
        float bands = 0.5 + 0.5 * sin(base * 4.0 + p.y * 2.3);

        // 3色パレット
        vec3 beige = vec3(0.96, 0.95, 0.93);  // 背景
        vec3 blue  = vec3(0.71, 0.80, 0.84);  // 水色
        vec3 black = vec3(0.10, 0.10, 0.10);  // しっかり黒

        // まずベージュをベースに
        vec3 color = beige;

        // bands の値に応じて 3色を割り当て
        // 0.0〜0.4 : ベージュ
        // 0.4〜0.7 : ベージュ→水色
        // 0.7〜1.0 : 水色→黒（しっかり黒になるよう強め）
        float mid = smoothstep(0.35, 0.65, bands);
        float dark = smoothstep(0.65, 0.9, bands);

        // ベージュ→水色
        color = mix(color, blue, mid);
        // 水色→黒（黒寄りを強める）
        color = mix(color, black, dark * 1.1);

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
         1,  1,
      ]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, "resolution");
    const timeLocation = gl.getUniformLocation(program, "time");

    let startTime = Date.now();
    let last = 0;
    let animationId: number;

    const render = (now: number) => {
      if (now - last < 1000 / 15) {
        animationId = requestAnimationFrame(render);
        return;
      }
      last = now;

      const currentTime = (Date.now() - startTime) / 1000;

      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, currentTime);

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", setSize);
      cancelAnimationFrame(animationId);
    };
  }, []);

return (
  <canvas
    ref={canvasRef}
    className="absolute inset-0 w-full h-full"
    style={{ display: "block" }}
  />
);


}

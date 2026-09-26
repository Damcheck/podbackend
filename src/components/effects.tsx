'use client';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';

export function SmoothScroll() {
  const path = usePathname();
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, anchors: true });
    let frame: number;
    const tick = (t: number) => { lenis.raf(t); frame = requestAnimationFrame(tick); };
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); lenis.destroy(); };
  }, [path]);
  return null;
}

export function WebGLRibbons() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false, antialias: false, powerPreference: 'low-power' });
    if (!gl) return;
    const shader = (type: number, source: string) => {
      const s = gl.createShader(type)!; gl.shaderSource(s, source); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { gl.deleteShader(s); return null; }
      return s;
    };
    const vs = shader(gl.VERTEX_SHADER, 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}');
    const fs = shader(gl.FRAGMENT_SHADER, `precision mediump float;
      uniform vec2 resolution;uniform float time;uniform vec2 pointer;
      void main(){vec2 uv=gl_FragCoord.xy/resolution;float x=uv.x;float y=uv.y;
      float bend=.40+.16*sin(x*5.2+time*.09)+.06*pointer.y;
      float ribbon=(1.-smoothstep(.015,.24,abs(y-bend)));
      float ribbon2=1.-smoothstep(.02,.21,abs(y-(.73+.21*cos(x*4.+time*.06))));
      float line=0.;for(int i=0;i<11;i++){float f=float(i);float c=.13+.012*f+.23*sin(x*4.3+f*.024+time*.07);line+=(1.-smoothstep(0.,.0018,abs(y-c)));}
      float edge=pow(abs(x-.5)*2.,1.2);float a=(ribbon*.115+ribbon2*.075+line*.09)*(.35+edge);
      gl_FragColor=vec4(1.,.48,.33,a);}`);
    if (!vs || !fs) return;
    const program = gl.createProgram()!; gl.attachShader(program, vs); gl.attachShader(program, fs); gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program); canvas.dataset.renderer = 'webgl';
    const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(program, 'p'); gl.enableVertexAttribArray(pos); gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    const res = gl.getUniformLocation(program, 'resolution'), t = gl.getUniformLocation(program, 'time'), point = gl.getUniformLocation(program, 'pointer');
    let px = 0, py = 0, frame = 0; const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const resize = () => { canvas.width = Math.min(innerWidth, 1600); canvas.height = 760; gl.viewport(0, 0, canvas.width, canvas.height); gl.uniform2f(res, canvas.width, canvas.height); };
    const move = (e: PointerEvent) => { px=e.clientX/innerWidth; py=e.clientY/innerHeight; };
    const draw = (now: number) => { gl.uniform1f(t, reduced ? 0 : now / 1000); gl.uniform2f(point, px, py); gl.drawArrays(gl.TRIANGLES, 0, 6); if(!reduced) frame=requestAnimationFrame(draw); };
    resize(); draw(0); window.addEventListener('resize',resize); window.addEventListener('pointermove',move);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize',resize); window.removeEventListener('pointermove',move); gl.deleteBuffer(buffer); gl.deleteProgram(program); gl.deleteShader(vs); gl.deleteShader(fs); };
  }, []);
  return <canvas ref={ref} className="webgl-ribbons" aria-hidden="true" />;
}

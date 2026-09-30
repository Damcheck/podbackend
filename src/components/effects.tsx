'use client';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';

export function SmoothScroll() {
  const path = usePathname();
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    let lenis: Lenis | undefined, frame = 0;
    const configure = () => {
      cancelAnimationFrame(frame); lenis?.destroy(); lenis = undefined;
      if (preference.matches) return;
      lenis = new Lenis({ duration: 1.05, smoothWheel: true, anchors: true });
      const tick = (t: number) => { lenis?.raf(t); frame = requestAnimationFrame(tick); };
      frame = requestAnimationFrame(tick);
    };
    configure(); preference.addEventListener('change', configure);
    return () => { cancelAnimationFrame(frame); lenis?.destroy(); preference.removeEventListener('change', configure); };
  }, [path]);
  return null;
}

// A sound-field shader: interference contours carry scroll energy through peach ribbons.
export function WebGLRibbons() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false, antialias: false, powerPreference: 'low-power' });
    if (!gl) return; // The page's CSS peach washes remain the fallback.
    const shader = (type: number, source: string) => {
      const s = gl.createShader(type); if (!s) return null;
      gl.shaderSource(s, source); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { gl.deleteShader(s); return null; }
      return s;
    };
    const vs = shader(gl.VERTEX_SHADER, 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}');
    const fs = shader(gl.FRAGMENT_SHADER, `precision mediump float;
      uniform vec2 resolution; uniform float time; uniform vec2 pointer;
      uniform float scroll; uniform float energy;
      void main(){
        vec2 uv=gl_FragCoord.xy/resolution;
        float aspect=resolution.x/resolution.y;
        vec2 delta=(uv-pointer)*vec2(aspect,1.);
        float influence=exp(-dot(delta,delta)*3.5);
        float phase=time*.16+scroll*2.4;
        float bend=.42+.18*sin(uv.x*4.7+phase)+influence*.065*sin(phase+uv.x*6.);
        float sheet=1.-smoothstep(.025,.24,abs(uv.y-bend));
        float contours=0.;
        for(int i=0;i<18;i++){
          float f=float(i)/17.;
          float envelope=sin(uv.x*3.14159);
          float line=bend+(f-.5)*.30+sin(uv.x*13.+phase*2.+f*2.)*envelope*(.012+energy*.055);
          contours+=1.-smoothstep(.0007,.0022,abs(uv.y-line));
        }
        float other=1.-smoothstep(.03,.16,abs(uv.y-(.78+.18*cos(uv.x*3.8-phase*.6))));
        float edge=.25+.75*pow(abs(uv.x-.5)*2.,.7);
        float alpha=(sheet*.10+contours*.095+other*.045)*edge;
        gl_FragColor=vec4(1.,.39+.1*uv.y,.23+.10*uv.y,alpha);
      }`);
    if (!vs || !fs) { if(vs)gl.deleteShader(vs);if(fs)gl.deleteShader(fs);return; }
    const program = gl.createProgram(); if (!program) return;
    gl.attachShader(program, vs); gl.attachShader(program, fs); gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {gl.deleteProgram(program);gl.deleteShader(vs);gl.deleteShader(fs);return;}
    gl.useProgram(program); canvas.dataset.renderer = 'webgl';
    const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(program,'p');gl.enableVertexAttribArray(pos);gl.vertexAttribPointer(pos,2,gl.FLOAT,false,0,0);
    const uniforms = Object.fromEntries(['resolution','time','pointer','scroll','energy'].map(key=>[key,gl.getUniformLocation(program,key)]));
    const preference=matchMedia('(prefers-reduced-motion: reduce)');
    let px=.7,py=.5,targetX=.7,targetY=.5,frame=0,last=0,previousScroll=scrollY,energy=0,phase=0,lost=false;
    const resize=()=>{const ratio=Math.min(devicePixelRatio,1.5);canvas.width=Math.min(Math.round(innerWidth*ratio),1800);canvas.height=Math.min(Math.round(innerHeight*ratio),1200);gl.viewport(0,0,canvas.width,canvas.height);gl.uniform2f(uniforms.resolution,canvas.width,canvas.height);};
    const move=(event:PointerEvent)=>{if(event.pointerType==='mouse'){targetX=event.clientX/innerWidth;targetY=1-event.clientY/innerHeight;}};
    const draw=(now:number)=>{
      frame=0;if(lost||document.hidden)return;
      // Limit this decorative layer to 30fps, with resolution capped on large displays.
      if(now-last>=32 || preference.matches){
        const dt=Math.min((now-last)/1000,.06);last=now;
        px+=(targetX-px)*.09;py+=(targetY-py)*.09;
        energy+=(Math.min(Math.abs(scrollY-previousScroll)/90,1)-energy)*.15;previousScroll=scrollY;
        if(!preference.matches)phase+=dt;
        gl.uniform1f(uniforms.time,preference.matches?0:phase);
        gl.uniform2f(uniforms.pointer,preference.matches?.7:px,preference.matches?.5:py);
        gl.uniform1f(uniforms.scroll,preference.matches?0:scrollY/Math.max(innerHeight,1));
        gl.uniform1f(uniforms.energy,preference.matches?0:energy);
        gl.drawArrays(gl.TRIANGLES,0,6);
      }
      if(!preference.matches)frame=requestAnimationFrame(draw);
    };
    const restart=()=>{cancelAnimationFrame(frame);last=0;if(!document.hidden&&!lost)frame=requestAnimationFrame(draw);};
    const onResize=()=>{resize();restart();};
    const onLost=()=>{lost=true;cancelAnimationFrame(frame);canvas.dataset.renderer='fallback';};
    resize();restart();window.addEventListener('resize',onResize);window.addEventListener('pointermove',move,{passive:true});
    document.addEventListener('visibilitychange',restart);preference.addEventListener('change',restart);canvas.addEventListener('webglcontextlost',onLost);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener('resize',onResize);window.removeEventListener('pointermove',move);document.removeEventListener('visibilitychange',restart);preference.removeEventListener('change',restart);canvas.removeEventListener('webglcontextlost',onLost);gl.deleteBuffer(buffer);gl.deleteProgram(program);gl.deleteShader(vs);gl.deleteShader(fs);};
  }, []);
  return <canvas ref={ref} className="webgl-ribbons" aria-hidden="true" />;
}

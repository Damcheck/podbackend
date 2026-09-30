"use client";
import { Children, isValidElement, useEffect, useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionStyle } from 'framer-motion';

// Keep actual words in the DOM: search, selection, and screen readers retain normal text.
export function KineticHeading({ children, as = 'h2', className = '', id }: { children: ReactNode; as?: 'h1' | 'h2'; className?: string; id?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced !== false) return;
    const animations: Animation[] = [];
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      el.querySelectorAll<HTMLElement>('.spoken-word').forEach((word, i) => {
        animations.push(word.animate([
          { transform: 'perspective(600px) translateY(.7em) rotateX(-65deg)', opacity: 0, filter: 'blur(5px)' },
          { transform: 'perspective(600px) translateY(0) rotateX(0)', opacity: 1, filter: 'blur(0)' }
        ], { duration: 820, delay: Math.min(i * 42, 620), easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' }));
      });
      observer.disconnect();
    }, { threshold: .15 });
    observer.observe(el);
    return () => { observer.disconnect(); animations.forEach(a => a.cancel()); };
  }, [reduced, children]);
  function split(nodes: ReactNode): ReactNode {
    return Children.map(nodes, node => {
      if (typeof node === 'string') return node.split(/(\s+)/).filter(Boolean).map((word, i) => /\s/.test(word) ? word : <span className="spoken-word" key={i}>{word}</span>);
      if (isValidElement(node)) return node;
      return node;
    });
  }
  const Heading = as;
  return <Heading id={id} ref={ref} className={`kinetic-heading ${className}`}>{split(children)}</Heading>;
}

export function PodcastScene({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const progress = useSpring(scrollYProgress, { stiffness: 95, damping: 26 });
  const y = useTransform(progress, [0, 1], [0, -65]);
  const rotateX = useTransform(progress, [0, 1], [0, 12]);
  const spread = useTransform(progress, [0, 1], ['0px', '36px']);
  return <motion.div ref={ref} className="podcast-stage" style={reduced ? undefined : { y, rotateX, '--card-spread': spread } as MotionStyle}>{children}</motion.div>;
}

export function ProcessSignal() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 88%', 'end 40%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  return <div ref={ref} className="process-signal-wrap"><svg className="process-signal" viewBox="0 0 1000 50" preserveAspectRatio="none" aria-hidden="true"><path d="M0 25H100L108 16 116 35 124 5 132 45 140 20 148 25H300L308 16 316 35 324 5 332 45 340 20 348 25H500L508 16 516 35 524 5 532 45 540 20 548 25H700L708 16 716 35 724 5 732 45 740 20 748 25H900L908 16 916 35 924 5 932 45 940 20 948 25H1000" className="signal-track"/><motion.path d="M0 25H100L108 16 116 35 124 5 132 45 140 20 148 25H300L308 16 316 35 324 5 332 45 340 20 348 25H500L508 16 516 35 524 5 532 45 540 20 548 25H700L708 16 716 35 724 5 732 45 740 20 748 25H900L908 16 916 35 924 5 932 45 940 20 948 25H1000" style={{ pathLength: reduced ? 1 : progress }}/></svg></div>;
}

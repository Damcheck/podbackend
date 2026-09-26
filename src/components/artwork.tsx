import type { CSSProperties } from 'react';

const aspectRatios: Record<string,string> = {
  "cases-hero": "1/1",
  "hero-woman": "3/2",
  "hero-leader": "3/2",
  "hero-founder": "3/2",
  "home-banner": "3/2",
  "home-work": "2.4/1",
  "home-builders": "2.4/1",
  "home-tech": "2.4/1",
  "asset-phone": "2.2/1",
  "course-hero": "5/4",
  "course-desk": "1.6/1",
  "course-person": "5/4",
  "case-feature": "1.46/1",
  "case-founder": "2.5/1",
  "case-growth": "2.5/1",
  "case-health": "2.5/1",
  "case-creative": "2.5/1",
  "case-money": "2.5/1",
  "case-future": "2.5/1",
  "blog-headphones": "4/5",
  "blog-growth": "2.2/1",
  "blog-mics": "2.2/1",
  "blog-strategy": "2.2/1",
  "blog-interview": "2.2/1",
  "blog-topics": "2.2/1",
  "blog-industry": "2.2/1",
  "blog-workflow": "2.2/1",
  "blog-money": "2.2/1",
  "blog-case": "2.2/1",
  "services-hero": "1/1",
  "services-banner": "3/1",
  "services-plan": "1.6/1",
  "services-team": "1/1",
  "about-hero": "1.3/1",
  "about-story": "1.5/1",
  "alex": "4/3",
  "sophie": "4/3",
  "daniel": "4/3",
  "maya": "4/3",
  "lucas": "4/3",
  "contact-hero": "1/1"
};

export function Artwork({ name, alt, className = '', style }: { name: string; alt: string; className?: string; style?: CSSProperties }) {
  if (!aspectRatios[name]) throw new Error('Unknown artwork: '+name);
  return <div className={`artwork generated-artwork ${className}`} style={{ aspectRatio: aspectRatios[name], ...style }}>
    <img src={`/assets/generated/${name}.webp`} alt={alt} draggable={false} loading="lazy" />
  </div>;
}

export function Platforms({ compact = false }: { compact?: boolean }) {
  return <div className={`platforms standalone-platforms ${compact ? 'compact' : ''}`}>
    {['Spotify','Apple Podcasts','YouTube','Amazon Music','Google Podcasts','iHeartRadio','Audible'].map(name=><img key={name} src={`/assets/platforms/${name.toLowerCase().replaceAll(' ','-')}.svg`} alt={name} width="130" height="36"/>)}
  </div>;
}

export function Wave({ className = '' }: { className?: string }) {
  return <span className={`wave ${className}`} aria-hidden="true">{Array.from({ length: 27 }, (_, i) => <i key={i} style={{ height: `${8 + Math.sin(i * 1.72) ** 2 * (1 - Math.abs(i - 13) / 16) * 60}px`, animationDelay: `${i * 55}ms` }} />)}</span>;
}

export function Logo() {
  return <span className="logo"><img className="logo-symbol" src="/assets/podbackend-mark.svg" alt="" width="40" height="40"/><span>PODBACKEND</span></span>;
}


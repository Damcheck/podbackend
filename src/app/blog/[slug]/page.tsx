import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles } from '@/components/content';
import { articleContent } from '@/components/article-content';
import { Artwork } from '@/components/artwork';
import { CTA } from '@/components/ui';

export function generateStaticParams(){return articles.map(a=>({slug:a.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const{slug}=await params;const a=articles.find(a=>a.slug===slug);return {title:a?.title||'Article not found',description:a?.description};}
export default async function Article({params}:{params:Promise<{slug:string}>}){const{slug}=await params;const a=articles.find(a=>a.slug===slug);if(!a)notFound();return <main id="main" className="detail-page wrap"><Link className="back-link" href="/blog">← All insights</Link><div><span className="eyebrow">{a.category}</span></div><h1>{a.title}</h1><p className="lead">{a.description}</p><div className="detail-meta">PODBACKEND Editorial &nbsp; · &nbsp; {a.minutes} min read</div><Artwork name={a.image} alt={a.title}/><article className="prose">{(articleContent[slug]||[]).map(s=><section key={s.heading}><h2>{s.heading}</h2>{s.paragraphs.map(p=><p key={p.slice(0,30)} style={{whiteSpace:'pre-line'}}>{p}</p>)}</section>)}</article><CTA title="Let’s bring your ideas to life." subtitle="A great podcast begins with a conversation."/></main>;}

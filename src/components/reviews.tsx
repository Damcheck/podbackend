'use client';
import {useState} from 'react';
import {ArrowUpRight, MessageSquareText, Search, SlidersHorizontal} from 'lucide-react';
import {Tag, Reveal, CTA} from './ui';
import {Wave} from './artwork';
import {industryReviews,reviewSources,reviewCategories,type ReviewCategory} from './review-data';

export function Reviews(){
 const [query,setQuery]=useState('');
 const [category,setCategory]=useState<ReviewCategory>('All');
 const [limit,setLimit]=useState(9);
 const filtered=industryReviews.filter(r=>(category==='All'||r.category===category)&&`${r.name} ${r.organization} ${r.summary} ${reviewSources[r.source].provider}`.toLowerCase().includes(query.trim().toLowerCase()));
 const providerCount=new Set(Object.values(reviewSources).map(s=>s.provider)).size;
 return <main id="main" className="reviews-page inner-page wrap">
  <section className="reviews-hero">
   <div><Tag>Podcast service reviews</Tag><h1>Better conversations.<br/>Informed decisions.</h1><p>Explore what creators and businesses value in professional podcast services—from the first recording to a growing audience.</p><a className="button" href="#review-library">Explore the reviews <ArrowUpRight size={18}/></a></div>
   <div className="reviews-hero-card peach"><MessageSquareText size={42} strokeWidth={1.4}/><span>THE INDUSTRY, IN THEIR EXPERIENCE</span><strong>{industryReviews.length}<small>public reviews & testimonials</small></strong><div><span>{providerCount} service providers</span><Wave/></div></div>
  </section>
  <aside className="reviews-disclosure card"><span className="icon-bubble"><MessageSquareText size={23}/></span><div><h2>Reviews of other podcast service providers</h2><p>This is a curated industry collection, not PODBACKEND customer feedback. Each card names the provider and links to its source. Most entries are testimonials published by the provider; we have not independently verified the customer relationship or reported results.</p></div></aside>
  <section id="review-library" aria-labelledby="reviews-heading">
   <div className="section-heading"><div><Tag>Explore the collection</Tag><h2 id="reviews-heading">What matters to podcast creators.</h2></div><p>Sources checked 29 September 2026</p></div>
   <div className="reviews-toolbar"><label className="review-search"><Search size={19}/><input type="search" aria-label="Search reviews" placeholder="Search people, providers, or feedback…" value={query} onChange={e=>{setQuery(e.target.value);setLimit(9);}}/></label><span><SlidersHorizontal size={16}/> Browse by service</span></div>
   <div className="review-filters" role="group" aria-label="Filter reviews by service">{reviewCategories.map(c=><button key={c} aria-pressed={category===c} className={category===c?'selected':''} onClick={()=>{setCategory(c);setLimit(9);}}>{c}</button>)}</div>
   <p className="reviews-count" role="status">Showing {Math.min(limit,filtered.length)} of {filtered.length} reviews{category!=='All'?` · ${category}`:''}</p>
   <div className="industry-review-grid">{filtered.slice(0,limit).map(r=>{const source=reviewSources[r.source];return <Reveal className="industry-review card" key={r.id}><div className="industry-review-top"><span>{r.category}</span><MessageSquareText size={20}/></div><p className="review-provider">About <strong>{source.provider}</strong></p><p className="review-summary">{r.summary}</p><div className="industry-review-person"><span className="review-initials" aria-hidden="true">{r.name.split(' ').filter(n=>!n.startsWith('Dr.')).slice(0,2).map(n=>n[0]).join('')}</span><div><h3>{r.name}</h3><p>{r.organization}</p></div></div><div className="review-source"><small>Editorial summary · {source.label}</small><a href={source.url} target="_blank" rel="noopener noreferrer" aria-label={`Read ${r.name}'s original feedback about ${source.provider}`}>Read original feedback <ArrowUpRight size={16}/></a></div></Reveal>;})}</div>
   {filtered.length===0&&<div className="review-empty card"><Search size={28}/><h3>No matching reviews yet.</h3><p>Try a provider name or a broader search.</p><button className="button outline" onClick={()=>{setQuery('');setCategory('All');setLimit(9);}}>Clear filters</button></div>}
   {filtered.length>limit&&<div className="review-load"><button className="button outline" onClick={()=>setLimit(n=>n+9)}>Show more reviews <span>+{Math.min(9,filtered.length-limit)}</span></button></div>}
  </section>
  <section className="review-method card"><Tag>About this collection</Tag><h2>Read the context. Follow the source.</h2><p>These are short editorial summaries, not direct quotations. Provider-selected testimonials tend to highlight positive experiences and do not represent every customer. We do not combine ratings across companies or treat their results as promises for your podcast.</p><p>Names and organizations are shown as attributed by the source. The source-check date is not the review date. Open the original feedback for its full wording and context.</p></section>
  <CTA center title="What would a better podcast mean for you?" subtitle="Talk with PODBACKEND about your goals, your audience, and the support you need."/>
 </main>;
}

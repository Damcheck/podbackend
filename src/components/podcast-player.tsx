'use client';
import {useState} from 'react';

export const podcasts = [
 {id:'scale',show:'Masters of Scale',title:'How to price your product to scale, with ClassPass founder Payal Kadakia',description:'A founder’s experience finding the right pricing model as a business grows.',url:'https://art19.com/shows/masters-of-scale/episodes/b434a2b4-a95b-4017-9d27-a05b146b6b5b'},
 {id:'communication',show:'Think Fast, Talk Smart',title:'Managing in the Moment: How to Get Comfortable with Being Uncomfortable',description:'Matt Abrahams and Stanford professor Christian Wheeler discuss failure and leading through uncertainty.',url:'https://art19.com/shows/think-fast-talk-smart/episodes/ee7b4a7d-6159-4168-ac8c-6fe168f50b4b'},
] as const;

export function PodcastPlayer({context}:{context:string}){
 const [selected,setSelected]=useState(/growth|founder|builders|monetiz|revenue/i.test(context)?'scale':'communication');
 const episode=podcasts.find(p=>p.id===selected)!;
 return <section className="real-podcast-player">
  <p className="podcast-kicker">Business podcast • Guest listening selection</p>
  <label className="podcast-select-label">Choose an episode<select value={selected} onChange={e=>setSelected(e.target.value)}>{podcasts.map(p=><option key={p.id} value={p.id}>{p.show} — {p.id==='scale'?'Pricing for growth':'Leading through uncertainty'}</option>)}</select></label>
  <h3>{episode.title}</h3><p>{episode.description}</p>
  <iframe key={episode.id} title={episode.show+' — '+episode.title} src={episode.url+'/embed?theme=light'} allow="autoplay" sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-same-origin" className="podcast-embed"/>
  <p className="podcast-credit">Published by {episode.show}. Featured for inspiration; this is an external podcast, not a PODBACKEND production.</p>
  <a className="text-link" href={episode.url} target="_blank" rel="noopener noreferrer">Open episode on ART19 ↗</a>
 </section>;
}

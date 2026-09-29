'use client';
import {useState} from 'react';

import catalog from './podcast-catalog.json';
export type PodcastId = keyof typeof catalog;

export function PodcastPlayer({episodeId}:{episodeId:PodcastId}){
 const episode=catalog[episodeId];
 const [failed,setFailed]=useState(false);
 return <section className="real-podcast-player">
  <p className="podcast-kicker">Selected for {episode.placement}</p>
  <h3>{episode.title}</h3><p>{episode.description}</p>
  <p className="podcast-credit">{episode.show} · {new Date(episode.published).toLocaleDateString('en-GB',{year:'numeric',month:'short',day:'numeric',timeZone:'UTC'})}</p>
  <audio key={episode.id} controls preload="none" aria-label={`${episode.show} — ${episode.title}`} onError={()=>setFailed(true)} src={episode.audioUrl} style={{width:'100%',margin:'18px 0'}} />
  {failed&&<p role="alert">This recording could not load. You can listen on the publisher’s page below.</p>}
  <p className="podcast-credit">An independent listening recommendation from {episode.show}. This episode is not a PODBACKEND production or a recording of the sample client story shown on this site.</p>
  <a className="text-link" href={episode.url} target="_blank" rel="noopener noreferrer">Listen on the publisher’s website ↗</a>
 </section>;
}

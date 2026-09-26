'use client';
import { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Mail, MessageCircle, Plus } from 'lucide-react';
import { Artwork } from './artwork';
import { Action, Avatars, ContactButtons, Icon, Tag, type IconName } from './ui';

const questions = [
 ['How quickly will we hear back?', 'We usually reply within one business day.'],
 ['What should we include in our message?', 'Tell us about your podcast or idea, your goals, and the kind of support you need.'],
 ['Can we discuss a custom project or partnership?', 'Absolutely. Share your idea and we can explore a scope together.'],
 ['Is there a minimum project size?', 'The right scope depends on your goals. Get in touch to discuss what works for your show.'],
 ['Do you work with international clients?', 'Yes. Our remote recording and production workflow supports teams around the world.'],
 ['What happens after we get in touch?', 'We review your goals and arrange a conversation to understand your project and next steps.'],
];
const quotes = [
 ['PODBACKEND made the entire process seamless. Their team is responsive, thoughtful and truly invested in our success.', 'Sarah Mitchell', 'Founder, The Growth Show', 'sophie'],
 ['They understood our goals, brought creative ideas, and delivered real results.', 'Sarah Johnson', 'Head of Marketing, HealthThrive', 'maya'],
];
export function Contact(){
 const [index,setIndex]=useState(0);const quote=quotes[index];
 return <main id="main" className="inner-page contact-page wrap">
  <section className="contact-hero">
   <div className="contact-intro"><Tag>Contact us</Tag><h1>Let’s create something<br/>great together.</h1><p>Reach out via WhatsApp or email — we’ll love to hear<br/>about your podcast, brand, or big idea.</p>
    <div className="contact-options"><article className="card"><span className="contact-icon whatsapp"><MessageCircle/></span><h2>Chat on WhatsApp</h2><p>Quick questions, project ideas<br/>or just want to say hello?</p><Action className="dark">Start a Chat</Action></article><article className="card"><span className="contact-icon"><Mail/></span><h2>Send us an Email</h2><p>Share your ideas, goals or<br/>partnership opportunities.</p><Action secondary>Send an Email <ArrowRight size={17}/></Action></article></div>
   </div><Artwork name="contact-hero" alt="Microphone and headphones on an oak desk in a sunlit recording studio"/>
  </section>
  <section className="contact-benefits card">{[['spark','Friendly & responsive','We usually reply within','1 business day.'],['heart','Real people','You’ll always hear from','a member of our team.'],['people','Global reach','We work with creators','and brands worldwide.'],['shield','Safe & secure','Your information is always','kept private.']].map(([icon,title,line1,line2])=><div key={title}><Icon name={icon as IconName}/><h3>{title}</h3><p>{line1}<br/>{line2}</p></div>)}</section>
  <section className="contact-partner peach"><div><Tag>A true partner</Tag><h2>More than just a service.<br/>A partner in your growth.</h2><p>Whether you’re launching a new show, scaling<br/>an existing one, or exploring a brand partnership<br/>— we’d love to learn more and explore how we<br/>can help.</p><div className="trusted"><Avatars/><span>A team that cares<br/>about your success.</span></div></div><article className="contact-review card"><div className="review-controls"><button className="circle-button" aria-label="Previous testimonial" onClick={()=>setIndex((index+1)%quotes.length)}><ChevronLeft size={17}/></button><button className="circle-button" aria-label="Next testimonial" onClick={()=>setIndex((index+1)%quotes.length)}><ChevronRight size={17}/></button></div><span className="quote-mark">“</span><p>“{quote[0]}”</p><div className="quote-person"><Artwork name={quote[3]} alt={quote[1]}/><div><strong>{quote[1]}</strong><small>{quote[2]}</small><span className="stars">★★★★★</span></div></div></article></section>
  <section><div className="section-heading"><div><Tag>FAQ</Tag><h2>Frequently asked questions.</h2></div><p>Quick answers to common questions.<br/>Still need help? Reach out via WhatsApp or email —<br/>we’re happy to chat.</p></div><div className="faq-grid">{questions.map(([q,a])=><details className="faq-item" key={q}><summary>{q}<Plus size={16}/></summary><p>{a}</p></details>)}</div></section>
  <section className="contact-cta peach"><Tag>Let’s talk</Tag><h2>Ready to bring your ideas to life?</h2><p>We’re excited to hear about your podcast, brand or next big idea.</p><ContactButtons/></section>
 </main>;
}

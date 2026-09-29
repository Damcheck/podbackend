export const reviewSources = {
 lower:{provider:'Lower Street',url:'https://lowerstreet.co/',label:'Provider-published testimonial'},
 wep:{provider:'We Edit Podcasts',url:'https://weeditpodcasts.com/',label:'Provider-published testimonial'},
 fame:{provider:'Fame',url:'https://www.fame.so/podcast-production-company',label:'Provider-published testimonial'},
 pyp:{provider:'Produce Your Podcast',url:'https://produceyourpodcast.com/',label:'Provider-published testimonial'},
 pamela:{provider:'Pamela’s Media Magic',url:'https://www.pamelasmediamagic.com/testimonials',label:'Provider-published testimonial'},
 trustpilot:{provider:'Lower Street',url:'https://uk.trustpilot.com/review/lowerstreet.co',label:'Public Trustpilot review'},
} as const;
export const reviewCategories=['All','Strategy & Launch','Production & Editing','Audience & Growth','Service & Support'] as const;
export type ReviewCategory=typeof reviewCategories[number];
type IndustryReview={id:string;name:string;organization:string;category:Exclude<ReviewCategory,'All'>;summary:string;source:keyof typeof reviewSources};
// Editorial paraphrases, not direct quotations. Sources checked 29 September 2026.
// These reviewers describe other providers, never PODBACKEND.
export const industryReviews:IndustryReview[]=[
 {id:'lower-michael',name:'Michael Bird',organization:'HPE',category:'Production & Editing',summary:'Praises the team’s expertise and the quality of the finished production.',source:'lower'},
 {id:'wep-clara',name:'Clara Melia',organization:'Enquire Podcast',category:'Production & Editing',summary:'Highlights prompt editing, professional collaboration, and consistent standards over several years.',source:'wep'},
 {id:'pyp-jim',name:'Jim Powell',organization:'Fans First',category:'Strategy & Launch',summary:'Found starting a podcast approachable despite having no previous experience.',source:'pyp'},
 {id:'fame-sharat',name:'Sharat Chandra',organization:'Zenoti',category:'Service & Support',summary:'Values responsive communication, collaborative planning, and dependable campaign delivery.',source:'fame'},
 {id:'lower-isobel',name:'Isobel Pearce',organization:'Zühlke Group',category:'Strategy & Launch',summary:'Credits the agency with refining guest choices and conversation topics.',source:'lower'},
 {id:'pyp-daryn',name:'Daryn Kagan',organization:'Call Me Friend',category:'Audience & Growth',summary:'Says longer conversations strengthened audience connections and increased business visibility.',source:'pyp'},
 {id:'lower-susan',name:'Susan Cleveland',organization:'Trane Technologies',category:'Strategy & Launch',summary:'Describes support across planning, launch, editing, and promotion.',source:'lower'},
 {id:'wep-scott',name:'Scott Power',organization:'Crewest Studios',category:'Audience & Growth',summary:'Says production support freed his team to create content while expanding its podcast network.',source:'wep'},
 {id:'pamela-matt',name:'Coach Matt',organization:'Yard Coach',category:'Production & Editing',summary:'Appreciates reliable delivery and creative editing contributions to his ongoing video and podcast work.',source:'pamela'},
 {id:'fame-jake',name:'Jake Sheafer',organization:'Delta Systems',category:'Service & Support',summary:'Commends production output, continued improvements, and thoughtful account management.',source:'fame'},
 {id:'pyp-jeb',name:'Jeb Graham',organization:'Metcalf Money Moment',category:'Production & Editing',summary:'Values recording conversations while the team takes care of the remaining production.',source:'pyp'},
 {id:'lower-sam',name:'Sam Parr',organization:'Moneywise',category:'Production & Editing',summary:'Says the team made producing a narrative podcast easier.',source:'lower'},
 {id:'pyp-jenn',name:'Jenn Trepeck',organization:'Salad with a Side of Fries',category:'Audience & Growth',summary:'Describes her podcast as central to several business activities.',source:'pyp'},
 {id:'lower-debra',name:'Debra Caron',organization:'Early Warning',category:'Production & Editing',summary:'Highlights research, voice performance, and sound design in narrative production.',source:'lower'},
 {id:'wep-sharon',name:'Sharon Spano',organization:'The Other Side of Potential',category:'Service & Support',summary:'Appreciates accessible support, reliable deadlines, and careful editing throughout her podcast’s development.',source:'wep'},
 {id:'fame-kameron',name:'Kameron Hurley',organization:'YellowBird',category:'Audience & Growth',summary:'Reports business returns and further sales opportunities during the partnership.',source:'fame'},
 {id:'pyp-ami',name:'Ami Armstrong',organization:'SheMD',category:'Production & Editing',summary:'Praises the thoughtful coverage and energy of a finished video edit.',source:'pyp'},
 {id:'lower-chris',name:'Chris Dreyer',organization:'Rankings.io',category:'Audience & Growth',summary:'Reports podcast-driven leads and values outsourced expertise over building internally.',source:'lower'},
 {id:'pamela-max',name:'Max T.',organization:'Podcast host',category:'Production & Editing',summary:'Says the editing improved the sound of his episodes and removed background noise.',source:'pamela'},
 {id:'pyp-ledly',name:'Ledly Jennings',organization:'The Good Steward Law and Wealth',category:'Strategy & Launch',summary:'Chose full-service launch support to reduce demands on his time.',source:'pyp'},
 {id:'lower-keri',name:'Dr. Keri Ohlrich',organization:'The Breakout',category:'Audience & Growth',summary:'Credits the marketing strategy with increased downloads and chart visibility.',source:'lower'},
 {id:'fame-ryan',name:'Ryan Hogan',organization:'Talent Harbor',category:'Service & Support',summary:'Considers the service’s value strong relative to its cost.',source:'fame'},
 {id:'pyp-kimberly',name:'Kimberly R. Daniel',organization:'DO GOOD X',category:'Strategy & Launch',summary:'Values concentrating on guests and content while production is handled externally.',source:'pyp'},
 {id:'lower-emma',name:'Emma Leigh-Morgan',organization:'Adyen',category:'Strategy & Launch',summary:'Describes early alignment on creating a distinctive show.',source:'lower'},
 {id:'pyp-ike',name:'Dr. Isaiah “Ike” Wilson III',organization:'The Civic Brief',category:'Audience & Growth',summary:'Uses the finished show to introduce his ideas to senior leaders.',source:'pyp'},
 {id:'lower-nicole',name:'Nicole Jarbo',organization:'4.0',category:'Production & Editing',summary:'Praises show development and production, noting positive reactions from stakeholders.',source:'lower'},
 {id:'trustpilot-liam',name:'Liam F',organization:'Public reviewer · 29 Jun 2017',category:'Service & Support',summary:'Describes repeated use of audio article services and support spanning development, research, and promotion.',source:'trustpilot'},
];

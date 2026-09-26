import { mkdir, appendFile } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

export async function saveSubmission(kind: 'contacts'|'subscribers', data: Record<string,string>){
 const directory=process.env.PODBACKEND_DATA_DIR || path.join(process.cwd(),'data');
 await mkdir(directory,{recursive:true});
 await appendFile(path.join(directory,`${kind}.jsonl`),JSON.stringify({id:randomUUID(),createdAt:new Date().toISOString(),...data})+'\n',{encoding:'utf8',mode:0o600});
}
export function validEmail(value:unknown):value is string{return typeof value==='string'&&value.length<=254&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);}
export async function readSubmission(request:Request):Promise<Record<string,unknown>|null>{
 const origin=request.headers.get('origin');
 if(origin&&new URL(origin).host!==(request.headers.get('host')||new URL(request.url).host))return null;
 if(!request.headers.get('content-type')?.startsWith('application/json'))return null;
 if(Number(request.headers.get('content-length')||0)>12000)return null;
 const text=await request.text();if(text.length>12000)return null;
 try{const data=JSON.parse(text);return data&&typeof data==='object'&&!Array.isArray(data)?data:null;}catch{return null;}
}

import { readSubmission, saveSubmission, validEmail } from '@/lib/submissions';
export const runtime='nodejs';
export async function POST(request:Request){try{const data=await readSubmission(request);if(!data||!validEmail(data.email))return Response.json({error:'Please enter a valid email address.'},{status:400});await saveSubmission('subscribers',{email:data.email.trim().toLowerCase()});return Response.json({ok:true});}catch{return Response.json({error:'Your signup could not be saved.'},{status:503});}}

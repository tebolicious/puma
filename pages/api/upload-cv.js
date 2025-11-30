import fs from 'fs'
import path from 'path'

// This endpoint accepts a multipart/form-data upload with a single text file named `cv`
// and a `jobId`. It will (for prototype) read the text content and call OpenAI's API
// to tailor the CV. You must set OPENAI_API_KEY in the environment.

export const config = {
  api: { bodyParser: false }
}

import formidable from 'formidable'

function parseForm(req){
  const form = new formidable.IncomingForm()
  return new Promise((resolve,reject)=>{
    form.parse(req,(err,fields,files)=>{
      if(err) return reject(err)
      resolve({fields,files})
    })
  })
}

export default async function handler(req,res){
  if(req.method !== 'POST') return res.status(405).end()
  try{
    const {fields,files} = await parseForm(req)
    const jobId = fields.jobId
    // read text file
    let text = ''
    if(files && files.cv){
      const f = files.cv
      text = await fs.promises.readFile(f.filepath || f.path,'utf8')
    } else if(fields.cvText){
      text = fields.cvText
    }

    if(!text) return res.status(400).json({error:'No CV text found. Upload a plain text file for prototype.'})

    // Call OpenAI (assumes OPENAI_API_KEY)
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY
    if(!OPENAI_API_KEY) return res.status(200).json({preview: text, note: 'OPENAI_API_KEY not set. Returning original text.'})

    const prompt = `Rewrite and tailor the following CV to the job (job id: ${jobId}). Keep professional tone, keep structure and include keywords where relevant:\n\n${text}`

    const resp = await fetch('https://api.openai.com/v1/chat/completions',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${OPENAI_API_KEY}`
      },
      body:JSON.stringify({model:'gpt-4o-mini',messages:[{role:'user',content:prompt}],max_tokens:1200})
    })
    const j = await resp.json()
    const preview = j?.choices?.[0]?.message?.content || text
    return res.json({preview})
  }catch(err){
    console.error(err)
    return res.status(500).json({error:String(err)})
  }
}

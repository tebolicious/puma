import fs from 'fs'
import path from 'path'

const dbFile = path.join(process.cwd(),'data','jobs.json')

async function readDB(){
  try{const txt = await fs.promises.readFile(dbFile,'utf8'); return JSON.parse(txt || '[]')}catch(e){return []}
}

async function writeDB(data){
  await fs.promises.mkdir(path.dirname(dbFile),{recursive:true})
  await fs.promises.writeFile(dbFile,JSON.stringify(data,null,2),'utf8')
}

export default async function handler(req,res){
  if(req.method === 'GET'){
    const jobs = await readDB()
    return res.json(jobs.sort((a,b)=>b.createdAt-a.createdAt))
  }

  if(req.method === 'POST'){
    // create job (admin)
    const body = req.body
    const jobs = await readDB()
    const id = String(Date.now())
    const job = {id, createdAt: Date.now(), ...body}
    jobs.unshift(job)
    await writeDB(jobs)
    return res.status(201).json(job)
  }

  res.status(405).end()
}

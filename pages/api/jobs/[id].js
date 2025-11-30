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
  const {id} = req.query
  const jobs = await readDB()
  const idx = jobs.findIndex(j=>j.id === id)
  if(req.method === 'GET'){
    if(idx === -1) return res.status(404).json({error:'Not found'})
    return res.json(jobs[idx])
  }

  if(req.method === 'DELETE'){
    if(idx === -1) return res.status(404).json({error:'Not found'})
    jobs.splice(idx,1)
    await writeDB(jobs)
    return res.json({ok:true})
  }

  if(req.method === 'PUT'){
    if(idx === -1) return res.status(404).json({error:'Not found'})
    const body = req.body
    jobs[idx] = {...jobs[idx], ...body}
    await writeDB(jobs)
    return res.json(jobs[idx])
  }

  res.status(405).end()
}

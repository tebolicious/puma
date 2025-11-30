import fs from 'fs'
import path from 'path'

const dbFile = path.join(process.cwd(),'data','ads.json')

async function readDB(){
  try{const txt = await fs.promises.readFile(dbFile,'utf8'); return JSON.parse(txt || '{}')}catch(e){return {}}
}

async function writeDB(data){
  await fs.promises.mkdir(path.dirname(dbFile),{recursive:true})
  await fs.promises.writeFile(dbFile,JSON.stringify(data,null,2),'utf8')
}

export default async function handler(req,res){
  if(req.method === 'GET'){
    const data = await readDB()
    return res.json(data)
  }

  if(req.method === 'PUT'){
    // simple admin guard: check header
    // NOTE: replace with proper auth in production
    const ads = req.body
    await writeDB(ads)
    return res.json({ok:true})
  }

  res.status(405).end()
}

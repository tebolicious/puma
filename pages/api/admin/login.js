export default async function handler(req,res){
  if(req.method !== 'POST') return res.status(405).end()
  const {password} = req.body || {}
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme'
  if(password === ADMIN_PASSWORD){
    return res.json({ok:true})
  }
  return res.status(401).json({ok:false,error:'Invalid password'})
}

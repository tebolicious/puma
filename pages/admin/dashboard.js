import {useEffect, useState} from 'react'

function ensureAuth(){
  if(typeof window !== 'undefined'){
    const t = localStorage.getItem('puma_admin_token')
    if(!t) window.location.href = '/admin/login'
  }
}

export default function Dashboard(){
  const [jobs,setJobs] = useState([])
  const [ads,setAds] = useState({top:'',inArticle:'',multiplex:''})

  useEffect(()=>{ensureAuth(); fetch('/api/jobs').then(r=>r.json()).then(setJobs); fetch('/api/admin/ads').then(r=>r.json()).then(setAds)},[])

  async function addJob(e){
    e.preventDefault()
    const fd = new FormData(e.target)
    const body = Object.fromEntries(fd.entries())
    const res = await fetch('/api/jobs',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)})
    const j = await res.json()
    setJobs(prev=>[j,...prev])
    e.target.reset()
  }

  async function saveAds(e){
    e.preventDefault()
    const body = {top:e.target.top.value,inArticle:e.target.inArticle.value,multiplex:e.target.multiplex.value}
    await fetch('/api/admin/ads',{method:'PUT',headers:{'content-type':'application/json'},body:JSON.stringify(body)})
    alert('Ads saved')
  }

  return (
    <div className="container">
      <a href="/" className="muted">← Public site</a>
      <h1>Admin Dashboard</h1>

      <section style={{marginTop:12}}>
        <h2>Post a job</h2>
        <form onSubmit={addJob}>
          <div className="form-row"><label>Title</label><input name="title" required/></div>
          <div className="form-row"><label>Company</label><input name="company"/></div>
          <div className="form-row"><label>Province</label><input name="province" placeholder="e.g. Gauteng"/></div>
          <div className="form-row"><label>Category</label><input name="category" placeholder="e.g. Government Jobs"/></div>
          <div className="form-row"><label>Image URL (thumbnail)</label><input name="image" placeholder="https://..."/></div>
          <div className="form-row"><label>Description</label><textarea name="description" rows={6}></textarea></div>
          <button className="btn">Create Job</button>
        </form>
      </section>

      <section style={{marginTop:20}}>
        <h2>Manage Ads</h2>
        <form onSubmit={saveAds}>
          <div className="form-row"><label>Top ad slot (HTML)</label><textarea name="top" rows={3} defaultValue={ads.top}></textarea></div>
          <div className="form-row"><label>In-article ad (HTML)</label><textarea name="inArticle" rows={3} defaultValue={ads.inArticle}></textarea></div>
          <div className="form-row"><label>Multiplex ad (HTML)</label><textarea name="multiplex" rows={3} defaultValue={ads.multiplex}></textarea></div>
          <button className="btn">Save Ads</button>
        </form>
      </section>

      <section style={{marginTop:20}}>
        <h2>Existing Jobs</h2>
        <div style={{display:'grid',gap:8}}>
          {jobs.map(j=> <div key={j.id} className="card"><div style={{flex:1}}><strong>{j.title}</strong><div className="muted small">{j.province} • {j.category}</div></div></div>)}
        </div>
      </section>
    </div>
  )
}

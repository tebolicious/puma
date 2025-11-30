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
      <a href="/" className="text-sm text-slate-500">← Public site</a>
      <h1 className="text-2xl font-bold mt-2">Admin Dashboard</h1>

      <section className="mt-4">
        <h2 className="text-lg font-semibold">Post a job</h2>
        <form onSubmit={addJob} className="mt-3 grid grid-cols-1 gap-3">
          <input name="title" required placeholder="Title" className="border rounded-md p-2" />
          <input name="company" placeholder="Company" className="border rounded-md p-2" />
          <input name="province" placeholder="Province (e.g. Gauteng)" className="border rounded-md p-2" />
          <input name="category" placeholder="Category (e.g. Government Jobs)" className="border rounded-md p-2" />
          <input name="image" placeholder="Image URL (thumbnail)" className="border rounded-md p-2" />
          <textarea name="description" rows={6} placeholder="Description" className="border rounded-md p-2"></textarea>
          <button className="bg-slate-900 text-white px-4 py-2 rounded-md w-full">Create Job</button>
        </form>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold">Manage Ads</h2>
        <form onSubmit={saveAds} className="mt-3 grid gap-3">
          <textarea name="top" rows={3} defaultValue={ads.top} className="border rounded-md p-2" placeholder="Top ad HTML"></textarea>
          <textarea name="inArticle" rows={3} defaultValue={ads.inArticle} className="border rounded-md p-2" placeholder="In-article ad HTML"></textarea>
          <textarea name="multiplex" rows={3} defaultValue={ads.multiplex} className="border rounded-md p-2" placeholder="Multiplex ad HTML"></textarea>
          <button className="bg-slate-900 text-white px-4 py-2 rounded-md w-full">Save Ads</button>
        </form>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold">Existing Jobs</h2>
        <div className="mt-3 grid gap-3">
          {jobs.map(j=> <div key={j.id} className="bg-white border border-gray-100 rounded-md p-3 flex justify-between items-center"><div>
            <strong className="block">{j.title}</strong>
            <div className="text-sm text-slate-500">{j.province} • {j.category}</div>
          </div></div>)}
        </div>
      </section>
    </div>
  )
}

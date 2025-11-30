import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'

export default function JobDetail(){
  const router = useRouter()
  const {id} = router.query
  const [job,setJob] = useState(null)
  const [ads,setAds] = useState({})

  useEffect(()=>{
    if(!id) return
    fetch(`/api/jobs/${id}`).then(r=>r.json()).then(setJob)
    fetch('/api/admin/ads').then(r=>r.json()).then(setAds)
  },[id])

  if(!job) return <div className="container"><p>Loading...</p></div>

  return (
    <div className="container">
      <a href="/" className="text-sm text-slate-500">← Back to listings</a>
      <h1 className="text-2xl font-bold mt-3">{job.title}</h1>
      <div className="text-sm text-slate-500">{job.company} • {job.province} • {job.category}</div>
      <section className="mt-4">
        <img src={job.image || 'https://via.placeholder.com/800x300?text=Job'} alt={job.title} className="w-full h-48 sm:h-64 object-cover rounded-md"/>
      </section>

      <section className="mt-4">
        <h3 className="text-lg font-semibold">Job description</h3>
        <p className="text-slate-700 mt-2">{job.description}</p>
      </section>

      <section className="mt-4">
        <h3 className="text-lg font-medium">Apply</h3>
        <form id="apply-form" className="mt-3" onSubmit={async (e)=>{
          e.preventDefault()
          const form = e.currentTarget
          const formData = new FormData(form)
          const res = await fetch('/api/upload-cv',{method:'POST',body:formData})
          const data = await res.json()
          if(data.preview){
            alert('AI-edited CV preview:\n' + data.preview.slice(0,800))
          } else alert('Submitted')
        }}>
          <div className="flex flex-col gap-2 mb-2">
            <label className="text-sm text-slate-600">Your name</label>
            <input name="name" required className="border rounded-md p-2" />
          </div>
          <div className="flex flex-col gap-2 mb-2">
            <label className="text-sm text-slate-600">Email</label>
            <input name="email" type="email" required className="border rounded-md p-2" />
          </div>
          <div className="flex flex-col gap-2 mb-2">
            <label className="text-sm text-slate-600">Upload CV (plain text file recommended)</label>
            <input name="cv" type="file" accept="text/*" required className="" />
          </div>
          <input type="hidden" name="jobId" value={job.id} />
          <button className="bg-slate-900 text-white px-4 py-2 rounded-md">Upload & Tailor CV</button>
        </form>
      </section>

      <section className="mt-4">
        <h3 className="text-lg font-medium">Share this job</h3>
        <div className="flex gap-2 mt-2">
          <a className="inline-block bg-slate-100 text-slate-800 px-3 py-1 rounded-md text-sm" href={`https://wa.me/?text=${encodeURIComponent(job.title + ' - ' + (typeof window !== 'undefined' ? window.location.href : ''))}`} target="_blank" rel="noreferrer">WhatsApp</a>
          <a className="inline-block bg-slate-100 text-slate-800 px-3 py-1 rounded-md text-sm" href={`mailto:?subject=${encodeURIComponent(job.title)}&body=${encodeURIComponent(job.description + '\n\nApply: ' + (typeof window !== 'undefined' ? window.location.href : ''))}`}>Email</a>
        </div>
      </section>

      <section className="ad-slot mt-6">
        <div id="in-article-ad" dangerouslySetInnerHTML={{__html: ads.inArticle || '<small>In-article ad</small>'}} />
      </section>

    </div>
  )
}

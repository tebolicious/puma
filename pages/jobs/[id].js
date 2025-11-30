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
      <a href="/" className="muted">← Back to listings</a>
      <h1>{job.title}</h1>
      <div className="muted small">{job.company} — {job.province} — {job.category}</div>
      <section style={{marginTop:12}}>
        <img src={job.image} alt={job.title} style={{width:'100%',height:200,objectFit:'cover',borderRadius:8}}/>
      </section>

      <section style={{marginTop:12}}>
        <h3>Job description</h3>
        <p>{job.description}</p>
      </section>

      <section style={{marginTop:12}}>
        <h3>Apply</h3>
        <form id="apply-form" onSubmit={async (e)=>{
          e.preventDefault()
          const form = e.currentTarget
          const formData = new FormData(form)
          const res = await fetch('/api/upload-cv',{method:'POST',body:formData})
          const data = await res.json()
          if(data.preview){
            // show preview
            alert('AI-edited CV preview:\n' + data.preview.slice(0,800))
          } else alert('Submitted')
        }}>
          <div className="form-row">
            <label className="small">Your name</label>
            <input name="name" required />
          </div>
          <div className="form-row">
            <label className="small">Email</label>
            <input name="email" type="email" required />
          </div>
          <div className="form-row">
            <label className="small">Upload CV (plain text file recommended)</label>
            <input name="cv" type="file" accept="text/*" required />
          </div>
          <input type="hidden" name="jobId" value={job.id} />
          <button className="btn">Upload & Tailor CV</button>
        </form>
      </section>

      <section style={{marginTop:12}}>
        <h3>Share this job</h3>
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          <a className="btn" href={`https://wa.me/?text=${encodeURIComponent(job.title + ' - ' + (typeof window !== 'undefined' ? window.location.href : ''))}`} target="_blank" rel="noreferrer">Share WhatsApp</a>
          <a className="btn" href={`mailto:?subject=${encodeURIComponent(job.title)}&body=${encodeURIComponent(job.description + '\n\nApply: ' + (typeof window !== 'undefined' ? window.location.href : ''))}`}>Share Email</a>
        </div>
      </section>

      <section className="ad-slot" style={{marginTop:20}}>
        <div id="in-article-ad" dangerouslySetInnerHTML={{__html: ads.inArticle || '<small>In-article ad</small>'}} />
      </section>

    </div>
  )
}

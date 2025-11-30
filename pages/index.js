import {useEffect, useState} from 'react'
import JobCard from '../components/JobCard'

export default function Home(){
  const [jobs,setJobs] = useState([])
  const [ads,setAds] = useState({top:'',inArticle:'',multiplex:''})

  useEffect(()=>{
    fetch('/api/jobs').then(r=>r.json()).then(data=>setJobs(data || []))
    fetch('/api/admin/ads').then(r=>r.json()).then(a=>setAds(a || {}))
  },[])

  return (
    <div className="container">
      <header className="header">
        <h1>pumajob.co.za</h1>
        <a href="/admin/login" className="small">Admin</a>
      </header>

      <section className="ad-slot" aria-label="Top Ad">
        <div id="top-ad" dangerouslySetInnerHTML={{__html: ads.top || '<small>Top ad (admin configurable)</small>'}} />
      </section>

      <main>
        <h2>Latest jobs</h2>
        <div className="job-grid">
          {jobs.map(job => <JobCard job={job} key={job.id} />)}
        </div>
      </main>

      <section className="ad-slot" style={{marginTop:12}}>
        <div dangerouslySetInnerHTML={{__html: ads.multiplex || '<small>Multiplex ad</small>'}} />
      </section>

      <footer style={{marginTop:24}} className="muted small">Puma Job Portal — Jobs by province and category. Built for mobile-first SEO.</footer>
    </div>
  )
}

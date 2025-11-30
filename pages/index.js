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
      <header className="flex items-center justify-between py-4">
        <div>
          <h1 className="text-2xl font-bold">pumajob.co.za</h1>
          <div className="text-sm text-slate-500">Jobs across South Africa</div>
        </div>
        <div>
          <a href="/admin/login" className="text-sm text-slate-600">Admin</a>
        </div>
      </header>

      <section className="ad-slot" aria-label="Top Ad">
        <div id="top-ad" dangerouslySetInnerHTML={{__html: ads.top || '<small>Top ad (admin configurable)</small>'}} />
      </section>

      <main>
        <h2 className="text-xl font-semibold mt-4 mb-3">Latest jobs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {jobs.map(job => <JobCard job={job} key={job.id} />)}
        </div>
      </main>

      <section className="ad-slot mt-6">
        <div dangerouslySetInnerHTML={{__html: ads.multiplex || '<small>Multiplex ad</small>'}} />
      </section>

      <footer className="mt-8 text-sm text-slate-500">Puma Job Portal — Jobs by province and category. Built for mobile-first SEO.</footer>
    </div>
  )
}

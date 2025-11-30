import Link from 'next/link'

export default function JobCard({job}){
  return (
    <article className="card" aria-labelledby={`job-${job.id}`}>
      <img src={job.image || '/placeholder-300x200.png'} alt={job.title} loading="lazy" width="120" height="80"/>
      <div className="meta">
        <h3 id={`job-${job.id}`}>{job.title}</h3>
        <div className="small muted">{job.company} — {job.province} — {job.category}</div>
        <p className="muted small">{job.excerpt || job.description?.slice(0,120)}</p>
        <div style={{marginTop:8}}>
          <Link href={`/jobs/${job.id}`}><a className="btn">View Job</a></Link>
        </div>
      </div>
    </article>
  )
}

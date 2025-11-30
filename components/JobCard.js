import Link from 'next/link'

export default function JobCard({job}){
  return (
    <article className="bg-white border border-gray-100 rounded-lg shadow-sm p-4 flex gap-4 items-start" aria-labelledby={`job-${job.id}`}>
      <img src={job.image || 'https://via.placeholder.com/300x200?text=Job'} alt={job.title} loading="lazy" width="120" height="80" className="w-28 h-20 object-cover rounded-md flex-shrink-0"/>
      <div className="flex-1">
        <h3 id={`job-${job.id}`} className="text-lg font-semibold text-slate-900">{job.title}</h3>
        <div className="text-sm text-slate-500">{job.company} • {job.province} • {job.category}</div>
        <p className="text-sm text-slate-600 mt-2">{job.excerpt || job.description?.slice(0,120)}</p>
        <div className="mt-3">
          <Link href={`/jobs/${job.id}`}><a className="inline-block bg-slate-900 text-white px-3 py-1 rounded-md text-sm">View Job</a></Link>
        </div>
      </div>
    </article>
  )
}

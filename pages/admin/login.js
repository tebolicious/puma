import {useState} from 'react'

export default function Login(){
  const [pass,setPass] = useState('')
  const [err,setErr] = useState(null)

  return (
    <div className="container">
      <a href="/" className="muted">← Back</a>
      <h1>Admin login</h1>
      <form onSubmit={async (e)=>{
        e.preventDefault()
        const res = await fetch('/api/admin/login',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({password:pass})})
        const data = await res.json()
        if(data.ok){
          localStorage.setItem('puma_admin_token','1')
          window.location.href = '/admin/dashboard'
        } else setErr(data?.error || 'Login failed')
      }}>
        <div className="form-row">
          <label className="small">Password</label>
          <input type="password" value={pass} onChange={e=>setPass(e.target.value)} />
        </div>
        <button className="btn">Login</button>
        {err && <div className="muted" style={{marginTop:8}}>{err}</div>}
      </form>
    </div>
  )
}

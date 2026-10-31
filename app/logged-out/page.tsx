'use client'
import { CheckCircle2, Headphones } from 'lucide-react'
export default function LoggedOut(){return <main className="simple-auth"><section className="simple-card success-state"><div className="success-icon"><CheckCircle2/></div><h1>You&apos;ve been logged out</h1><p>Your SmartDesk session has ended safely.</p><button onClick={()=>{location.href='/login'}}>Sign in again</button><p className="auth-footer"><span className="auth-brand"><span className="brand-mark"><Headphones size={15}/></span> SmartDesk</span></p></section></main>}

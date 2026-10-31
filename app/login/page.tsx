'use client'

import { useEffect, useState } from 'react'
import { Eye, EyeOff, Headphones, Loader2, LockKeyhole, Mail, CheckCircle2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { demoUsers } from '@/lib/auth'
import { WorkIllustration } from '@/components/illustrations/work-illustration'

const schema = z.object({ email: z.string().email('Enter a valid work email.'), password: z.string().min(1, 'Password is required.'), remember: z.boolean().optional() })
type FormValues = z.infer<typeof schema>



export default function LoginPage() {
  const router = useRouter(); const [show, setShow] = useState(false); const [error, setError] = useState('')
  const [registered, setRegistered] = useState(false)
  useEffect(() => {
    setRegistered(new URLSearchParams(window.location.search).get('registered') === '1')
    fetch('/api/auth/session').then((r) => { if (r.ok) router.replace('/dashboard') }).catch(() => undefined)
  }, [router])
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { remember: false } })
  async function onSubmit(values: FormValues) { setError(''); const response = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) }); if (!response.ok) { setError('The email or password is incorrect.'); return }; const data = await response.json(); const next = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('next') || '/dashboard' : '/dashboard'; router.replace(next); router.refresh(); window.dispatchEvent(new CustomEvent('smartdesk-toast', { detail: `Welcome back, ${data.user.firstName}` })) }
  return <main className="auth-page">{registered && <div className="auth-toast" role="status">Your account request was sent successfully.</div>}<div className="auth-shell"><section className="auth-form-panel"><div className="auth-brand"><span className="brand-mark"><Headphones size={18}/></span><span>SmartDesk</span></div><div className="auth-copy"><p className="eyebrow">IT HELP DESK</p><h1>Welcome back</h1><p>Sign in to continue to your support workspace.</p></div><form onSubmit={handleSubmit(onSubmit)} className="auth-form" noValidate>{error && <div className="auth-error" role="alert">{error}</div>}<label>Work email<div className="auth-input"><Mail size={17}/><input type="email" placeholder="you@company.com" aria-invalid={!!errors.email} {...register('email')}/></div>{errors.email && <small>{errors.email.message}</small>}</label><label>Password<div className="auth-input"><LockKeyhole size={17}/><input type={show ? 'text' : 'password'} placeholder="Enter your password" aria-invalid={!!errors.password} {...register('password')}/><button type="button" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'}>{show ? <EyeOff size={17}/> : <Eye size={17}/>}</button></div>{errors.password && <small>{errors.password.message}</small>}</label><div className="auth-options"><label className="check-label"><input type="checkbox" {...register('remember')}/> Keep me signed in</label><a href="/forgot-password">Forgot password?</a></div><button className="auth-submit" disabled={isSubmitting}>{isSubmitting ? <Loader2 className="spin" size={17}/> : null}{isSubmitting ? 'Signing in…' : 'Sign in'}</button></form><div className="demo-login"><span>Quick demo access</span><div>{demoUsers.map((user) => <button type="button" key={user.role} onClick={() => { setValue('email', user.email); setValue('password', user.password) }}>{user.role}</button>)}</div></div><p className="auth-footer">New to SmartDesk? <a href="/register">Create an account</a></p></section><aside className="auth-art"><div><p className="eyebrow">ONE PLACE FOR EVERY REQUEST</p><h2>Support that keeps work moving.</h2><p>Track incidents, collaborate with IT, and get back to what matters.</p></div><WorkIllustration className="auth-illustration" aria-hidden="true" /></aside></div></main>
}

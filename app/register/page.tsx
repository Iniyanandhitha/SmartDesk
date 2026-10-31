'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Headphones, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { WorkIllustration } from '@/components/illustrations/work-illustration'

const schema = z
  .object({
    fullName: z.string().min(1, 'Full name is required.'),
    employeeId: z.string().min(1, 'Employee ID is required.'),
    email: z.string().email('Enter a valid work email.'),
    department: z.string().min(1, 'Department is required.'),
    password: z.string().min(8, 'Password must be at least 8 characters.'),
    confirmPassword: z.string().min(1, 'Please confirm your password.'),
    terms: z.boolean().refine((value) => value, 'You must accept the terms and privacy policy.'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  })

type FormValues = z.infer<typeof schema>

function passwordStrength(password: string) {
  if (!password) return { label: 'Use at least 8 characters', width: '0%' }
  if (password.length < 8) return { label: 'Too short', width: '25%' }
  if (password.length < 12 || !/[A-Z]/.test(password) || !/\d/.test(password)) return { label: 'Good', width: '60%' }
  return { label: 'Strong', width: '100%' }
}

export default function Register() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const strength = passwordStrength(password)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { terms: false },
  })

  async function onSubmit() {
    router.replace('/login?registered=1')
  }

  return (
    <main className="auth-page">
      <div className="auth-shell register-shell">
        <section className="auth-form-panel register-form-panel">
          <div className="auth-brand"><span className="brand-mark"><Headphones size={18} /></span><span>SmartDesk</span></div>
          <div className="auth-copy">
            <p className="eyebrow">IT HELP DESK</p>
            <h1>Create your account</h1>
            <p>Join your team&apos;s support workspace.</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="auth-form register-form" noValidate>
            <div className="register-fields">
              <label>Full name<input placeholder="Your full name" aria-invalid={!!errors.fullName} {...register('fullName')} />{errors.fullName && <small>{errors.fullName.message}</small>}</label>
              <label>Employee ID<input placeholder="e.g. EMP-1042" aria-invalid={!!errors.employeeId} {...register('employeeId')} />{errors.employeeId && <small>{errors.employeeId.message}</small>}</label>
              <label>Work email<input type="email" placeholder="you@company.com" aria-invalid={!!errors.email} {...register('email')} />{errors.email && <small>{errors.email.message}</small>}</label>
              <label>Department<select defaultValue="" aria-invalid={!!errors.department} {...register('department')}><option value="" disabled>Select department</option><option>Engineering</option><option>Finance</option><option>Operations</option><option>People</option></select>{errors.department && <small>{errors.department.message}</small>}</label>
              <label>Password<div className="simple-input"><input type="password" placeholder="At least 8 characters" aria-invalid={!!errors.password} {...register('password', { onChange: (event) => setPassword(event.target.value) })} /></div><div className="password-strength" aria-live="polite"><i style={{ width: strength.width }} /><span>{strength.label}</span></div>{errors.password && <small>{errors.password.message}</small>}</label>
              <label>Confirm password<input type="password" placeholder="Repeat your password" aria-invalid={!!errors.confirmPassword} {...register('confirmPassword')} />{errors.confirmPassword && <small>{errors.confirmPassword.message}</small>}</label>
            </div>
            <label className="terms-label"><input type="checkbox" {...register('terms')} /><span>I agree to the <a href="/terms">terms</a> and <a href="/privacy">privacy policy</a></span></label>
            {errors.terms && <small className="terms-error">{errors.terms.message}</small>}
            <button className="auth-submit" disabled={isSubmitting}>{isSubmitting ? <Loader2 className="spin" size={17} /> : null}{isSubmitting ? 'Creating account…' : 'Create account'}</button>
          </form>
          <p className="auth-footer">Already have an account? <a href="/login">Sign in</a></p>
        </section>
        <aside className="auth-art register-art">
          <div><p className="eyebrow">ONE PLACE FOR EVERY REQUEST</p><h2>Join your team&apos;s support workspace.</h2><p>Get help, track requests, and keep work moving together.</p></div>
          <WorkIllustration className="auth-illustration" aria-hidden="true" />
        </aside>
      </div>
    </main>
  )
}

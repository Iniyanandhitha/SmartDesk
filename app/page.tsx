'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { WorkIllustration } from '@/components/illustrations/work-illustration'
import {
  AlertCircle,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  Clock3,
  Edit3,
  FileText,
  Headphones,
  LayoutDashboard,
  Mail,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Ticket,
  Trash2,
  TrendingUp,
  Users,
  X,
} from 'lucide-react'

const navItems = [
  ['Dashboard', LayoutDashboard], ['My Incidents', AlertCircle], ['My Tickets', Ticket], ['Report a Concern', ShieldCheck], ['Notifications', Bell], ['Settings', Settings],
] as const

const incidents = [
  { id: 'INC-2481', title: 'VPN connection dropping frequently', description: 'Several employees in the Bengaluru office are unable to stay connected to the corporate VPN.', category: 'Network', priority: 'High', status: 'In progress', meta: 'Assigned to Arjun Mehta', color: '#E8E3FF' },
  { id: 'INC-2478', title: 'Payroll portal login failing', description: 'The payroll portal returns a 403 error for the Finance department after the latest update.', category: 'Access', priority: 'Critical', status: 'Assigned', meta: 'Assigned to Priya Shah', color: '#FFF0D1' },
  { id: 'INC-2473', title: 'Printer queue stuck on Floor 3', description: 'Print jobs are not processing for the common printer near the meeting rooms.', category: 'Hardware', priority: 'Medium', status: 'Open', meta: 'Unassigned', color: '#FCE2EC' },
]



function Metric({ value, label, icon: Icon, tone }: { value: string; label: string; icon: typeof AlertCircle; tone: string }) {
  return <div className="metric" style={{ background: tone }}><div className="metric-icon"><Icon size={20}/></div><div><strong>{value}</strong><span>{label}</span></div></div>
}

export default function Page() {
  const router = useRouter()
  const [session, setSession] = useState<{ firstName: string; fullName: string; role: string; initials: string } | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [logoutOpen, setLogoutOpen] = useState(false)
  const [active, setActive] = useState('Dashboard')
  const [menuOpen, setMenuOpen] = useState(false)
  const [modal, setModal] = useState(false)
  const [search, setSearch] = useState('')
  const [dark, setDark] = useState(false)
  const [dateFilter, setDateFilter] = useState('Last 7 days')
  const filtered = useMemo(() => incidents.filter((item) => `${item.title} ${item.category}`.toLowerCase().includes(search.toLowerCase())), [search])
  useEffect(() => {
    let active = true
    fetch('/api/auth/session')
      .then(async (response) => {
        if (!active) return
        if (response.ok) {
          setSession((await response.json()).user)
        } else {
          router.replace('/login?next=/dashboard')
        }
      })
      .catch(() => {
        if (active) router.replace('/login?next=/dashboard')
      })
      .finally(() => {
        if (active) setAuthLoading(false)
      })
    return () => { active = false }
  }, [router])
  if (authLoading || !session) return <main className="simple-auth"><section className="simple-card"><p>Loading your workspace…</p></section></main>

  return <main className={dark ? 'site dark' : 'site'}>
    <div className="app-shell">
      <aside className={menuOpen ? 'sidebar open' : 'sidebar'}>
        <div className="brand"><div className="brand-mark"><Headphones size={18}/></div><span>SmartDesk</span><button className="mobile-close" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={18}/></button></div>
        <button className="create-card" onClick={() => setModal(true)}><span>Create New<br/>Ticket</span><span className="plus"><Plus size={19}/></span></button>
        <nav className="nav-list" aria-label="Main navigation">{navItems.map(([label, Icon]) => <button key={label} className={active === label ? 'nav-item active' : 'nav-item'} onClick={() => { setActive(label); setMenuOpen(false) }}><Icon size={18}/><span>{label}</span>{label === 'Notifications' && <b className="nav-badge">3</b>}</button>)}</nav>
        <div className="sidebar-help"><div className="help-icon"><CircleHelp size={21}/></div><p>Need help with<br/>something else?</p><button onClick={() => setModal(true)}>Contact support <ChevronRight size={13}/></button></div>
        <div className="profile-mini"><div className="avatar">KS</div><div><strong>Karthik Srinivas</strong><span>Employee</span></div><MoreHorizontal size={17}/></div>
      </aside>
      <section className="content">
        <header className="topbar"><button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={22}/></button><div><h1>{active}</h1><p><b>Monday</b>, October 31, 2026</p></div><div className="top-actions"><button aria-label="Messages"><Mail size={19}/></button><button aria-label="Notifications" className="bell"><Bell size={19}/><i>3</i></button><button className="user-chip" onClick={() => setLogoutOpen(true)}><span className="avatar">{session.initials}</span><span>{session.fullName}</span><ChevronDown size={15}/></button></div></header>
        {active === 'Dashboard' ? <>
          <section className="hero"><div><p className="eyebrow">MONDAY, 31 OCTOBER</p><h2>Hi, {session.firstName}</h2><p>Here&apos;s what&apos;s happening with your IT requests today.</p><button className="hero-link" onClick={() => setActive('My Incidents')}>View my incidents <ChevronRight size={14}/></button></div><WorkIllustration className="hero-art" showBackground={false} aria-hidden="true" /></section>
          <div className="section-heading"><div><span>Overview</span><h2>Your workspace at a glance</h2></div><div className="filters">{['Today', 'Last 7 days', 'Last 30 days'].map((item) => <button key={item} className={dateFilter === item ? 'filter active' : 'filter'} onClick={() => setDateFilter(item)}>{item}</button>)}<button className="filter icon-filter" aria-label="Custom date"><CalendarDays size={15}/></button></div></div>
          <div className="metrics"><Metric value="08" label="My incidents" icon={AlertCircle} tone="#F4C03E"/><Metric value="03" label="Open requests" icon={ClipboardList} tone="#4A3AA8"/><Metric value="12" label="Resolved this week" icon={CheckCircle2} tone="#EC5F93"/><Metric value="02" label="Awaiting my reply" icon={Clock3} tone="#BEB0E4"/></div>
          <div className="compact-stats"><span><TrendingUp size={14}/> <b>2.4 hrs</b> average response time</span><span><Clock3 size={14}/> <b>1</b> request due soon</span><button onClick={() => setModal(true)}><Plus size={15}/> Create ticket</button></div>
          <section className="workspace-grid"><div className="panel incidents-panel"><div className="panel-head"><div><span className="kicker">RECENT ACTIVITY</span><h2>My recent incidents</h2></div><button className="text-button" onClick={() => setActive('My Incidents')}>View all <ChevronRight size={14}/></button></div><div className="search-row"><div className="search-box"><Search size={16}/><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search incidents" aria-label="Search incidents"/></div><button className="outline-button"><SlidersHorizontal size={15}/> Filter</button></div><div className="incident-list">{filtered.map((item) => <article className="incident-row" key={item.id}><div className="category-tile" style={{background: item.color}}>{item.category === 'Network' ? <BriefcaseBusiness size={22}/> : item.category === 'Access' ? <ShieldCheck size={22}/> : <FileText size={22}/>}</div><div className="incident-copy"><div className="title-line"><h3>{item.title}</h3><span className={`priority ${item.priority.toLowerCase()}`}>{item.priority}</span></div><p>{item.description}</p><small>{item.id} · {item.meta}</small></div><div className="row-actions"><span className="status"><i/> {item.status}</span><div><button aria-label={`Edit ${item.id}`}><Edit3 size={15}/></button><button aria-label={`Delete ${item.id}`}><Trash2 size={15}/></button></div></div></article>)}</div>{filtered.length === 0 && <div className="empty">No incidents match your search.</div>}</div><div className="side-column"><div className="panel chart-panel"><div className="panel-head"><div><span className="kicker">THIS WEEK</span><h2>Request activity</h2></div><button aria-label="More options"><MoreHorizontal size={18}/></button></div><div className="chart-legend"><span><i className="legend-purple"/> Created</span><span><i className="legend-yellow"/> Resolved</span></div><div className="chart"><div className="grid-lines"><i/><i/><i/><i/></div><svg viewBox="0 0 360 150" preserveAspectRatio="none" aria-label="Request activity chart"><path d="M0 122 C30 115 42 92 67 103 S100 86 120 95 S155 64 176 82 S206 45 231 70 S260 72 282 45 S320 57 360 22" fill="none" stroke="#5B4BC4" strokeWidth="3"/><path d="M0 135 C40 125 55 130 80 118 S120 125 145 112 S180 116 205 103 S240 110 266 91 S310 96 360 72" fill="none" stroke="#F4C03E" strokeWidth="3"/></svg></div><div className="chart-labels"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div></div><div className="panel sla-panel"><div className="panel-head"><div><span className="kicker">SERVICE LEVEL</span><h2>SLA compliance</h2></div><span className="sla-value">94%</span></div><div className="sla-body"><div className="ring"><strong>94</strong><span>of 100</span></div><div><p><i className="dot green"/> On track <b>24</b></p><p><i className="dot amber"/> At risk <b>4</b></p><p><i className="dot red"/> Breached <b>1</b></p></div></div></div></div></section>
        </> : <section className="placeholder-page"><div className="empty-illustration"><ClipboardList size={44}/></div><h2>{active}</h2><p>This workspace is ready for your {active.toLowerCase()}.</p><button className="primary-button" onClick={() => setModal(true)}><Plus size={16}/> Create new ticket</button></section>}
      </section>
    </div>
    {modal && <div className="modal-backdrop" onClick={() => setModal(false)}><div className="modal" onClick={(e) => e.stopPropagation()}><div className="modal-head"><div><span className="kicker">NEW REQUEST</span><h2>Create a support ticket</h2></div><button onClick={() => setModal(false)} aria-label="Close dialog"><X size={19}/></button></div><label>What can we help with?<input placeholder="e.g. VPN is not connecting" autoFocus/></label><label>Tell us a little more<textarea placeholder="Add details that can help the support team..." rows={4}/></label><div className="modal-actions"><button className="outline-button" onClick={() => setModal(false)}>Cancel</button><button className="primary-button" onClick={() => setModal(false)}>Submit ticket</button></div></div></div>}
    {logoutOpen && <div className="modal-backdrop" onClick={() => setLogoutOpen(false)}><div className="modal" onClick={(event) => event.stopPropagation()}><div className="modal-head"><div><span className="kicker">SESSION</span><h2>Log out of SmartDesk?</h2></div><button onClick={() => setLogoutOpen(false)} aria-label="Close dialog"><X size={19}/></button></div><p className="modal-copy">You can sign in again whenever you&apos;re ready.</p><div className="modal-actions"><button className="outline-button" onClick={() => setLogoutOpen(false)}>Cancel</button><button className="primary-button" onClick={async () => { await fetch('/api/auth/logout', { method: 'POST' }); window.location.replace('/logged-out') }}>Log out</button></div></div></div>}
  </main>
}

import { useMemo, useState } from 'react'
import {
  CalendarDays, Check, ChevronRight, Clock3, Edit3, Gift,
  Home, MapPin, MessageCircle, Plus, Send, Sparkles,
  Trash2, UserRound, Users,
} from 'lucide-react'
import { Link, Outlet, createRootRoute, createRoute, createRouter, useNavigate } from '@tanstack/react-router'
import './App.css'

export type PlayDate = {
  id: number
  title: string
  child: string
  friend: string
  date: string
  time: string
  location: string
  bring: string
  status: 'Bestätigt' | 'Ausstehend'
  color: 'mint' | 'peach' | 'lilac'
}

const initialDates: PlayDate[] = [
  { id: 1, title: 'Abenteuer im Stadtpark', child: 'Mila', friend: 'Noah', date: '2026-07-18', time: '15:00', location: 'Volkspark, Spielplatz West', bring: 'Picknickdecke & Trauben', status: 'Bestätigt', color: 'mint' },
  { id: 2, title: 'Kreativnachmittag', child: 'Mila', friend: 'Leni', date: '2026-07-22', time: '16:00', location: 'Bei Familie Berger', bring: 'Malkittel', status: 'Ausstehend', color: 'peach' },
  { id: 3, title: 'Planschen & Eis', child: 'Jonas', friend: 'Emil', date: '2026-07-27', time: '14:30', location: 'Freibad Pankow', bring: 'Sonnencreme', status: 'Bestätigt', color: 'lilac' },
]

function usePlayDates() {
  const stored = localStorage.getItem('playdates')
  const [dates, setDates] = useState<PlayDate[]>(stored ? JSON.parse(stored) : initialDates)
  const save = (next: PlayDate[]) => { setDates(next); localStorage.setItem('playdates', JSON.stringify(next)) }
  return { dates, save }
}

function Shell() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">Zum Inhalt springen</a>
      <header className="topbar">
        <Link to="/" className="brand" aria-label="PlayPal Startseite"><span className="brand-mark"><Sparkles size={20} /></span><span>Play<span>Pal</span></span></Link>
        <nav className="desktop-nav" aria-label="Hauptnavigation">
          <Link to="/" activeProps={{ className: 'active' }}>Übersicht</Link>
          <Link to="/playdates" activeProps={{ className: 'active' }}>PlayDates</Link>
          <a href="#familien">Familien</a>
        </nav>
        <button className="avatar-button" aria-label="Profil öffnen"><span>JM</span><span className="avatar-copy"><strong>Josephine</strong><small>2 Kinder</small></span></button>
      </header>
      <main id="main"><Outlet /></main>
      <nav className="bottom-nav" aria-label="Mobile Navigation">
        <Link to="/" activeProps={{ className: 'active' }}><Home/><span>Start</span></Link>
        <Link to="/playdates" activeProps={{ className: 'active' }}><CalendarDays/><span>Termine</span></Link>
        <Link to="/new" className="new-mobile" aria-label="Neues PlayDate"><Plus/></Link>
        <a href="#familien"><Users/><span>Familien</span></a>
        <a href="#profil"><UserRound/><span>Profil</span></a>
      </nav>
    </div>
  )
}

function Dashboard() {
  return <DashboardContent compact />
}

function DashboardContent({ compact = false }: { compact?: boolean }) {
  const { dates, save } = usePlayDates()
  const [toast, setToast] = useState('')
  const upcoming = useMemo(() => [...dates].sort((a,b) => a.date.localeCompare(b.date)), [dates])
  const announce = (message: string) => { setToast(message); window.setTimeout(() => setToast(''), 3000) }
  const remove = (id: number) => { if (window.confirm('Möchtest du dieses PlayDate wirklich löschen?')) save(dates.filter(d => d.id !== id)) }
  return (
    <div className="page-wrap">
      <section className="welcome-card" aria-labelledby="welcome-title">
        <div><p className="eyebrow">Dienstag, 14. Juli</p><h1 id="welcome-title">Hallo Josephine <span aria-hidden="true">👋</span></h1><p>Bereit für ein bisschen Kinderlachen und neue Erinnerungen?</p></div>
        <Link to="/new" className="primary-button"><Plus size={18}/> PlayDate planen</Link>
        <div className="sun-doodle" aria-hidden="true"><span>☀</span></div>
      </section>

      <section className="quick-grid" aria-label="Schnellaktionen">
        <button onClick={() => announce('Kalenderverbindung wird vorbereitet')}><span className="quick-icon blue"><CalendarDays/></span><span><strong>Kalender verbinden</strong><small>Termine automatisch synchronisieren</small></span><ChevronRight/></button>
        <button onClick={() => window.open('https://wa.me/?text=Komm%20zu%20PlayPal%20%E2%80%93%20lass%20uns%20ein%20PlayDate%20planen!', '_blank', 'noopener,noreferrer')}><span className="quick-icon green"><MessageCircle/></span><span><strong>Mit WhatsApp teilen</strong><small>Familien unkompliziert einladen</small></span><ChevronRight/></button>
      </section>

      <div className="section-heading"><div><p className="eyebrow">Was als Nächstes kommt</p><h2>Deine PlayDates</h2></div><Link to="/playdates">Alle ansehen <ChevronRight size={16}/></Link></div>
      <section className="date-grid" aria-label="Anstehende PlayDates">
        {upcoming.slice(0, compact ? 3 : undefined).map(date => <PlayDateCard key={date.id} date={date} onDelete={remove} onInvite={() => announce(`Einladung für ${date.title} bereit`)} />)}
      </section>

      <section className="privacy-note"><span><Check/></span><div><strong>Deine Familie. Eure Daten.</strong><p>Fotos, Kommentare und Kontakte sind nur für eingeladene Familien sichtbar. Einwilligungen können jederzeit widerrufen werden.</p></div><a href="#datenschutz">Datenschutz</a></section>
      <div className="toast" role="status" aria-live="polite">{toast}</div>
    </div>
  )
}

function PlayDateCard({ date, onDelete, onInvite }: { date: PlayDate; onDelete: (id:number)=>void; onInvite:()=>void }) {
  const formatted = new Intl.DateTimeFormat('de-DE', { weekday: 'short', day: '2-digit', month: 'short' }).format(new Date(date.date))
  return <article className={`date-card ${date.color}`}>
    <div className="card-top"><span className={`status ${date.status === 'Bestätigt' ? 'confirmed' : ''}`}>{date.status}</span><div className="card-actions"><Link to="/edit/$playDateId" params={{ playDateId: String(date.id) }} aria-label={`${date.title} bearbeiten`}><Edit3/></Link><button onClick={() => onDelete(date.id)} aria-label={`${date.title} löschen`}><Trash2/></button></div></div>
    <div className="date-badge"><strong>{formatted.split(' ')[1]}</strong><span>{formatted.split(' ')[2]}</span></div>
    <h3>{date.title}</h3><p className="with-line"><Users/> {date.child} & {date.friend}</p><p><Clock3/> {formatted.split(' ')[0]}, {date.time} Uhr</p><p><MapPin/> {date.location}</p><p><Gift/> {date.bring}</p>
    <button className="invite-button" onClick={onInvite}><Send/> Einladung teilen</button>
  </article>
}

function PlayDatesPage() { return <div className="page-wrap inner"><div className="page-title"><div><p className="eyebrow">Gemeinsame Zeit</p><h1>Alle PlayDates</h1></div><Link to="/new" className="primary-button"><Plus/>Neu planen</Link></div><DashboardContent /></div> }

function PlayDateForm({ editId }: { editId?: number }) {
  const navigate = useNavigate(); const stored = localStorage.getItem('playdates'); const dates: PlayDate[] = stored ? JSON.parse(stored) : initialDates
  const existing = dates.find(d => d.id === editId)
  const [form, setForm] = useState<PlayDate>(existing ?? { id: Date.now(), title: '', child: '', friend: '', date: '', time: '', location: '', bring: '', status: 'Ausstehend', color: 'mint' })
  const update = (key: keyof PlayDate, value: string) => setForm(prev => ({ ...prev, [key]: value }))
  const submit = (event: React.FormEvent) => { event.preventDefault(); const next = existing ? dates.map(d => d.id === existing.id ? form : d) : [...dates, form]; localStorage.setItem('playdates', JSON.stringify(next)); navigate({ to: '/' }) }
  return <div className="form-page"><div className="form-intro"><p className="eyebrow">{existing ? 'Pläne ändern' : 'Vorfreude beginnt hier'}</p><h1>{existing ? 'PlayDate bearbeiten' : 'Neues PlayDate planen'}</h1><p>Ein paar Details – und schon kann die Einladung raus.</p></div>
    <form onSubmit={submit} className="playdate-form">
      <label className="full">Titel<span>Wie soll euer Treffen heißen?</span><input required value={form.title} onChange={e=>update('title', e.target.value)} placeholder="z. B. Abenteuer im Stadtpark"/></label>
      <label>Dein Kind<input required value={form.child} onChange={e=>update('child', e.target.value)} placeholder="Vorname"/></label><label>Trifft sich mit<input required value={form.friend} onChange={e=>update('friend', e.target.value)} placeholder="Vorname"/></label>
      <label>Datum<input required type="date" value={form.date} onChange={e=>update('date', e.target.value)}/></label><label>Uhrzeit<input required type="time" value={form.time} onChange={e=>update('time', e.target.value)}/></label>
      <label className="full">Treffpunkt<input required value={form.location} onChange={e=>update('location', e.target.value)} placeholder="Adresse oder Lieblingsplatz"/></label>
      <label className="full">Wer bringt was mit?<textarea value={form.bring} onChange={e=>update('bring', e.target.value)} placeholder="Snacks, Getränke, Spielsachen …"/></label>
      <fieldset className="full"><legend>Erinnerung</legend><label className="check-row"><input type="checkbox" defaultChecked/> 24 Stunden vorher erinnern</label><label className="check-row"><input type="checkbox"/> Auch per E-Mail erinnern</label></fieldset>
      <div className="consent full"><Check/><p><strong>Privat geteilt</strong><br/>Details, Kommentare und Fotos sehen ausschließlich eingeladene Familien.</p></div>
      <div className="form-actions full"><Link to="/" className="secondary-button">Abbrechen</Link><button className="primary-button" type="submit"><CalendarDays/> {existing ? 'Änderungen speichern' : 'PlayDate erstellen'}</button></div>
    </form>
  </div>
}

function EditPage() { const id = Number(window.location.pathname.split('/').pop()); return <PlayDateForm editId={id}/> }
const rootRoute = createRootRoute({ component: Shell })
const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: Dashboard })
const datesRoute = createRoute({ getParentRoute: () => rootRoute, path: '/playdates', component: PlayDatesPage })
const newRoute = createRoute({ getParentRoute: () => rootRoute, path: '/new', component: () => <PlayDateForm/> })
const editRoute = createRoute({ getParentRoute: () => rootRoute, path: '/edit/$playDateId', component: EditPage })
const routeTree = rootRoute.addChildren([indexRoute, datesRoute, newRoute, editRoute])
export const router = createRouter({ routeTree })
declare module '@tanstack/react-router' { interface Register { router: typeof router } }
export default function App() { return null }

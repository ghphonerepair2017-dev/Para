from pathlib import Path

app = Path('/home/ubuntu/veiled-atlas/client/src/App.tsx')
text = app.read_text()
text = text.replace('import { useEffect, useState } from "react";', 'import { useEffect, useRef, useState } from "react";')
text = text.replace('import "./index.css";', 'import "./index.css";\n\nconst ambientAudio = "/manus-storage/veiled-atlas-ambient_752be86d.mp3";')
text = text.replace('  tags: string[];\n};', '  tags: string[];\n  slug: string;\n  location: string;\n  observed: string;\n  evidence: string;\n  detailImage: string;\n};')
text = text.replace('    tags: ["Ball lightning", "Marfa lights", "Hessdalen"],\n  },', '    tags: ["Ball lightning", "Marfa lights", "Hessdalen"],\n    slug: "luminous-events", location: "Marfa, Texas / Hessdalen, Norway", observed: "1965 — present", evidence: "Witness accounts / Instrument readings", detailImage: "/manus-storage/veiled-atlas-luminous-detail_78278cd9.jpg",\n  },')
text = text.replace('    tags: ["Close encounters", "Time slips", "Missing time"],\n  },', '    tags: ["Close encounters", "Time slips", "Missing time"],\n    slug: "anomalous-encounters", location: "The quiet places / 03:17", observed: "1976 — present", evidence: "Audio logs / Recovered diaries", detailImage: "/manus-storage/veiled-atlas-encounter-detail_56b69c02.jpg",\n  },')
text = text.replace('    tags: ["Liminal spaces", "Dream archives", "Folk memory"],\n  },', '    tags: ["Liminal spaces", "Dream archives", "Folk memory"],\n    slug: "threshold-lore", location: "The old road / Beyond the gate", observed: "Before memory — present", evidence: "Oral tradition / Place memory", detailImage: "/manus-storage/veiled-atlas-threshold-detail_be2cd2e9.jpg",\n  },')
text = text.replace('function App() {\n  const [menuOpen, setMenuOpen] = useState(false);\n  const [joined, setJoined] = useState(false);\n  const [activeSection, setActiveSection] = useState("index");', '''function CaseStudy({ item, onBack, onOpen }: { item: Phenomenon; onBack: () => void; onOpen: (slug: string) => void }) {
  return <div className="case-study-page">
    <div className="case-study-hero" style={{ backgroundImage: `url(${item.detailImage})` }}><div className="case-study-hero__veil" /><div className="container case-study-hero__inner">
      <button className="back-link" onClick={onBack}><ArrowDownRight size={15} /> Return to the index</button>
      <div className="case-study-hero__meta"><span>Case file {item.number}</span><span>{item.kicker}</span></div>
      <p className="eyebrow">Field report / {item.observed}</p><h1>{item.title}</h1><p className="case-study-hero__dek">{item.description} The record is incomplete by design.</p>
    </div></div>
    <div className="case-study-body container">
      <div className="case-study-sidebar"><span className="mono-label">Archive coordinates</span><strong>{item.location}</strong><span className="mono-label">Evidence class</span><strong>{item.evidence}</strong><span className="case-study-sidebar__signal"><i /> Signal stable</span></div>
      <article className="case-study-copy"><p className="lead-copy">Some phenomena arrive as a flash of light. Others are slower: a recurring shape in the corner of a photograph, a local story that changes only when you ask it twice, a room that refuses to remain the same room.</p><h2>A working theory<br /><em>is still a question.</em></h2><p>We approach {item.title.toLowerCase()} as a layered record rather than a solved problem. Eyewitness testimony, environmental conditions, historical context, and the texture of the place all matter. No single lens gets to own the story.</p><blockquote>“The most useful map is the one that admits where it ends.”<cite>— V.A. field protocol / 01</cite></blockquote><div className="case-study-data"><div><span>01</span><strong>What is reported</strong><p>Recurring observations made by people who did not know one another, separated by distance but linked by the same detail.</p></div><div><span>02</span><strong>What remains unclear</strong><p>The gap between a pattern and a coincidence—the part that keeps this file open.</p></div></div><button className="outline-button" onClick={() => onOpen(item.slug === "luminous-events" ? "anomalous-encounters" : item.slug === "anomalous-encounters" ? "threshold-lore" : "luminous-events")}>Open the next file <ArrowUpRight size={16} /></button></article>
    </div>
  </div>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [joined, setJoined] = useState(false);
  const [activeSection, setActiveSection] = useState("index");
  const [nightMode, setNightMode] = useState(() => localStorage.getItem("va-night-mode") === "true");
  const [ambientOn, setAmbientOn] = useState(false);
  const [caseSlug, setCaseSlug] = useState(() => window.location.pathname.startsWith("/case/") ? window.location.pathname.replace("/case/", "") : "");
  const audioRef = useRef<HTMLAudioElement | null>(null);''')
text = text.replace('    const ids = ["index", "phenomena", "chronicles", "field-notes"];', '''    const ids = ["index", "phenomena", "chronicles", "field-notes"];
    localStorage.setItem("va-night-mode", String(nightMode));''')
text = text.replace('  }, []);', '  }, [nightMode]);', 1)
text = text.replace('  const scrollTo = (id: string) => {', '''  const openCase = (slug: string) => { window.history.pushState({}, "", `/case/${slug}`); setCaseSlug(slug); window.scrollTo({ top: 0, behavior: "smooth" }); setMenuOpen(false); };
  const closeCase = () => { window.history.pushState({}, "", "/"); setCaseSlug(""); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const toggleAmbient = () => {
    if (!audioRef.current) { audioRef.current = new Audio(ambientAudio); audioRef.current.loop = true; audioRef.current.volume = 0.22; }
    if (ambientOn) { audioRef.current.pause(); setAmbientOn(false); } else { audioRef.current.play().then(() => setAmbientOn(true)).catch(() => setAmbientOn(false)); }
  };

  const scrollTo = (id: string) => {''')
text = text.replace('    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });', '    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });')
text = text.replace('    setMenuOpen(false);\n  };\n\n  return (\n    <div className="site-shell">', '''    setMenuOpen(false);
  };

  useEffect(() => { const onPop = () => setCaseSlug(window.location.pathname.startsWith("/case/") ? window.location.pathname.replace("/case/", "") : ""); window.addEventListener("popstate", onPop); return () => window.removeEventListener("popstate", onPop); }, []);

  if (caseSlug) {
    const item = phenomena.find((entry) => entry.slug === caseSlug) || phenomena[0];
    return <div className={`site-shell ${nightMode ? "night-mode" : ""}`}><div className="grain" aria-hidden="true" /><header className="topbar case-study-topbar"><button className="brand-lockup" onClick={closeCase}><span className="brand-mark"><Aperture size={15} strokeWidth={1.7} /></span><span className="brand-name">Veiled Atlas</span><span className="brand-edition">Case archive</span></button><div className="topbar-actions"><button className={`audio-toggle ${ambientOn ? "audio-toggle--on" : ""}`} onClick={toggleAmbient}><span className="audio-bars"><i /><i /><i /><i /></span>{ambientOn ? "Sound on" : "Sound off"}</button><button className={`night-toggle ${nightMode ? "night-toggle--on" : ""}`} onClick={() => setNightMode((value) => !value)}><span>{nightMode ? "Night" : "Day"}</span><i /></button></div></header><CaseStudy item={item} onBack={closeCase} onOpen={openCase} /></div>;
  }

  return (
    <div className={`site-shell ${nightMode ? "night-mode" : ""}`}>''')
text = text.replace('<button className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label="Open navigation">', '<button className={`audio-toggle ${ambientOn ? "audio-toggle--on" : ""}`} onClick={toggleAmbient}><span className="audio-bars"><i /><i /><i /><i /></span>{ambientOn ? "Sound on" : "Sound off"}</button><button className={`night-toggle ${nightMode ? "night-toggle--on" : ""}`} onClick={() => setNightMode((value) => !value)}><span>{nightMode ? "Night" : "Day"}</span><i /></button><button className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label="Open navigation">')
text = text.replace('<button className="card-arrow" aria-label={`Open ${item.title}`} onClick={() => setJoined(true)}>', '<button className="card-arrow" aria-label={`Open ${item.title}`} onClick={() => openCase(item.slug)}>')
app.write_text(text)

css = Path('/home/ubuntu/veiled-atlas/client/src/index.css')
styles = css.read_text()
styles += r'''

/* Case study routes, listening control, and day/night atmosphere */
.audio-toggle, .night-toggle { display: inline-flex; align-items: center; gap: 8px; color: #a9acb5; font: 9px var(--mono); text-transform: uppercase; letter-spacing: .1em; }
.audio-toggle:hover, .night-toggle:hover { color: var(--cyan); }
.audio-bars { display: flex; align-items: center; gap: 2px; height: 14px; }
.audio-bars i { width: 2px; height: 5px; background: currentColor; display: block; transition: height .2s var(--ease); }
.audio-toggle--on .audio-bars i:nth-child(1) { height: 11px; animation: audio-wave .75s ease-in-out infinite alternate; }
.audio-toggle--on .audio-bars i:nth-child(2) { height: 7px; animation: audio-wave .6s .1s ease-in-out infinite alternate; }
.audio-toggle--on .audio-bars i:nth-child(3) { height: 13px; animation: audio-wave .9s .2s ease-in-out infinite alternate; }
.audio-toggle--on .audio-bars i:nth-child(4) { height: 8px; animation: audio-wave .65s .3s ease-in-out infinite alternate; }
.night-toggle i { width: 26px; height: 14px; position: relative; display: inline-block; border: 1px solid #777b86; border-radius: 99px; }
.night-toggle i::after { content: ""; position: absolute; left: 2px; top: 2px; width: 8px; height: 8px; border-radius: 50%; background: #777b86; transition: transform .25s var(--ease), background .25s; }
.night-toggle--on i::after { transform: translateX(12px); background: var(--violet); }
.night-mode .phenomena-section { background: #171925; color: var(--paper); }
.night-mode .chronicles-section { background: #131722; color: var(--paper); }
.night-mode .chronicles-copy .section-label, .night-mode .chronicles-copy > p { color: #9b9eaa; }
.night-mode .outline-button { color: var(--paper); border-color: rgba(241,238,231,.5); }
.night-mode .outline-button:hover { color: var(--ink); background: var(--paper); }
.night-mode .section-header__line { background: #777b86; }
.night-mode .case-file { box-shadow: 17px 18px 0 #242938; }

.case-study-page { background: #ede8df; color: var(--ink); }
.case-study-hero { position: relative; min-height: 680px; background-position: center; background-size: cover; display: flex; align-items: flex-end; overflow: hidden; }
.case-study-hero__veil { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(7,10,16,.9), rgba(7,10,16,.28) 68%), linear-gradient(0deg, rgba(7,10,16,.85), transparent 60%); }
.case-study-hero__inner { position: relative; z-index: 1; padding-bottom: 68px; }
.back-link { display: inline-flex; align-items: center; gap: 8px; margin-bottom: 80px; color: var(--cyan); font: 10px var(--mono); text-transform: uppercase; letter-spacing: .1em; }
.back-link svg { transform: rotate(45deg); }
.case-study-hero__meta { position: absolute; right: 0; top: 120px; display: flex; gap: 24px; color: #c2c5ce; font: 10px var(--mono); text-transform: uppercase; letter-spacing: .12em; }
.case-study-hero .eyebrow { margin-bottom: 17px; color: var(--cyan); }
.case-study-hero h1 { max-width: 800px; margin-bottom: 22px; color: var(--paper); font-size: clamp(60px, 9vw, 126px); }
.case-study-hero__dek { max-width: 420px; margin-bottom: 0; color: #bfc2ca; font-size: 16px; line-height: 1.55; }
.case-study-body { display: grid; grid-template-columns: .45fr 1fr; gap: 11%; padding-top: 120px; padding-bottom: 140px; }
.case-study-sidebar { display: flex; flex-direction: column; align-items: flex-start; gap: 12px; padding-top: 9px; }
.case-study-sidebar .mono-label { margin-top: 18px; color: #8a8790; }
.case-study-sidebar strong { max-width: 180px; color: #343139; font: 16px var(--display); line-height: 1.18; }
.case-study-sidebar__signal { display: inline-flex; align-items: center; gap: 8px; margin-top: 28px; color: #6f958d; font: 10px var(--mono); text-transform: uppercase; letter-spacing: .1em; }
.case-study-sidebar__signal i { width: 5px; height: 5px; background: #6f958d; border-radius: 50%; box-shadow: 0 0 0 5px rgba(111,149,141,.12); }
.case-study-copy { max-width: 720px; }
.case-study-copy .lead-copy { margin-bottom: 70px; color: #343139; font-size: 26px; line-height: 1.28; }
.case-study-copy h2 { margin-bottom: 30px; font-size: clamp(47px, 6vw, 75px); line-height: .94; letter-spacing: -.055em; }
.case-study-copy h2 em { color: #805dc4; }
.case-study-copy > p:not(.lead-copy) { max-width: 560px; margin-bottom: 40px; color: #6a676e; font-size: 16px; line-height: 1.7; }
.case-study-copy blockquote { margin: 60px 0 72px; padding: 22px 0 22px 25px; border-left: 1px solid #805dc4; color: #343139; font: 28px var(--display); font-style: italic; line-height: 1.22; }
.case-study-copy blockquote cite { display: block; margin-top: 17px; color: #89858c; font: 10px var(--mono); font-style: normal; text-transform: uppercase; letter-spacing: .1em; }
.case-study-data { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; margin-bottom: 48px; padding-top: 29px; border-top: 1px solid rgba(10,12,18,.2); }
.case-study-data div { display: flex; flex-direction: column; gap: 9px; }
.case-study-data span { color: #805dc4; font: 11px var(--mono); }
.case-study-data strong { color: #343139; font: 20px var(--display); }
.case-study-data p { margin: 0; color: #7e7a81; font-size: 13px; line-height: 1.55; }
.case-study-topbar { background: rgba(10,12,18,.88); }
@keyframes audio-wave { from { transform: scaleY(.55); } to { transform: scaleY(1.25); } }

@media (max-width: 900px) {
  .topbar .audio-toggle, .topbar .night-toggle { display: none; }
  .case-study-hero__meta { right: 24px; top: 135px; flex-direction: column; gap: 8px; align-items: flex-end; }
  .case-study-body { grid-template-columns: 1fr; gap: 55px; }
  .case-study-sidebar { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 30px; }
  .case-study-sidebar .mono-label { margin-top: 0; }
  .case-study-sidebar__signal { grid-column: span 2; margin-top: 12px; }
}
@media (max-width: 560px) {
  .case-study-hero { min-height: 650px; }
  .case-study-hero__inner { padding-bottom: 45px; }
  .back-link { margin-bottom: 90px; }
  .case-study-hero h1 { font-size: 58px; }
  .case-study-body { padding-top: 75px; padding-bottom: 90px; }
  .case-study-copy .lead-copy { margin-bottom: 55px; font-size: 21px; }
  .case-study-copy blockquote { margin: 45px 0 55px; font-size: 24px; }
  .case-study-data { grid-template-columns: 1fr; }
}
'''
css.write_text(styles)

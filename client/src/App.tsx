import { useEffect, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Aperture,
  CircleDashed,
  Compass,
  Instagram,
  Menu,
  Play,
  Search,
  X,
} from "lucide-react";
import "./index.css";

const basePath = import.meta.env.BASE_URL;
const asset = (name: string) => `${basePath}assets/${name}`;
const ambientAudio = asset("veiled-atlas-ambient_752be86d.mp3");

const heroImage = asset("veiled-atlas-hero_2fde47a2.jpg");
const archiveImage = asset("veiled-atlas-archive_f7a846b3.jpg");
const lightsImage = asset("veiled-atlas-lights_bb5a1ad1.jpg");

type Phenomenon = {
  number: string;
  title: string;
  kicker: string;
  description: string;
  image?: string;
  className: string;
  accent: string;
  tags: string[];
  slug: string;
  location: string;
  observed: string;
  evidence: string;
  detailImage: string;
};

const phenomena: Phenomenon[] = [
  {
    number: "01",
    title: "Luminous Events",
    kicker: "Atmospheric / Unresolved",
    description:
      "Lights with no source. Spheres that hover, pulse, and vanish. The sky keeps its own ledger.",
    image: lightsImage,
    className: "phenomenon-card--wide",
    accent: "#aee9df",
    tags: ["Ball lightning", "Marfa lights", "Hessdalen"],
    slug: "luminous-events", location: "Marfa, Texas / Hessdalen, Norway", observed: "1965 — present", evidence: "Witness accounts / Instrument readings", detailImage: asset("veiled-atlas-luminous-detail_78278cd9.jpg"),
  },
  {
    number: "02",
    title: "Anomalous Encounters",
    kicker: "Witness / Pattern",
    description:
      "The moments that fracture a normal evening—shared by strangers, repeated across decades.",
    className: "phenomenon-card--dark",
    accent: "#d7b7ff",
    tags: ["Close encounters", "Time slips", "Missing time"],
    slug: "anomalous-encounters", location: "The quiet places / 03:17", observed: "1976 — present", evidence: "Audio logs / Recovered diaries", detailImage: asset("veiled-atlas-encounter-detail_56b69c02.jpg"),
  },
  {
    number: "03",
    title: "Threshold Lore",
    kicker: "Ritual / Memory",
    description:
      "Old stories survive because they know where the door is. We map the places they left behind.",
    image: archiveImage,
    className: "phenomenon-card--archive",
    accent: "#eab889",
    tags: ["Liminal spaces", "Dream archives", "Folk memory"],
    slug: "threshold-lore", location: "The old road / Beyond the gate", observed: "Before memory — present", evidence: "Oral tradition / Place memory", detailImage: asset("veiled-atlas-threshold-detail_be2cd2e9.jpg"),
  },
];

function CaseStudy({ item, onBack, onOpen }: { item: Phenomenon; onBack: () => void; onOpen: (slug: string) => void }) {
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
  const [caseSlug, setCaseSlug] = useState(() => window.location.pathname.match(/\/case\/([^/]+)/)?.[1] ?? "");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const ids = ["index", "phenomena", "chronicles", "field-notes"];
    localStorage.setItem("va-night-mode", String(nightMode));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [nightMode]);

  const openCase = (slug: string) => { window.history.pushState({}, "", `${basePath}case/${slug}`); setCaseSlug(slug); window.scrollTo({ top: 0, behavior: "smooth" }); setMenuOpen(false); };
  const closeCase = () => { window.history.pushState({}, "", basePath); setCaseSlug(""); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const toggleAmbient = () => {
    if (!audioRef.current) { audioRef.current = new Audio(ambientAudio); audioRef.current.loop = true; audioRef.current.volume = 0.22; }
    if (ambientOn) { audioRef.current.pause(); setAmbientOn(false); } else { audioRef.current.play().then(() => setAmbientOn(true)).catch(() => setAmbientOn(false)); }
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  useEffect(() => { const onPop = () => setCaseSlug(window.location.pathname.match(/\/case\/([^/]+)/)?.[1] ?? ""); window.addEventListener("popstate", onPop); return () => window.removeEventListener("popstate", onPop); }, []);

  if (caseSlug) {
    const item = phenomena.find((entry) => entry.slug === caseSlug) || phenomena[0];
    return <div className={`site-shell ${nightMode ? "night-mode" : ""}`}><div className="grain" aria-hidden="true" /><header className="topbar case-study-topbar"><button className="brand-lockup" onClick={closeCase}><span className="brand-mark"><Aperture size={15} strokeWidth={1.7} /></span><span className="brand-name">Veiled Atlas</span><span className="brand-edition">Case archive</span></button><div className="topbar-actions"><button className={`audio-toggle ${ambientOn ? "audio-toggle--on" : ""}`} onClick={toggleAmbient}><span className="audio-bars"><i /><i /><i /><i /></span>{ambientOn ? "Sound on" : "Sound off"}</button><button className={`night-toggle ${nightMode ? "night-toggle--on" : ""}`} onClick={() => setNightMode((value) => !value)}><span>{nightMode ? "Night" : "Day"}</span><i /></button></div></header><CaseStudy item={item} onBack={closeCase} onOpen={openCase} /></div>;
  }

  return (
    <div className={`site-shell ${nightMode ? "night-mode" : ""}`}>
      <div className="grain" aria-hidden="true" />
      <header className={`topbar ${menuOpen ? "topbar--menu-open" : ""}`}>
        <button className="brand-lockup" onClick={() => scrollTo("index")} aria-label="Return to top">
          <span className="brand-mark"><Aperture size={15} strokeWidth={1.7} /></span>
          <span className="brand-name">Veiled Atlas</span>
          <span className="brand-edition">Vol. 01 / 2026</span>
        </button>
        <nav className="desktop-nav" aria-label="Main navigation">
          {["index", "phenomena", "chronicles", "field-notes"].map((id, index) => (
            <button key={id} className={activeSection === id ? "nav-link nav-link--active" : "nav-link"} onClick={() => scrollTo(id)}>
              <span>0{index + 1}</span>{id.replace("-", " ")}
            </button>
          ))}
        </nav>
        <div className="topbar-actions">
          <button className="icon-button" aria-label="Search the atlas"><Search size={17} /></button>
          <button className={`audio-toggle ${ambientOn ? "audio-toggle--on" : ""}`} onClick={toggleAmbient}><span className="audio-bars"><i /><i /><i /><i /></span>{ambientOn ? "Sound on" : "Sound off"}</button><button className={`night-toggle ${nightMode ? "night-toggle--on" : ""}`} onClick={() => setNightMode((value) => !value)}><span>{nightMode ? "Night" : "Day"}</span><i /></button><button className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label="Open navigation">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
            <span>Menu</span>
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-label="Navigation menu">
          <p className="mono-label">Navigate the archive</p>
          {["index", "phenomena", "chronicles", "field-notes"].map((id, index) => (
            <button key={id} onClick={() => scrollTo(id)}><span>0{index + 1}</span>{id.replace("-", " ")}<ArrowUpRight size={20} /></button>
          ))}
          <div className="mobile-menu__footer"><span>Observatory signal</span><span className="signal-live"><i /> live</span></div><div className="mobile-menu__controls"><button onClick={toggleAmbient}><span className="audio-bars"><i /><i /><i /><i /></span>{ambientOn ? "Sound on" : "Sound off"}</button><button onClick={() => setNightMode((value) => !value)}><span className="mobile-menu__toggle" />{nightMode ? "Night mode" : "Day mode"}</button></div>
        </div>
      )}

      <aside className="progress-rail" aria-hidden="true">
        <span className="progress-rail__line" />
        <span className="progress-rail__label">Scroll to investigate</span>
        <span className="progress-rail__count">{activeSection === "index" ? "01" : activeSection === "phenomena" ? "02" : activeSection === "chronicles" ? "03" : "04"} / 04</span>
      </aside>

      <main>
        <section id="index" className="hero-section">
          <div className="hero-image" style={{ backgroundImage: `url(${heroImage})` }} />
          <div className="hero-vignette" />
          <div className="hero-orbit hero-orbit--one" />
          <div className="hero-orbit hero-orbit--two" />
          <div className="hero-content container">
            <div className="hero-kicker reveal reveal--delay-1"><span className="kicker-line" /> A field guide to the unexplained</div>
            <div className="hero-copy reveal reveal--delay-2">
              <p className="hero-overline">There are more things in the world</p>
              <h1>What we can’t<br /><em>name</em> yet.</h1>
              <p className="hero-dek">An evolving archive of strange lights, impossible encounters, and the stories that refuse to disappear.</p>
            </div>
            <div className="hero-footer reveal reveal--delay-3">
              <button className="circle-cta" onClick={() => scrollTo("phenomena")} aria-label="Explore phenomena"><ArrowDownRight size={24} /></button>
              <div className="hero-note"><span>Coordinates</span><strong>68° 09' N, 13° 37' E</strong><small>Somewhere beyond the known</small></div>
              <button className="listen-cta" onClick={() => setJoined(true)}><span className="listen-cta__icon"><Play size={12} fill="currentColor" /></span><span>{joined ? "Signal received" : "Enter the index"}</span><ArrowUpRight size={15} /></button>
            </div>
          </div>
          <div className="hero-side-note">V.A. / Observational Index<br />Nothing here is proven.<br /><span>That is the point.</span></div>
        </section>

        <div className="signal-strip" aria-label="Live signal">
          <div className="signal-strip__inner">
            <span className="signal-live"><i /> Observatory signal</span><span>Case files open</span><span>46.2° N / 70.9° W</span><span>Atmospheric anomaly detected</span><span>•••</span><span className="signal-live"><i /> Observatory signal</span><span>Case files open</span><span>46.2° N / 70.9° W</span><span>Atmospheric anomaly detected</span>
          </div>
        </div>

        <section id="phenomena" className="intro-section container section-pad">
          <div className="section-label"><span>01</span><span className="label-rule" /><span>Why the archive exists</span></div>
          <div className="intro-grid">
            <div className="intro-heading reveal-on-scroll"><p className="eyebrow">A rational curiosity</p><h2>Wonder is not<br /><em>a weakness.</em></h2></div>
            <div className="intro-body reveal-on-scroll"><p className="lead-copy">The supernatural is not a single belief system. It is a borderland—a place where perception, memory, physics, and folklore overlap.</p><p>Veiled Atlas collects the stories at that edge without flattening them into answers. We look for patterns, hold space for doubt, and leave the door open for the impossible.</p><button className="text-link" onClick={() => scrollTo("chronicles")}>Read our methodology <ArrowUpRight size={15} /></button></div>
          </div>
        </section>

        <section className="phenomena-section section-pad">
          <div className="container">
            <div className="section-header"><div><p className="eyebrow">The index / 001—003</p><h2>Choose your <em>threshold.</em></h2></div><div className="section-header__aside"><span className="mono-label">Curated entries</span><span className="section-header__line" /><span className="mono-label">Updated nightly</span></div></div>
            <div className="phenomena-grid">
              {phenomena.map((item) => <article key={item.number} className={`phenomenon-card ${item.className}`} style={{ "--accent": item.accent } as React.CSSProperties}>
                {item.image && <div className="phenomenon-card__image" style={{ backgroundImage: `url(${item.image})` }} />}
                <div className="phenomenon-card__veil" />
                <div className="phenomenon-card__top"><span className="card-number">{item.number}</span><span className="card-kicker">{item.kicker}</span></div>
                <div className="phenomenon-card__content"><div className="card-icon"><CircleDashed size={25} strokeWidth={1.1} /></div><h3>{item.title}</h3><p>{item.description}</p><div className="tag-row">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
                <button className="card-arrow" aria-label={`Open ${item.title}`} onClick={() => openCase(item.slug)}><ArrowUpRight size={21} /></button>
              </article>)}
            </div>
          </div>
        </section>

        <section id="chronicles" className="chronicles-section section-pad">
          <div className="container">
            <div className="chronicles-grid">
              <div className="chronicles-copy"><div className="section-label"><span>02</span><span className="label-rule" /><span>From the chronicles</span></div><h2>Every era<br />has its <em>ghosts.</em></h2><p>From 18th-century sky watchers to signal hunters in the high desert, the same questions keep returning.</p><button className="outline-button" onClick={() => setJoined(true)}>Open case files <ArrowUpRight size={16} /></button></div>
              <div className="case-file"><div className="case-file__image" style={{ backgroundImage: `url(${archiveImage})` }} /><div className="case-file__overlay" /><div className="case-file__stamp">CASE<br />FILE<br /><strong>009</strong></div><div className="case-file__caption"><span>North Atlantic / 1976</span><strong>The signal beneath the static</strong></div></div>
            </div>
          </div>
        </section>

        <section id="field-notes" className="field-notes-section section-pad">
          <div className="star-grid" aria-hidden="true"><span /><span /><span /><span /><span /><span /><span /><span /><span /></div>
          <div className="container field-notes-inner"><div className="section-label"><span>03</span><span className="label-rule" /><span>Field notes / Dispatches</span></div><div className="field-notes-copy"><h2>Stay curious.<br /><em>Stay skeptical.</em></h2><p>One quiet dispatch each month. New cases, old rituals, and the questions hiding in plain sight.</p><form onSubmit={(event) => { event.preventDefault(); setJoined(true); }} className="signup-form"><label htmlFor="email">Your signal address</label><div className="signup-form__row"><input id="email" type="email" placeholder="you@somewhere.com" required /><button type="submit">{joined ? "Received" : "Subscribe"}<ArrowUpRight size={16} /></button></div></form></div><div className="field-notes-meta"><span>V.A. 2026</span><span>Independent / Unaffiliated</span><span>Made for the in-between</span></div></div>
        </section>
      </main>

      <footer className="site-footer"><div className="container footer-grid"><div className="footer-brand"><span className="brand-mark"><Aperture size={15} strokeWidth={1.7} /></span><span>Veiled Atlas</span><p>Documenting the edge of what is known.</p></div><div className="footer-links"><div><span className="mono-label">Explore</span><button onClick={() => scrollTo("phenomena")}>The index</button><button onClick={() => scrollTo("chronicles")}>Chronicles</button></div><div><span className="mono-label">Elsewhere</span><button onClick={() => setJoined(true)}>Field notes</button><a href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram <Instagram size={13} /></a></div></div><div className="footer-end"><Compass size={20} /><span>Keep looking up.</span></div></div><div className="container footer-bottom"><span>© 2026 Veiled Atlas</span><span>All signals reserved</span><span>↑ back to top</span></div></footer>
    </div>
  );
}

export default App;


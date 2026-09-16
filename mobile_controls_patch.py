from pathlib import Path
p = Path('/home/ubuntu/veiled-atlas/client/src/App.tsx')
s = p.read_text()
needle = '<div className="mobile-menu__footer"><span>Observatory signal</span><span className="signal-live"><i /> live</span></div>'
replacement = needle + '<div className="mobile-menu__controls"><button onClick={toggleAmbient}><span className="audio-bars"><i /><i /><i /><i /></span>{ambientOn ? "Sound on" : "Sound off"}</button><button onClick={() => setNightMode((value) => !value)}><span className="mobile-menu__toggle" />{nightMode ? "Night mode" : "Day mode"}</button></div>'
s = s.replace(needle, replacement)
p.write_text(s)
css = Path('/home/ubuntu/veiled-atlas/client/src/index.css')
styles = css.read_text()
styles += '\n.mobile-menu__controls { display: flex; gap: 16px; padding-top: 22px; }\n.mobile-menu__controls button { width: auto; display: inline-flex; align-items: center; gap: 8px; padding: 0; border: 0; color: #9b9da6; font: 9px var(--mono); text-transform: uppercase; letter-spacing: .08em; }\n.mobile-menu__controls button:hover { color: var(--cyan); }\n.mobile-menu__toggle { width: 24px; height: 13px; display: inline-block; border: 1px solid #777b86; border-radius: 99px; position: relative; }\n.mobile-menu__toggle::after { content: ""; width: 7px; height: 7px; position: absolute; top: 2px; left: 2px; border-radius: 50%; background: #777b86; }\n.night-mode .mobile-menu__toggle::after { transform: translateX(10px); background: var(--violet); }\n'
css.write_text(styles)

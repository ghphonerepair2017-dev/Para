from pathlib import Path
app = Path('/home/ubuntu/veiled-atlas/client/src/App.tsx')
text = app.read_text()
text = text.replace('  BookOpen,\n', '').replace('  ChevronDown,\n', '').replace('  Eye,\n', '').replace('  Radio,\n', '').replace('  Sparkles,\n', '')
start = text.find('\nvoid BookOpen;')
if start != -1:
    text = text[:start] + '\n'
app.write_text(text)
css = Path('/home/ubuntu/veiled-atlas/client/src/index.css')
styles = css.read_text().replace('\n@keyframes _unused { from { opacity: 1; } to { opacity: 1; } }\n', '\n')
css.write_text(styles)

/* ===== NAVBAR ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 20));

/* ===== HAMBURGER ===== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

/* ===== COPY BUTTONS ===== */
function copyText(text, btn) {
  navigator.clipboard.writeText(text).catch(() => {
    const ta = Object.assign(document.createElement('textarea'), { value: text, style: 'position:fixed;opacity:0' });
    document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
  });
  const orig = btn.innerHTML;
  btn.innerHTML = '✓ Copied!'; btn.classList.add('copied');
  setTimeout(() => { btn.innerHTML = orig; btn.classList.remove('copied'); }, 2000);
}
document.querySelectorAll('.copy-btn[data-clipboard]').forEach(btn =>
  btn.addEventListener('click', () => copyText(btn.dataset.clipboard, btn)));
document.querySelectorAll('.copy-icon-btn[data-target]').forEach(btn =>
  btn.addEventListener('click', () => {
    const el = document.getElementById(btn.dataset.target);
    if (el) copyText(el.textContent.trim(), btn);
  }));

/* ===== RESPONSE TOGGLES ===== */
document.querySelectorAll('.toggle-response').forEach(btn => {
  btn.addEventListener('click', () => {
    const body = btn.closest('.response-block').querySelector('.response-body');
    const hidden = body.classList.toggle('hidden');
    btn.textContent = hidden ? 'Show' : 'Hide';
  });
});

/* ===== SIDEBAR ACTIVE LINK ===== */
const sidebarLinks = document.querySelectorAll('.sidebar-link');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting)
      sidebarLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
  });
}, { rootMargin: '-64px 0px -70% 0px' });
document.querySelectorAll('[id]').forEach(s => io.observe(s));

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(a =>
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  }));

/* ===== ENTRANCE ANIMATIONS ===== */
const aio = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)';
      aio.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.feature-card, .doc-section, .demo-layout').forEach(el => {
  el.style.cssText += 'opacity:0;transform:translateY(22px);transition:opacity .55s ease,transform .55s ease';
  aio.observe(el);
});

/* ===== TERMINAL TYPEWRITER ===== */
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function typeLines(container, lines, baseDelay = 28) {
  container.innerHTML = '';
  for (const line of lines) {
    const span = document.createElement('span');
    span.className = 't-line ' + (line.cls || '');
    container.appendChild(span);
    if (line.instant) {
      span.innerHTML = line.html || line.text || '';
    } else {
      const raw = line.text || '';
      for (let i = 0; i < raw.length; i++) {
        span.textContent += raw[i];
        if (line.typing !== false) await sleep(baseDelay);
      }
      if (line.html) span.innerHTML = line.html;
    }
    container.appendChild(document.createElement('br'));
    container.scrollTop = container.scrollHeight;
    if (line.pause) await sleep(line.pause);
  }
}

/* ===== HERO TERMINAL ===== */
const heroTerminalEl = document.getElementById('heroTerminal');
async function runHeroTerminal() {
  await typeLines(heroTerminalEl, [
    { text: '$ python demo.py', cls: 't-prompt', pause: 400 },
    { text: '', pause: 200 },
    { html: '<span class="t-comment"># Search for songs asynchronously</span>', instant: true, pause: 200 },
    { html: '<span class="t-key">from</span> <span class="t-str">SaavnAPI</span> <span class="t-key">import</span> SaavnClient', instant: true, pause: 150 },
    { text: '', pause: 100 },
    { html: '<span class="t-key">async with</span> SaavnClient() <span class="t-key">as</span> client:', instant: true, pause: 150 },
    { html: '    songs = <span class="t-key">await</span> client.search_songs(<span class="t-str">"Kesariya"</span>)', instant: true, pause: 600 },
    { text: '', pause: 100 },
    { html: '<span class="t-muted">⚡ Connecting to JioSaavn...</span>', instant: true, pause: 700 },
    { html: '<span class="t-success">✓ Found 10 results</span>', instant: true, pause: 300 },
    { text: '', pause: 100 },
    { html: '<span class="t-key">"id"</span>: <span class="t-str">"5RRfG8XP"</span>', instant: true, pause: 60 },
    { html: '<span class="t-key">"title"</span>: <span class="t-str">"Kesariya"</span>', instant: true, pause: 60 },
    { html: '<span class="t-key">"artist"</span>: <span class="t-str">"Arijit Singh"</span>', instant: true, pause: 60 },
    { html: '<span class="t-key">"album"</span>: <span class="t-str">"Brahmastra"</span>', instant: true, pause: 60 },
    { html: '<span class="t-key">"quality"</span>: <span class="t-str">"320kbps"</span>', instant: true, pause: 60 },
    { html: '<span class="t-key">"download_url"</span>: <span class="t-url">"https://aac.saavncdn.com/..."</span>', instant: true, pause: 200 },
    { text: '', pause: 100 },
    { html: '<span class="t-success">✓ Done in 0.38s</span><span class="t-cursor"></span>', instant: true },
  ], 22);
}
runHeroTerminal();

/* ===== DEMO DATA ===== */
const demos = {
  search: {
    lang: 'python',
    code: `import asyncio
from SaavnAPI import SaavnClient

async def main():
    async with SaavnClient() as client:
        songs = await client.search_songs("Tum Hi Ho", limit=3)
        for song in songs:
            print(f"{song.title} - {song.artist}")
            print(f"  Quality : {song.quality}")
            print(f"  URL     : {song.download_url}")

asyncio.run(main())`,
    output: [
      { html: '<span class="t-prompt">$</span> <span class="t-cmd">python search.py</span>', instant: true, pause: 500 },
      { html: '<span class="t-muted">⚡ Searching JioSaavn for "Tum Hi Ho"...</span>', instant: true, pause: 900 },
      { html: '<span class="t-success">✓ 3 results found</span>', instant: true, pause: 300 },
      { text: '', pause: 100 },
      { html: '<span class="t-str">Tum Hi Ho</span> - <span class="t-key">Arijit Singh</span>', instant: true, pause: 80 },
      { html: '  Quality : <span class="t-num">320kbps</span>', instant: true, pause: 80 },
      { html: '  URL     : <span class="t-url">https://aac.saavncdn.com/297/...</span>', instant: true, pause: 200 },
      { html: '<span class="t-str">Tum Hi Ho (Reprise)</span> - <span class="t-key">Arijit Singh</span>', instant: true, pause: 80 },
      { html: '  Quality : <span class="t-num">320kbps</span>', instant: true, pause: 80 },
      { html: '  URL     : <span class="t-url">https://aac.saavncdn.com/297/...</span>', instant: true, pause: 200 },
      { html: '<span class="t-str">Tum Hi Ho (Live)</span> - <span class="t-key">Arijit Singh</span>', instant: true, pause: 80 },
      { html: '  Quality : <span class="t-num">320kbps</span>', instant: true, pause: 80 },
      { html: '  URL     : <span class="t-url">https://aac.saavncdn.com/297/...</span>', instant: true, pause: 250 },
      { html: '<span class="t-muted">✓ Completed in 0.41s</span><span class="t-cursor"></span>', instant: true },
    ]
  },
  lyrics: {
    lang: 'python',
    code: `import asyncio
from SaavnAPI import SaavnClient

async def main():
    async with SaavnClient() as client:
        results = await client.search_songs("Tum Hi Ho", limit=1)
        if results:
            lyrics = await client.get_lyrics(results[0].id)
            print(f"🎵 {results[0].title}")
            print("-" * 35)
            print(lyrics[:200])

asyncio.run(main())`,
    output: [
      { html: '<span class="t-prompt">$</span> <span class="t-cmd">python lyrics.py</span>', instant: true, pause: 500 },
      { html: '<span class="t-muted">⚡ Fetching lyrics for "Tum Hi Ho"...</span>', instant: true, pause: 1000 },
      { html: '<span class="t-success">✓ Lyrics found</span>', instant: true, pause: 300 },
      { text: '', pause: 100 },
      { html: '🎵 <span class="t-str">Tum Hi Ho</span>', instant: true, pause: 150 },
      { html: '-----------------------------------', instant: true, pause: 100 },
      { html: '<span class="t-val">Hum tere bin ab reh nahi sakte</span>', instant: true, pause: 80 },
      { html: '<span class="t-val">Tere bina kya wajood mera</span>', instant: true, pause: 80 },
      { html: '<span class="t-val">Tujhse juda gar ho jaayenge</span>', instant: true, pause: 80 },
      { html: '<span class="t-val">Toh khud se hi ho jaayenge judaa...</span>', instant: true, pause: 300 },
      { html: '<span class="t-muted">✓ Completed in 0.29s</span><span class="t-cursor"></span>', instant: true },
    ]
  },
  album: {
    lang: 'python',
    code: `import asyncio
from SaavnAPI import SaavnClient

async def main():
    async with SaavnClient() as client:
        album = await client.get_album("1142502")
        print(f"💿 {album.name} ({album.year})")
        print(f"   Artist     : {album.artist}")
        print(f"   Song Count : {album.song_count}")
        print()
        for i, track in enumerate(album.songs[:5], 1):
            print(f"  {i}. {track.title}")

asyncio.run(main())`,
    output: [
      { html: '<span class="t-prompt">$</span> <span class="t-cmd">python album.py</span>', instant: true, pause: 500 },
      { html: '<span class="t-muted">⚡ Fetching album ID 1142502...</span>', instant: true, pause: 900 },
      { html: '<span class="t-success">✓ Album loaded</span>', instant: true, pause: 300 },
      { text: '', pause: 100 },
      { html: '💿 <span class="t-str">Rockstar</span> (<span class="t-num">2011</span>)', instant: true, pause: 80 },
      { html: '   Artist     : <span class="t-key">A.R. Rahman</span>', instant: true, pause: 80 },
      { html: '   Song Count : <span class="t-num">14</span>', instant: true, pause: 200 },
      { text: '', pause: 80 },
      { html: '  <span class="t-num">1</span>. <span class="t-str">Nadaan Parinde</span>', instant: true, pause: 70 },
      { html: '  <span class="t-num">2</span>. <span class="t-str">Phir Se Ud Chala</span>', instant: true, pause: 70 },
      { html: '  <span class="t-num">3</span>. <span class="t-str">Jo Bhi Main</span>', instant: true, pause: 70 },
      { html: '  <span class="t-num">4</span>. <span class="t-str">Hawa Hawa</span>', instant: true, pause: 70 },
      { html: '  <span class="t-num">5</span>. <span class="t-str">Tum Ho</span>', instant: true, pause: 200 },
      { html: '<span class="t-muted">✓ Completed in 0.44s</span><span class="t-cursor"></span>', instant: true },
    ]
  },
  trending: {
    lang: 'python',
    code: `import asyncio
from SaavnAPI import SaavnClient

async def main():
    async with SaavnClient() as client:
        trending = await client.get_trending(limit=5)
        print("🔥 Top 5 Trending on JioSaavn\\n")
        for i, song in enumerate(trending, 1):
            print(f"  #{i}  {song.title}")
            print(f"       {song.artist} | {song.quality}")

asyncio.run(main())`,
    output: [
      { html: '<span class="t-prompt">$</span> <span class="t-cmd">python trending.py</span>', instant: true, pause: 500 },
      { html: '<span class="t-muted">⚡ Fetching trending songs...</span>', instant: true, pause: 800 },
      { html: '<span class="t-success">✓ Top 5 loaded</span>', instant: true, pause: 300 },
      { text: '', pause: 100 },
      { html: '🔥 <span class="t-str">Top 5 Trending on JioSaavn</span>', instant: true, pause: 200 },
      { text: '', pause: 80 },
      { html: '  <span class="t-num">#1</span>  <span class="t-str">Kesariya</span>', instant: true, pause: 70 },
      { html: '       <span class="t-key">Arijit Singh</span> | <span class="t-num">320kbps</span>', instant: true, pause: 120 },
      { html: '  <span class="t-num">#2</span>  <span class="t-str">Raataan Lambiyan</span>', instant: true, pause: 70 },
      { html: '       <span class="t-key">Jubin Nautiyal</span> | <span class="t-num">320kbps</span>', instant: true, pause: 120 },
      { html: '  <span class="t-num">#3</span>  <span class="t-str">Tera Ban Jaunga</span>', instant: true, pause: 70 },
      { html: '       <span class="t-key">Tulsi Kumar</span> | <span class="t-num">320kbps</span>', instant: true, pause: 120 },
      { html: '  <span class="t-num">#4</span>  <span class="t-str">Shayad</span>', instant: true, pause: 70 },
      { html: '       <span class="t-key">Arijit Singh</span> | <span class="t-num">320kbps</span>', instant: true, pause: 120 },
      { html: '  <span class="t-num">#5</span>  <span class="t-str">Tum Hi Ho</span>', instant: true, pause: 70 },
      { html: '       <span class="t-key">Arijit Singh</span> | <span class="t-num">320kbps</span>', instant: true, pause: 200 },
      { html: '<span class="t-muted">✓ Completed in 0.33s</span><span class="t-cursor"></span>', instant: true },
    ]
  },
  artist: {
    lang: 'python',
    code: `import asyncio
from SaavnAPI import SaavnClient

async def main():
    async with SaavnClient() as client:
        artist = await client.get_artist("459320")
        print(f"🎤 {artist.name}")
        print(f"   Followers : {artist.follower_count:,}")
        print(f"\\n   Top Songs:")
        for song in artist.top_songs[:4]:
            print(f"    • {song.title} ({song.album})")

asyncio.run(main())`,
    output: [
      { html: '<span class="t-prompt">$</span> <span class="t-cmd">python artist.py</span>', instant: true, pause: 500 },
      { html: '<span class="t-muted">⚡ Fetching artist profile...</span>', instant: true, pause: 900 },
      { html: '<span class="t-success">✓ Artist loaded</span>', instant: true, pause: 300 },
      { text: '', pause: 100 },
      { html: '🎤 <span class="t-str">Arijit Singh</span>', instant: true, pause: 80 },
      { html: '   Followers : <span class="t-num">32,400,000</span>', instant: true, pause: 200 },
      { text: '', pause: 80 },
      { html: '   <span class="t-key">Top Songs:</span>', instant: true, pause: 100 },
      { html: '    • <span class="t-str">Tum Hi Ho</span> (<span class="t-val">Aashiqui 2</span>)', instant: true, pause: 70 },
      { html: '    • <span class="t-str">Kesariya</span> (<span class="t-val">Brahmastra</span>)', instant: true, pause: 70 },
      { html: '    • <span class="t-str">Channa Mereya</span> (<span class="t-val">Ae Dil Hai Mushkil</span>)', instant: true, pause: 70 },
      { html: '    • <span class="t-str">Raabta</span> (<span class="t-val">Agent Sai Srinivasa</span>)', instant: true, pause: 200 },
      { html: '<span class="t-muted">✓ Completed in 0.51s</span><span class="t-cursor"></span>', instant: true },
    ]
  },
  playlist: {
    lang: 'python',
    code: `import asyncio
from SaavnAPI import SaavnClient

async def main():
    async with SaavnClient() as client:
        pl = await client.get_playlist("159144718")
        print(f"🎶 {pl.name}")
        print(f"   Songs: {pl.song_count}\\n")
        for i, song in enumerate(pl.songs[:4], 1):
            print(f"  {i}. {song.title} — {song.artist}")

asyncio.run(main())`,
    output: [
      { html: '<span class="t-prompt">$</span> <span class="t-cmd">python playlist.py</span>', instant: true, pause: 500 },
      { html: '<span class="t-muted">⚡ Fetching playlist...</span>', instant: true, pause: 900 },
      { html: '<span class="t-success">✓ Playlist loaded</span>', instant: true, pause: 300 },
      { text: '', pause: 100 },
      { html: '🎶 <span class="t-str">Top Hits Hindi 2024</span>', instant: true, pause: 80 },
      { html: '   Songs: <span class="t-num">50</span>', instant: true, pause: 200 },
      { text: '', pause: 80 },
      { html: '  <span class="t-num">1</span>. <span class="t-str">Kesariya</span> — <span class="t-key">Arijit Singh</span>', instant: true, pause: 70 },
      { html: '  <span class="t-num">2</span>. <span class="t-str">Raataan Lambiyan</span> — <span class="t-key">Jubin Nautiyal</span>', instant: true, pause: 70 },
      { html: '  <span class="t-num">3</span>. <span class="t-str">Tera Ban Jaunga</span> — <span class="t-key">Tulsi Kumar</span>', instant: true, pause: 70 },
      { html: '  <span class="t-num">4</span>. <span class="t-str">Shayad</span> — <span class="t-key">Arijit Singh</span>', instant: true, pause: 200 },
      { html: '<span class="t-muted">✓ Completed in 0.47s</span><span class="t-cursor"></span>', instant: true },
    ]
  }
};

/* ===== DEMO TABS ===== */
const demoCodeEl = document.getElementById('demoCode');
const demoTerminalEl = document.getElementById('demoTerminal');
const runBtn = document.getElementById('runBtn');
const demoCopyBtn = document.getElementById('demoCopyBtn');
let currentDemo = 'search';
let isRunning = false;

function highlightCode(code) {
  return code
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/(import|from|async|await|with|as|for|if|not|def|return|in)/g,'<span class="kw">$1</span>')
    .replace(/\b(print|enumerate|str)\b/g,'<span class="fn">$1</span>')
    .replace(/"([^"]*)"/g,'"<span class="str">$1</span>"')
    .replace(/\b(\d+)\b/g,'<span class="num">$1</span>')
    .replace(/(#[^\n]*)/g,'<span class="cm">$1</span>');
}

function loadDemo(key) {
  currentDemo = key;
  const d = demos[key];
  demoCodeEl.innerHTML = highlightCode(d.code);
  demoTerminalEl.innerHTML = '<div class="t-line t-muted">Click ▶ Run to execute...</div>';
}

document.querySelectorAll('.demo-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.demo-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    loadDemo(tab.dataset.demo);
  });
});

runBtn.addEventListener('click', async () => {
  if (isRunning) return;
  isRunning = true;
  runBtn.textContent = '⏳ Running...';
  runBtn.disabled = true;
  demoTerminalEl.innerHTML = '';
  await typeLines(demoTerminalEl, demos[currentDemo].output, 18);
  runBtn.textContent = '▶ Run';
  runBtn.disabled = false;
  isRunning = false;
});

demoCopyBtn.addEventListener('click', () => copyText(demos[currentDemo].code, demoCopyBtn));

// Init first demo
loadDemo('search');

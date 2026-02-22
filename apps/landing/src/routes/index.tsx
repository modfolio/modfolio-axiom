import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <>
      <style>{`
        :root {
          --bg: #0A0A0F; --surface: #13131A; --text: #EDE8F0; --text2: #A09AAC;
          --a1: #A0AAFF; --a2: #FFD97A; --border: rgba(255,255,255,0.05);
          --modfolio-magic-heading: "goldenbook", "Noto Serif KR", serif;
          --modfolio-poetic-quote: "mrs-eaves-roman", "Noto Serif KR", serif;
          --modfolio-storybook-body: "adobe-caslon-pro", "Noto Serif KR", serif;
          --modfolio-warm-tech: "brandon-grotesque", "Pretendard", sans-serif;
          --modfolio-clear-data: "proxima-nova", "Pretendard", sans-serif;
        }
        * { margin:0; padding:0; box-sizing:border-box; }
        body { font-family:var(--modfolio-storybook-body); background:var(--bg); color:var(--text); min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; overflow:hidden; }
        .hero { position:relative; z-index:1; padding:2rem; }
        .hero h1 { font-family:var(--modfolio-magic-heading); font-size:clamp(2.5rem,8vw,5rem); font-weight:700; background:linear-gradient(135deg,var(--a1),var(--a2)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; margin-bottom:1rem; letter-spacing:-0.02em; }
        .hero .tagline { font-family:var(--modfolio-poetic-quote); font-size:clamp(1rem,3vw,1.5rem); font-style:italic; margin-bottom:0.5rem; }
        .hero .desc { font-size:clamp(0.875rem,2vw,1.125rem); color:var(--text2); max-width:40ch; margin:0 auto; line-height:1.6; }
        .badge { display:inline-block; margin-top:2rem; padding:0.5rem 1.5rem; border:1px solid var(--border); border-radius:999px; font-family:var(--modfolio-clear-data); font-size:0.75rem; color:var(--text2); background:var(--surface); }
        .glow { position:fixed; width:600px; height:600px; border-radius:50%; filter:blur(120px); opacity:0.08; pointer-events:none; }
        .glow-1 { background:var(--a1); top:-200px; right:-200px; }
        .glow-2 { background:var(--a2); bottom:-200px; left:-200px; }
      `}</style>
      <div class="glow glow-1"></div>
      <div class="glow glow-2"></div>
      <main class="hero">
        <h1>Modfolio Axiom</h1>
        <p class="tagline">Technology & Mobility</p>
        <p class="desc">테크놀로지 & 모빌리티 그룹</p>
        <span class="badge">axiom.modfolio.io — Coming Soon</span>
      </main>
    </>
  );
});

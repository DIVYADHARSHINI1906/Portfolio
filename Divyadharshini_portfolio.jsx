import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #f8f6f2; color: #1a1a1a; font-family: 'Inter', sans-serif; font-weight: 300; overflow-x: hidden; }

  :root {
    --teal:   #0d7377;
    --teal-l: #e0f4f4;
    --amber:  #c47c2b;
    --amber-l:#fdf3e3;
    --rose:   #b5485a;
    --rose-l: #fbeaed;
    --ink:    #1a1a1a;
    --sand:   #f8f6f2;
    --sand2:  #f0ece4;
    --sand3:  #e4ddd2;
    --muted:  #7a7060;
    --border: #ddd8ce;
  }

  /* ── KEYFRAMES ── */
  @keyframes fadeUp      { from{opacity:0;transform:translateY(28px)}  to{opacity:1;transform:translateY(0)} }
  @keyframes fadeDown    { from{opacity:0;transform:translateY(-20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes slideDown   { from{transform:translateY(-80px);opacity:0} to{transform:translateY(0);opacity:1} }
  @keyframes lineGrow    { from{width:0} to{width:48px} }
  @keyframes blink       { 50%{opacity:0} }
  @keyframes floatY      { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
  @keyframes pulseGlow   { 0%,100%{box-shadow:0 0 0 0 rgba(13,115,119,0.4)} 50%{box-shadow:0 0 0 10px rgba(13,115,119,0)} }
  @keyframes rotateSlow  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes shimmer     { 0%{background-position:-200% center} 100%{background-position:200% center} }
  @keyframes borderDance { 0%,100%{border-color:var(--teal)} 33%{border-color:var(--amber)} 66%{border-color:var(--rose)} }
  @keyframes countUp     { from{opacity:0;transform:scale(0.5)} to{opacity:1;transform:scale(1)} }
  @keyframes slideInLeft { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }
  @keyframes slideInRight{ from{opacity:0;transform:translateX(40px)}  to{opacity:1;transform:translateX(0)} }
  @keyframes particleFly { 0%{transform:translate(0,0) scale(1);opacity:1} 100%{transform:translate(var(--dx),var(--dy)) scale(0);opacity:0} }
  @keyframes gradFlow    { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
  @keyframes ripple      { 0%{transform:scale(0);opacity:0.6} 100%{transform:scale(3);opacity:0} }
  @keyframes morphBg     { 0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%} 50%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%} }
  @keyframes dotPulse    { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.4);opacity:0.7} }
  @keyframes waveIn      { from{clip-path:inset(0 100% 0 0)} to{clip-path:inset(0 0% 0 0)} }
  @keyframes numberRoll  { from{transform:translateY(100%);opacity:0} to{transform:translateY(0);opacity:1} }

  /* ── CURSOR TRAIL ── */
  .cursor-dot {
    width:8px;height:8px;background:var(--teal);border-radius:50%;
    position:fixed;pointer-events:none;z-index:9999;transition:transform 0.1s;
    mix-blend-mode:multiply;
  }
  .cursor-ring {
    width:32px;height:32px;border:1.5px solid var(--teal);border-radius:50%;
    position:fixed;pointer-events:none;z-index:9998;
    transition:all 0.15s ease;opacity:0.5;
  }

  /* ── NAV ── */
  .nav {
    position:fixed;top:0;left:0;right:0;z-index:100;
    display:flex;justify-content:space-between;align-items:center;
    padding:1.1rem 4rem;
    background:rgba(248,246,242,0.94);backdrop-filter:blur(16px);
    border-bottom:1px solid var(--border);
    animation:slideDown 0.7s ease both;
  }
  .nav-logo {
    font-family:'Lora',serif;font-size:1.05rem;font-weight:600;
    background:linear-gradient(270deg,var(--teal),var(--amber),var(--rose),var(--teal));
    background-size:300% 300%;
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
    animation:gradFlow 4s ease infinite;
  }
  .nav-links{display:flex;gap:2.2rem;list-style:none}
  .nav-link{
    font-size:0.76rem;letter-spacing:1.5px;text-transform:uppercase;
    color:var(--muted);text-decoration:none;transition:color 0.2s;
    position:relative;
  }
  .nav-link::after{
    content:'';position:absolute;bottom:-4px;left:0;width:0;height:1.5px;
    background:var(--teal);transition:width 0.3s ease;
  }
  .nav-link:hover{color:var(--teal)}
  .nav-link:hover::after{width:100%}
  .nav-cta{
    font-size:0.74rem;font-weight:500;letter-spacing:1px;text-transform:uppercase;
    color:#fff;background:var(--teal);padding:0.55rem 1.4rem;border-radius:3px;
    text-decoration:none;transition:all 0.3s;position:relative;overflow:hidden;
  }
  .nav-cta::before{
    content:'';position:absolute;top:50%;left:50%;width:0;height:0;
    background:rgba(255,255,255,0.2);border-radius:50%;transform:translate(-50%,-50%);
    transition:width 0.5s,height 0.5s;
  }
  .nav-cta:hover::before{width:200px;height:200px;}
  .nav-cta:hover{background:#0a5d61;transform:translateY(-1px);box-shadow:0 6px 20px rgba(13,115,119,0.3)}

  /* ── HERO BG DECORATION ── */
  .hero-bg-blob {
    position:absolute;width:500px;height:500px;
    background:radial-gradient(circle,rgba(13,115,119,0.06) 0%,transparent 70%);
    border-radius:50%;top:-100px;right:-100px;pointer-events:none;
    animation:floatY 6s ease-in-out infinite;
  }
  .hero-bg-blob2 {
    position:absolute;width:300px;height:300px;
    background:radial-gradient(circle,rgba(196,124,43,0.05) 0%,transparent 70%);
    border-radius:50%;bottom:100px;left:-50px;pointer-events:none;
    animation:floatY 8s ease-in-out infinite reverse;
  }

  /* ── HERO ── */
  .hero-wrap{position:relative;overflow:hidden}
  .hero{
    min-height:100vh;display:grid;grid-template-columns:1.1fr 0.9fr;
    align-items:center;max-width:1200px;margin:0 auto;
    padding:8rem 4rem 4rem;gap:5rem;position:relative;
  }
  .hero-eyebrow{
    display:flex;align-items:center;gap:0.8rem;
    font-size:0.7rem;font-weight:500;letter-spacing:3px;text-transform:uppercase;
    color:var(--teal);margin-bottom:1.2rem;animation:fadeUp 0.8s 0.1s ease both;
  }
  .hero-eyebrow::before{content:'';width:28px;height:1px;background:var(--teal)}
  .hero-name{
    font-family:'Lora',serif;font-size:clamp(2.8rem,4.5vw,4rem);
    font-weight:600;line-height:1.1;color:var(--ink);
    animation:fadeUp 0.8s 0.2s ease both;
  }
  .hero-name-em{
    font-style:italic;
    background:linear-gradient(135deg,var(--teal),var(--amber));
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  }
  .hero-bar{
    width:0;height:3px;
    background:linear-gradient(90deg,var(--teal),var(--amber),var(--rose));
    border-radius:2px;margin:1.4rem 0;
    animation:lineGrow 1s 0.6s ease both;
  }
  .hero-typed{
    font-size:0.95rem;color:var(--amber);font-weight:400;
    min-height:1.4rem;animation:fadeUp 0.8s 0.4s ease both;margin-bottom:0.8rem;
  }
  .cursor-blink{animation:blink 0.8s step-end infinite;border-right:2px solid var(--amber);padding-right:2px}
  .hero-bio{
    font-size:0.93rem;color:var(--muted);line-height:1.85;max-width:460px;
    animation:fadeUp 0.8s 0.5s ease both;margin-bottom:2rem;
  }
  .hero-contacts{display:flex;flex-direction:column;gap:0.45rem;margin-bottom:2rem;animation:fadeUp 0.8s 0.6s ease both}
  .hero-contact{
    display:flex;align-items:center;gap:0.6rem;font-size:0.8rem;
    color:var(--muted);text-decoration:none;transition:all 0.2s;
  }
  .hero-contact:hover{color:var(--teal);transform:translateX(4px)}
  .hero-actions{display:flex;gap:1rem;flex-wrap:wrap;animation:fadeUp 0.8s 0.7s ease both}

  .btn-fill{
    font-size:0.76rem;font-weight:500;letter-spacing:1px;text-transform:uppercase;
    color:#fff;background:var(--teal);padding:0.8rem 1.8rem;border-radius:3px;
    text-decoration:none;transition:all 0.3s;border:none;cursor:pointer;
    position:relative;overflow:hidden;
  }
  .btn-fill::after{
    content:'';position:absolute;inset:0;
    background:linear-gradient(135deg,transparent 40%,rgba(255,255,255,0.15) 50%,transparent 60%);
    transform:translateX(-100%);transition:transform 0.4s;
  }
  .btn-fill:hover::after{transform:translateX(100%)}
  .btn-fill:hover{background:#0a5d61;transform:translateY(-2px);box-shadow:0 8px 24px rgba(13,115,119,0.35)}

  .btn-stroke{
    font-size:0.76rem;font-weight:500;letter-spacing:1px;text-transform:uppercase;
    color:var(--ink);background:transparent;padding:0.8rem 1.8rem;
    border:1.5px solid var(--border);border-radius:3px;text-decoration:none;
    transition:all 0.3s;cursor:pointer;
  }
  .btn-stroke:hover{border-color:var(--teal);color:var(--teal);transform:translateY(-2px)}

  /* HERO RIGHT CARD */
  .hero-right{animation:slideInRight 0.9s 0.3s ease both}
  .hero-card{
    border-radius:6px;overflow:hidden;border:1px solid var(--border);
    transition:all 0.4s ease;
  }
  .hero-card:hover{
    transform:translateY(-6px) rotate(0.5deg);
    box-shadow:0 24px 60px rgba(13,115,119,0.12);
  }
  .hero-card-top{
    background:var(--teal);padding:2rem;
    display:flex;align-items:center;gap:1.2rem;
    position:relative;overflow:hidden;
  }
  .hero-card-top::before{
    content:'';position:absolute;top:-30px;right:-30px;
    width:120px;height:120px;
    background:rgba(255,255,255,0.05);border-radius:50%;
  }
  .avatar{
    width:70px;height:70px;border-radius:6px;flex-shrink:0;
    object-fit:cover;object-position:top center;
    border:2px solid rgba(255,255,255,0.25);
    transition:all 0.4s;
  }
  .hero-card:hover .avatar{transform:scale(1.05);border-color:rgba(255,255,255,0.5)}
  .hero-card-name{font-family:'Lora',serif;font-size:0.95rem;color:#fff}
  .hero-card-role{font-size:0.75rem;color:rgba(255,255,255,0.6);margin-top:0.2rem}
  .avail{display:flex;align-items:center;gap:0.4rem;margin-top:0.6rem}
  .avail-dot{
    width:7px;height:7px;background:#4ade80;border-radius:50%;
    animation:dotPulse 2s ease-in-out infinite;
  }
  .avail-txt{font-size:0.68rem;color:rgba(255,255,255,0.7);letter-spacing:0.5px}
  .hero-stats{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--border)}
  .hero-stat{
    background:var(--sand);padding:1.6rem 1.4rem;
    transition:all 0.3s;cursor:default;
  }
  .hero-stat:hover{background:var(--teal-l);transform:scale(1.02)}
  .stat-n{
    font-family:'Lora',serif;font-size:1.9rem;font-weight:600;color:var(--teal);
    transition:all 0.3s;
  }
  .hero-stat:hover .stat-n{color:var(--amber)}
  .stat-l{font-size:0.73rem;color:var(--muted);margin-top:0.3rem;line-height:1.4}
  .hero-card-tags{
    background:var(--sand2);padding:1.2rem 1.4rem;
    display:flex;flex-wrap:wrap;gap:0.4rem;border-top:1px solid var(--border);
  }
  .hero-tag{
    font-size:0.7rem;padding:0.2rem 0.65rem;border-radius:50px;
    background:var(--teal-l);color:var(--teal);border:1px solid rgba(13,115,119,0.2);
    transition:all 0.2s;cursor:default;
  }
  .hero-tag:hover{background:var(--teal);color:#fff;transform:scale(1.08)}
  .hero-tag.amber{background:var(--amber-l);color:var(--amber);border-color:rgba(196,124,43,0.2)}
  .hero-tag.amber:hover{background:var(--amber);color:#fff}
  .hero-tag.rose{background:var(--rose-l);color:var(--rose);border-color:rgba(181,72,90,0.2)}
  .hero-tag.rose:hover{background:var(--rose);color:#fff}

  /* ── SHARED SECTION ── */
  .section{max-width:1200px;margin:0 auto;padding:6rem 4rem}
  .sec-label{font-size:0.68rem;font-weight:500;letter-spacing:3px;text-transform:uppercase;color:var(--teal);margin-bottom:0.5rem}
  .sec-title{font-family:'Lora',serif;font-size:clamp(1.8rem,3vw,2.4rem);font-weight:600;color:var(--ink);line-height:1.2}
  .sec-title em{font-style:italic;color:var(--teal)}
  .sec-bar{width:0;height:2px;background:linear-gradient(90deg,var(--teal),var(--amber),var(--rose));border-radius:2px;margin-top:0.9rem;margin-bottom:3rem;transition:width 1s ease}
  .sec-bar.vis{width:48px}
  .divider{height:1px;background:var(--border);max-width:100%}

  /* REVEAL ANIMATIONS */
  .rev{opacity:0;transform:translateY(32px);transition:opacity 0.7s ease,transform 0.7s ease}
  .rev.vis{opacity:1;transform:translateY(0)}
  .rev-l{opacity:0;transform:translateX(-40px);transition:opacity 0.7s ease,transform 0.7s ease}
  .rev-l.vis{opacity:1;transform:translateX(0)}
  .rev-r{opacity:0;transform:translateX(40px);transition:opacity 0.7s ease,transform 0.7s ease}
  .rev-r.vis{opacity:1;transform:translateX(0)}
  .rev-scale{opacity:0;transform:scale(0.85);transition:opacity 0.6s ease,transform 0.6s ease}
  .rev-scale.vis{opacity:1;transform:scale(1)}

  /* ── ABOUT ── */
  .about-grid{display:grid;grid-template-columns:3fr 2fr;gap:5rem;align-items:start}
  .about-bio{font-size:0.95rem;color:#444;line-height:1.95}
  .about-bio p+p{margin-top:1.1rem}
  .about-bio strong{color:var(--teal);font-weight:500}
  .aside-cards{display:flex;flex-direction:column;gap:1rem}
  .aside-card{
    padding:1.3rem 1.5rem;border-radius:4px;border-left:3px solid var(--teal);
    background:var(--teal-l);transition:all 0.3s;
  }
  .aside-card:hover{transform:translateX(6px);box-shadow:4px 0 16px rgba(13,115,119,0.1)}
  .aside-card.amber{border-color:var(--amber);background:var(--amber-l)}
  .aside-card.amber:hover{box-shadow:4px 0 16px rgba(196,124,43,0.1)}
  .aside-card.rose{border-color:var(--rose);background:var(--rose-l)}
  .aside-card.rose:hover{box-shadow:4px 0 16px rgba(181,72,90,0.1)}
  .aside-card-title{font-size:0.68rem;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--teal);margin-bottom:0.7rem}
  .aside-card.amber .aside-card-title{color:var(--amber)}
  .aside-card.rose  .aside-card-title{color:var(--rose)}
  .aside-items{display:flex;flex-wrap:wrap;gap:0.4rem}
  .aside-item{font-size:0.8rem;color:#444;background:rgba(255,255,255,0.6);padding:0.2rem 0.6rem;border-radius:2px;transition:all 0.2s}
  .aside-item:hover{background:rgba(255,255,255,0.9)}

  /* ── SKILLS ── */
  .skills-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:2px;background:var(--border)}
  .skill-block{background:var(--sand);padding:2rem 2.2rem;transition:all 0.3s;position:relative;overflow:hidden}
  .skill-block::before{
    content:'';position:absolute;top:0;left:0;right:0;height:2px;
    background:linear-gradient(90deg,var(--teal),var(--amber));
    transform:scaleX(0);transform-origin:left;transition:transform 0.4s ease;
  }
  .skill-block:hover::before{transform:scaleX(1)}
  .skill-block:hover{background:var(--sand2)}
  .skill-block-title{font-size:0.68rem;font-weight:600;letter-spacing:2px;text-transform:uppercase;margin-bottom:1.1rem}
  .skill-block-title.teal{color:var(--teal)}
  .skill-block-title.amber{color:var(--amber)}
  .skill-block-title.rose{color:var(--rose)}
  .skill-pills{display:flex;flex-wrap:wrap;gap:0.4rem}
  .sp{
    font-size:0.77rem;padding:0.28rem 0.75rem;border-radius:3px;cursor:default;
    transition:all 0.25s;position:relative;overflow:hidden;
  }
  .sp::after{
    content:'';position:absolute;inset:0;background:rgba(255,255,255,0.2);
    transform:translateX(-100%);transition:transform 0.3s;
  }
  .sp:hover::after{transform:translateX(100%)}
  .sp.teal{background:var(--teal-l);color:var(--teal);border:1px solid rgba(13,115,119,0.2)}
  .sp.teal:hover{background:var(--teal);color:#fff;transform:translateY(-2px);box-shadow:0 4px 12px rgba(13,115,119,0.3)}
  .sp.amber{background:var(--amber-l);color:var(--amber);border:1px solid rgba(196,124,43,0.2)}
  .sp.amber:hover{background:var(--amber);color:#fff;transform:translateY(-2px)}
  .sp.rose{background:var(--rose-l);color:var(--rose);border:1px solid rgba(181,72,90,0.2)}
  .sp.rose:hover{background:var(--rose);color:#fff;transform:translateY(-2px)}
  .sp.ink{background:var(--sand2);color:var(--ink);border:1px solid var(--border)}
  .sp.ink:hover{background:var(--ink);color:#fff;transform:translateY(-2px)}

  /* ── EXPERIENCE ── */
  .exp-item{
    display:grid;grid-template-columns:200px 1fr;gap:3rem;
    padding:2.2rem 0;border-bottom:1px solid var(--border);
    transition:all 0.3s;cursor:default;position:relative;
  }
  .exp-item::before{
    content:'';position:absolute;left:0;top:0;bottom:0;width:0;
    background:linear-gradient(90deg,rgba(13,115,119,0.04),transparent);
    transition:width 0.4s ease;
  }
  .exp-item:hover::before{width:100%}
  .exp-item:first-child{border-top:1px solid var(--border)}
  .exp-item:hover{padding-left:1.2rem;padding-right:1rem;margin:0 -1rem;border-radius:4px}
  .exp-period{font-size:0.73rem;font-weight:500;letter-spacing:1px;text-transform:uppercase;color:var(--teal)}
  .exp-company{font-size:0.8rem;color:var(--muted);margin-top:0.3rem}
  .exp-role{font-family:'Lora',serif;font-size:1.05rem;font-weight:600;color:var(--ink);margin-bottom:0.5rem}
  .exp-desc{font-size:0.86rem;color:#555;line-height:1.8}
  .exp-tags{display:flex;flex-wrap:wrap;gap:0.35rem;margin-top:0.7rem}
  .exp-tag{
    font-size:0.7rem;padding:0.18rem 0.55rem;border-radius:2px;
    background:var(--teal-l);color:var(--teal);border:1px solid rgba(13,115,119,0.2);
    transition:all 0.2s;
  }
  .exp-tag:hover{background:var(--teal);color:#fff}

  /* ── PROJECTS ── */
  .proj-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;background:var(--border)}
  .proj-card{
    background:var(--sand);padding:1.8rem 2rem;
    transition:all 0.35s cubic-bezier(0.34,1.56,0.64,1);
    cursor:default;position:relative;overflow:hidden;
  }
  .proj-card::after{
    content:'';position:absolute;bottom:0;left:0;right:0;height:2px;
    background:linear-gradient(90deg,var(--teal),var(--amber));
    transform:scaleX(0);transform-origin:left;transition:transform 0.4s ease;
  }
  .proj-card:hover::after{transform:scaleX(1)}
  .proj-card:hover{background:var(--sand2);transform:translateY(-4px);z-index:1;box-shadow:0 12px 32px rgba(0,0,0,0.08)}
  .proj-card.dark{background:var(--teal)}
  .proj-card.dark::after{background:linear-gradient(90deg,rgba(255,255,255,0.3),rgba(255,255,255,0.1))}
  .proj-card.dark:hover{background:#0a5d61}
  .proj-num{font-family:'Lora',serif;font-size:0.72rem;color:var(--sand3);margin-bottom:1.2rem;transition:all 0.3s}
  .proj-card:hover .proj-num{color:var(--teal)}
  .proj-card.dark .proj-num{color:rgba(255,255,255,0.3)}
  .proj-badge-pro{
    font-size:0.63rem;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;
    padding:0.18rem 0.55rem;border-radius:2px;display:inline-block;margin-bottom:0.8rem;
  }
  .badge-green{background:#e6f4ea;color:#2d6a4f;border:1px solid #b7dac4}
  .badge-amber{background:var(--amber-l);color:var(--amber);border:1px solid rgba(196,124,43,0.25)}
  .proj-name-t{font-family:'Lora',serif;font-size:1rem;font-weight:600;color:var(--ink);margin-bottom:0.5rem;line-height:1.3;transition:color 0.2s}
  .proj-card:hover .proj-name-t{color:var(--teal)}
  .proj-card.dark .proj-name-t{color:#fff}
  .proj-desc-t{font-size:0.81rem;color:#666;line-height:1.75}
  .proj-card.dark .proj-desc-t{color:rgba(255,255,255,0.65)}
  .proj-pills{display:flex;flex-wrap:wrap;gap:0.3rem;margin-top:1rem}
  .pp{font-size:0.69rem;padding:0.15rem 0.5rem;border-radius:2px;transition:all 0.2s}
  .pp.fe{background:var(--teal-l);color:var(--teal)}
  .pp.fe:hover{background:var(--teal);color:#fff}
  .pp.be{background:var(--amber-l);color:var(--amber)}
  .pp.be:hover{background:var(--amber);color:#fff}
  .pp.misc{background:var(--sand2);color:var(--muted)}
  .pp.dark-fe{background:rgba(255,255,255,0.15);color:rgba(255,255,255,0.8)}
  .proj-link-pro{
    display:inline-flex;align-items:center;gap:0.3rem;
    font-size:0.74rem;margin-top:0.9rem;text-decoration:none;transition:all 0.25s;
  }
  .pl-teal{color:var(--teal)}.pl-teal:hover{gap:0.6rem;color:#0a5d61}
  .pl-white{color:rgba(255,255,255,0.6)}.pl-white:hover{color:#fff;gap:0.6rem}
  .pl-muted{color:var(--muted)}

  /* ── ACHIEVEMENTS ── */
  .ach-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;background:var(--border)}
  .ach-card{
    background:var(--sand);padding:2rem;transition:all 0.35s;cursor:default;
    position:relative;overflow:hidden;
  }
  .ach-card::before{
    content:'';position:absolute;inset:0;
    background:radial-gradient(circle at top left,rgba(13,115,119,0.05),transparent 60%);
    opacity:0;transition:opacity 0.4s;
  }
  .ach-card:hover::before{opacity:1}
  .ach-card:hover{background:var(--sand2);transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,0,0,0.06)}
  .ach-num{font-family:'Lora',serif;font-size:2.2rem;font-weight:600;margin-bottom:1rem;transition:transform 0.3s}
  .ach-card:hover .ach-num{transform:scale(1.1)}
  .ach-num.teal{color:var(--teal-l)}
  .ach-num.amber{color:var(--amber-l)}
  .ach-num.rose{color:var(--rose-l)}
  .ach-accent{width:28px;height:2px;border-radius:2px;margin-bottom:1rem;transition:width 0.4s ease}
  .ach-card:hover .ach-accent{width:48px}
  .ach-accent.teal{background:var(--teal)}
  .ach-accent.amber{background:var(--amber)}
  .ach-accent.rose{background:var(--rose)}
  .ach-title-t{font-family:'Lora',serif;font-size:0.95rem;font-weight:600;color:var(--ink);margin-bottom:0.5rem}
  .ach-desc-t{font-size:0.81rem;color:#666;line-height:1.75}

  /* ── EDUCATION ── */
  .edu-item{
    display:grid;grid-template-columns:190px 1fr auto;gap:2.5rem;
    padding:1.8rem 0;border-bottom:1px solid var(--border);align-items:center;
    transition:all 0.3s;cursor:default;
  }
  .edu-item:first-child{border-top:1px solid var(--border)}
  .edu-item:hover{background:var(--sand2);padding-left:1.2rem;padding-right:1rem;margin:0 -1rem;border-radius:4px}
  .edu-yr{font-size:0.72rem;color:var(--teal);letter-spacing:1px;text-transform:uppercase;font-weight:500}
  .edu-deg{font-family:'Lora',serif;font-size:0.93rem;font-weight:600;color:var(--ink)}
  .edu-sch{font-size:0.78rem;color:var(--muted);margin-top:0.2rem}
  .edu-score{font-family:'Lora',serif;font-size:1.1rem;font-weight:600;color:var(--amber);text-align:right;white-space:nowrap;transition:all 0.3s}
  .edu-item:hover .edu-score{transform:scale(1.1)}

  /* CERTS */
  .cert-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:2px;background:var(--border)}
  .cert-card{background:var(--sand);padding:1.3rem 1.6rem;transition:all 0.3s;position:relative;overflow:hidden}
  .cert-card::before{
    content:'';position:absolute;top:0;left:0;right:0;height:1.5px;
    background:linear-gradient(90deg,var(--teal),var(--amber));
    transform:scaleX(0);transform-origin:left;transition:transform 0.3s;
  }
  .cert-card:hover::before{transform:scaleX(1)}
  .cert-card:hover{background:var(--sand2);transform:translateY(-2px)}
  .cert-dot{width:6px;height:6px;border-radius:50%;background:var(--teal);margin-bottom:0.7rem;transition:all 0.3s}
  .cert-card:hover .cert-dot{background:var(--amber);transform:scale(1.4)}
  .cert-n{font-size:0.85rem;font-weight:500;color:var(--ink)}
  .cert-b{font-size:0.73rem;color:var(--muted);margin-top:0.2rem}

  /* ── CONTACT STRIP ── */
  .contact-strip{
    background:var(--ink);padding:5rem 4rem;
    display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center;
    position:relative;overflow:hidden;
  }
  .contact-strip::before{
    content:'';position:absolute;width:400px;height:400px;
    background:radial-gradient(circle,rgba(13,115,119,0.08) 0%,transparent 70%);
    border-radius:50%;top:-100px;right:200px;pointer-events:none;
    animation:floatY 7s ease-in-out infinite;
  }
  .contact-eyebrow{font-size:0.68rem;letter-spacing:3px;text-transform:uppercase;color:var(--teal);margin-bottom:1rem}
  .contact-title{font-family:'Lora',serif;font-size:2rem;font-weight:600;color:#f8f6f2;line-height:1.2}
  .contact-title em{font-style:italic;color:var(--teal)}
  .contact-rows{display:flex;flex-direction:column}
  .contact-row{
    display:flex;justify-content:space-between;align-items:center;
    padding:1.1rem 0;border-bottom:1px solid #2a2a2a;
    transition:all 0.2s;
  }
  .contact-row:first-child{border-top:1px solid #2a2a2a}
  .contact-row:hover{padding-left:0.5rem}
  .contact-row-label{font-size:0.68rem;letter-spacing:1.5px;text-transform:uppercase;color:#555}
  .contact-row-val{font-size:0.83rem;color:#ccc;text-decoration:none;transition:color 0.2s}
  .contact-row-val:hover{color:var(--teal)}

  /* FOOTER */
  .footer{
    background:var(--ink);border-top:1px solid #222;
    padding:1.8rem 4rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;
  }
  .footer-left{font-family:'Lora',serif;font-size:0.85rem;color:#444}
  .footer-left span{color:var(--teal)}
  .footer-right{font-size:0.73rem;color:#333}

  /* SCROLL TOP */
  .scroll-btn{
    position:fixed;bottom:2rem;right:2rem;width:44px;height:44px;
    background:var(--teal);color:#fff;border:none;border-radius:3px;
    cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center;
    transition:all 0.3s;z-index:99;box-shadow:0 4px 14px rgba(13,115,119,0.3);
    animation:fadeUp 0.4s ease both;
  }
  .scroll-btn:hover{background:#0a5d61;transform:translateY(-4px);box-shadow:0 8px 24px rgba(13,115,119,0.4)}

  /* ── PROGRESS BAR ── */
  .progress-bar{
    position:fixed;top:0;left:0;height:2px;
    background:linear-gradient(90deg,var(--teal),var(--amber),var(--rose));
    z-index:200;transition:width 0.1s linear;
  }

  /* ── SECTION COUNTER ── */
  .stat-counter{
    display:inline-block;
    animation:numberRoll 0.6s ease both;
  }

  /* ── CONTACT FORM SECTION ── */
  .contact-section{
    max-width:1200px;margin:0 auto;padding:6rem 4rem;
  }
  .contact-grid{
    display:grid;grid-template-columns:1fr 1.4fr;gap:5rem;align-items:start;margin-top:3rem;
  }
  .contact-info-block{display:flex;flex-direction:column;gap:1.8rem}
  .contact-info-item{
    display:flex;align-items:flex-start;gap:1rem;
    padding:1.2rem 1.4rem;border-radius:4px;background:var(--sand2);
    border-left:3px solid var(--teal);transition:all 0.3s;
  }
  .contact-info-item:hover{transform:translateX(5px);background:var(--teal-l)}
  .contact-info-item.amber{border-color:var(--amber)}
  .contact-info-item.amber:hover{background:var(--amber-l)}
  .contact-info-item.rose{border-color:var(--rose)}
  .contact-info-item.rose:hover{background:var(--rose-l)}
  .contact-info-icon{font-size:1.2rem;flex-shrink:0;margin-top:0.1rem}
  .contact-info-label{font-size:0.65rem;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-bottom:0.3rem}
  .contact-info-val{font-size:0.85rem;color:var(--ink);text-decoration:none;transition:color 0.2s}
  .contact-info-val:hover{color:var(--teal)}

  /* FORM */
  .contact-form{display:flex;flex-direction:column;gap:1.2rem}
  .form-row{display:grid;grid-template-columns:1fr 1fr;gap:1.2rem}
  .form-group{display:flex;flex-direction:column;gap:0.45rem}
  .form-label{
    font-size:0.68rem;font-weight:600;letter-spacing:2px;text-transform:uppercase;
    color:var(--muted);
  }
  .form-input,.form-textarea{
    padding:0.85rem 1.1rem;border:1.5px solid var(--border);border-radius:4px;
    background:var(--sand);color:var(--ink);font-family:'Inter',sans-serif;font-size:0.88rem;
    transition:all 0.3s;outline:none;resize:none;
  }
  .form-input:focus,.form-textarea:focus{
    border-color:var(--teal);background:#fff;
    box-shadow:0 0 0 3px rgba(13,115,119,0.08);
  }
  .form-input::placeholder,.form-textarea::placeholder{color:#bbb}
  .form-textarea{min-height:130px}
  .form-submit{
    display:flex;align-items:center;justify-content:center;gap:0.6rem;
    padding:0.95rem 2rem;background:var(--teal);color:#fff;
    border:none;border-radius:4px;font-family:'Inter',sans-serif;
    font-size:0.78rem;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;
    cursor:pointer;transition:all 0.3s;position:relative;overflow:hidden;
  }
  .form-submit::after{
    content:'';position:absolute;inset:0;
    background:linear-gradient(135deg,transparent 40%,rgba(255,255,255,0.15) 50%,transparent 60%);
    transform:translateX(-100%);transition:transform 0.4s;
  }
  .form-submit:hover::after{transform:translateX(100%)}
  .form-submit:hover{background:#0a5d61;transform:translateY(-2px);box-shadow:0 8px 24px rgba(13,115,119,0.35)}
  .form-submit:disabled{opacity:0.6;cursor:not-allowed;transform:none}
  .form-success{
    display:flex;align-items:center;gap:0.6rem;
    padding:1rem 1.2rem;background:#e6f4ea;border:1px solid #b7dac4;
    border-radius:4px;color:#2d6a4f;font-size:0.85rem;
    animation:fadeUp 0.4s ease both;
  }
  .form-error{
    display:flex;align-items:center;gap:0.6rem;
    padding:1rem 1.2rem;background:var(--rose-l);border:1px solid rgba(181,72,90,0.2);
    border-radius:4px;color:var(--rose);font-size:0.85rem;
    animation:fadeUp 0.4s ease both;
  }

  @media(max-width:768px){
    .nav{padding:1rem 1.5rem}.nav-links,.nav-cta{display:none}
    .hero{grid-template-columns:1fr;padding:6rem 1.5rem 3rem;gap:2.5rem}
    .section{padding:4rem 1.5rem}
    .about-grid{grid-template-columns:1fr;gap:2rem}
    .skills-grid{grid-template-columns:1fr}
    .proj-grid{grid-template-columns:1fr}
    .ach-grid{grid-template-columns:1fr}
    .edu-item{grid-template-columns:1fr;gap:0.4rem}
    .edu-score{text-align:left}
    .exp-item{grid-template-columns:1fr;gap:0.5rem}
    .contact-strip{grid-template-columns:1fr;padding:3rem 1.5rem;gap:2.5rem}
    .contact-grid{grid-template-columns:1fr;gap:2.5rem}
    .contact-section{padding:4rem 1.5rem}
    .form-row{grid-template-columns:1fr}
    .footer{padding:1.5rem;flex-direction:column;text-align:center}
    .cursor-dot,.cursor-ring{display:none}
  }
`;

const PHRASES = ["Computer Science Engineer","Data Science Enthusiast","Full Stack Developer","AI / ML Explorer","Problem Solver"];

function useTypewriter() {
  const [text, setText] = useState("");
  const [pi, setPi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = PHRASES[pi];
    const wait = del && ci === cur.length ? 1800 : del ? 52 : 95;
    const t = setTimeout(() => {
      if (!del) {
        setText(cur.slice(0, ci + 1));
        if (ci + 1 === cur.length) { setDel(true); return; }
        setCi(c => c + 1);
      } else {
        setText(cur.slice(0, ci - 1));
        if (ci - 1 === 0) { setDel(false); setPi(i => (i + 1) % PHRASES.length); setCi(0); return; }
        setCi(c => c - 1);
      }
    }, wait);
    return () => clearTimeout(t);
  }, [ci, del, pi]);
  return text;
}

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("vis"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".rev,.rev-l,.rev-r,.rev-scale,.sec-bar").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// Animated counter hook
function useCounter(target, isVisible) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    const num = parseFloat(target);
    if (isNaN(num)) return;
    let start = 0;
    const duration = 1200;
    const step = num / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= num) { setCount(num); clearInterval(timer); }
      else setCount(parseFloat(start.toFixed(2)));
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target]);
  return count;
}

function AnimatedStat({ n, l, s }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const numVal = parseFloat(n);
  const suffix = n.replace(/[\d.]/g, "");
  const count = useCounter(numVal, visible);
  const display = isNaN(numVal) ? n : `${Number.isInteger(numVal) ? Math.floor(count) : count.toFixed(2)}${suffix}`;
  return (
    <div ref={ref} className="hero-stat">
      <div className="stat-n">{display}</div>
      <div className="stat-l">{l}<br/><span style={{color:"#aaa",fontSize:"0.68rem"}}>{s}</span></div>
    </div>
  );
}

const EXP = [
  { period:"May 2025 – Aug 2025", company:"Imagivite Technology Pvt. Ltd.", role:"Software Developer Intern", desc:"Performed strongly in the initial internship period, earning a 2-month extension for advanced project work. Contributed to live production applications LearningSaga and Vibhu.", tags:["React JS","Firebase","JavaScript"] },
  { period:"Jul 2024 – Aug 2024", company:"AccentTechnoSoft (ATS), Coimbatore", role:"Data Science Intern", desc:"Completed a 30-day intensive Data Science internship. Developed a Diabetes Prediction model using Python, subsequently recognised and selected by MSME.", tags:["Python","Machine Learning","Data Science"] },
  { period:"2024", company:"GDG KSRIET", role:"AI / ML Domain Lead", desc:"Led the AI/ML domain at the Google Developer Group, KSRIET. Organised technical events, mentored peers, and drove engagement across the student developer community.", tags:["AI / ML","Leadership","Community"] },
];

const PROJECTS = [
  { num:"01", name:"GoCosys — Landing Page", desc:"Responsive landing page for GoCosys, commissioned directly by the company founder. Modern UI paired with a PHP & MySQL backend.", fe:["Bootstrap","CSS","JS"], be:["PHP","MySQL"], badge:"new", dark:false, link:null, linkLabel:"Live link — coming Monday" },
  { num:"02", name:"Diabetes Prediction System", desc:"ML model predicting diabetes likelihood from clinical parameters. Selected for Smart India Hackathon and recognised by MSME.", fe:["Python","ML"], be:["Data Science"], badge:"feat", dark:true, link:"https://github.com/DIVYADHARSHINI1906", linkLabel:"View on GitHub →" },
  { num:"03", name:"LearningSaga & Vibhu", desc:"Contributed to two live production web applications at Imagivite Technology during internship.", fe:["React JS","JS"], be:["Firebase"], badge:null, dark:false, link:null, linkLabel:null },
  { num:"04", name:"Blind Shoe — Assistive Device", desc:"Hardware assistive solution helping visually impaired individuals navigate using embedded sensor technology.", fe:["IoT","Hardware"], be:["Embedded"], badge:null, dark:false, link:null, linkLabel:null },
  { num:"05", name:"Student Library Record Analysis", desc:"Java-based system for managing library records, improving tracking accuracy and automated report generation.", fe:["Java"], be:["Data Analysis"], badge:null, dark:false, link:null, linkLabel:null },
];

const ACH = [
  { idx:"01", color:"teal",  title:"Smart India Hackathon",        desc:"Project selected for India's largest national hackathon, competing against thousands of student teams." },
  { idx:"02", color:"amber", title:"MSME Recognition",             desc:"Diabetes Prediction project recognised by the Ministry of Micro, Small and Medium Enterprises." },
  { idx:"03", color:"rose",  title:"AI/ML Lead — GDG KSRIET 2024",desc:"Appointed to lead the AI/ML vertical at Google Developer Group KSRIET, driving technical events and peer mentorship." },
];

const EDU = [
  { yr:"2023 – Present", deg:"B.E. Computer Science Engineering", sch:"KSR Institute for Engineering and Technology, Tiruchengode", score:"CGPA 8.12" },
  { yr:"2022 – 2023",   deg:"SSLC — 10th Standard",              sch:"JKK Nattraja Matric Higher Secondary School, Komarapalayam",   score:"95%" },
  { yr:"2019 – 2020",   deg:"HSC — 12th Standard",               sch:"JKK Nattraja Matric Higher Secondary School, Komarapalayam",   score:"77%" },
];

const CERTS = [
  ["Mastering PostgreSQL","Udemy"],
  ["Intro to AI & Vector Search","MongoDB, Inc"],
  ["Sustainable Happiness","NPTEL"],
  ["Matlab Courses","Self-paced"],
  ["Learnathon Course","Self-paced"],
];

export default function Portfolio() {
  const typed = useTypewriter();
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [form, setForm] = useState({name:"",email:"",subject:"",message:""});
  const [formStatus, setFormStatus] = useState(null); // null | "sending" | "success" | "error"
  useReveal();

  const handleFormChange = (e) => setForm(f => ({...f, [e.target.name]: e.target.value}));

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setFormStatus("sending");
    // Simulate sending (replace with EmailJS or Formspree later)
    await new Promise(r => setTimeout(r, 1500));
    // Open mailto as fallback
    const subject = encodeURIComponent(form.subject || "Portfolio Contact");
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.open(`mailto:divyadharshinibharaniraj19@gmail.com?subject=${subject}&body=${body}`);
    setFormStatus("success");
    setForm({name:"",email:"",subject:"",message:""});
    setTimeout(() => setFormStatus(null), 5000);
  };

  // Scroll progress bar
  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 500);
      const el = document.documentElement;
      const progress = (window.scrollY / (el.scrollHeight - el.clientHeight)) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Custom cursor
  useEffect(() => {
    const move = (e) => {
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX - 4 + "px";
        dotRef.current.style.top  = e.clientY - 4 + "px";
      }
      if (ringRef.current) {
        ringRef.current.style.left = e.clientX - 16 + "px";
        ringRef.current.style.top  = e.clientY - 16 + "px";
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <style>{styles}</style>

      {/* PROGRESS BAR */}
      <div className="progress-bar" style={{width:`${scrollProgress}%`}} />

      {/* CUSTOM CURSOR */}
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">Divyadharshini B</div>
        <ul className="nav-links">
          {["About","Skills","Experience","Projects","Education","Contact"].map(s => (
            <li key={s}><a href={`#${s.toLowerCase()}`} className="nav-link">{s}</a></li>
          ))}
        </ul>
        <a href="mailto:divyadharshinibharaniraj19@gmail.com" className="nav-cta">Get in Touch</a>
      </nav>

      {/* HERO */}
      <div className="hero-wrap">
        <div className="hero-bg-blob" />
        <div className="hero-bg-blob2" />
        <div className="hero">
          <div>
            <p className="hero-eyebrow">Software Engineer · Tamil Nadu, India</p>
            <h1 className="hero-name">Divyadharshini<br /><span className="hero-name-em">Bharaniraj</span></h1>
            <div className="hero-bar" />
            <p className="hero-typed"><span className="cursor-blink">{typed || "\u00A0"}</span></p>
            <p className="hero-bio">
              A Computer Science Engineer with a passion for building intelligent, human-centred digital products —
              from machine learning models to full-stack web applications. Currently interning at Imagivite Technology.
            </p>
            <div className="hero-contacts">
              {[
                ["📞","7010376661","tel:7010376661"],
                ["✉","divyadharshinibharaniraj19@gmail.com","mailto:divyadharshinibharaniraj19@gmail.com"],
                ["🔗","LinkedIn Profile","https://linkedin.com/in/divyadharshini_bharaniraj"],
                ["🐙","GitHub Profile","https://github.com/DIVYADHARSHINI1906"],
              ].map(([icon,label,href]) => (
                <a key={label} href={href} className="hero-contact" target="_blank" rel="noreferrer">
                  <span>{icon}</span><span>{label}</span>
                </a>
              ))}
            </div>
            <div className="hero-actions">
              <a href="#projects" className="btn-fill">View Projects</a>
              <a href="#experience" className="btn-stroke">Experience</a>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-card">
              <div className="hero-card-top">
                <img src="./images/divya.jpg" alt="Divyadharshini B" className="avatar" />
                <div>
                  <div className="hero-card-name">Divyadharshini B</div>
                  <div className="hero-card-role">Software Developer Intern</div>
                  <div className="avail"><div className="avail-dot"/><div className="avail-txt">Open to opportunities</div></div>
                </div>
              </div>
              <div className="hero-stats" style={{background:"var(--border)"}}>
                {[["8.12","CGPA","B.E. CS"],["95%","SSLC","Score"],["2+","Internships","Experience"],["5+","Projects","Delivered"]].map(([n,l,s])=>(
                  <AnimatedStat key={l} n={n} l={l} s={s} />
                ))}
              </div>
              <div className="hero-card-tags">
                {["Python","React JS","Data Science"].map(t=><span key={t} className="hero-tag">{t}</span>)}
                {["PHP","MySQL"].map(t=><span key={t} className="hero-tag amber">{t}</span>)}
                {["AI / ML","Leadership"].map(t=><span key={t} className="hero-tag rose">{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* ABOUT */}
      <section className="section" id="about">
        <div className="rev">
          <p className="sec-label">About</p>
          <h2 className="sec-title">Background &amp; <em>Profile</em></h2>
          <div className="sec-bar" />
        </div>
        <div className="about-grid">
          <div className="about-bio rev-l">
            <p>I am a <strong>highly motivated and detail-oriented</strong> Computer Science Engineering student at KSR Institute for Engineering and Technology, Tiruchengode, maintaining a CGPA of 8.12. My academic journey has been shaped by a genuine curiosity for technology and its real-world impact.</p>
            <p>I led the <strong>AI/ML domain at Google Developer Group KSRIET 2024</strong>, sharpening both my technical depth and leadership capabilities. My Diabetes Prediction project was recognised by <strong>MSME</strong> and selected for <strong>Smart India Hackathon</strong> — reflecting my ability to build solutions that matter.</p>
            <p>Currently interning at <strong>Imagivite Technology Pvt. Ltd.</strong> as a Software Developer, I contribute to live production applications. I bring strong communication and graphic design skills alongside my engineering background, and am actively seeking opportunities to grow in the software industry.</p>
          </div>
          <div className="rev-r" style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
            <div className="aside-card">
              <div className="aside-card-title">Languages</div>
              <div className="aside-items"><span className="aside-item">Tamil (Native)</span><span className="aside-item">English (Professional)</span></div>
            </div>
            <div className="aside-card amber">
              <div className="aside-card-title">Tools I Use</div>
              <div className="aside-items"><span className="aside-item">VS Code</span><span className="aside-item">Canva</span><span className="aside-item">Git</span></div>
            </div>
            <div className="aside-card rose">
              <div className="aside-card-title">Interests</div>
              <div className="aside-items"><span className="aside-item">Cooking</span><span className="aside-item">Drawing</span><span className="aside-item">Badminton</span></div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* SKILLS */}
      <section className="section" id="skills">
        <div className="rev">
          <p className="sec-label">Capabilities</p>
          <h2 className="sec-title">Technical <em>Skills</em></h2>
          <div className="sec-bar" />
        </div>
        <div className="skills-grid rev">
          {[
            { title:"Programming Languages", cls:"teal",  pills:[["Python","teal"],["Java","teal"],["C","ink"],["C++","ink"]] },
            { title:"Web Development",       cls:"amber", pills:[["HTML","amber"],["CSS","amber"],["JavaScript","amber"],["React JS","amber"],["Bootstrap","ink"]] },
            { title:"Backend & Database",    cls:"teal",  pills:[["PHP","teal"],["MySQL","teal"],["Firebase Auth","ink"],["Firebase Storage","ink"]] },
            { title:"Mobile & Design Tools", cls:"rose",  pills:[["Flutter (Basic)","rose"],["VS Code","ink"],["Canva","rose"],["Graphic Design","ink"]] },
          ].map((cat,i)=>(
            <div key={i} className="skill-block" style={{transitionDelay:`${i*0.1}s`}}>
              <div className={`skill-block-title ${cat.cls}`}>{cat.title}</div>
              <div className="skill-pills">
                {cat.pills.map(([p,c])=><span key={p} className={`sp ${c}`}>{p}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* EXPERIENCE */}
      <section className="section" id="experience">
        <div className="rev">
          <p className="sec-label">Career</p>
          <h2 className="sec-title">Work <em>Experience</em></h2>
          <div className="sec-bar" />
        </div>
        <div>
          {EXP.map((e,i)=>(
            <div key={i} className="exp-item rev" style={{transitionDelay:`${i*0.12}s`}}>
              <div>
                <div className="exp-period">{e.period}</div>
                <div className="exp-company">{e.company}</div>
              </div>
              <div>
                <div className="exp-role">{e.role}</div>
                <div className="exp-desc">{e.desc}</div>
                <div className="exp-tags">{e.tags.map(t=><span key={t} className="exp-tag">{t}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* PROJECTS */}
      <section className="section" id="projects">
        <div className="rev">
          <p className="sec-label">Portfolio</p>
          <h2 className="sec-title">Selected <em>Projects</em></h2>
          <div className="sec-bar" />
        </div>
        <div className="proj-grid rev">
          {PROJECTS.map((p,i)=>(
            <div key={i} className={`proj-card ${p.dark?"dark":""}`} style={{transitionDelay:`${i*0.08}s`}}>
              {p.badge==="new"  && <div className="proj-badge-pro badge-green">New · Client Work</div>}
              {p.badge==="feat" && <div className="proj-badge-pro badge-amber">SIH + MSME Selected</div>}
              <div className="proj-num">{p.num}</div>
              <div className="proj-name-t">{p.name}</div>
              <div className="proj-desc-t">{p.desc}</div>
              <div className="proj-pills">
                {p.fe.map(t=><span key={t} className={`pp ${p.dark?"dark-fe":"fe"}`}>{t}</span>)}
                {p.be.map(t=><span key={t} className={`pp ${p.dark?"dark-fe":"be"}`}>{t}</span>)}
              </div>
              {p.link && <a href={p.link} target="_blank" rel="noreferrer" className={`proj-link-pro ${p.dark?"pl-white":"pl-teal"}`}>{p.linkLabel}</a>}
              {!p.link && p.linkLabel && <span className="proj-link-pro pl-muted">{p.linkLabel}</span>}
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* ACHIEVEMENTS */}
      <section className="section">
        <div className="rev">
          <p className="sec-label">Recognition</p>
          <h2 className="sec-title">Achievements &amp; <em>Awards</em></h2>
          <div className="sec-bar" />
        </div>
        <div className="ach-grid rev">
          {ACH.map((a,i)=>(
            <div key={i} className="ach-card" style={{transitionDelay:`${i*0.1}s`}}>
              <div className={`ach-num ${a.color}`}>{a.idx}</div>
              <div className={`ach-accent ${a.color}`} />
              <div className="ach-title-t">{a.title}</div>
              <div className="ach-desc-t">{a.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* EDUCATION */}
      <section className="section" id="education">
        <div className="rev">
          <p className="sec-label">Academic</p>
          <h2 className="sec-title">Education &amp; <em>Certifications</em></h2>
          <div className="sec-bar" />
        </div>
        <div>
          {EDU.map((e,i)=>(
            <div key={i} className="edu-item rev" style={{transitionDelay:`${i*0.1}s`}}>
              <div className="edu-yr">{e.yr}</div>
              <div><div className="edu-deg">{e.deg}</div><div className="edu-sch">{e.sch}</div></div>
              <div className="edu-score">{e.score}</div>
            </div>
          ))}
        </div>
        <div style={{marginTop:"3rem"}}>
          <p style={{fontFamily:"'Lora',serif",fontSize:"1rem",fontWeight:600,color:"var(--ink)",marginBottom:"1.2rem",letterSpacing:"0.3px"}}>
            Professional Certifications
          </p>
          <div className="cert-grid rev">
            {CERTS.map(([n,b],i)=>(
              <div key={i} className="cert-card" style={{transitionDelay:`${i*0.08}s`}}>
                <div className="cert-dot"/>
                <div className="cert-n">{n}</div>
                <div className="cert-b">{b}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT US SECTION */}
      <div className="divider" />
      <section className="contact-section" id="contact">
        <div className="rev">
          <p className="sec-label">Get in Touch</p>
          <h2 className="sec-title">Contact <em>Me</em></h2>
          <div className="sec-bar" />
        </div>

        <div className="contact-grid">
          {/* Left — Info */}
          <div className="contact-info-block rev-l">
            <p style={{fontSize:"0.92rem",color:"var(--muted)",lineHeight:1.85}}>
              I'm always open to new opportunities, collaborations, or just a friendly chat about tech. Feel free to reach out!
            </p>
            {[
              {icon:"📞", label:"Phone",    val:"7010376661",                           href:"tel:7010376661",           cls:""},
              {icon:"✉️",  label:"Email",   val:"divyadharshinibharaniraj19@gmail.com", href:"mailto:divyadharshinibharaniraj19@gmail.com", cls:"amber"},
              {icon:"🔗", label:"LinkedIn", val:"linkedin.com/in/divyadharshini-b",     href:"https://linkedin.com/in/divyadharshini-b", cls:"rose"},
              {icon:"🐙", label:"GitHub",   val:"github.com/DIVYADHARSHINI1906",        href:"https://github.com/DIVYADHARSHINI1906", cls:""},
            ].map(({icon,label,val,href,cls})=>(
              <div key={label} className={`contact-info-item ${cls}`}>
                <span className="contact-info-icon">{icon}</span>
                <div>
                  <div className="contact-info-label">{label}</div>
                  <a href={href} target="_blank" rel="noreferrer" className="contact-info-val">{val}</a>
                </div>
              </div>
            ))}
          </div>

          {/* Right — Form */}
          <div className="rev-r">
            <form className="contact-form" onSubmit={handleFormSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input className="form-input" name="name" placeholder="Eg: Priya Kumar" value={form.name} onChange={handleFormChange} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input className="form-input" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleFormChange} required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Subject</label>
                <input className="form-input" name="subject" placeholder="Eg: Job Opportunity / Collaboration" value={form.subject} onChange={handleFormChange} />
              </div>
              <div className="form-group">
                <label className="form-label">Message *</label>
                <textarea className="form-textarea" name="message" placeholder="Write your message here..." value={form.message} onChange={handleFormChange} required />
              </div>

              {formStatus === "success" && (
                <div className="form-success">✅ Message sent! I'll get back to you soon.</div>
              )}
              {formStatus === "error" && (
                <div className="form-error">❌ Something went wrong. Please try again.</div>
              )}

              <button className="form-submit" type="submit" disabled={formStatus === "sending"}>
                {formStatus === "sending" ? "⏳ Sending..." : "✉ Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <div className="footer">
        <div className="footer-left">Divyadharshini B — <span>Portfolio 2025</span></div>
        <div className="footer-right">KSR Institute for Engineering and Technology · Tamil Nadu, India</div>
      </div>

      {scrolled && (
        <button className="scroll-btn" onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}>↑</button>
      )}
    </>
  );
}
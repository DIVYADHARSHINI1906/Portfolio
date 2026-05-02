import { useState, useEffect } from "react";

// ══════════════════════════════════════════════
//  ADMIN PASSWORD — change this to your own!
// ══════════════════════════════════════════════
const ADMIN_PASSWORD = "divya@admin2025";

const adminStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0f1117; color: #e4e4e7; font-family: 'Inter', sans-serif; font-weight: 300; }

  :root {
    --teal:   #0d7377;
    --teal-l: #e0f4f4;
    --amber:  #c47c2b;
    --rose:   #b5485a;
    --ink:    #0f1117;
    --card:   #1a1d27;
    --card2:  #22263a;
    --border: #2a2d3e;
    --muted:  #6b7280;
    --text:   #e4e4e7;
  }

  @keyframes fadeUp   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes shimmer  { 0%{background-position:-200% center} 100%{background-position:200% center} }
  @keyframes pulse    { 0%,100%{opacity:1} 50%{opacity:0.5} }
  @keyframes spin     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

  /* ── LOGIN ── */
  .login-wrap {
    min-height:100vh;display:flex;align-items:center;justify-content:center;
    background:radial-gradient(ellipse at 50% 0%,rgba(13,115,119,0.12) 0%,transparent 60%);
  }
  .login-card {
    width:100%;max-width:420px;padding:2.5rem;
    background:var(--card);border:1px solid var(--border);border-radius:8px;
    animation:fadeUp 0.5s ease both;
  }
  .login-logo {
    font-family:'Lora',serif;font-size:1.1rem;font-weight:600;
    background:linear-gradient(135deg,#0d7377,#c47c2b);
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
    margin-bottom:0.4rem;
  }
  .login-sub { font-size:0.8rem;color:var(--muted);margin-bottom:2rem }
  .login-label { font-size:0.68rem;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--muted);display:block;margin-bottom:0.5rem }
  .login-input {
    width:100%;padding:0.85rem 1rem;background:#0f1117;border:1.5px solid var(--border);
    border-radius:4px;color:var(--text);font-family:'Inter',sans-serif;font-size:0.88rem;
    outline:none;transition:border-color 0.2s;margin-bottom:1.2rem;
  }
  .login-input:focus { border-color:var(--teal) }
  .login-btn {
    width:100%;padding:0.9rem;background:var(--teal);color:#fff;border:none;border-radius:4px;
    font-family:'Inter',sans-serif;font-size:0.78rem;font-weight:500;letter-spacing:1.5px;
    text-transform:uppercase;cursor:pointer;transition:all 0.3s;
  }
  .login-btn:hover { background:#0a5d61;transform:translateY(-1px) }
  .login-err { font-size:0.8rem;color:#f87171;margin-top:0.8rem;text-align:center }

  /* ── LAYOUT ── */
  .admin-wrap { display:flex;min-height:100vh }

  /* SIDEBAR */
  .sidebar {
    width:240px;flex-shrink:0;background:var(--card);border-right:1px solid var(--border);
    display:flex;flex-direction:column;padding:1.5rem 0;position:sticky;top:0;height:100vh;
  }
  .sidebar-logo {
    font-family:'Lora',serif;font-size:0.95rem;font-weight:600;
    background:linear-gradient(135deg,#0d7377,#c47c2b);
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
    padding:0 1.5rem;margin-bottom:0.3rem;
  }
  .sidebar-sub { font-size:0.7rem;color:var(--muted);padding:0 1.5rem;margin-bottom:2rem }
  .sidebar-section { font-size:0.6rem;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--muted);padding:0 1.5rem;margin-bottom:0.5rem;margin-top:1rem }
  .sidebar-btn {
    display:flex;align-items:center;gap:0.75rem;padding:0.7rem 1.5rem;
    font-size:0.82rem;color:var(--muted);background:transparent;border:none;
    cursor:pointer;transition:all 0.2s;text-align:left;width:100%;
  }
  .sidebar-btn:hover { color:var(--text);background:rgba(255,255,255,0.04) }
  .sidebar-btn.active { color:var(--teal);background:rgba(13,115,119,0.1);border-right:2px solid var(--teal) }
  .sidebar-icon { font-size:1rem;width:20px;text-align:center }
  .sidebar-logout {
    margin-top:auto;padding:0.7rem 1.5rem;display:flex;align-items:center;gap:0.75rem;
    font-size:0.82rem;color:#f87171;background:transparent;border:none;cursor:pointer;
    transition:all 0.2s;
  }
  .sidebar-logout:hover { background:rgba(248,113,113,0.08) }

  /* MAIN */
  .admin-main { flex:1;padding:2.5rem;overflow-y:auto }
  .admin-header { margin-bottom:2.5rem }
  .admin-page-title { font-family:'Lora',serif;font-size:1.6rem;font-weight:600;color:var(--text) }
  .admin-page-sub { font-size:0.82rem;color:var(--muted);margin-top:0.3rem }

  /* STATS ROW */
  .stats-row { display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:2.5rem }
  .stat-card {
    background:var(--card);border:1px solid var(--border);border-radius:6px;padding:1.4rem;
    transition:all 0.3s;animation:fadeUp 0.4s ease both;
  }
  .stat-card:hover { border-color:var(--teal);transform:translateY(-2px) }
  .stat-card-n { font-family:'Lora',serif;font-size:2rem;font-weight:600;color:var(--teal) }
  .stat-card-l { font-size:0.72rem;color:var(--muted);margin-top:0.3rem;letter-spacing:0.5px }

  /* SUBMISSIONS */
  .sub-list { display:flex;flex-direction:column;gap:1rem }
  .sub-card {
    background:var(--card);border:1px solid var(--border);border-radius:6px;padding:1.5rem;
    transition:all 0.3s;animation:fadeUp 0.4s ease both;
  }
  .sub-card:hover { border-color:rgba(13,115,119,0.4) }
  .sub-card-top { display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:0.8rem }
  .sub-name { font-weight:500;color:var(--text);font-size:0.92rem }
  .sub-email { font-size:0.78rem;color:var(--teal);margin-top:0.2rem }
  .sub-date { font-size:0.7rem;color:var(--muted) }
  .sub-subject { font-size:0.75rem;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--amber);margin-bottom:0.5rem }
  .sub-message { font-size:0.85rem;color:#9ca3af;line-height:1.7 }
  .sub-actions { display:flex;gap:0.5rem;margin-top:1rem }
  .sub-btn {
    font-size:0.7rem;padding:0.35rem 0.8rem;border-radius:3px;border:none;cursor:pointer;
    transition:all 0.2s;font-family:'Inter',sans-serif;letter-spacing:0.5px;
  }
  .sub-btn.reply { background:rgba(13,115,119,0.15);color:var(--teal) }
  .sub-btn.reply:hover { background:var(--teal);color:#fff }
  .sub-btn.delete { background:rgba(248,113,113,0.1);color:#f87171 }
  .sub-btn.delete:hover { background:#f87171;color:#fff }
  .sub-empty { text-align:center;padding:4rem 2rem;color:var(--muted);font-size:0.88rem }

  /* CONTENT EDITOR */
  .editor-tabs { display:flex;gap:0.5rem;margin-bottom:2rem;border-bottom:1px solid var(--border);padding-bottom:0 }
  .editor-tab {
    font-size:0.75rem;font-weight:500;letter-spacing:1px;text-transform:uppercase;
    padding:0.6rem 1.2rem;background:transparent;border:none;cursor:pointer;
    color:var(--muted);transition:all 0.2s;border-bottom:2px solid transparent;margin-bottom:-1px;
  }
  .editor-tab.active { color:var(--teal);border-bottom-color:var(--teal) }
  .editor-tab:hover { color:var(--text) }

  .edit-section { animation:fadeUp 0.3s ease both }
  .edit-card {
    background:var(--card);border:1px solid var(--border);border-radius:6px;
    margin-bottom:1rem;overflow:hidden;
  }
  .edit-card-header {
    display:flex;justify-content:space-between;align-items:center;
    padding:1rem 1.4rem;border-bottom:1px solid var(--border);
    cursor:pointer;transition:background 0.2s;
  }
  .edit-card-header:hover { background:rgba(255,255,255,0.02) }
  .edit-card-title { font-size:0.88rem;font-weight:500;color:var(--text) }
  .edit-card-badge { font-size:0.65rem;padding:0.2rem 0.55rem;border-radius:50px;background:rgba(13,115,119,0.15);color:var(--teal) }
  .edit-card-body { padding:1.4rem }
  .edit-field { margin-bottom:1rem }
  .edit-label { font-size:0.65rem;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--muted);display:block;margin-bottom:0.4rem }
  .edit-input {
    width:100%;padding:0.7rem 0.9rem;background:#0f1117;border:1.5px solid var(--border);
    border-radius:4px;color:var(--text);font-family:'Inter',sans-serif;font-size:0.84rem;
    outline:none;transition:border-color 0.2s;
  }
  .edit-input:focus { border-color:var(--teal) }
  .edit-textarea {
    width:100%;padding:0.7rem 0.9rem;background:#0f1117;border:1.5px solid var(--border);
    border-radius:4px;color:var(--text);font-family:'Inter',sans-serif;font-size:0.84rem;
    outline:none;transition:border-color 0.2s;resize:vertical;min-height:80px;
  }
  .edit-textarea:focus { border-color:var(--teal) }
  .edit-row { display:grid;grid-template-columns:1fr 1fr;gap:1rem }
  .edit-save-btn {
    padding:0.65rem 1.4rem;background:var(--teal);color:#fff;border:none;border-radius:4px;
    font-family:'Inter',sans-serif;font-size:0.74rem;font-weight:500;letter-spacing:1px;
    text-transform:uppercase;cursor:pointer;transition:all 0.3s;
  }
  .edit-save-btn:hover { background:#0a5d61;transform:translateY(-1px) }
  .edit-saved { font-size:0.78rem;color:#4ade80;margin-left:0.8rem;animation:fadeUp 0.3s ease }

  /* TAGS EDITOR */
  .tags-row { display:flex;flex-wrap:wrap;gap:0.4rem;margin-bottom:0.6rem }
  .tag-pill {
    display:flex;align-items:center;gap:0.3rem;font-size:0.74rem;
    padding:0.2rem 0.6rem;border-radius:50px;background:rgba(13,115,119,0.15);
    color:var(--teal);border:1px solid rgba(13,115,119,0.3);
  }
  .tag-x { background:transparent;border:none;color:var(--teal);cursor:pointer;font-size:0.85rem;line-height:1 }
  .tag-add-row { display:flex;gap:0.5rem }
  .tag-add-input {
    flex:1;padding:0.5rem 0.8rem;background:#0f1117;border:1.5px solid var(--border);
    border-radius:4px;color:var(--text);font-size:0.82rem;outline:none;
    font-family:'Inter',sans-serif;
  }
  .tag-add-input:focus { border-color:var(--teal) }
  .tag-add-btn {
    padding:0.5rem 1rem;background:rgba(13,115,119,0.15);color:var(--teal);
    border:1px solid rgba(13,115,119,0.3);border-radius:4px;cursor:pointer;
    font-size:0.8rem;transition:all 0.2s;
  }
  .tag-add-btn:hover { background:var(--teal);color:#fff }

  /* SETTINGS */
  .settings-card {
    background:var(--card);border:1px solid var(--border);border-radius:6px;
    padding:1.8rem;margin-bottom:1.2rem;animation:fadeUp 0.4s ease both;
  }
  .settings-title { font-size:0.82rem;font-weight:600;color:var(--text);margin-bottom:1.2rem;letter-spacing:0.3px }
  .settings-row { display:flex;justify-content:space-between;align-items:center;padding:0.8rem 0;border-bottom:1px solid var(--border) }
  .settings-row:last-child { border-bottom:none }
  .settings-key { font-size:0.82rem;color:#9ca3af }
  .settings-val { font-size:0.82rem;color:var(--teal) }
  .toggle-btn {
    width:44px;height:24px;border-radius:50px;border:none;cursor:pointer;
    transition:background 0.3s;position:relative;
  }
  .toggle-btn.on { background:var(--teal) }
  .toggle-btn.off { background:var(--border) }
  .toggle-dot {
    position:absolute;top:3px;width:18px;height:18px;background:#fff;border-radius:50%;
    transition:left 0.3s;
  }
  .toggle-btn.on .toggle-dot { left:23px }
  .toggle-btn.off .toggle-dot { left:3px }
`;

// ── Default data (mirrors portfolio) ──────────────────────────
const DEFAULT_PROJECTS = [
  { id:1, num:"01", name:"GoCosys — Landing Page", desc:"Responsive landing page for GoCosys, commissioned directly by the company founder.", tags:["Bootstrap","CSS","JS","PHP","MySQL"], link:"", badge:"new" },
  { id:2, num:"02", name:"Diabetes Prediction System", desc:"ML model predicting diabetes likelihood from clinical parameters.", tags:["Python","ML","Data Science"], link:"https://github.com/DIVYADHARSHINI1906", badge:"feat" },
  { id:3, num:"03", name:"LearningSaga & Vibhu", desc:"Contributed to two live production web applications at Imagivite Technology.", tags:["React JS","JS","Firebase"], link:"", badge:"" },
  { id:4, num:"04", name:"Blind Shoe — Assistive Device", desc:"Hardware assistive solution for visually impaired individuals.", tags:["IoT","Hardware","Embedded"], link:"", badge:"" },
  { id:5, num:"05", name:"Student Library Record Analysis", desc:"Java-based system for managing library records.", tags:["Java","Data Analysis"], link:"", badge:"" },
];

const DEFAULT_SKILLS = [
  { id:1, category:"Programming Languages", tags:["Python","Java","C","C++"] },
  { id:2, category:"Web Development",       tags:["HTML","CSS","JavaScript","React JS","Bootstrap"] },
  { id:3, category:"Backend & Database",    tags:["PHP","MySQL","Firebase Auth","Firebase Storage"] },
  { id:4, category:"Mobile & Design Tools", tags:["Flutter (Basic)","VS Code","Canva","Graphic Design"] },
];

const DEFAULT_PROFILE = {
  name:"Divyadharshini B",
  role:"Software Developer Intern",
  bio:"A Computer Science Engineer with a passion for building intelligent, human-centred digital products — from machine learning models to full-stack web applications.",
  cgpa:"8.12",
  sslc:"95%",
  internships:"2+",
  projects:"5+",
  email:"divyadharshinibharaniraj19@gmail.com",
  phone:"7010376661",
  linkedin:"https://linkedin.com/in/divyadharshini-b",
  github:"https://github.com/DIVYADHARSHINI1906",
};

// ── Fake submissions (replace with real backend later) ─────────
const FAKE_SUBMISSIONS = [
  { id:1, name:"Priya Rajan", email:"priya@example.com", subject:"Job Opportunity", message:"Hi Divya! I came across your portfolio and I'm really impressed by your work on the Diabetes Prediction System. We have an opening for a junior developer at our startup. Would love to connect!", date:"2025-04-22 10:34 AM", read:false },
  { id:2, name:"Karthik S", email:"karthik@techco.in", subject:"Collaboration", message:"Hello! I'm working on an open-source ML project and looking for contributors. Your MSME recognition caught my eye. Are you interested in collaborating?", date:"2025-04-20 3:12 PM", read:true },
  { id:3, name:"Meena Lakshmi", email:"meena@gmail.com", subject:"Internship Query", message:"Hi, I'm a student from KSRIET too! I wanted to ask about your experience at Imagivite Technology. Any tips for getting into such internships?", date:"2025-04-18 9:01 AM", read:true },
];

// ══════════════════════════════════════════════
//  LOGIN SCREEN
// ══════════════════════════════════════════════
function LoginScreen({ onLogin }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) { onLogin(); }
    else { setErr("Incorrect password. Try again."); setPw(""); }
  };
  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="login-logo">Divyadharshini B</div>
        <div className="login-sub">Admin Dashboard — Restricted Access</div>
        <form onSubmit={submit}>
          <label className="login-label">Password</label>
          <input className="login-input" type="password" placeholder="Enter admin password" value={pw}
            onChange={e=>{setPw(e.target.value);setErr("")}} autoFocus />
          <button className="login-btn" type="submit">🔐 Login to Dashboard</button>
          {err && <div className="login-err">{err}</div>}
        </form>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
//  SUBMISSIONS TAB
// ══════════════════════════════════════════════
function SubmissionsTab({ submissions, setSubmissions }) {
  const unread = submissions.filter(s=>!s.read).length;
  const markRead = (id) => setSubmissions(s => s.map(x => x.id===id ? {...x, read:true} : x));
  const del = (id) => { if(window.confirm("Delete this message?")) setSubmissions(s=>s.filter(x=>x.id!==id)); };

  return (
    <div>
      <div className="admin-header">
        <div className="admin-page-title">📬 Contact Submissions</div>
        <div className="admin-page-sub">{submissions.length} messages · {unread} unread</div>
      </div>

      <div className="stats-row" style={{gridTemplateColumns:"repeat(3,1fr)"}}>
        {[["📩","Total Messages",submissions.length],["🔴","Unread",unread],["✅","Read",submissions.length-unread]]
          .map(([icon,label,val])=>(
          <div key={label} className="stat-card">
            <div className="stat-card-n">{icon} {val}</div>
            <div className="stat-card-l">{label}</div>
          </div>
        ))}
      </div>

      {submissions.length === 0
        ? <div className="sub-empty">📭 No messages yet. Share your portfolio!</div>
        : <div className="sub-list">
            {submissions.map(s=>(
              <div key={s.id} className="sub-card" style={{borderLeft: s.read ? "3px solid var(--border)" : "3px solid var(--teal)"}}>
                <div className="sub-card-top">
                  <div>
                    <div className="sub-name">{s.name} {!s.read && <span style={{fontSize:"0.65rem",background:"rgba(13,115,119,0.2)",color:"var(--teal)",padding:"0.1rem 0.4rem",borderRadius:"50px",marginLeft:"0.4rem"}}>NEW</span>}</div>
                    <div className="sub-email">{s.email}</div>
                  </div>
                  <div className="sub-date">{s.date}</div>
                </div>
                {s.subject && <div className="sub-subject">{s.subject}</div>}
                <div className="sub-message">{s.message}</div>
                <div className="sub-actions">
                  <a href={`mailto:${s.email}?subject=Re: ${s.subject}`}>
                    <button className="sub-btn reply">✉ Reply</button>
                  </a>
                  {!s.read && <button className="sub-btn reply" onClick={()=>markRead(s.id)}>✓ Mark Read</button>}
                  <button className="sub-btn delete" onClick={()=>del(s.id)}>🗑 Delete</button>
                </div>
              </div>
            ))}
          </div>
      }
    </div>
  );
}

// ══════════════════════════════════════════════
//  CONTENT EDITOR — PROJECTS
// ══════════════════════════════════════════════
function ProjectsEditor({ projects, setProjects }) {
  const [open, setOpen] = useState(null);
  const [saved, setSaved] = useState(null);
  const [tagInput, setTagInput] = useState({});

  const update = (id, field, val) => setProjects(ps => ps.map(p => p.id===id ? {...p,[field]:val} : p));
  const addTag = (id) => {
    const t = (tagInput[id]||"").trim();
    if(!t) return;
    setProjects(ps => ps.map(p => p.id===id ? {...p,tags:[...p.tags,t]} : p));
    setTagInput(ti => ({...ti,[id]:""}));
  };
  const removeTag = (id, tag) => setProjects(ps => ps.map(p => p.id===id ? {...p,tags:p.tags.filter(t=>t!==tag)} : p));
  const save = (id) => { setSaved(id); setTimeout(()=>setSaved(null),2000); };

  return (
    <div className="edit-section">
      <div style={{marginBottom:"1.5rem",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{fontSize:"0.8rem",color:"var(--muted)"}}>Click any project to expand and edit</div>
        <button className="edit-save-btn" onClick={()=>setProjects([...projects,{id:Date.now(),num:`0${projects.length+1}`,name:"New Project",desc:"",tags:[],link:"",badge:""}])}>+ Add Project</button>
      </div>
      {projects.map(p=>(
        <div key={p.id} className="edit-card">
          <div className="edit-card-header" onClick={()=>setOpen(open===p.id?null:p.id)}>
            <div style={{display:"flex",alignItems:"center",gap:"0.8rem"}}>
              <span style={{fontFamily:"'Lora',serif",color:"var(--muted)",fontSize:"0.8rem"}}>{p.num}</span>
              <span className="edit-card-title">{p.name}</span>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:"0.6rem"}}>
              {p.badge && <span className="edit-card-badge">{p.badge}</span>}
              <span style={{color:"var(--muted)",fontSize:"0.8rem"}}>{open===p.id?"▲":"▼"}</span>
            </div>
          </div>
          {open===p.id && (
            <div className="edit-card-body">
              <div className="edit-row">
                <div className="edit-field">
                  <label className="edit-label">Project Number</label>
                  <input className="edit-input" value={p.num} onChange={e=>update(p.id,"num",e.target.value)} />
                </div>
                <div className="edit-field">
                  <label className="edit-label">Badge (new / feat / empty)</label>
                  <input className="edit-input" value={p.badge} onChange={e=>update(p.id,"badge",e.target.value)} placeholder="new / feat / leave empty" />
                </div>
              </div>
              <div className="edit-field">
                <label className="edit-label">Project Name</label>
                <input className="edit-input" value={p.name} onChange={e=>update(p.id,"name",e.target.value)} />
              </div>
              <div className="edit-field">
                <label className="edit-label">Description</label>
                <textarea className="edit-textarea" value={p.desc} onChange={e=>update(p.id,"desc",e.target.value)} />
              </div>
              <div className="edit-field">
                <label className="edit-label">GitHub / Live Link</label>
                <input className="edit-input" value={p.link} onChange={e=>update(p.id,"link",e.target.value)} placeholder="https://..." />
              </div>
              <div className="edit-field">
                <label className="edit-label">Tech Tags</label>
                <div className="tags-row">
                  {p.tags.map(t=>(
                    <span key={t} className="tag-pill">{t}<button className="tag-x" onClick={()=>removeTag(p.id,t)}>×</button></span>
                  ))}
                </div>
                <div className="tag-add-row">
                  <input className="tag-add-input" placeholder="Add tag..." value={tagInput[p.id]||""} onChange={e=>setTagInput(ti=>({...ti,[p.id]:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&addTag(p.id)} />
                  <button className="tag-add-btn" onClick={()=>addTag(p.id)}>+ Add</button>
                </div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:"0.5rem",marginTop:"0.5rem"}}>
                <button className="edit-save-btn" onClick={()=>save(p.id)}>💾 Save Changes</button>
                {saved===p.id && <span className="edit-saved">✓ Saved!</span>}
                <button onClick={()=>setProjects(ps=>ps.filter(x=>x.id!==p.id))} style={{marginLeft:"auto",padding:"0.5rem 0.8rem",background:"rgba(248,113,113,0.1)",color:"#f87171",border:"none",borderRadius:"4px",cursor:"pointer",fontSize:"0.75rem"}}>🗑 Remove</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════
//  CONTENT EDITOR — SKILLS
// ══════════════════════════════════════════════
function SkillsEditor({ skills, setSkills }) {
  const [tagInput, setTagInput] = useState({});
  const [saved, setSaved] = useState(null);

  const addTag = (id) => {
    const t = (tagInput[id]||"").trim();
    if(!t) return;
    setSkills(ss => ss.map(s => s.id===id ? {...s,tags:[...s.tags,t]} : s));
    setTagInput(ti=>({...ti,[id]:""}));
  };
  const removeTag = (id,tag) => setSkills(ss => ss.map(s => s.id===id ? {...s,tags:s.tags.filter(t=>t!==tag)} : s));
  const save = (id) => { setSaved(id); setTimeout(()=>setSaved(null),2000); };

  return (
    <div className="edit-section">
      {skills.map(s=>(
        <div key={s.id} className="edit-card" style={{marginBottom:"1rem"}}>
          <div className="edit-card-body">
            <div className="edit-field" style={{marginBottom:"0.8rem"}}>
              <label className="edit-label">Category Name</label>
              <input className="edit-input" value={s.category} onChange={e=>setSkills(ss=>ss.map(x=>x.id===s.id?{...x,category:e.target.value}:x))} />
            </div>
            <div className="edit-field">
              <label className="edit-label">Skills</label>
              <div className="tags-row">
                {s.tags.map(t=>(
                  <span key={t} className="tag-pill">{t}<button className="tag-x" onClick={()=>removeTag(s.id,t)}>×</button></span>
                ))}
              </div>
              <div className="tag-add-row">
                <input className="tag-add-input" placeholder="Add skill..." value={tagInput[s.id]||""} onChange={e=>setTagInput(ti=>({...ti,[s.id]:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&addTag(s.id)} />
                <button className="tag-add-btn" onClick={()=>addTag(s.id)}>+ Add</button>
              </div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:"0.5rem",marginTop:"0.8rem"}}>
              <button className="edit-save-btn" onClick={()=>save(s.id)}>💾 Save</button>
              {saved===s.id && <span className="edit-saved">✓ Saved!</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════
//  CONTENT EDITOR — PROFILE
// ══════════════════════════════════════════════
function ProfileEditor({ profile, setProfile }) {
  const [saved, setSaved] = useState(false);
  const update = (field, val) => setProfile(p=>({...p,[field]:val}));
  const save = () => { setSaved(true); setTimeout(()=>setSaved(false),2500); };

  return (
    <div className="edit-section">
      <div className="edit-card">
        <div className="edit-card-body">
          <div style={{fontFamily:"'Lora',serif",fontSize:"0.9rem",color:"var(--text)",marginBottom:"1.2rem",fontWeight:600}}>Personal Info</div>
          <div className="edit-row">
            <div className="edit-field"><label className="edit-label">Full Name</label><input className="edit-input" value={profile.name} onChange={e=>update("name",e.target.value)} /></div>
            <div className="edit-field"><label className="edit-label">Role / Title</label><input className="edit-input" value={profile.role} onChange={e=>update("role",e.target.value)} /></div>
          </div>
          <div className="edit-field"><label className="edit-label">Bio</label><textarea className="edit-textarea" value={profile.bio} onChange={e=>update("bio",e.target.value)} /></div>
        </div>
      </div>

      <div className="edit-card">
        <div className="edit-card-body">
          <div style={{fontFamily:"'Lora',serif",fontSize:"0.9rem",color:"var(--text)",marginBottom:"1.2rem",fontWeight:600}}>Stats</div>
          <div className="edit-row">
            <div className="edit-field"><label className="edit-label">CGPA</label><input className="edit-input" value={profile.cgpa} onChange={e=>update("cgpa",e.target.value)} /></div>
            <div className="edit-field"><label className="edit-label">SSLC Score</label><input className="edit-input" value={profile.sslc} onChange={e=>update("sslc",e.target.value)} /></div>
            <div className="edit-field"><label className="edit-label">Internships</label><input className="edit-input" value={profile.internships} onChange={e=>update("internships",e.target.value)} /></div>
            <div className="edit-field"><label className="edit-label">Projects</label><input className="edit-input" value={profile.projects} onChange={e=>update("projects",e.target.value)} /></div>
          </div>
        </div>
      </div>

      <div className="edit-card">
        <div className="edit-card-body">
          <div style={{fontFamily:"'Lora',serif",fontSize:"0.9rem",color:"var(--text)",marginBottom:"1.2rem",fontWeight:600}}>Contact Info</div>
          <div className="edit-row">
            <div className="edit-field"><label className="edit-label">Email</label><input className="edit-input" value={profile.email} onChange={e=>update("email",e.target.value)} /></div>
            <div className="edit-field"><label className="edit-label">Phone</label><input className="edit-input" value={profile.phone} onChange={e=>update("phone",e.target.value)} /></div>
            <div className="edit-field"><label className="edit-label">LinkedIn URL</label><input className="edit-input" value={profile.linkedin} onChange={e=>update("linkedin",e.target.value)} /></div>
            <div className="edit-field"><label className="edit-label">GitHub URL</label><input className="edit-input" value={profile.github} onChange={e=>update("github",e.target.value)} /></div>
          </div>
        </div>
      </div>

      <div style={{display:"flex",alignItems:"center",gap:"0.8rem"}}>
        <button className="edit-save-btn" onClick={save}>💾 Save All Changes</button>
        {saved && <span className="edit-saved">✓ Profile saved!</span>}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
//  CONTENT EDITOR TAB
// ══════════════════════════════════════════════
function ContentTab({ projects, setProjects, skills, setSkills, profile, setProfile }) {
  const [tab, setTab] = useState("projects");
  return (
    <div>
      <div className="admin-header">
        <div className="admin-page-title">✏️ Content Editor</div>
        <div className="admin-page-sub">Edit your portfolio content directly from here</div>
      </div>
      <div className="editor-tabs">
        {[["projects","📁 Projects"],["skills","🛠 Skills"],["profile","👤 Profile"]].map(([key,label])=>(
          <button key={key} className={`editor-tab ${tab===key?"active":""}`} onClick={()=>setTab(key)}>{label}</button>
        ))}
      </div>
      {tab==="projects" && <ProjectsEditor projects={projects} setProjects={setProjects} />}
      {tab==="skills"   && <SkillsEditor   skills={skills}     setSkills={setSkills}     />}
      {tab==="profile"  && <ProfileEditor  profile={profile}   setProfile={setProfile}   />}
    </div>
  );
}

// ══════════════════════════════════════════════
//  SETTINGS TAB
// ══════════════════════════════════════════════
function SettingsTab({ profile }) {
  const [toggles, setToggles] = useState({ contactForm:true, animations:true, cursorEffect:true, scrollBar:true });
  const tog = (key) => setToggles(t=>({...t,[key]:!t[key]}));

  return (
    <div>
      <div className="admin-header">
        <div className="admin-page-title">⚙️ Settings</div>
        <div className="admin-page-sub">Manage portfolio preferences</div>
      </div>
      <div className="settings-card">
        <div className="settings-title">Portfolio Features</div>
        {[
          ["contactForm","Show Contact Form","Visitors can send messages"],
          ["animations","Enable Animations","Scroll reveal & hover effects"],
          ["cursorEffect","Custom Cursor","Teal dot cursor effect"],
          ["scrollBar","Scroll Progress Bar","Top gradient progress bar"],
        ].map(([key,label,desc])=>(
          <div key={key} className="settings-row">
            <div>
              <div style={{fontSize:"0.84rem",color:"var(--text)"}}>{label}</div>
              <div style={{fontSize:"0.72rem",color:"var(--muted)",marginTop:"0.2rem"}}>{desc}</div>
            </div>
            <button className={`toggle-btn ${toggles[key]?"on":"off"}`} onClick={()=>tog(key)}>
              <div className="toggle-dot" />
            </button>
          </div>
        ))}
      </div>

      <div className="settings-card">
        <div className="settings-title">Portfolio Info</div>
        {[
          ["Owner",profile.name],
          ["Email",profile.email],
          ["GitHub",profile.github],
          ["Admin Version","v1.0 — 2025"],
        ].map(([k,v])=>(
          <div key={k} className="settings-row">
            <span className="settings-key">{k}</span>
            <span className="settings-val">{v}</span>
          </div>
        ))}
      </div>

      <div className="settings-card">
        <div className="settings-title">Danger Zone</div>
        <div className="settings-row">
          <div>
            <div style={{fontSize:"0.84rem",color:"#f87171"}}>Reset All Content</div>
            <div style={{fontSize:"0.72rem",color:"var(--muted)",marginTop:"0.2rem"}}>Restore portfolio to original data</div>
          </div>
          <button onClick={()=>window.confirm("Reset everything?")&&window.location.reload()} style={{padding:"0.45rem 1rem",background:"rgba(248,113,113,0.1)",color:"#f87171",border:"1px solid rgba(248,113,113,0.3)",borderRadius:"4px",cursor:"pointer",fontSize:"0.75rem"}}>Reset</button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
//  DASHBOARD HOME
// ══════════════════════════════════════════════
function DashboardHome({ submissions, projects, setPage }) {
  const unread = submissions.filter(s=>!s.read).length;
  return (
    <div>
      <div className="admin-header">
        <div className="admin-page-title">👋 Welcome back, Divya!</div>
        <div className="admin-page-sub">Here's your portfolio overview</div>
      </div>
      <div className="stats-row">
        {[
          ["📬","Messages",submissions.length,"submissions"],
          ["🔴","Unread",unread,"submissions"],
          ["📁","Projects",projects.length,"content"],
          ["🌐","Portfolio","Live","settings"],
        ].map(([icon,label,val,page])=>(
          <div key={label} className="stat-card" style={{cursor:"pointer"}} onClick={()=>setPage(page)}>
            <div className="stat-card-n">{icon} {val}</div>
            <div className="stat-card-l">{label}</div>
          </div>
        ))}
      </div>

      {unread > 0 && (
        <div style={{background:"rgba(13,115,119,0.08)",border:"1px solid rgba(13,115,119,0.2)",borderRadius:"6px",padding:"1.2rem 1.5rem",marginBottom:"1.5rem",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}} onClick={()=>setPage("submissions")}>
          <div>
            <div style={{fontSize:"0.85rem",color:"var(--teal)",fontWeight:500}}>🔔 {unread} unread message{unread>1?"s":""}</div>
            <div style={{fontSize:"0.75rem",color:"var(--muted)",marginTop:"0.2rem"}}>Click to view your inbox</div>
          </div>
          <span style={{color:"var(--teal)",fontSize:"1.2rem"}}>→</span>
        </div>
      )}

      <div style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:"6px",padding:"1.5rem"}}>
        <div style={{fontFamily:"'Lora',serif",fontSize:"0.9rem",color:"var(--text)",marginBottom:"1rem",fontWeight:600}}>Recent Messages</div>
        {submissions.slice(0,3).map(s=>(
          <div key={s.id} style={{padding:"0.8rem 0",borderBottom:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{fontSize:"0.84rem",color:s.read?"var(--muted)":"var(--text)",fontWeight:s.read?300:500}}>{s.name}</div>
              <div style={{fontSize:"0.74rem",color:"var(--muted)",marginTop:"0.1rem"}}>{s.subject||"No subject"}</div>
            </div>
            <div style={{fontSize:"0.7rem",color:"var(--muted)"}}>{s.date.split(" ")[0]}</div>
          </div>
        ))}
        <div style={{marginTop:"1rem"}}>
          <button onClick={()=>setPage("submissions")} style={{fontSize:"0.75rem",color:"var(--teal)",background:"transparent",border:"none",cursor:"pointer",letterSpacing:"0.5px"}}>View all messages →</button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
//  MAIN ADMIN PAGE
// ══════════════════════════════════════════════
export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [submissions, setSubmissions] = useState(FAKE_SUBMISSIONS);
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [skills, setSkills] = useState(DEFAULT_SKILLS);
  const [profile, setProfile] = useState(DEFAULT_PROFILE);

  const NAV = [
    { key:"dashboard",   icon:"🏠", label:"Dashboard" },
    { key:"submissions", icon:"📬", label:"Messages",  badge: submissions.filter(s=>!s.read).length || null },
    { key:"content",     icon:"✏️",  label:"Content Editor" },
    { key:"settings",    icon:"⚙️",  label:"Settings" },
  ];

  if (!loggedIn) return (
    <>
      <style>{adminStyles}</style>
      <LoginScreen onLogin={()=>setLoggedIn(true)} />
    </>
  );

  return (
    <>
      <style>{adminStyles}</style>
      <div className="admin-wrap">
        {/* SIDEBAR */}
        <div className="sidebar">
          <div className="sidebar-logo">Divyadharshini B</div>
          <div className="sidebar-sub">Admin Dashboard</div>
          <div className="sidebar-section">Navigation</div>
          {NAV.map(n=>(
            <button key={n.key} className={`sidebar-btn ${page===n.key?"active":""}`} onClick={()=>setPage(n.key)}>
              <span className="sidebar-icon">{n.icon}</span>
              {n.label}
              {n.badge ? <span style={{marginLeft:"auto",fontSize:"0.65rem",background:"var(--teal)",color:"#fff",borderRadius:"50px",padding:"0.1rem 0.45rem"}}>{n.badge}</span> : null}
            </button>
          ))}
          <button className="sidebar-logout" onClick={()=>setLoggedIn(false)}>
            <span className="sidebar-icon">🚪</span> Logout
          </button>
        </div>

        {/* MAIN */}
        <div className="admin-main">
          {page==="dashboard"   && <DashboardHome submissions={submissions} projects={projects} setPage={setPage} />}
          {page==="submissions" && <SubmissionsTab submissions={submissions} setSubmissions={setSubmissions} />}
          {page==="content"     && <ContentTab projects={projects} setProjects={setProjects} skills={skills} setSkills={setSkills} profile={profile} setProfile={setProfile} />}
          {page==="settings"    && <SettingsTab profile={profile} />}
        </div>
      </div>
    </>
  );
}
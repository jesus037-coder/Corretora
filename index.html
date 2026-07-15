<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Corretora do Zé</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
<style>
/* ── TOKENS ─────────────────────────────────── */
:root{
  --bg:#09110e;
  --surface:#101c16;
  --panel:#152019;
  --border:rgba(255,255,255,0.07);
  --accent:#3ddc84;
  --accent-dim:#1f7c47;
  --accent-glow:rgba(61,220,132,0.12);
  --red:#f25c5c;
  --text:#e8ede9;
  --muted:#7a9480;
  --radius:12px;
  --sw:260px;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%;background:var(--bg);color:var(--text);font-family:'Outfit',sans-serif;font-size:16.95px;overflow:hidden}
html{transition:font-size .22s ease;}
.kpi-val{font-size:clamp(.85rem,1.45em,2.4rem)!important;}
.sc-kpi-val{font-size:clamp(.65rem,.88em,1.5rem)!important;}
@media(max-width:600px){.content{padding:16px 14px;}.chart-duo{grid-template-columns:1fr;}}
em{font-style:italic}
::-webkit-scrollbar{width:4px;height:4px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:var(--accent-dim);border-radius:99px}

/* ── LOGIN ──────────────────────────────────── */
#login-screen{
  position:fixed;inset:0;z-index:9999;
  display:flex;align-items:center;justify-content:center;
  background:var(--bg);
  background-image:
    radial-gradient(ellipse 60% 50% at 50% 0%,rgba(61,220,132,.07) 0%,transparent 70%),
    radial-gradient(ellipse 30% 30% at 80% 80%,rgba(77,166,255,.04) 0%,transparent 60%);
}
.login-wrap{width:100%;max-width:420px;padding:24px}
.login-logo{text-align:center;margin-bottom:40px}
.login-logo h1{
  font-family:'DM Serif Display',serif;
  font-size:2.2rem;color:var(--text);font-weight:400;line-height:1;
}
.login-logo h1 em{color:var(--accent)}
.login-logo p{
  color:var(--muted);font-size:.72rem;text-transform:uppercase;
  letter-spacing:3px;margin-top:8px;font-family:'DM Mono',monospace;
}
.login-card{
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:20px;padding:40px;
  box-shadow:0 32px 72px rgba(0,0,0,.55);
}
.login-card h2{
  font-family:'DM Serif Display',serif;
  font-size:1.5rem;font-weight:400;margin-bottom:6px;
}
.login-card .sub{color:var(--muted);font-size:.85rem;margin-bottom:28px}
.field{margin-bottom:16px}
.field label{
  display:block;font-family:'DM Mono',monospace;
  font-size:.65rem;text-transform:uppercase;letter-spacing:2px;
  color:var(--muted);margin-bottom:8px;
}
.field input{
  width:100%;background:var(--panel);
  border:1px solid var(--border);border-radius:8px;
  padding:13px 16px;color:var(--text);
  font-family:'DM Mono',monospace;font-size:.9rem;
  outline:none;transition:border-color .2s,box-shadow .2s;
}
.field input:focus{border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-glow)}
.btn-login{
  width:100%;margin-top:24px;
  background:var(--accent);color:#09110e;
  border:none;border-radius:8px;padding:14px;
  font-family:'Outfit',sans-serif;font-size:.95rem;font-weight:700;
  cursor:pointer;letter-spacing:.3px;transition:opacity .2s;
}
.btn-login:hover{opacity:.88}
.btn-login:disabled{opacity:.4;cursor:not-allowed}
#login-err{
  display:none;margin-top:14px;padding:10px 14px;
  background:rgba(242,92,92,.08);border:1px solid rgba(242,92,92,.2);
  border-radius:8px;color:var(--red);font-size:.82rem;text-align:center;
}

/* ── APP SHELL ──────────────────────────────── */
#app{display:none;height:100vh}
#app.on{display:flex}
.sidebar{
  width:var(--sw);min-width:var(--sw);
  background:var(--surface);border-right:1px solid var(--border);
  display:flex;flex-direction:column;
  transition:width .3s,min-width .3s,opacity .3s;overflow:hidden;
}
.sidebar.off{width:0;min-width:0;opacity:0}
.sb-top{
  padding:22px 20px 14px;
  border-bottom:1px solid var(--border);
  white-space:nowrap;
}
.sb-brand{
  font-family:'DM Serif Display',serif;
  font-size:1.1rem;color:var(--text);line-height:1.2;
}
.sb-brand em{color:var(--accent)}
.sb-role{
  font-family:'DM Mono',monospace;font-size:.62rem;
  color:var(--muted);text-transform:uppercase;letter-spacing:2px;margin-top:4px;
}
.sb-ano{padding:14px 20px;border-bottom:1px solid var(--border)}
.sb-ano label{
  display:block;font-family:'DM Mono',monospace;
  font-size:.62rem;text-transform:uppercase;letter-spacing:2px;
  color:var(--muted);margin-bottom:8px;
}
.sb-ano select{
  width:100%;background:var(--panel);
  border:1px solid var(--border);border-radius:6px;
  color:var(--text);font-family:'DM Mono',monospace;
  font-size:.82rem;padding:8px 12px;outline:none;cursor:pointer;
}
.sb-ano select:focus{border-color:var(--accent)}
.nav-list{flex:1;overflow-y:auto;padding:8px 0}
.nav-item{
  display:flex;align-items:center;gap:10px;
  padding:11px 20px;cursor:pointer;white-space:nowrap;
  color:var(--muted);font-size:.88rem;font-weight:500;
  border-left:3px solid transparent;
  transition:color .15s,background .15s;
}
.nav-item:hover{color:var(--text);background:rgba(61,220,132,.04)}
.nav-item.on{color:var(--accent);background:var(--accent-glow);border-left-color:var(--accent)}
.nav-dot{
  width:7px;height:7px;border-radius:50%;
  background:var(--muted);flex-shrink:0;transition:background .15s;
}
.nav-item.on .nav-dot{background:var(--accent)}
.nav-ze{color:var(--orange)!important}
.nav-ze.on{background:rgba(255,179,71,.1)!important;border-left-color:var(--orange)!important}
.sb-foot{padding:14px 20px;border-top:1px solid var(--border)}
.btn-out{
  width:100%;background:transparent;
  border:1px solid var(--border);border-radius:8px;
  color:var(--muted);font-family:'Outfit',sans-serif;
  font-size:.82rem;padding:9px;cursor:pointer;
  transition:color .2s,border-color .2s;
}
.btn-out:hover{color:var(--red);border-color:var(--red)}

/* ── MAIN ───────────────────────────────────── */
.main-col{flex:1;overflow-y:auto;overflow-x:hidden;min-width:0;width:0;}
.topbar{
  position:sticky;top:0;z-index:50;
  background:rgba(9,17,14,.88);backdrop-filter:blur(16px);
  border-bottom:1px solid var(--border);
  padding:10px 16px;display:flex;align-items:center;gap:8px;
  min-height:54px;
}
[data-theme="light"] .topbar{background:rgba(240,245,242,.92);}
.btn-hamburger{
  background:var(--panel);border:1px solid var(--border);
  border-radius:8px;color:var(--muted);
  width:34px;height:34px;font-size:1rem;
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;flex-shrink:0;transition:color .2s,border-color .2s;
}
.btn-hamburger:hover{color:var(--accent);border-color:var(--accent)}
.topbar-title{
  font-family:'DM Serif Display',serif;
  font-size:1.1rem;font-weight:400;
  flex:1;min-width:0;
  overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
}
.topbar-meta{
  font-family:'DM Mono',monospace;
  font-size:.62rem;color:var(--muted);white-space:nowrap;
}
.topbar-actions{
  display:flex;align-items:center;gap:5px;
  flex-shrink:0;/* never shrink — title shrinks instead */
}
.tb-btn{
  background:var(--panel);border:1px solid var(--border);border-radius:8px;
  color:var(--muted);font-family:'DM Mono',monospace;
  font-size:.65rem;cursor:pointer;white-space:nowrap;
  transition:color .2s,border-color .2s,background .2s;
  display:flex;align-items:center;justify-content:center;gap:5px;
  padding:6px 8px;height:32px;flex-shrink:0;
}
.tb-btn:hover{color:var(--accent);border-color:var(--accent);}
.tb-btn.on{color:var(--accent);border-color:var(--accent);background:var(--accent-glow);}
.icon-btn{padding:6px 7px;min-width:32px;width:32px;}
.accent-btn{color:var(--accent);border-color:var(--accent-dim);}
.accent-btn:hover{background:var(--accent-glow);}
.accent-btn span{font-size:.62rem;text-transform:uppercase;letter-spacing:.5px;}
/* hide values blur */
body.hide-vals .val{
  filter:blur(7px);opacity:.3;
  user-select:none;transition:filter .3s,opacity .3s;
}
/* light theme overrides */
[data-theme="light"]{
  --bg:#f0f5f2;--surface:#ffffff;--panel:#e8f0eb;
  --border:rgba(0,0,0,0.08);--accent:#1a7c45;
  --accent-glow:rgba(26,124,69,0.1);--red:#d63030;
  --text:#0d1a10;--muted:#4a6b55;
}
[data-theme="light"] .sidebar{background:var(--surface);}
.content{padding:28px 32px;max-width:1400px;margin:0 auto}

/* ── MOBILE MODE (body.is-mobile) ─────────── */
body.is-mobile .content{padding:10px 10px;}
body.is-mobile .topbar{padding:8px 10px;gap:6px;}
body.is-mobile .topbar-title{font-size:.9rem;}
body.is-mobile .kpi-row{grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:16px;}
body.is-mobile .kpi{padding:14px 14px;}
body.is-mobile .kpi-val{font-size:1.1rem;}
body.is-mobile .kpi-hint{font-size:.65rem;}
body.is-mobile .chart-duo{grid-template-columns:1fr;gap:10px;}
body.is-mobile .chart-box{padding:14px 12px;margin-bottom:12px;}
body.is-mobile .chart-box canvas{max-width:100%!important;}
body.is-mobile .chart-h-evol{height:160px!important;}
body.is-mobile .chart-h-bar{height:150px!important;}
body.is-mobile .chart-h-hist{height:180px!important;}
body.is-mobile .seg-stack{gap:8px;}
body.is-mobile .tbl-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;}
body.is-mobile table{min-width:480px;}
/* Trava nome do segmento e do ativo à esquerda no scroll horizontal */
body.is-mobile .seg-hdr td{
  position:sticky;left:0;z-index:3;
  min-width:90px;max-width:120px;
  white-space:nowrap;
}
body.is-mobile .td-l{
  position:sticky;left:0;z-index:2;
  background:var(--surface);
  box-shadow:2px 0 6px rgba(0,0,0,.2);
  min-width:80px;max-width:110px;
  white-space:nowrap;
}
body.is-mobile .td-l{background:rgba(255,255,255,.03);}
body.is-mobile .topbar-meta{display:none;}
body.is-mobile .sec-head{margin:20px 0 10px;}
body.is-mobile .sec-head h3{font-size:1rem;}

/* ── CALCULADORA ────────────────────────────── */
.calc-wrap{display:flex;flex-direction:column;gap:20px;min-width:0}

/* Card retrátil de inputs */
.calc-card{
  background:var(--surface);border:1px solid var(--border);
  border-radius:var(--radius);overflow:hidden;
  transition:box-shadow .2s;
}
.calc-card:hover{box-shadow:0 4px 20px rgba(0,0,0,.3)}
.calc-card-head{
  display:flex;align-items:center;justify-content:space-between;
  padding:16px 20px;cursor:pointer;
  border-bottom:1px solid transparent;
  transition:background .15s,border-color .2s;
  user-select:none;
}
.calc-card-head:hover{background:rgba(255,255,255,.02)}
.calc-card.open .calc-card-head{border-bottom-color:var(--border)}
.calc-card-title{
  display:flex;align-items:center;gap:10px;
  font-family:'DM Serif Display',serif;font-size:1rem;font-weight:400;
}
.calc-card-title svg{color:var(--accent);flex-shrink:0}
.calc-card-arrow{
  color:var(--muted);transition:transform .25s cubic-bezier(.4,0,.2,1);
  flex-shrink:0;
}
.calc-card.open .calc-card-arrow{transform:rotate(180deg)}
.calc-card-body{
  max-height:0;overflow:hidden;
  transition:max-height .35s cubic-bezier(.4,0,.2,1);
}
.calc-card.open .calc-card-body{max-height:600px}
.calc-card-inner{padding:20px;display:grid;grid-template-columns:1fr 1fr;gap:18px}
@media(max-width:600px){.calc-card-inner{grid-template-columns:1fr}}

/* Preview chips no header quando fechado */
.calc-preview{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.calc-chip{
  background:var(--panel);border:1px solid var(--border);
  border-radius:6px;padding:3px 10px;
  font-family:'DM Mono',monospace;font-size:.62rem;
  color:var(--muted);white-space:nowrap;
}
.calc-chip span{color:var(--accent);font-weight:600}
.calc-card.open .calc-preview{display:none}

/* Campos de input */
.calc-field{display:flex;flex-direction:column;gap:0}
.calc-field label{
  display:block;font-family:'DM Mono',monospace;
  font-size:.6rem;text-transform:uppercase;letter-spacing:1.5px;
  color:var(--muted);margin-bottom:8px;
}
.calc-field input{
  width:100%;background:var(--panel);border:1px solid var(--border);
  border-radius:8px;padding:11px 14px;color:var(--text);
  font-family:'DM Mono',monospace;font-size:.9rem;
  outline:none;transition:border-color .2s,box-shadow .2s;
}
.calc-field input:focus{border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-glow)}
.calc-hint{display:block;font-family:'DM Mono',monospace;font-size:.72rem;color:var(--accent);margin-top:6px}

/* Toggle mensal / anual */
.calc-toggle-row{
  grid-column:1/-1;
  display:flex;align-items:center;gap:10px;
}
.calc-toggle-row label{
  font-family:'DM Mono',monospace;font-size:.6rem;
  text-transform:uppercase;letter-spacing:1.5px;color:var(--muted);
  white-space:nowrap;
}
.calc-toggle{
  display:flex;background:var(--panel);border:1px solid var(--border);
  border-radius:8px;overflow:hidden;flex-shrink:0;
}
.calc-toggle button{
  padding:7px 14px;background:transparent;border:none;
  font-family:'DM Mono',monospace;font-size:.72rem;
  color:var(--muted);cursor:pointer;transition:background .15s,color .15s;
  white-space:nowrap;
}
.calc-toggle button.on{
  background:var(--accent-glow);color:var(--accent);
  border:1px solid rgba(61,220,132,.3);border-radius:6px;
}

/* Grid de KPIs resultado */
.calc-kpi-grid{
  display:grid;grid-template-columns:repeat(3,1fr);gap:12px;
}
@media(max-width:700px){.calc-kpi-grid{grid-template-columns:repeat(2,1fr)}}
.calc-kpi{
  background:var(--surface);border:1px solid var(--border);
  border-radius:10px;padding:14px;
  animation:up .3s ease both;
  position:relative;overflow:hidden;
}
.calc-kpi::after{
  content:'';position:absolute;bottom:0;left:0;right:0;height:2px;
  background:var(--accent);opacity:.2;
}
.calc-kpi.hi::after{opacity:.6}
.calc-kpi-lbl{
  font-family:'DM Mono',monospace;font-size:.58rem;
  text-transform:uppercase;letter-spacing:1.5px;color:var(--muted);margin-bottom:6px;
}
.calc-kpi-val{
  font-family:'DM Mono',monospace;font-size:1.05rem;
  font-weight:600;color:var(--text);line-height:1.2;
}
.calc-kpi-val.g{color:var(--accent)}
.calc-kpi-sub{font-family:'DM Mono',monospace;font-size:.68rem;color:var(--muted);margin-top:4px}

/* Tabela de projeção anual */
.calc-tbl-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;margin-top:4px}
.calc-tbl{
  width:100%;border-collapse:collapse;font-family:'DM Mono',monospace;
  font-size:.76rem;min-width:520px;
}
.calc-tbl thead th{
  padding:9px 14px;text-align:right;
  font-size:.6rem;text-transform:uppercase;letter-spacing:1.5px;
  color:var(--muted);border-bottom:1px solid var(--border);
}
.calc-tbl thead th:first-child{text-align:left}
.calc-tbl tbody td{
  padding:9px 14px;text-align:right;border-bottom:1px solid var(--border);
  color:var(--text);
}
.calc-tbl tbody td:first-child{text-align:left;color:var(--muted)}
.calc-tbl tbody tr:hover td{background:rgba(255,255,255,.02)}
.calc-tbl .g{color:var(--accent)}
.calc-tbl tfoot td{
  padding:10px 14px;text-align:right;
  font-weight:600;color:var(--accent);
  border-top:1px solid var(--border);
  font-size:.82rem;
}
.calc-tbl tfoot td:first-child{text-align:left}
.calc-empty{
  text-align:center;padding:60px 20px;
  font-family:'DM Mono',monospace;font-size:.8rem;color:var(--muted);
}
.calc-empty svg{display:block;margin:0 auto 16px;opacity:.3}

/* ── CARD MOBILE: design moderno e limpo ── */
body.is-mobile .seg-stack{gap:8px;}
body.is-mobile .sc{border-radius:14px;overflow:hidden;}

/* Header: linha única — badge colorido + KPIs compactos */
body.is-mobile .sc-head{
  flex-direction:column;
  min-height:auto;
  align-items:stretch;
  position:relative;
}

/* Stripe mais grossa como indicador visual */
body.is-mobile .sc-stripe{height:4px;}

/* Linha 1: badge com abreviação à esquerda, indicador de abrir/fechar à direita */
body.is-mobile .sc-icon{
  width:100%;height:44px;
  border-right:none;
  border-bottom:none;
  flex-direction:row;gap:10px;
  justify-content:flex-start;align-items:center;
  padding:0 14px;
  font-size:.72rem;font-weight:700;
  letter-spacing:1.5px;text-transform:uppercase;
}
/* Mostrar indicador de tap (chevron) no canto direito */
body.is-mobile .sc-icon::after{
  content:'›';
  position:absolute;right:14px;
  font-size:1.4rem;font-weight:300;
  color:currentColor;opacity:.5;
  transition:transform .25s ease;
  line-height:1;
}
body.is-mobile .sc.open .sc-icon::after{transform:rotate(90deg);}
body.is-mobile .sc-arr{display:none;}
body.is-mobile .sc-icon-name{display:none;}

/* KPIs: grid 3×2, visual de pill/chip compacto */
body.is-mobile .sc-kpis{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:0;
  background:var(--panel);
  border-top:1px solid var(--border);
  padding:10px 10px 8px;
  gap:6px;
}
body.is-mobile .sc-kpi{
  display:flex;flex-direction:column;
  align-items:center;justify-content:center;
  padding:8px 4px;gap:4px;
  background:var(--surface);
  border-radius:8px;
  border:none;/* remove dividers — usa cards individuais */
}
/* Remove border overrides herdados */
body.is-mobile .sc-kpi:nth-child(n){border-right:none;border-bottom:none;}
body.is-mobile .sc-kpi-lbl{
  font-size:.52rem;letter-spacing:.3px;
  text-align:center;color:var(--muted);
  text-transform:uppercase;font-weight:500;
  line-height:1;
}
body.is-mobile .sc-kpi-val{
  font-size:.86rem;font-weight:700;
  text-align:center;line-height:1;
}

/* Corpo expandido: padding antes da tabela */
body.is-mobile .sc-body{
  overflow-x:auto;
  -webkit-overflow-scrolling:touch;
  border-top:1px solid var(--border);
}
body.is-mobile .sc-body{overflow-x:auto;-webkit-overflow-scrolling:touch;}
body.is-mobile .sc-tbl{min-width:700px;}
body.is-mobile .sc-tbl thead th:first-child{
  position:sticky;left:0;z-index:3;
  background:var(--panel);
}
body.is-mobile .sc-tbl tbody td:first-child{
  position:sticky;left:0;z-index:2;
  background:var(--surface);
  box-shadow:2px 0 6px rgba(0,0,0,.25);
}
body.is-mobile .sc-tbl tbody tr:hover td:first-child{background:rgba(255,255,255,.03);}
body.is-mobile .sc-tbl thead th{padding:10px 14px;font-size:.6rem;}
body.is-mobile .sc-tbl tbody td{padding:0 14px;height:44px;font-size:.8rem;}

/* ── LOADER ─────────────────────────────────── */
#loader{
  position:fixed;inset:0;z-index:200;
  background:rgba(9,17,14,.88);backdrop-filter:blur(10px);
  display:none;flex-direction:column;
  align-items:center;justify-content:center;gap:18px;
}
#loader.on{display:flex}
.spin{
  width:44px;height:44px;border-radius:50%;
  border:3px solid var(--border);border-top-color:var(--accent);
  animation:spin .8s linear infinite;
}
@keyframes spin{to{transform:rotate(360deg)}}
.spin-txt{
  font-family:'DM Mono',monospace;font-size:.72rem;
  color:var(--muted);letter-spacing:2px;text-transform:uppercase;
}

/* ── KPI CARDS ──────────────────────────────── */
.kpi-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin-bottom:28px}
.kpi{
  background:var(--surface);border:1px solid var(--border);
  border-radius:var(--radius);padding:20px 22px;
  position:relative;overflow:hidden;
}
.kpi::after{
  content:'';position:absolute;bottom:0;left:0;right:0;height:2px;
  background:var(--accent);opacity:.3;
}
.kpi.bad::after{background:var(--red)}
.kpi-lbl{
  font-family:'DM Mono',monospace;font-size:.65rem;
  text-transform:uppercase;letter-spacing:2px;color:var(--muted);margin-bottom:10px;
}
.kpi-val{
  font-family:'DM Mono',monospace;
  font-size:1.45rem;font-weight:500;line-height:1.1;
  color:var(--text);
}
.kpi-val.g{color:var(--accent)}
.kpi-val.r{color:var(--red)}
.kpi-hint{font-family:'DM Mono',monospace;font-size:.75rem;color:var(--muted);margin-top:5px}

/* ── SECTION HEAD ───────────────────────────── */
.sec-head{display:flex;align-items:center;gap:10px;margin:32px 0 14px}
.sec-head h3{font-family:'DM Serif Display',serif;font-weight:400;font-size:1.2rem}
.tag{
  background:var(--accent-glow);color:var(--accent);
  font-family:'DM Mono',monospace;font-size:.6rem;
  padding:3px 10px;border-radius:99px;
  border:1px solid rgba(61,220,132,.22);
  text-transform:uppercase;letter-spacing:1px;
}

/* ── CHARTS ─────────────────────────────────── */
.chart-box{
  background:var(--surface);border:1px solid var(--border);
  border-radius:var(--radius);padding:20px;margin-bottom:20px;
  min-width:0;overflow:hidden;box-sizing:border-box;width:100%;
}
.chart-ttl{
  font-family:'DM Mono',monospace;font-size:.65rem;
  color:var(--muted);text-transform:uppercase;letter-spacing:2px;margin-bottom:14px;
}
.chart-duo{display:grid;grid-template-columns:2fr 1fr;gap:16px;margin-bottom:20px;min-width:0;}
@media(max-width:860px){.chart-duo{grid-template-columns:1fr}}

/* ── SEGMENT CARDS ──────────────────────────── */
.seg-stack{display:flex;flex-direction:column;gap:10px;margin-bottom:28px}

.sc{
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:var(--radius);
  overflow:hidden;
  transition:border-color .2s,box-shadow .2s;
}
.sc:hover{border-color:rgba(255,255,255,.12);box-shadow:0 4px 20px rgba(0,0,0,.3)}

/* colour stripe at top */
.sc-stripe{height:2px;width:100%}

/* header — always visible, contains icon + KPIs + arrow */
.sc-head{
  display:flex;align-items:stretch;
  cursor:pointer;
  border-bottom:1px solid var(--border);
  min-height:62px;
  transition:background .15s;
}
.sc-head:hover{background:rgba(255,255,255,.02)}

/* segment icon badge */
.sc-icon{
  flex-shrink:0;width:68px;
  display:flex;align-items:center;justify-content:center;
  border-right:1px solid var(--border);
  font-family:'DM Mono',monospace;font-size:.58rem;
  font-weight:700;letter-spacing:.5px;text-align:center;line-height:1.4;
  border-radius:0;
}

/* KPI strip */
.sc-kpis{flex:1;display:flex;align-items:stretch}
.sc-kpi{
  flex:1;display:flex;flex-direction:column;
  align-items:center;justify-content:center;
  padding:8px 4px;gap:5px;
  border-right:1px solid var(--border);
}
.sc-kpi:last-child{border-right:none}
.sc-kpi-lbl{
  font-family:'DM Mono',monospace;font-size:.55rem;
  text-transform:uppercase;letter-spacing:1px;
  color:var(--muted);line-height:1;
}
.sc-kpi-val{
  font-family:'DM Mono',monospace;
  font-size:.88rem;font-weight:600;
  color:var(--text);line-height:1;
}
.sc-kpi-val.g{color:var(--accent)}
.sc-kpi-val.r{color:var(--red)}
.sc-kpi-val.m{color:var(--muted)}
/* icon name hidden on desktop, visible on mobile */
.sc-icon-name{display:none;font-weight:700;font-size:.72rem;letter-spacing:1px;text-transform:uppercase;}

/* arrow — SVG chevron moderno */
.sc-arr{
  flex-shrink:0;width:40px;
  display:flex;align-items:center;justify-content:center;
  border-left:1px solid var(--border);
  color:var(--muted);
  transition:transform .25s cubic-bezier(.4,0,.2,1);
}
.sc.open .sc-arr{transform:rotate(90deg)}

/* expandable body */
.sc-body{display:none;overflow-x:auto}
.sc.open .sc-body{display:block}

/* inner table */
.sc-tbl{width:100%;border-collapse:collapse;min-width:700px}
.sc-tbl thead th{
  background:var(--panel);color:var(--muted);
  font-family:'DM Mono',monospace;font-size:.6rem;
  font-weight:500;text-transform:uppercase;letter-spacing:1px;
  padding:10px 14px;border-bottom:1px solid var(--border);
  text-align:center;white-space:nowrap;
  cursor:pointer;user-select:none;transition:color .15s;
}
.sc-tbl thead th:hover{color:var(--accent);}
.sc-tbl thead th:first-child{text-align:left}
.sort-ico{display:inline-block;margin-left:3px;font-size:.55rem;opacity:.3;vertical-align:middle;}
.sort-ico::after{content:'⇅';}
th.sort-asc .sort-ico{opacity:1;color:var(--accent);}
th.sort-asc .sort-ico::after{content:'▲';}
th.sort-desc .sort-ico{opacity:1;color:var(--accent);}
th.sort-desc .sort-ico::after{content:'▼';}
.sc-tbl tbody td{
  padding:0 14px;height:44px;
  border-bottom:1px solid var(--border);
  text-align:center;color:var(--text);
  font-family:'DM Mono',monospace;font-size:.8rem;
}
.sc-tbl tbody tr:last-child td{border-bottom:none}
.sc-tbl tbody tr:hover td{background:rgba(255,255,255,.02)}
.sc-tbl td:first-child{text-align:left;font-weight:700}

/* ── PROVENTOS TABLE ────────────────────────── */
.tbl-wrap{
  background:var(--surface);border:1px solid var(--border);
  border-radius:var(--radius);overflow:hidden;margin-bottom:22px;
}
.tbl-scroll{overflow-x:auto}
table{width:100%;border-collapse:collapse;min-width:860px}
thead th{
  background:var(--panel);color:var(--muted);
  font-family:'DM Mono',monospace;font-size:.62rem;
  font-weight:500;text-transform:uppercase;letter-spacing:1.5px;
  padding:12px 12px;border-bottom:1px solid var(--border);
  cursor:pointer;white-space:nowrap;user-select:none;
  transition:color .15s;
}
thead th:hover{color:var(--accent)}
tbody td{
  padding:0 12px;height:48px;
  border-bottom:1px solid var(--border);
  text-align:center;color:var(--text);
  font-family:'DM Mono',monospace;font-size:.8rem;
  transition:background .15s;
}
tbody tr:last-child td{border-bottom:none}
tbody tr:hover td{background:rgba(255,255,255,.02)}
.td-l{text-align:left!important;font-weight:600;position:sticky;left:0;z-index:2;background:var(--surface)}
tr:hover .td-l{background:rgba(255,255,255,.025)}
.seg-hdr td{
  background:var(--panel)!important;
  color:var(--accent)!important;
  font-family:'DM Mono',monospace;font-size:.65rem;
  text-transform:uppercase;letter-spacing:2px;
  text-align:left!important;
  padding-left:16px!important;cursor:pointer;
  border-bottom:1px solid var(--border);
}
.seg-hdr:hover td{opacity:.75}
.hide{display:none}
tfoot td{
  background:var(--panel)!important;color:var(--accent)!important;
  font-weight:600;font-family:'DM Mono',monospace;
  border-top:1px solid var(--border);padding:11px 12px;text-align:center;
}
tfoot .td-l{background:var(--panel)!important;color:var(--accent)!important;text-align:left!important}
.pc{line-height:1.3}
.pu{font-size:.8rem}
.pe,.pt{display:none;font-size:.65rem;margin-top:2px}
.pe{color:var(--muted)}.pt{color:var(--accent)}
.col-on .pu{color:var(--muted);font-size:.65rem}
.col-on .pe,.col-on .pt{display:block}

/* ── TABS ────────────────────────────────── */
.tabs-bar{
  display:flex;gap:4px;
  padding:4px;
  background:var(--panel);
  border:1px solid var(--border);
  border-radius:10px;
  margin-bottom:24px;
  width:fit-content;
}
.tab-btn{
  display:flex;align-items:center;gap:7px;
  padding:8px 18px;
  border:none;border-radius:7px;
  background:transparent;
  color:var(--muted);
  font-family:'Outfit',sans-serif;font-size:.85rem;font-weight:500;
  cursor:pointer;transition:background .18s,color .18s;
  white-space:nowrap;
}
.tab-btn svg{flex-shrink:0;}
.tab-btn:hover{color:var(--text);background:rgba(255,255,255,.04);}
.tab-btn.tab-on{
  background:var(--surface);
  color:var(--accent);
  box-shadow:0 1px 4px rgba(0,0,0,.25);
}
.tab-pane{animation:fadeUp .25s ease both;}
.tab-hidden{display:none;}
[data-theme="light"] .tabs-bar{background:var(--panel);}
[data-theme="light"] .tab-btn.tab-on{background:var(--bg);}
.empty{padding:80px 40px;text-align:center}
.empty .ico{font-size:3rem;margin-bottom:16px;opacity:.25}
.empty p{color:var(--muted);font-size:.9rem}
@keyframes up{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
.anim{animation:up .35s ease both}
.btn-rst{
  background:transparent;border:1px solid var(--border);
  color:var(--muted);font-family:'DM Mono',monospace;
  font-size:.6rem;padding:5px 10px;border-radius:6px;cursor:pointer;
  transition:color .2s,border-color .2s;
}
.btn-rst:hover{color:var(--accent);border-color:var(--accent)}
/* ── MODAL LANÇAMENTO ───────────────────────── */
.modal-overlay{
  position:fixed;inset:0;z-index:1000;
  background:rgba(0,0,0,.72);backdrop-filter:blur(8px);
  display:none;align-items:center;justify-content:center;padding:20px;
}
.modal-overlay.on{display:flex;}
.modal{
  background:var(--surface);border:1px solid var(--border);
  border-radius:20px;width:100%;max-width:520px;
  box-shadow:0 40px 80px rgba(0,0,0,.6);
  overflow:hidden;animation:up .25s ease;
}
.modal-header{
  display:flex;align-items:center;justify-content:space-between;
  padding:22px 28px 18px;border-bottom:1px solid var(--border);
}
.modal-header h3{
  font-family:'DM Serif Display',serif;font-weight:400;font-size:1.25rem;
}
.modal-close{
  background:var(--panel);border:1px solid var(--border);border-radius:8px;
  color:var(--muted);width:32px;height:32px;font-size:1rem;cursor:pointer;
  display:flex;align-items:center;justify-content:center;transition:color .2s;
}
.modal-close:hover{color:var(--red);border-color:var(--red);}
.modal-body{padding:24px 28px;display:flex;flex-direction:column;gap:16px;}
.modal-row{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.modal-row.triple{grid-template-columns:1fr 1fr 1fr;}
.mfield{display:flex;flex-direction:column;gap:6px;}
.mfield label{
  font-family:'DM Mono',monospace;font-size:.62rem;
  text-transform:uppercase;letter-spacing:1.5px;color:var(--muted);
}
.mfield input,.mfield select{
  background:var(--panel);border:1px solid var(--border);border-radius:8px;
  padding:11px 14px;color:var(--text);
  font-family:'DM Mono',monospace;font-size:.88rem;
  outline:none;transition:border-color .2s,box-shadow .2s;width:100%;
}
.mfield input:focus,.mfield select:focus{
  border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-glow);
}
.mfield select option{background:var(--panel);}
/* CV toggle */
.cv-toggle{display:flex;gap:0;border-radius:8px;overflow:hidden;border:1px solid var(--border);}
.cv-btn{
  flex:1;padding:11px 0;font-family:'DM Mono',monospace;font-size:.82rem;
  font-weight:600;cursor:pointer;border:none;background:var(--panel);
  color:var(--muted);transition:background .15s,color .15s;letter-spacing:1px;
}
.cv-btn.compra.on{background:var(--accent);color:#09110e;}
.cv-btn.venda.on{background:var(--red);color:#fff;}
/* total preview */
.total-preview{
  background:var(--panel);border:1px solid var(--border);border-radius:8px;
  padding:14px 18px;display:flex;justify-content:space-between;align-items:center;
}
.total-preview span:first-child{font-family:'DM Mono',monospace;font-size:.65rem;text-transform:uppercase;letter-spacing:2px;color:var(--muted);}
.total-preview span:last-child{font-family:'DM Mono',monospace;font-size:1.1rem;font-weight:600;color:var(--accent);}
.total-preview span:last-child.r{color:var(--red);}
.modal-footer{padding:0 28px 24px;display:flex;gap:12px;}
.btn-submit{
  flex:1;background:var(--accent);color:#09110e;border:none;border-radius:10px;
  padding:14px;font-family:'Outfit',sans-serif;font-size:.95rem;font-weight:700;
  cursor:pointer;transition:opacity .2s;letter-spacing:.3px;
}
.btn-submit:hover{opacity:.88;}
.btn-submit:disabled{opacity:.4;cursor:not-allowed;}
.btn-cancel{
  background:transparent;border:1px solid var(--border);border-radius:10px;
  color:var(--muted);padding:14px 20px;font-family:'Outfit',sans-serif;
  font-size:.9rem;cursor:pointer;transition:color .2s,border-color .2s;
}
.btn-cancel:hover{color:var(--red);border-color:var(--red);}
.modal-msg{
  margin:0 28px 20px;padding:10px 14px;border-radius:8px;
  font-family:'DM Mono',monospace;font-size:.78rem;text-align:center;
  display:none;
}
.modal-msg.ok{background:rgba(61,220,132,.1);border:1px solid rgba(61,220,132,.3);color:var(--accent);}
.modal-msg.err{background:rgba(242,92,92,.1);border:1px solid rgba(242,92,92,.3);color:var(--red);}

/* ── METAS ──────────────────────────────────── */
/* Botão de toggle principal */
.btn-lancar-meta{
  display:inline-flex;align-items:center;gap:8px;
  background:var(--accent-glow);border:1px solid rgba(61,220,132,.3);
  border-radius:8px;color:var(--accent);
  font-family:'DM Mono',monospace;font-size:.72rem;
  text-transform:uppercase;letter-spacing:1px;
  padding:10px 18px;cursor:pointer;
  transition:background .18s,border-color .18s;
  margin-bottom:20px;
}
.btn-lancar-meta:hover{background:rgba(61,220,132,.18);border-color:var(--accent)}
.btn-lancar-meta.cancelar{color:var(--muted);border-color:var(--border);background:transparent}
.btn-lancar-meta.cancelar:hover{color:var(--red);border-color:var(--red)}

/* Formulário colapsável */
.meta-form-panel{
  background:var(--surface);border:1px solid var(--border);
  border-radius:var(--radius);padding:22px;
  display:none;flex-direction:column;gap:16px;
  margin-bottom:20px;animation:up .22s ease both;
}
.meta-form-panel.aberto{display:flex;}
.meta-form-row{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
@media(max-width:600px){.meta-form-row{grid-template-columns:1fr;}}
.meta-field label{display:block;font-family:'DM Mono',monospace;font-size:.6rem;text-transform:uppercase;letter-spacing:1.5px;color:var(--muted);margin-bottom:8px}
.meta-field select,.meta-field input{width:100%;background:var(--panel);border:1px solid var(--border);border-radius:8px;padding:11px 14px;color:var(--text);font-family:'DM Mono',monospace;font-size:.9rem;outline:none;transition:border-color .2s,box-shadow .2s}
.meta-field select:focus,.meta-field input:focus{border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-glow)}
.meta-field select option{background:var(--panel);}
.meta-hint{display:block;font-family:'DM Mono',monospace;font-size:.72rem;color:var(--muted);margin-top:8px}
.btn-salvar-meta{margin-top:4px;background:var(--accent);color:#09110e;border:none;border-radius:8px;font-family:'DM Mono',monospace;font-size:.72rem;text-transform:uppercase;letter-spacing:1px;padding:10px 18px;cursor:pointer;transition:opacity .18s;width:100%;font-weight:700;}
.btn-salvar-meta:hover{opacity:.88}
.btn-salvar-meta:disabled{opacity:.4;cursor:not-allowed}
.meta-msg{padding:10px 14px;border-radius:8px;font-family:'DM Mono',monospace;font-size:.75rem;text-align:center;display:none;margin-top:4px}
.meta-msg.ok{background:rgba(61,220,132,.1);border:1px solid rgba(61,220,132,.3);color:var(--accent);}
.meta-msg.err{background:rgba(242,92,92,.1);border:1px solid rgba(242,92,92,.3);color:var(--red);}

/* Lista vertical de cards de objetivos */
.meta-objetivos{display:flex;flex-direction:column;gap:16px;}

/* Card individual de objetivo */
.meta-card{
  background:var(--surface);border:1px solid var(--border);
  border-radius:var(--radius);padding:22px 24px;
  display:flex;flex-direction:column;gap:14px;
  animation:up .3s ease both;
}
.meta-card-header{display:flex;align-items:center;justify-content:space-between;gap:12px;}
.meta-card-tipo{
  font-family:'DM Mono',monospace;font-size:.6rem;
  text-transform:uppercase;letter-spacing:2px;color:var(--muted);
  background:var(--panel);border:1px solid var(--border);
  border-radius:99px;padding:3px 10px;
}
.meta-card-pct{
  font-family:'DM Mono',monospace;font-size:1.4rem;font-weight:700;
  color:var(--accent);line-height:1;
}
.meta-card-pct.over{color:var(--red);}
.meta-bar-bg{width:100%;height:10px;background:var(--panel);border-radius:99px;overflow:hidden;border:1px solid var(--border);}
.meta-bar-fill{height:100%;border-radius:99px;transition:width 1s cubic-bezier(.4,0,.2,1);background:linear-gradient(90deg,var(--accent-dim),var(--accent));}
.meta-bar-fill.over{background:linear-gradient(90deg,#b03030,var(--red));}
/* Estado "meta atingida" — visual de sucesso (verde/dourado), distinto do
   ".over" vermelho usado em outros lugares da página (ex: venda) */
.meta-card.atingida{border-color:var(--accent);box-shadow:0 0 0 1px var(--accent-dim) inset;}
.meta-card-badge-sucesso{
  font-family:'DM Mono',monospace;font-size:.6rem;font-weight:700;
  text-transform:uppercase;letter-spacing:1.2px;color:#0a1f14;
  background:var(--accent);border-radius:99px;padding:5px 12px;
  display:inline-flex;align-items:center;gap:6px;width:fit-content;
}
.meta-bar-fill.atingida{background:linear-gradient(90deg,var(--accent),#ffd76a);}
.meta-card-vals{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;}
.meta-val-item{display:flex;flex-direction:column;gap:4px;}
.meta-val-lbl{font-family:'DM Mono',monospace;font-size:.55rem;text-transform:uppercase;letter-spacing:1.5px;color:var(--muted);}
.meta-val-num{font-family:'DM Mono',monospace;font-size:.92rem;font-weight:600;color:var(--text);}
.meta-val-num.g{color:var(--accent);}.meta-val-num.r{color:var(--red);}
/* Pré-visualização ao vivo dentro do formulário de nova meta */
.meta-draft-wrap{margin:14px 0;}
.meta-draft-lbl{font-family:'DM Mono',monospace;font-size:.55rem;text-transform:uppercase;letter-spacing:1.5px;color:var(--muted);display:block;margin-bottom:8px;}
/* Card vazio — sem meta */
.meta-empty-card{
  background:var(--surface);border:1px dashed var(--border);
  border-radius:var(--radius);padding:36px;text-align:center;
}
.meta-empty-card p{color:var(--muted);font-size:.88rem;margin-top:8px;}
</style>
</head>
<body>

<!-- ── LOGIN ── -->
<div id="login-screen">
  <div class="login-wrap">
    <div class="login-logo">
      <h1>Corretora do <em>Zé</em></h1>
      <p>Investment Dashboard</p>
    </div>
    <div class="login-card">
      <h2>Acesso Restrito</h2>
      <p class="sub">Insira suas credenciais para continuar</p>
      <div class="field">
        <label>E-mail</label>
        <input type="email" id="inp-email" placeholder="seu@email.com" autocomplete="email"/>
      </div>
      <div class="field">
        <label>Senha</label>
        <input type="password" id="inp-senha" placeholder="••••••••" autocomplete="current-password"/>
      </div>
      <button class="btn-login" id="btn-login" onclick="doLogin()">Entrar</button>
      <div id="login-err"></div>
    </div>
  </div>
</div>

<!-- ── LOADER ── -->
<div id="loader">
  <div class="spin"></div>
  <div class="spin-txt">Carregando…</div>
</div>

<!-- ── APP ── -->
<div id="app">
  <aside class="sidebar" id="sidebar">
    <div class="sb-top">
      <div class="sb-brand">Corretora do <em>Zé</em></div>
      <div class="sb-role" id="sb-role">—</div>
    </div>
    <div class="sb-ano">
      <label>Ano de referência</label>
      <select id="sel-ano" onchange="reload()">
        <option value="TODOS">📅 Todos os Anos</option>
        <option value="2026" selected>2026</option>
        <option value="2025">2025</option>
        <option value="2024">2024</option>
      </select>
    </div>
    <nav class="nav-list" id="nav-list"></nav>
    <div class="sb-foot">
      <button class="btn-out" onclick="doLogout()">↩ Sair</button>
    </div>
  </aside>

  <div class="main-col">
    <div class="topbar">
      <button class="btn-hamburger" onclick="toggleSB()">☰</button>
      <div class="topbar-title" id="tb-title">Dashboard</div>
      <div class="topbar-actions">
        <div class="topbar-meta" id="tb-meta"></div>
        <span id="refresh-dot" title="Auto-refresh a cada 1 min" style="width:7px;height:7px;border-radius:50%;background:var(--accent);display:inline-block;opacity:.5;transition:opacity .3s,background .3s;flex-shrink:0"></span>
        <!-- Lançar -->
        <button class="tb-btn icon-btn accent-btn" id="btn-lancar" onclick="abrirModal()" title="Novo lançamento (C/V)">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="6.5" stroke="currentColor" stroke-width="1.5"/><path d="M7.5 4.5v6M4.5 7.5h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          <span>Lançar</span>
        </button>
        <!-- DIRPF -->
        <button class="tb-btn icon-btn" id="btn-dirpf" onclick="renderDIRPF()" title="Gerar Relatório de Imposto de Renda">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M3.5 1.5h5l3 3v8a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
            <path d="M8.5 1.5v3h3" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
            <path d="M5 8h5M5 10.5h5M5 5.5h1.5" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/>
          </svg>
        </button>
        <!-- Atualizar -->
        <button class="tb-btn icon-btn" id="btn-refresh" onclick="refreshManual()" title="Atualizar dados agora">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M12.5 7.5a5 5 0 1 1-1.5-3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M11 1v4h-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <!-- Tamanho fonte / layout -->
        <button class="tb-btn icon-btn" id="btn-font" onclick="cycleFont()" title="Mudar para modo Mobile">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="2" width="14" height="9" rx="1.5" stroke="currentColor" stroke-width="1.4"/><path d="M5 15h6M8 11v4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
        </button>
        <!-- Ocultar valores -->
        <button class="tb-btn icon-btn" id="btn-hide" onclick="toggleHide()" title="Ocultar/mostrar valores">
          <svg id="ico-hide" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <ellipse cx="8" cy="8" rx="6" ry="4" stroke="currentColor" stroke-width="1.4"/>
            <circle cx="8" cy="8" r="2" fill="currentColor"/>
          </svg>
        </button>
        <!-- Tema claro/escuro -->
        <button class="tb-btn icon-btn" id="btn-theme" onclick="toggleTheme()" title="Tema claro / escuro">
          <svg id="ico-theme" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1a7 7 0 1 0 7 7A7 7 0 0 0 8 1zm0 1v12a6 6 0 0 1 0-12z" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </div>
    <div class="content" id="content">
      <div class="empty"><div class="ico">📊</div><p>Selecione um cliente na barra lateral.</p></div>
    </div>
  </div>
</div>

<!-- ── MODAL LANÇAMENTO ── -->
<div class="modal-overlay" id="modal-overlay" onclick="fecharModalFora(event)">
  <div class="modal" id="modal">
    <div class="modal-header">
      <h3>Lançar Operação</h3>
      <button class="modal-close" onclick="fecharModal()">✕</button>
    </div>
    <div class="modal-body">
      <div class="mfield">
        <label>Cliente</label>
        <select id="m-cliente"></select>
      </div>
      <div class="mfield">
        <label>Tipo de Operação</label>
        <div class="cv-toggle">
          <button class="cv-btn compra on" id="cv-c" onclick="setCv('Compra')">COMPRA</button>
          <button class="cv-btn venda" id="cv-v" onclick="setCv('Venda')">VENDA</button>
        </div>
      </div>
      <div class="modal-row">
        <div class="mfield">
          <label>Ativo (ticker)</label>
          <input id="m-ativo" type="text" placeholder="Ex: MXRF11" oninput="this.value=this.value.toUpperCase();calcTotal();lookupPreco(this.value)"/>
          <span id="m-preco-hint" style="font-family:'DM Mono',monospace;font-size:.65rem;color:var(--accent);margin-top:4px;display:none;"></span>
        </div>
        <div class="mfield">
          <label>Segmento / Tipo</label>
          <select id="m-tipo">
            <option value="FIIs">FIIs</option>
            <option value="Ações">Ações</option>
            <option value="ETFs">ETFs</option>
            <option value="BDRs">BDRs</option>
            <option value="Cripto">Cripto</option>
            <option value="Renda Fixa">Renda Fixa</option>
            <option value="Outros">Outros</option>
          </select>
        </div>
      </div>
      <div class="modal-row triple">
        <div class="mfield">
          <label>Quantidade</label>
          <input id="m-qtd" type="number" min="0" step="1" placeholder="0" oninput="calcTotal()"/>
        </div>
        <div class="mfield">
          <label>Preço Unit. (R$)</label>
          <input id="m-preco" type="number" min="0" step="0.01" placeholder="0,00" oninput="calcTotal()"/>
        </div>
        <div class="mfield">
          <label>Data</label>
          <input id="m-data" type="date"/>
        </div>
      </div>
      <div class="total-preview">
        <span>Total da Operação</span>
        <span id="m-total">R$ 0,00</span>
      </div>
    </div>
    <div class="modal-msg" id="modal-msg"></div>
    <div class="modal-footer">
      <button class="btn-cancel" onclick="fecharModal()">Cancelar</button>
      <button class="btn-submit" id="btn-submit" onclick="enviarLancamento()">Confirmar Lançamento</button>
    </div>
  </div>
</div>

<script>
/* ── CONFIG ───────────────────────────────── */
var URLS={
  CL:'https://docs.google.com/spreadsheets/d/e/2PACX-1vTSK8g8oRJz0bjVrf1h-VkiexuxLkn1G089uORtY7ZZH-nJdjIB4PMUnqx9y8N0CA1ujpi9e5aV_XKf/pub?gid=42982816&single=true&output=csv',
  PA:'https://docs.google.com/spreadsheets/d/e/2PACX-1vTSK8g8oRJz0bjVrf1h-VkiexuxLkn1G089uORtY7ZZH-nJdjIB4PMUnqx9y8N0CA1ujpi9e5aV_XKf/pub?gid=1605208368&single=true&output=csv',
  DI:'https://docs.google.com/spreadsheets/d/e/2PACX-1vTSK8g8oRJz0bjVrf1h-VkiexuxLkn1G089uORtY7ZZH-nJdjIB4PMUnqx9y8N0CA1ujpi9e5aV_XKf/pub?gid=948257245&single=true&output=csv',
  AT:'https://docs.google.com/spreadsheets/d/e/2PACX-1vTSK8g8oRJz0bjVrf1h-VkiexuxLkn1G089uORtY7ZZH-nJdjIB4PMUnqx9y8N0CA1ujpi9e5aV_XKf/pub?gid=713165597&single=true&output=csv',
  MT:'https://docs.google.com/spreadsheets/d/e/2PACX-1vTSK8g8oRJz0bjVrf1h-VkiexuxLkn1G089uORtY7ZZH-nJdjIB4PMUnqx9y8N0CA1ujpi9e5aV_XKf/pub?gid=1743696611&single=true&output=csv'
};
var MES=['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
var PAL=['#3ddc84','#4da6ff','#b388ff','#f25c5c','#ffb347','#40c4ff','#a5d6a7','#ef9a9a'];
var GC='rgba(255,255,255,0.04)',TC='#7a9480';
function chartColors(){
  var light=document.documentElement.getAttribute('data-theme')==='light';
  return {gc:light?'rgba(0,0,0,0.05)':'rgba(255,255,255,0.04)',tc:light?'#4a6b55':'#7a9480'};
}

/* ── STATE ────────────────────────────────── */
var SES={nome:'',admin:false};
var RAW={at:[],pa:[],di:[],mt:[]};
var METAS={}; // { 'NomeCliente': { tipo: 'Patrimônio'|'Renda', valor: Number } }
var DADOS={};
var PRECOS={};
var INFO_ATIVOS={}; // { TICKER: {cnpj} } — mapeado a partir de BASE_ATIVOS
var SEGMENTOS={};
var CLIENTES=[];
var anoSel=2026;
var clienteAtivo=null;
var cE=null,cB=null,cP=null;
var _refreshTimer=null;
var _fontSize=1;
// Estado persistente de UI — sobrevive a re-renders
var _UI={cardAberto:null, cardSg:null, cardCor:null, provAberto:null, colsAtivas:{}, abaAtiva:'carteira'};

/* ── UTILS ────────────────────────────────── */
function n(v){
  if(v===null||v===undefined||v==='')return 0;
  if(typeof v==='number')return v;
  var x=parseFloat(v.toString().replace('R$','').replace(/\./g,'').replace(',','.').trim());
  return isNaN(x)?0:x;
}
function dt(s){
  if(!s)return null;s=s.toString().trim();
  if(s.indexOf('/')>=0){var p=s.split('/');if(p.length===3)return new Date(+p[2],+p[1]-1,+p[0]);}
  var d=new Date(s);return isNaN(d.getTime())?null:d;
}
function parseCSV(t){
  var rows=[],lines=t.split('\n');
  for(var i=0;i<lines.length;i++){
    if(!lines[i].trim())continue;
    var cols=[],cur='',q=false;
    for(var j=0;j<lines[i].length;j++){
      var c=lines[i][j];
      if(c==='"'){q=!q;continue;}
      if(c===','&&!q){cols.push(cur.trim());cur='';}else cur+=c;
    }
    cols.push(cur.trim());rows.push(cols);
  }
  return rows;
}
function csv(url){
  return fetch(url).then(function(r){return r.text();}).then(parseCSV);
}
function R(x){return Math.round(x*100)/100;}
function M(v){return(+(v)||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL',minimumFractionDigits:2});}
function load(v){document.getElementById('loader').classList.toggle('on',v);}
function gc(v){return v>=0?'g':'r';}
// Normaliza C/Compra → 'Compra' | V/Venda → 'Venda'
function normCV(raw){
  var s=(raw||'').toString().trim().toUpperCase();
  if(s==='C'||s==='COMPRA')return 'Compra';
  if(s==='V'||s==='VENDA')return 'Venda';
  return raw; // mantém original se não reconhecido
}
function isCompra(cv){
  var s=(cv||'').toString().trim().toUpperCase();
  return s==='C'||s==='COMPRA';
}

/* ── LOGIN ────────────────────────────────── */
document.getElementById('inp-senha').addEventListener('keypress',function(e){if(e.key==='Enter')doLogin();});

function doLogin(){
  var email=document.getElementById('inp-email').value.trim().toLowerCase();
  var senha=document.getElementById('inp-senha').value.trim();
  var err=document.getElementById('login-err');
  var btn=document.getElementById('btn-login');
  err.style.display='none';
  if(!email||!senha){err.textContent='Preencha todos os campos.';err.style.display='block';return;}
  btn.disabled=true;btn.textContent='Verificando…';load(true);
  csv(URLS.CL).then(function(rows){
    var ok=false;
    for(var i=1;i<rows.length;i++){
      if((rows[i][1]||'').trim().toLowerCase()===email&&(rows[i][2]||'').trim()===senha){
        SES.nome=(rows[i][3]||'').trim();
        var st=(rows[i][5]||'').trim().toUpperCase();
        SES.admin=(st==='ADMIN'||st==='ADMINISTRADOR');
        ok=true;break;
      }
    }
    if(!ok)throw new Error('E-mail ou senha incorretos.');
    document.getElementById('login-screen').style.display='none';
    document.getElementById('app').classList.add('on');
    document.getElementById('sb-role').textContent=SES.admin?'Administrador':SES.nome;
    detectarDispositivo();
    return init();
  }).catch(function(e){
    err.textContent=e.message||'Erro ao conectar.';err.style.display='block';
    btn.disabled=false;btn.textContent='Entrar';load(false);
  });
}

function doLogout(){
  SES={nome:'',admin:false};RAW={at:[],pa:[],di:[],mt:[]};
  DADOS={};PRECOS={};CLIENTES=[];clienteAtivo=null;METAS={};
  document.getElementById('app').classList.remove('on');
  document.getElementById('login-screen').style.display='flex';
  document.getElementById('btn-login').disabled=false;
  document.getElementById('btn-login').textContent='Entrar';
  document.getElementById('inp-email').value='';
  document.getElementById('inp-senha').value='';
}

/* ── AUTO REFRESH ─────────────────────────── */
function startRefresh(){} // desativado
function stopRefresh(){}

/* ── FONT SIZE CYCLE ──────────────────────── */
/* Dois modos: desktop (padrão 113%) e mobile (compacto) */
var _modoMobile=false;

function cycleFont(){
  _modoMobile=!_modoMobile;
  aplicarModo(_modoMobile);
}

function aplicarModo(mobile){
  _modoMobile=mobile;
  var btn=document.getElementById('btn-font');
  var sidebar=document.getElementById('sidebar');
  if(mobile){
    document.body.classList.add('is-mobile');
    document.documentElement.style.fontSize='13px';
    if(sidebar)sidebar.classList.add('off');
    if(btn){
      btn.title='Mudar para Desktop';
      btn.innerHTML='<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="2" width="14" height="9" rx="1.5" stroke="currentColor" stroke-width="1.4"/><path d="M5 15h6M8 11v4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>';
      btn.classList.add('on');
    }
  }else{
    document.body.classList.remove('is-mobile');
    document.documentElement.style.fontSize='16.95px';
    if(btn){
      btn.title='Mudar para Mobile';
      btn.innerHTML='<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="4" y="1" width="8" height="14" rx="1.5" stroke="currentColor" stroke-width="1.4"/><circle cx="8" cy="12.5" r=".8" fill="currentColor"/></svg>';
      btn.classList.remove('on');
    }
  }
  setTimeout(function(){
    if(cE)cE.resize();if(cB)cB.resize();if(cP)cP.resize();
    // Re-render current client to pick up new chart heights
    if(clienteAtivo)pick(clienteAtivo);
  },200);
}

/* Auto-detectar mobile ao carregar */
function detectarDispositivo(){
  var isMob=window.innerWidth<768||/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  if(isMob)aplicarModo(true);
}
window.addEventListener('resize',function(){
  if(!_modoMobile&&window.innerWidth<600)aplicarModo(true);
  else if(_modoMobile&&window.innerWidth>=900)aplicarModo(false);
});

/* ── INIT ─────────────────────────────────── */
function init(){
  load(true);
  var sv=document.getElementById('sel-ano').value;
  anoSel=sv==='TODOS'?'TODOS':parseInt(sv);
  return Promise.all([csv(URLS.AT),csv(URLS.PA),csv(URLS.DI),csv(URLS.MT)]).then(function(r){
    RAW.at=r[0];RAW.pa=r[1];RAW.di=r[2];RAW.mt=r[3];
    parseMetas();
    PRECOS={};
    SEGMENTOS={};
    INFO_ATIVOS={};
    for(var i=1;i<RAW.at.length;i++){
      var tk=(RAW.at[i][2]||'').trim().toUpperCase();
      if(tk){
        PRECOS[tk]=n(RAW.at[i][3]);
        var sg=(RAW.at[i][1]||'').trim();
        if(sg)SEGMENTOS[tk]=sg;
        // Ajuste o índice 4 abaixo se o CNPJ estiver em outra coluna da sua planilha
        INFO_ATIVOS[tk]={cnpj:(RAW.at[i][4]||'').trim()};
      }
    }
    var aSet={};
    for(var j=1;j<RAW.pa.length;j++){var d=dt(RAW.pa[j][7]);if(d)aSet[d.getFullYear()]=1;}
    var anos=Object.keys(aSet).map(Number).sort();
    // Rebuild select
    var sel=document.getElementById('sel-ano');
    var prev=sel.value;
    sel.innerHTML='<option value="TODOS">📅 Todos os Anos</option>';
    for(var ai=anos.length-1;ai>=0;ai--){
      var o=document.createElement('option');
      o.value=anos[ai];o.textContent=anos[ai];
      if(String(anos[ai])===prev)o.selected=true;
      sel.appendChild(o);
    }
    if(prev)sel.value=prev;
    DADOS={};
    anos.forEach(function(a){DADOS[a]=buildAno(a);});
    // Injetar usuário "Zé" que consolida TODOS os clientes (apenas admin vê)
    if(SES.admin){
      anos.forEach(function(a){injetarZe(a);});
    }
    var cSet={};
    anos.forEach(function(a){(DADOS[a].cl||[]).forEach(function(c){cSet[c]=1;});});
    CLIENTES=Object.keys(cSet).sort();
    buildNav();
    var alvo=clienteAtivo&&(CLIENTES.indexOf(clienteAtivo)>=0||clienteAtivo==='__ZE__')
      ?clienteAtivo:(SES.admin?'__ZE__':SES.nome);
    if(alvo)pick(alvo);
    else document.getElementById('content').innerHTML='<div class="empty"><div class="ico">🔍</div><p>Sem dados.</p></div>';
  }).catch(function(e){
    document.getElementById('content').innerHTML='<div class="empty"><div class="ico">⚠️</div><p>'+e.message+'</p></div>';
  }).finally(function(){load(false);});
}
function reload(){
  _UI.cardAberto=null;_UI.cardSg=null;_UI.cardCor=null;_UI.provAberto=null;_UI.colsAtivas={};_UI.abaAtiva='carteira';
  init();
}

/* ── BUILD ANO ────────────────────────────── */
function buildAno(ano){
  var pat={},evol={},cl=[];
  for(var r=1;r<RAW.pa.length;r++){
    var row=RAW.pa[r];
    var cli=(row[0]||'').trim();
    if(!cli||cli.toUpperCase()==='CLIENTE'||cli.length<3)continue;
    if(/[A-Z]{4}[0-9]/.test(cli))continue;
    if(!SES.admin&&cli.toUpperCase()!==SES.nome.toUpperCase())continue;
    var d=dt(row[7]);if(!d)continue;
    var yr=d.getFullYear();if(yr>ano)continue;
    if(cl.indexOf(cli)<0)cl.push(cli);
    if(!pat[cli])pat[cli]=[];
    var cv=normCV((row[3]||'').trim());
    var tot=n(row[6]);
    pat[cli].push({a:(row[1]||'').trim().toUpperCase(),t:(row[2]||'').trim().toUpperCase(),cv:cv,q:n(row[4]),tot:tot,dt:row[7],_d:d});
  }

  // Ordenar por data ASC — crítico para PM correto
  Object.keys(pat).forEach(function(c){
    pat[c].sort(function(a,b){return a._d-b._d;});
  });

  // Calcular evolução mensal reaproveitando pat já ordenado (sem reler RAW.pa)
  cl.forEach(function(c){
    var arr=Array(12).fill(0);
    pat[c].forEach(function(mv){
      var d2=mv._d;
      if(!d2||d2.getFullYear()>ano)return;
      var aj2=isCompra(mv.cv)?mv.tot:-mv.tot;
      var yr2=d2.getFullYear();
      var ms2=d2.getMonth();
      var mStart=yr2<ano?0:ms2;
      for(var m=mStart;m<12;m++)arr[m]+=aj2;
    });
    evol[c]=arr;
  });

  cl.sort();
  return {pat:pat,evol:evol,prov:buildProv(pat,ano),cl:cl};
}

/* ── USUÁRIO ZÉ — consolida todas as carteiras ── */
function injetarZe(ano){
  var d=DADOS[ano];
  if(!d)return;
  var ZE='__ZE__';

  // 1. Patrimônio: merge de todos os clientes
  var patZe=[];
  d.cl.forEach(function(c){
    (d.pat[c]||[]).forEach(function(mv){patZe.push(mv);});
  });
  d.pat[ZE]=patZe;

  // 2. Evolução: soma mensal de todos os clientes
  var evolZe=Array(12).fill(0);
  d.cl.forEach(function(c){
    var ev=d.evol[c]||Array(12).fill(0);
    for(var m=0;m<12;m++)evolZe[m]+=ev[m];
  });
  d.evol[ZE]=evolZe;

  // 3. Proventos: merge dos segmentos e soma dos totais mensais
  var provZe={segs:{},tot:Array(12).fill(0)};
  d.cl.forEach(function(c){
    var pv=d.prov[c];if(!pv)return;
    // soma totais mensais
    for(var m=0;m<12;m++)provZe.tot[m]=R(provZe.tot[m]+(pv.tot[m]||0));
    // merge segmentos
    Object.keys(pv.segs).forEach(function(sg){
      if(!provZe.segs[sg])provZe.segs[sg]=[];
      pv.segs[sg].forEach(function(at){
        // agrupa por ticker: soma dadosMeses
        var ex=null;
        for(var i=0;i<provZe.segs[sg].length;i++){if(provZe.segs[sg][i].tk===at.tk){ex=provZe.segs[sg][i];break;}}
        if(!ex){
          // copia profunda dos meses
          ex={tk:at.tk,m:at.m.map(function(x){return {q:x.q,u:x.u,s:x.s};})};
          provZe.segs[sg].push(ex);
        }else{
          for(var m2=0;m2<12;m2++){
            ex.m[m2].q+=at.m[m2].q;
            ex.m[m2].s=R(ex.m[m2].s+at.m[m2].s);
            // valor unitário: mantém o maior (mesmo ativo, mesmo anuncio)
            if(parseFloat(at.m[m2].u)>parseFloat(ex.m[m2].u))ex.m[m2].u=at.m[m2].u;
          }
        }
      });
    });
  });
  d.prov[ZE]=provZe;

  // 4. Adicionar Zé à lista de clientes do ano (se ainda não estiver)
  if(d.cl.indexOf(ZE)<0)d.cl.push(ZE);
}

/* ── PROVENTOS ────────────────────────────── */
function buildProv(pat,ano){
  var res={},ann={};
  for(var r=1;r<RAW.di.length;r++){
    var row=RAW.di[r];
    var tk=(row[0]||'').trim().toUpperCase();
    var seg=(row[1]||'OUTROS').trim().toUpperCase();
    var dCom=dt(row[2]);
    var dPag=dt(row[3]);
    var tipo=(row[4]||'').toUpperCase();
    var vu=n(row[5]);
    var dRef=dPag||dCom;
    if(!tk||!dRef||dRef.getFullYear()!==ano)continue;
    var f=1; // padrão: isento
    // Regras por segmento + tipo de provento:
    // Ações - Dividendo: isento (f=1)
    // Ações - JCP/JSCP: 15% retido na fonte (f=0.85)
    // FIIs/Fiagros - Rendimento: isento (f=1)
    // ETFs - qualquer provento: 15% (f=0.85)
    // BDRs / Exterior: 30% (f=0.70)
    var segUp=seg.toUpperCase();
    if(segUp.indexOf('ETF')>=0){
      f=0.85;
    }else if(segUp.indexOf('BDR')>=0||tipo.indexOf('EXTERIOR')>=0){
      f=0.70;
    }else if(tipo.indexOf('JCP')>=0||tipo.indexOf('JSCP')>=0){
      // JCP sempre 15% independente do segmento
      f=0.85;
    }
    // Dividendos de Ações e Rendimentos de FIIs = isento (f já é 1)
    var vl=R(vu*f);
    var mes=dRef.getMonth();
    if(!ann[tk])ann[tk]={};
    if(!ann[tk][mes])ann[tk][mes]={v:0,dCom:dCom,seg:seg};
    ann[tk][mes].v=R(ann[tk][mes].v+vl);
  }
  for(var cli in pat){
    res[cli]={segs:{},tot:Array(12).fill(0)};
    var movs=pat[cli];
    var tks=[];movs.forEach(function(m){if(tks.indexOf(m.a)<0)tks.push(m.a);});
    tks.forEach(function(tk){
      var meses=[],segA='';
      for(var m=0;m<12;m++){
        var info=ann[tk]&&ann[tk][m]?ann[tk][m]:null;
        var qd=0,sub=0;
        if(info){
          segA=info.seg;
          movs.forEach(function(mv){
            if(mv.a!==tk)return;
            var dm=dt(mv.dt);
            if(dm&&dm<=info.dCom){var q=n(mv.q);qd+=isCompra(mv.cv)?q:-q;}
          });
          if(qd<0)qd=0; // protege contra dados fora de ordem
          if(qd>0){sub=R(qd*info.v);res[cli].tot[m]=R(res[cli].tot[m]+sub);}
        }
        meses.push({q:qd,u:info?info.v.toFixed(2):'0.00',s:sub});
      }
      if(meses.some(function(x){return x.s>0;})){
        var sg=segA||'OUTROS';
        if(!res[cli].segs[sg])res[cli].segs[sg]=[];
        res[cli].segs[sg].push({tk:tk,m:meses});
      }
    });
  }
  return res;
}

/* ── NAV ──────────────────────────────────── */
function buildNav(){
  var nav=document.getElementById('nav-list');nav.innerHTML='';
  // Zé primeiro (só admin)
  if(SES.admin){
    var ze=document.createElement('div');
    ze.className='nav-item nav-ze';ze.dataset.c='__ZE__';
    ze.innerHTML='<span class="nav-dot" style="background:var(--orange)"></span>⭐ Corretora — Zé';
    ze.onclick=function(){pick('__ZE__');};
    // separador visual
    var sep=document.createElement('div');
    sep.style.cssText='height:1px;background:var(--border);margin:6px 16px';
    nav.appendChild(ze);
    nav.appendChild(sep);
  }
  // Clientes normais (excluindo __ZE__)
  CLIENTES.filter(function(c){return c!=='__ZE__';}).forEach(function(c){
    var d=document.createElement('div');
    d.className='nav-item';d.dataset.c=c;
    d.innerHTML='<span class="nav-dot"></span>'+c;
    d.onclick=function(){pick(c);};
    nav.appendChild(d);
  });
}
function setActive(c){
  document.querySelectorAll('.nav-item').forEach(function(el){el.classList.toggle('on',el.dataset.c===c);});
}
function toggleSB(){
  document.getElementById('sidebar').classList.toggle('off');
  setTimeout(function(){if(cE)cE.resize();if(cB)cB.resize();if(cP)cP.resize();},320);
}

/* ── PICK CLIENT ──────────────────────────── */
function pick(c){
  // Clear UI state only if switching to a different client
  if(c!==clienteAtivo){
    _UI.cardAberto=null;
    _UI.cardSg=null;
    _UI.cardCor=null;
    _UI.provAberto=null;
    _UI.colsAtivas={};
    _UI.abaAtiva='carteira';
  }
  clienteAtivo=c;setActive(c);
  var nome=c==='__ZE__'?'⭐ Corretora — Zé':c;
  document.getElementById('tb-title').textContent=nome;
  document.getElementById('tb-meta').textContent=anoSel==='TODOS'?'Todos os Anos':'Ano '+anoSel;
  if(anoSel==='TODOS')viewTodos(c);else viewAno(c,anoSel);
}

/* ── CONSOLIDAR CARTEIRA (PM correto, ordenado por data) ── */
function consolidar(movs){
  var seg={};
  // movs já chegam ordenadas por data (feito em buildAno)
  movs.forEach(function(mv){
    var s=mv.t||'OUTROS';
    var tk=mv.a;
    if(!seg[s])seg[s]={};
    if(!seg[s][tk])seg[s][tk]={q:0,apl:0};
    var p=seg[s][tk];
    var isC=isCompra(mv.cv);
    if(isC){
      // Compra: atualiza PM ponderado
      p.apl+=mv.tot;
      p.q+=mv.q;
    } else {
      // Venda: desconta pelo PM atual
      var pm=p.q>0?p.apl/p.q:0;
      p.q-=mv.q;
      p.apl=p.q>0.0001?p.q*pm:0; // zera custo se zerou posição
      // Garante que q negativa (erro de dados) não apareça
      if(p.q<0.0001){p.q=0;p.apl=0;}
    }
  });
  return seg;
}

/* ── VIEW: ANO ÚNICO ──────────────────────── */
function viewAno(c,ano){
  var d=DADOS[ano]||{pat:{},evol:{},prov:{},cl:[]};
  var pv=d.prov[c]||{segs:{},tot:Array(12).fill(0)};
  var movs=d.pat[c]||[];

  // Consolidar por segmento/ticker (ordenado por data já garantido em buildAno)
  var seg=consolidar(movs);

  var totApl=0,totMkt=0,nAt=0;
  Object.keys(seg).forEach(function(s){
    Object.keys(seg[s]).forEach(function(tk){
      var it=seg[s][tk];
      if(it.q>0.0001){totApl+=it.apl;totMkt+=it.q*(PRECOS[tk]||0);nAt++;}
    });
  });
  var totProv=pv.tot.reduce(function(a,b){return a+b;},0);
  var lp=totMkt-totApl;
  var lpT=lp+totProv;
  var rent=totApl>0?(lpT/totApl)*100:0;
  var ideal=nAt>0?100/nAt:0;

  // Calcular evolução mensal por segmento (custo aplicado acumulado mês a mês)
  var SEG_EVOL={};
  var hoje2=new Date();
  var ml2=(ano<hoje2.getFullYear())?11:hoje2.getMonth();
  Object.keys(seg).forEach(function(s){
    var arr=Array(12).fill(0);
    // Para cada ticker do segmento, soma as movimentações mês a mês
    var tksDoSeg=Object.keys(seg[s]);
    movs.filter(function(mv){return tksDoSeg.indexOf(mv.a)>=0;}).forEach(function(mv){
      var d=dt(mv.dt||mv.dataLanc);if(!d)return;
      var anoMov=d.getFullYear();if(anoMov>ano)return;
      var mesMov=d.getMonth();
      var isC=isCompra(mv.cv);
      var val=isC?mv.tot:-mv.tot;
      var mStart=anoMov<ano?0:mesMov;
      for(var m=mStart;m<12;m++)arr[m]+=val;
    });
    // Zera meses negativos (proteção)
    for(var m=0;m<12;m++)if(arr[m]<0)arr[m]=0;
    SEG_EVOL[s]=arr;
  });
  // Total = soma de todos os segmentos (já calculado em d.evol)
  SEG_EVOL['__TOTAL__']=d.evol[c]||Array(12).fill(0);

  var h='';
  var abaAtiva=_UI.abaAtiva||'carteira';

  // ── ABAS ──
  h+='<div class="tabs-bar">';
  h+='<button class="tab-btn'+(abaAtiva==='carteira'?' tab-on':'')+'" onclick="switchTab(\'carteira\')">';
  h+='<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.4"/><rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.4"/><rect x="1" y="8" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.4"/><rect x="8" y="8" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.4"/></svg>';
  h+=' Carteira</button>';
  h+='<button class="tab-btn'+(abaAtiva==='proventos'?' tab-on':'')+'" onclick="switchTab(\'proventos\')">';
  h+='<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 10l3-3 2 2 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="2" cy="10" r="1" fill="currentColor"/></svg>';
  h+=' Proventos</button>';
  var calcBtnCls=(abaAtiva==='calc')?' tab-on':'';
  h+='<button class="tab-btn'+calcBtnCls+'" onclick="switchTab(\'calc\')">';
  h+='<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="4" height="4" rx=".8" stroke="currentColor" stroke-width="1.3"/><rect x="9" y="1" width="4" height="4" rx=".8" stroke="currentColor" stroke-width="1.3"/><rect x="1" y="9" width="4" height="4" rx=".8" stroke="currentColor" stroke-width="1.3"/><path d="M9 11h4M11 9v4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>';
  h+=' Calculadora</button>';
  h+='<button class="tab-btn'+(abaAtiva==='metas'?' tab-on':'')+'" onclick="switchTab(\'metas\')">';
  h+='<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" stroke-width="1.4"/><path d="M7 4v3l2 2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  h+=' Metas</button>';
  h+='</div>';

  // ── ABA CARTEIRA ──
  h+='<div id="tab-carteira" class="tab-pane'+(abaAtiva==='carteira'?'':' tab-hidden')+'">';
  h+='<div class="kpi-row">';
  h+=kpi('Valor Aplicado',M(totApl),'','','');
  h+=kpi('Valor de Mercado',M(totMkt),'','','g');
  h+=kpi('L / P Total',M(lp),'patrimônio s/ proventos','',gc(lp));
  h+=kpi('Proventos '+ano,M(totProv),'','','g');
  h+=kpi('Rentabilidade',M(lpT),(rent>=0?'▲':'▼')+' '+Math.abs(rent).toFixed(2)+'%',lpT<0?'bad':'',gc(lpT));
  h+='</div>';
  h+='<div class="sec-head"><h3>Evolução do Patrimônio</h3><span class="tag">mensal '+ano+'</span></div>';
  h+='<div class="chart-box"><div class="chart-ttl" id="evol-ttl" style="display:flex;align-items:center;gap:8px"><span id="evol-dot" style="width:8px;height:8px;border-radius:50%;background:#3ddc84;display:inline-block;flex-shrink:0;transition:background .3s"></span><span id="evol-lbl">Patrimônio Total Investido — '+ano+'</span></div><div class="chart-h-evol" style="height:220px"><canvas id="cvE"></canvas></div></div>';
  var segsOk=Object.keys(seg).filter(function(s){return Object.keys(seg[s]).some(function(t){return seg[s][t].q>0.0001;});});
  h+='<div class="sec-head"><h3>Consolidação de Carteira</h3><span class="tag">'+nAt+' ativos · '+segsOk.length+' segmentos</span></div>';
  h+='<div class="seg-stack">';
  segsOk.forEach(function(s,i){h+=buildCard(s,seg[s],totMkt,ideal,i);});
  h+='</div>';
  h+='</div>'; // fim tab-carteira

  // ── ABA PROVENTOS ──
  // Calcular KPIs específicos de proventos
  var hoje3=new Date();
  var mesAtual=ano<hoje3.getFullYear()?11:hoje3.getMonth();
  // Último mês com provento (retroage até encontrar um > 0)
  var provUltMes=0,mesUlt=mesAtual;
  for(var mi=mesAtual;mi>=0;mi--){
    if(pv.tot[mi]>0){provUltMes=pv.tot[mi];mesUlt=mi;break;}
  }
  var dyUltMes=totMkt>0?(provUltMes/totMkt)*100:0;
  var dyAno=totMkt>0?(totProv/totMkt)*100:0;
  var roi=totApl>0?(lpT/totApl)*100:0;

  h+='<div id="tab-proventos" class="tab-pane'+(abaAtiva==='proventos'?'':' tab-hidden')+'">';
  // KPIs de proventos
  h+='<div class="kpi-row">';
  h+=kpi('Proventos '+MES[mesUlt],M(provUltMes),'último mês com rendimento','','g');
  h+=kpi('Proventos '+ano,M(totProv),'acumulado no ano','','g');
  h+=kpi('DY Mês ('+MES[mesUlt]+')',dyUltMes.toFixed(2)+'%','dividend yield mensal','',dyUltMes>0?'g':'');
  h+=kpi('DY Ano '+ano,dyAno.toFixed(2)+'%','dividend yield anual','',dyAno>0?'g':'');
  h+=kpi('ROI Carteira',roi.toFixed(2)+'%',M(lpT),roi<0?'bad':'',gc(roi));
  h+='</div>';
  h+='<div class="sec-head"><h3>Proventos Recebidos</h3><span class="tag">ano '+ano+'</span></div>';
  h+='<div class="chart-duo">';
  h+='<div class="chart-box" style="margin-bottom:0"><div class="chart-ttl">Distribuição Mensal (R$)</div><div class="chart-h-bar" style="height:190px"><canvas id="cvB"></canvas></div></div>';
  h+='<div class="chart-box" style="margin-bottom:0"><div class="chart-ttl">Por Segmento</div><div class="chart-h-bar" style="height:190px"><canvas id="cvP"></canvas></div></div>';
  h+='</div>';
  h+=buildProvTable(pv,c);
  h+='</div>'; // fim tab-proventos

  // ABAS INDEPENDENTES
  var _latestForMeta = getLatestData(c);
  h += buildTabCalc(c, abaAtiva);
  h += buildTabMetas(c, abaAtiva);

  document.getElementById('content').innerHTML=h;
  initMetaState(_latestForMeta.mkt, _latestForMeta.rendUlt);
  requestAnimationFrame(function(){
    drawEvol(SEG_EVOL['__TOTAL__'],ano,SEG_EVOL);
    drawBarPie(pv);
    if(abaAtiva==='metas')calcMetas();
    if(abaAtiva==='calc'){setTimeout(function(){calcJuros();},80);}
  });
}

/* ── VIEW: TODOS OS ANOS ──────────────────── */
function viewTodos(c){
  // Filtrar apenas anos onde este cliente tem movimentações
  var anosGlobal=Object.keys(DADOS).map(Number).sort();
  var anos=anosGlobal.filter(function(a){
    var d=DADOS[a];
    return d&&d.pat&&d.pat[c]&&d.pat[c].length>0;
  });
  if(!anos.length){document.getElementById('content').innerHTML='<div class="empty"><div class="ico">📅</div><p>Sem dados.</p></div>';return;}

  var anoUlt=anos[anos.length-1];
  var movs=(DADOS[anoUlt].pat||{})[c]||[];
  var seg=consolidar(movs);
  var totApl=0,totMkt=0,nAt=0;
  Object.keys(seg).forEach(function(s){
    Object.keys(seg[s]).forEach(function(tk){
      var it=seg[s][tk];
      if(it.q>0.0001){totApl+=it.apl;totMkt+=it.q*(PRECOS[tk]||0);nAt++;}
    });
  });
  var ideal=nAt>0?100/nAt:0;

  // Evolução patrimonial por ano (saldo dez de cada ano)
  var saldos=anos.map(function(a){var ev=(DADOS[a].evol||{})[c];return ev?ev[11]:0;});
  // Proventos por ano
  var provAnual=anos.map(function(a){var pv=(DADOS[a].prov||{})[c];return pv?pv.tot.reduce(function(s,v){return s+v;},0):0;});
  var totProv=provAnual.reduce(function(a,b){return a+b;},0);
  var lpT=(totMkt-totApl)+totProv;
  var rent=totApl>0?(lpT/totApl)*100:0;

  // Proventos por ano por SEGMENTO (para relacionamento com cards)
  var provSegAnual={};
  Object.keys(seg).forEach(function(s){
    provSegAnual[s]=anos.map(function(a){
      var pv=(DADOS[a].prov||{})[c];
      if(!pv||!pv.segs[s])return 0;
      return pv.segs[s].reduce(function(sum,at){return sum+at.m.reduce(function(x,m){return x+m.s;},0);},0);
    });
  });
  // Guardar globalmente para uso no switchHistChart
  _histAnos=anos; _histSaldos=saldos; _histProvAnual=provAnual;
  _histProvSegAnual=provSegAnual; _histC=c;

  var h='';
  var abaAtiva=_UI.abaAtiva||'carteira';

  // ── ABAS — posicionadas acima dos KPIs ──
  h+='<div class="tabs-bar">';
  h+='<button class="tab-btn'+(abaAtiva==='carteira'?' tab-on':'')+'" onclick="switchTab(\'carteira\')">';
  h+='<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.4"/><rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.4"/><rect x="1" y="8" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.4"/><rect x="8" y="8" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.4"/></svg>';
  h+=' Carteira</button>';
  h+='<button class="tab-btn'+(abaAtiva==='proventos'?' tab-on':'')+'" onclick="switchTab(\'proventos\')">';
  h+='<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 10l3-3 2 2 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="2" cy="10" r="1" fill="currentColor"/></svg>';
  h+=' Proventos</button>';
  var calcBtnCls=(abaAtiva==='calc')?' tab-on':'';
  h+='<button class="tab-btn'+calcBtnCls+'" onclick="switchTab(\'calc\')">';
  h+='<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="4" height="4" rx=".8" stroke="currentColor" stroke-width="1.3"/><rect x="9" y="1" width="4" height="4" rx=".8" stroke="currentColor" stroke-width="1.3"/><rect x="1" y="9" width="4" height="4" rx=".8" stroke="currentColor" stroke-width="1.3"/><path d="M9 11h4M11 9v4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>';
  h+=' Calculadora</button>';
  h+='<button class="tab-btn'+(abaAtiva==='metas'?' tab-on':'')+'" onclick="switchTab(\'metas\')">';
  h+='<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" stroke-width="1.4"/><path d="M7 4v3l2 2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  h+=' Metas</button>';
  h+='</div>';

  // ── KPIs da carteira vão DENTRO da aba carteira ──
  // (definidos antes para cálculo, renderizados dentro da aba)

  // ── ABA CARTEIRA (histórico) ──
  h+='<div id="tab-carteira" class="tab-pane'+(abaAtiva==='carteira'?'':' tab-hidden')+'">';
  h+='<div class="kpi-row">';
  h+=kpi('Patrimônio Atual',M(totMkt),'valor de mercado','','g');
  h+=kpi('Total Aplicado',M(totApl),'','','');
  h+=kpi('L / P Total',M(totMkt-totApl),'s/ proventos','',gc(totMkt-totApl));
  h+=kpi('Proventos Históricos',M(totProv),anos.length+' anos','','g');
  h+=kpi('Rentabilidade Total',M(lpT),(rent>=0?'▲':'▼')+' '+Math.abs(rent).toFixed(2)+'%',lpT<0?'bad':'',gc(lpT));
  h+='</div>';
  h+='<div class="sec-head"><h3>Evolução Histórica</h3><span class="tag">'+anos[0]+' → '+anos[anos.length-1]+'</span></div>';
  h+='<div class="chart-box"><div class="chart-ttl" id="hist-ttl" style="display:flex;align-items:center;gap:8px">';
  h+='<span id="hist-dot" style="width:8px;height:8px;border-radius:50%;background:#3ddc84;display:inline-block;flex-shrink:0;transition:background .3s"></span>';
  h+='<span id="hist-lbl">Patrimônio × Proventos — Todos os Anos</span></div>';
  h+='<div class="chart-h-hist" style="height:280px"><canvas id="cvE"></canvas></div></div>';
  var segsOk=Object.keys(seg).filter(function(s){return Object.keys(seg[s]).some(function(t){return seg[s][t].q>0.0001;});});
  h+='<div class="sec-head"><h3>Consolidação de Carteira</h3><span class="tag">posição atual · '+nAt+' ativos · clique para filtrar</span></div>';
  h+='<div class="seg-stack">';
  segsOk.forEach(function(s,i){
    h+=buildCardHist(s,seg[s],totMkt,ideal,i,provSegAnual[s]||[],anos,provAnual);
  });
  h+='</div>';
  h+='</div>'; // fim tab-carteira

  // ── ABA PROVENTOS (histórico) ──
  // KPIs de proventos para modo TODOS OS ANOS
  var anoAtual=new Date().getFullYear();
  var pvAnoAtual=(DADOS[anoAtual]&&DADOS[anoAtual].prov&&DADOS[anoAtual].prov[c])||{segs:{},tot:Array(12).fill(0)};
  var provAnoAtual=pvAnoAtual.tot.reduce(function(a,b){return a+b;},0);
  var dyUltAno=anos.length>0?(provAnual[provAnual.length-1]||0):0;
  var dyUltAnoPct=totMkt>0?(dyUltAno/totMkt)*100:0;
  var dyTotalPct=totMkt>0?(totProv/totMkt)*100:0;
  var roiTotal=totApl>0?(lpT/totApl)*100:0;

  var allSegsHist={};
  anos.forEach(function(a){
    var pv=(DADOS[a].prov||{})[c];if(!pv)return;
    Object.keys(pv.segs).forEach(function(sg){
      if(!allSegsHist[sg])allSegsHist[sg]={};
      pv.segs[sg].forEach(function(at){allSegsHist[sg][at.tk]=1;});
    });
  });

  h+='<div id="tab-proventos" class="tab-pane'+(abaAtiva==='proventos'?'':' tab-hidden')+'">';
  // KPIs de proventos — modo TODOS OS ANOS
  h+='<div class="kpi-row">';
  h+=kpi('Proventos '+anoAtual,M(provAnoAtual),'ano em curso','','g');
  h+=kpi('Proventos Totais',M(totProv),anos.length+' anos acumulados','','g');
  h+=kpi('DY Último Ano',dyUltAnoPct.toFixed(2)+'%',M(dyUltAno)+' em '+anos[anos.length-1],'',dyUltAnoPct>0?'g':'');
  h+=kpi('DY Total',dyTotalPct.toFixed(2)+'%','sobre valor atual de mercado','',dyTotalPct>0?'g':'');
  h+=kpi('ROI Carteira',roiTotal.toFixed(2)+'%',M(lpT),roiTotal<0?'bad':'',gc(roiTotal));
  h+='</div>';
  h+='<div class="sec-head"><h3>Proventos Históricos</h3><span class="tag">todos os anos · clique no segmento para filtrar</span></div>';
  h+='<div class="chart-duo">';
  h+='<div class="chart-box" style="margin-bottom:0"><div class="chart-ttl" id="hist-prov-ttl" style="display:flex;align-items:center;gap:8px"><span id="hist-prov-dot" style="width:8px;height:8px;border-radius:50%;background:#3ddc84;display:inline-block;flex-shrink:0;transition:background .3s"></span><span id="hist-prov-lbl">Proventos por Ano — Total</span></div><div class="chart-h-bar" style="height:190px"><canvas id="cvB"></canvas></div></div>';
  h+='<div class="chart-box" style="margin-bottom:0"><div class="chart-ttl" id="prov-rosca-ttl">Por Segmento — Total</div><div class="chart-h-bar" style="height:190px"><canvas id="cvP"></canvas></div></div>';
  h+='</div>';

  h+='<div class="tbl-wrap"><div class="tbl-scroll"><table>';
  h+='<thead><tr>';
  h+='<th style="text-align:left"><button class="btn-rst" onclick="updChartHist(\''+c+'\',\'TOT\')">↺</button></th>';
  anos.forEach(function(a,i){
    h+='<th style="cursor:pointer" title="Clique para detalhar coluna" onclick="togColHist('+i+')">'+a+'</th>';
  });
  h+='<th>Total</th>';
  h+='</tr></thead><tbody>';

  Object.keys(allSegsHist).forEach(function(sg,si){
    var totSgAno=anos.map(function(a){
      var pv=(DADOS[a].prov||{})[c];if(!pv||!pv.segs[sg])return 0;
      return pv.segs[sg].reduce(function(s,at){return s+at.m.reduce(function(x,m){return x+m.s;},0);},0);
    });
    var totSg=totSgAno.reduce(function(a,b){return a+b;},0);
    if(totSg<=0)return;
    var sid='pvh-'+sg.replace(/\W+/g,'-');
    var col=PAL[si%PAL.length];
    h+='<tr class="seg-hdr" onclick="togProvHist(\''+sid+'\',\''+sg+'\',\''+c+'\',\''+col+'\')"><td colspan="'+(anos.length+2)+'" style="color:'+col+'">▸ '+sg+'</td></tr>';
    Object.keys(allSegsHist[sg]).forEach(function(tk){
      var vAno=anos.map(function(a){
        var pv=(DADOS[a].prov||{})[c];if(!pv||!pv.segs[sg])return 0;
        var at=pv.segs[sg].find(function(x){return x.tk===tk;});
        return at?at.m.reduce(function(s,m){return s+m.s;},0):0;
      });
      var totTk=vAno.reduce(function(a,b){return a+b;},0);
      if(totTk<=0)return;
      h+='<tr class="'+sid+' hide"><td class="td-l" style="padding-left:28px">'+tk+'</td>';
      vAno.forEach(function(v,i){h+='<td class="cih'+i+'" style="color:'+(v>0?'var(--accent)':'var(--muted)')+'">'+( v>0?M(v):'—')+'</td>';});
      h+='<td style="color:var(--accent);font-weight:600">'+M(totTk)+'</td></tr>';
    });
    h+='<tr class="'+sid+' hide" style="background:var(--panel)"><td class="td-l" style="padding-left:28px;color:var(--muted);font-size:.72rem">TOTAL '+sg+'</td>';
    totSgAno.forEach(function(v,i){h+='<td class="cih'+i+'" style="color:'+(v>0?'var(--accent)':'var(--muted)')+'"><strong>'+(v>0?M(v):'—')+'</strong></td>';});
    h+='<td style="color:var(--accent)"><strong>'+M(totSg)+'</strong></td></tr>';
  });

  h+='</tbody><tfoot><tr><td class="td-l">TOTAL ANUAL</td>';
  anos.forEach(function(a,i){var v=provAnual[i];h+='<td class="cih'+i+'" style="color:'+(v>0?'var(--accent)':'var(--muted)')+'">'+( v>0?M(v):'—')+'</td>';});
  h+='<td>'+M(totProv)+'</td></tr></tfoot></table></div></div>';
  h+='</div>'; // fim tab-proventos

  // ABAS INDEPENDENTES
  var _latestForMetaT = getLatestData(c);
  h += buildTabCalc(c, abaAtiva);
  h += buildTabMetas(c, abaAtiva);

  document.getElementById('content').innerHTML=h;
  initMetaState(_latestForMetaT.mkt, _latestForMetaT.rendUlt);

  requestAnimationFrame(function(){
    var pC=document.getElementById('tab-carteira');
    var pP=document.getElementById('tab-proventos');

    // Init carteira charts (always in visible pane or forced visible briefly)
    if(pC)pC.classList.remove('tab-hidden');
    drawHistorico(anos,saldos,provAnual);

    // Init proventos charts: show offscreen, init, then restore
    if(pP){
      pP.classList.remove('tab-hidden');
      pP.style.visibility='hidden';
      pP.style.position='absolute';
      pP.style.top='-9999px';
    }

    var cc=chartColors();var GC=cc.gc,TC=cc.tc;
    if(cB)cB.destroy();
    var ctxB=document.getElementById('cvB');
    if(ctxB){
      cB=new Chart(ctxB,{type:'bar',
        data:{labels:anos.map(String),datasets:[{label:'Proventos',data:provAnual,
          backgroundColor:anos.map(function(_,i){return PAL[i%PAL.length];}),borderRadius:5}]},
        options:{responsive:true,maintainAspectRatio:false,
          plugins:{legend:{display:false},tooltip:{callbacks:{label:function(ct){return M(ct.parsed.y);}}}},
          scales:{x:{grid:{color:GC},ticks:{color:TC}},y:{grid:{color:GC},ticks:{color:TC,callback:function(v){return M(v);}}}},
          onClick:function(_,els){if(!els.length)return;filtrarRoscaAno(_histAnos[els[0].index],_histC);}
        }
      });
    }
    drawRoscaHist(_histC,null);

    // Restore correct tab visibility
    if(abaAtiva==='carteira'){
      if(pP){pP.style.visibility='';pP.style.position='';pP.style.top='';pP.classList.add('tab-hidden');}
    }else if(abaAtiva==='metas'){
      if(pC)pC.classList.add('tab-hidden');
      if(pP){pP.style.visibility='';pP.style.position='';pP.style.top='';pP.classList.add('tab-hidden');}
      calcMetas();
    }else if(abaAtiva==='calc'){
      if(pC)pC.classList.add('tab-hidden');
      if(pP){pP.style.visibility='';pP.style.position='';pP.style.top='';pP.classList.add('tab-hidden');}
      setTimeout(function(){calcJuros();},80);
    }else{
      if(pC)pC.classList.add('tab-hidden');
      if(pP){pP.style.visibility='';pP.style.position='';pP.style.top='';}
      setTimeout(function(){if(cB)cB.resize();if(cP)cP.resize();},30);
    }
  });
}

/* ── DIRPF ────────────────────────────────── */

/* Escapa texto para uso seguro dentro de innerHTML */
function escHtml(s){
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
/* Escapa um JSON.stringify() para ser embutido dentro de um atributo
   HTML delimitado por aspas duplas (onclick="...") sem quebrar o parser */
function escAttr(s){
  return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;');
}

/* ── Heuristica: natureza fiscal do provento (Dividendo/JSCP/Outros) ── */
function classificarTipoProvento(seg, tipo){
  seg=(seg||'').toUpperCase();
  tipo=(tipo||'').toUpperCase();
  if(seg.indexOf('FII')>=0||seg.indexOf('FUNDO IMOBILI')>=0||seg.indexOf('FIAGRO')>=0)return 'RENDIMENTO_ISENTO';
  if(seg.indexOf('ETF')>=0)return 'ETF';
  if(tipo.indexOf('JCP')>=0||tipo.indexOf('JSCP')>=0)return 'JSCP';
  if(tipo.indexOf('DIVIDEND')>=0)return 'DIVIDENDO';
  return 'OUTROS';
}

/* ── Bens e Direitos -> Grupo/Codigo da Receita Federal ── */
function getBensCategory(ticker, segmento){
  var tk=(ticker||'').toUpperCase();
  var seg=(segmento||'').toUpperCase();
  if(/34$/.test(tk)){
    return {grupo:'04',codigo:'04',label:'BDR — Brazilian Depositary Receipt'};
  }
  if(seg.indexOf('FII')>=0||seg.indexOf('FUNDO IMOBILI')>=0){
    return {grupo:'07',codigo:'03',label:'Fundo de Investimento Imobiliario (FII)'};
  }
  if(seg.indexOf('FIAGRO')>=0){
    return {grupo:'07',codigo:'02',label:'Fiagro'};
  }
  if(seg.indexOf('ETF')>=0){
    return {grupo:'07',codigo:'06',label:'ETF — Fundo de Indice'};
  }
  if(/(3|4|5|11)$/.test(tk)){
    return {grupo:'03',codigo:'01',label:'Acoes'};
  }
  return {grupo:'99',codigo:'99',label:'Outros bens e direitos'};
}

/* ── Rendimentos -> Isentos vs Tributacao Exclusiva ── */
function getRendimentosCategory(ticker, segmento, tipoProvento){
  var seg=(segmento||'').toUpperCase();
  var tipo=(tipoProvento||'').toUpperCase();
  var isFII=seg.indexOf('FII')>=0||seg.indexOf('FUNDO IMOBILI')>=0||seg.indexOf('FIAGRO')>=0;
  var isETF=seg.indexOf('ETF')>=0;

  if(isFII){
    return {secao:'ISENTOS',codigo:'99',label:'Rendimentos isentos e nao tributaveis — Outros'};
  }
  if(isETF){
    return {secao:'EXCLUSIVA',codigo:'11',label:'Tributacao exclusiva — Participacoes nos lucros e resultados'};
  }
  if(tipo==='DIVIDENDO'){
    return {secao:'ISENTOS',codigo:'09',label:'Rendimentos isentos e nao tributaveis — Lucros e dividendos recebidos'};
  }
  if(tipo==='JSCP'){
    return {secao:'EXCLUSIVA',codigo:'10',label:'Tributacao exclusiva — Juros sobre capital proprio'};
  }
  return {secao:'EXCLUSIVA',codigo:'99',label:'Tributacao exclusiva — Outros'};
}

/* ── Recalcula rendimentos do cliente/ano a partir de RAW.di, preservando
   a NATUREZA do provento (perdida na agregacao de buildProv) ── */
function calcRendimentosPorNatureza(ano, cliente){
  var movs=(DADOS[ano]&&DADOS[ano].pat[cliente])||[];
  var out={};
  for(var r=1;r<RAW.di.length;r++){
    var row=RAW.di[r];
    var tk=(row[0]||'').trim().toUpperCase();
    var seg=(row[1]||'OUTROS').trim();
    var dCom=dt(row[2]);
    var dPag=dt(row[3]);
    var tipo=(row[4]||'');
    var vu=n(row[5]);
    var dRef=dPag||dCom;
    if(!tk||!dRef||dRef.getFullYear()!==ano)continue;

    var qd=0;
    movs.forEach(function(mv){
      if(mv.a!==tk)return;
      var dm=mv._d||dt(mv.dt);
      if(dm&&dm<=dCom){var q=n(mv.q);qd+=isCompra(mv.cv)?q:-q;}
    });
    if(qd<=0)continue;

    var f=1,segUp=seg.toUpperCase(),tipoUp=tipo.toUpperCase();
    if(segUp.indexOf('ETF')>=0)f=0.85;
    else if(segUp.indexOf('BDR')>=0||tipoUp.indexOf('EXTERIOR')>=0)f=0.70;
    else if(tipoUp.indexOf('JCP')>=0||tipoUp.indexOf('JSCP')>=0)f=0.85;

    var valor=R(qd*vu*f);
    var classe=classificarTipoProvento(seg,tipo);
    var key=tk+'|'+classe;
    if(!out[key])out[key]={tk:tk,seg:seg,classe:classe,valor:0};
    out[key].valor=R(out[key].valor+valor);
  }
  return out;
}

/* ── Copiar texto para a area de transferencia ── */
window.copyText=function(btn,text){
  var original=btn.textContent;
  navigator.clipboard.writeText(text).then(function(){
    btn.textContent='Copiado!';
    setTimeout(function(){btn.textContent=original;},1500);
  }).catch(function(){
    btn.textContent='Erro ao copiar';
    setTimeout(function(){btn.textContent=original;},1500);
  });
};

/* ── renderDIRPF() — versao "Passo a Passo" ── */
function renderDIRPF(){
  if(!clienteAtivo){alert('Selecione um cliente para gerar a declaracao.');return;}
  if(anoSel==='TODOS'){alert('Selecione um ano especifico (nao "Todos os Anos") para gerar a declaracao de IR.');return;}

  var ano=anoSel;
  var movs=(DADOS[ano]&&DADOS[ano].pat[clienteAtivo])||[];
  var limite=new Date(ano,11,31,23,59,59);

  var pos={};
  movs.forEach(function(mv){
    var dm=mv._d||dt(mv.dt);
    if(!dm||dm>limite)return;
    var tk=mv.a;
    if(!pos[tk])pos[tk]={q:0,custo:0};
    var p=pos[tk];
    if(isCompra(mv.cv)){p.custo+=mv.tot;p.q+=mv.q;}
    else{
      var pm=p.q>0?p.custo/p.q:0;
      p.q-=mv.q;
      p.custo=p.q>0.0001?p.q*pm:0;
      if(p.q<0.0001){p.q=0;p.custo=0;}
    }
  });

  var gruposBens={};
  Object.keys(pos).filter(function(tk){return pos[tk].q>0.0001;}).sort().forEach(function(tk){
    var cat=getBensCategory(tk,SEGMENTOS[tk]);
    var key=cat.grupo+'|'+cat.codigo;
    if(!gruposBens[key])gruposBens[key]={grupo:cat.grupo,codigo:cat.codigo,label:cat.label,itens:[]};
    var info=INFO_ATIVOS[tk]||{};
    var qtd=pos[tk].q,custo=pos[tk].custo,pm=qtd>0?custo/qtd:0;
    var texto='Em 31/12/'+ano+', possuia '+qtd.toLocaleString('pt-BR',{maximumFractionDigits:2})+' ativo(s) de '+tk+' (CNPJ: '+(info.cnpj||'nao informado')+'), adquirido(s) a custo medio de R$ '+pm.toFixed(2)+', totalizando R$ '+custo.toFixed(2)+'.';
    gruposBens[key].itens.push({tk:tk,texto:texto});
  });

  var rendMap=calcRendimentosPorNatureza(ano,clienteAtivo);
  var isentos={},exclusiva={};
  Object.keys(rendMap).forEach(function(k){
    var it=rendMap[k];
    if(it.valor<=0)return;
    var cat=getRendimentosCategory(it.tk,it.seg,it.classe);
    var bucket=cat.secao==='ISENTOS'?isentos:exclusiva;
    if(!bucket[cat.codigo])bucket[cat.codigo]={label:cat.label,itens:[]};
    var info=INFO_ATIVOS[it.tk]||{};
    var texto=cat.secao==='ISENTOS'
      ?'Rendimentos recebidos a titulo de Dividendos, pagos por '+it.tk+' (CNPJ: '+(info.cnpj||'nao informado')+'), no ano-calendario de '+ano+'.'
      :'Rendimentos pagos por '+it.tk+' (CNPJ: '+(info.cnpj||'nao informado')+'), com imposto retido na fonte, no ano-calendario de '+ano+'.';
    bucket[cat.codigo].itens.push({tk:it.tk,cnpj:info.cnpj||'—',valor:it.valor,texto:texto});
  });

  function linhaTexto(texto){
    return '<div style="display:flex;align-items:center;gap:10px;padding:10px 4px;border-bottom:1px solid var(--border)">'
      +'<div style="flex:1;font-size:13px;line-height:1.5">'+escHtml(texto)+'</div>'
      +'<button class="tb-btn" onclick="copyText(this, '+escAttr(JSON.stringify(texto))+')">Copiar</button>'
      +'</div>';
  }
  function tabelaRend(grupo){
    var h='<table class="sc-tbl"><thead><tr><th>Ticker</th><th>CNPJ</th><th>Valor Total</th><th></th></tr></thead><tbody>';
    grupo.itens.forEach(function(it){
      h+='<tr><td>'+it.tk+'</td><td>'+it.cnpj+'</td><td>'+M(it.valor)+'</td>'
        +'<td><button class="tb-btn" onclick="copyText(this, '+escAttr(JSON.stringify(it.texto))+')">Copiar</button></td></tr>';
    });
    return h+'</tbody></table>';
  }

  var h='';
  h+='<div class="sec-head"><h3>Declaracao de Imposto de Renda — Passo a Passo</h3><span class="tag">'+clienteAtivo+' · ano-base '+ano+'</span></div>';

  h+='<div class="sc open"><div class="sc-head"><div class="sc-icon" style="color:var(--accent)">BENS</div>'
    +'<div class="sc-kpis">'+ck('Secao','Bens e Direitos','')+ck('Grupos',Object.keys(gruposBens).length,'')+'</div></div>';
  h+='<div class="sc-body">';
  var chaves1=Object.keys(gruposBens).sort();
  if(!chaves1.length)h+='<p style="color:var(--muted);text-align:center">Nenhum ativo em carteira em 31/12/'+ano+'.</p>';
  chaves1.forEach(function(key){
    var g=gruposBens[key];
    h+='<div style="margin-bottom:16px">';
    h+='<p style="font-size:13px;color:var(--muted);margin-bottom:6px">Para declarar, acesse o programa da Receita Federal e siga o caminho: <b style="color:var(--text)">Bens e Direitos → Grupo '+g.grupo+' → Codigo '+g.codigo+'</b> ('+g.label+')</p>';
    g.itens.forEach(function(it){h+=linhaTexto(it.texto);});
    h+='</div>';
  });
  h+='</div></div>';

  h+='<div class="sc open"><div class="sc-head"><div class="sc-icon" style="color:var(--accent)">ISN</div>'
    +'<div class="sc-kpis">'+ck('Secao','Rend. Isentos','')+'</div></div>';
  h+='<div class="sc-body"><h4 style="margin-bottom:10px">RENDIMENTOS ISENTOS E NAO TRIBUTAVEIS</h4>';
  var codsI=Object.keys(isentos).sort();
  if(!codsI.length)h+='<p style="color:var(--muted);text-align:center">Nenhum rendimento isento recebido em '+ano+'.</p>';
  codsI.forEach(function(cod){
    var g=isentos[cod];
    h+='<p style="font-size:13px;color:var(--muted);margin:10px 0 4px">Codigo '+cod+' — '+g.label+'</p>'+tabelaRend(g);
  });
  h+='</div></div>';

  h+='<div class="sc open"><div class="sc-head"><div class="sc-icon" style="color:var(--accent)">EXC</div>'
    +'<div class="sc-kpis">'+ck('Secao','Tributacao Exclusiva','')+'</div></div>';
  h+='<div class="sc-body"><h4 style="margin-bottom:10px">RENDIMENTOS SUJEITOS A TRIBUTACAO EXCLUSIVA</h4>';
  var codsE=Object.keys(exclusiva).sort();
  if(!codsE.length)h+='<p style="color:var(--muted);text-align:center">Nenhum rendimento sujeito a tributacao exclusiva em '+ano+'.</p>';
  codsE.forEach(function(cod){
    var g=exclusiva[cod];
    h+='<p style="font-size:13px;color:var(--muted);margin:10px 0 4px">Codigo '+cod+' — '+g.label+'</p>'+tabelaRend(g);
  });
  h+='</div></div>';

  document.getElementById('content').innerHTML=h;
}

/* ── CARD HISTÓRICO — para viewTodos ─────── */
function buildCardHist(sg,tks,totMkt,ideal,idx,provSeg,anos,provTotal){
  var col=PAL[idx%PAL.length];
  var bg=col+'1a',bd=col+'44';
  var id='sch-'+sg.replace(/\W+/g,'-')+'-'+idx;
  var valid=Object.keys(tks).filter(function(t){return tks[t].q>0.0001;});
  var sApl=0,sMkt=0;
  valid.forEach(function(t){
    var it=tks[t];
    sApl+=it.apl;
    sMkt+=it.q*(PRECOS[t]||0);
  });
  var sLP=sMkt-sApl;
  var sVar=sApl>0?((sMkt/sApl)-1)*100:0;
  var sPct=totMkt>0?(sMkt/totMkt)*100:0;
  var sId=ideal*valid.length;
  var totProvSeg=(provSeg||[]).reduce(function(a,b){return a+b;},0);

  /* Header — mesmo padrão do buildCard */
  var h='<div class="sc" id="'+id+'">';
  h+='<div class="sc-stripe" style="background:'+col+'"></div>';
  h+='<div class="sc-head" onclick="flipCardHist(\''+id+'\',\''+sg.replace(/'/g,"\\'")+'\',\''+col+'\')">';
  h+='<div class="sc-icon" style="background:'+bg+';color:'+col+';border-right:1px solid '+bd+'"><span style="font-size:.9em;opacity:.7">'+sg.slice(0,5)+'</span><span class="sc-icon-name" style="margin-left:4px">'+sg+'</span></div>';
  h+='<div class="sc-kpis">';
  h+=ck('Total Atual',M(sMkt),'');
  h+=ck('L / P',M(sLP),gc(sLP));
  h+=ck('Var %',sVar.toFixed(2)+'%',gc(sVar));
  h+=ck('% Cart',sPct.toFixed(2)+'%','');
  h+=ck('% Ideal',sId.toFixed(2)+'%','m');
  h+='</div>';
  h+='<div class="sc-arr"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></div>';
  h+='</div>';

  /* Corpo expandido — mesmas colunas do buildCard + rodapé com totais */
  h+='<div class="sc-body"><table class="sc-tbl">';
  h+='<thead><tr>';
  ['Ativo','Qtd','Preço Médio','Vlr Aplicado','Preço Atual','Var %','L / P','Total Atual','% Cart.','% Ideal'].forEach(function(col,ci){
    h+='<th onclick="sortTable(\''+id+'\','+ci+')">'+col+'<span class="sort-ico"></span></th>';
  });
  h+='</tr></thead><tbody>';

  var totAplSeg=0,totMktSeg=0,totLPSeg=0;
  valid.forEach(function(tk){
    var it=tks[tk];
    var pmkt=PRECOS[tk]||0;
    var pm=it.q>0?it.apl/it.q:0;
    var vAt=it.q*pmkt;
    var lp=vAt-it.apl;
    var vp=pm>0?((pmkt/pm)-1)*100:0;
    var pc=totMkt>0?(vAt/totMkt)*100:0;
    totAplSeg+=it.apl; totMktSeg+=vAt; totLPSeg+=lp;
    h+='<tr>';
    h+='<td>'+tk+'</td>';
    h+='<td data-val="'+it.q+'">'+it.q.toLocaleString('pt-BR',{maximumFractionDigits:2})+'</td>';
    h+='<td data-val="'+pm+'">'+M(pm)+'</td>';
    h+='<td data-val="'+it.apl+'">'+M(it.apl)+'</td>';
    h+='<td data-val="'+pmkt+'" style="color:'+col+'">'+M(pmkt)+'</td>';
    h+='<td data-val="'+vp+'" style="color:'+(vp>=0?'var(--accent)':'var(--red)')+'">'+vp.toFixed(2)+'%</td>';
    h+='<td data-val="'+lp+'" style="color:'+(lp>=0?'var(--accent)':'var(--red)')+'">'+M(lp)+'</td>';
    h+='<td data-val="'+vAt+'">'+M(vAt)+'</td>';
    h+='<td data-val="'+pc+'">'+pc.toFixed(2)+'%</td>';
    h+='<td data-val="'+ideal+'" style="color:var(--muted)">'+ideal.toFixed(2)+'%</td>';
    h+='</tr>';
  });

  /* Rodapé com totais do segmento */
  var totVarSeg=totAplSeg>0?((totMktSeg/totAplSeg)-1)*100:0;
  var totPctSeg=totMkt>0?(totMktSeg/totMkt)*100:0;
  h+='</tbody>';
  h+='<tfoot><tr style="background:var(--panel)">';
  h+='<td style="text-align:left;font-weight:700;color:var(--muted);font-size:.72rem;padding-left:14px">TOTAL '+sg+'</td>';
  h+='<td>—</td><td>—</td>';
  h+='<td style="font-weight:700">'+M(totAplSeg)+'</td>';
  h+='<td>—</td>';
  h+='<td style="font-weight:700;color:'+(totVarSeg>=0?'var(--accent)':'var(--red)')+'">'+totVarSeg.toFixed(2)+'%</td>';
  h+='<td style="font-weight:700;color:'+(totLPSeg>=0?'var(--accent)':'var(--red)')+'">'+M(totLPSeg)+'</td>';
  h+='<td style="font-weight:700;color:'+(totLPSeg>=0?'var(--accent)':'var(--red)')+'">'+M(totMktSeg)+'</td>';
  h+='<td style="font-weight:700">'+totPctSeg.toFixed(2)+'%</td>';
  h+='<td style="color:var(--muted)">'+sId.toFixed(2)+'%</td>';
  h+='</tr></tfoot>';
  h+='</table></div></div>';
  return h;
}

function flipCardHist(id,sg,color){
  var card=document.getElementById(id);if(!card)return;
  var wasOpen=card.classList.contains('open');
  document.querySelectorAll('.sc').forEach(function(c){c.classList.remove('open');});
  if(!wasOpen){
    card.classList.add('open');
    addRowIndex(id);
    switchHistChart(sg,color);
  }else{
    drawHistorico(_histAnos,_histSaldos,_histProvAnual);
    var dot=document.getElementById('hist-dot');var lbl=document.getElementById('hist-lbl');
    if(dot)dot.style.background='#3ddc84';
    if(lbl)lbl.textContent='Patrimônio × Proventos — Todos os Anos';
  }
}

function switchHistChart(sg,color){
  if(!cE)return;
  var dot=document.getElementById('hist-dot');var lbl=document.getElementById('hist-lbl');
  var provSeg=_histProvSegAnual[sg]||_histAnos.map(function(){return 0;});
  var saldosSeg=_histAnos.map(function(a){
    var d=DADOS[a];if(!d)return 0;
    var movs=(d.pat||{})[_histC]||[];
    var segData=consolidar(movs);
    var mkt=0;
    if(segData[sg])Object.keys(segData[sg]).forEach(function(tk){var it=segData[sg][tk];if(it.q>0.0001)mkt+=it.q*(PRECOS[tk]||0);});
    return mkt;
  });
  if(dot)dot.style.background=color;
  if(lbl)lbl.textContent='Evolução: '+sg+' — Todos os Anos';
  cE.data.datasets[0].data=saldosSeg;
  cE.data.datasets[0].backgroundColor=(color+'55');
  cE.data.datasets[0].borderColor=color;
  cE.data.datasets[1].data=provSeg;
  cE.data.datasets[1].backgroundColor=(color+'33');
  cE.update('active');
}

// Variáveis globais do modo histórico
var _histAnos=[],_histSaldos=[],_histProvAnual=[],_histProvSegAnual={},_histC='';

/* ── BUILD SEGMENT CARD ───────────────────── */
function buildCard(sg,tks,totMkt,ideal,idx){
  var col=PAL[idx%PAL.length];
  var bg=col+'1a',bd=col+'44';
  var id='sc-'+sg.replace(/\W+/g,'-')+'-'+idx;
  var valid=Object.keys(tks).filter(function(t){return tks[t].q>0.0001;});
  var sApl=0,sMkt=0;
  valid.forEach(function(t){sApl+=tks[t].apl;sMkt+=tks[t].q*(PRECOS[t]||0);});
  var sLP=sMkt-sApl;
  var sVar=sApl>0?((sMkt/sApl)-1)*100:0;
  var sPct=totMkt>0?(sMkt/totMkt)*100:0;
  var sId=ideal*valid.length;

  var h='<div class="sc" id="'+id+'">';
  h+='<div class="sc-stripe" style="background:'+col+'"></div>';
  h+='<div class="sc-head" onclick="flipCard(\''+id+'\',\''+sg.replace(/'/g,"\\'")+'\',' +'\''+col+'\')">';
  // icon
  h+='<div class="sc-icon" style="background:'+bg+';color:'+col+';border-right:1px solid '+bd+'"><span style="font-size:.9em;opacity:.7">'+sg.slice(0,5)+'</span><span class="sc-icon-name" style="margin-left:4px">'+sg+'</span></div>';
  // kpis
  h+='<div class="sc-kpis">';
  h+=ck('Total',M(sMkt),'');
  h+=ck('L / P',M(sLP),gc(sLP));
  h+=ck('Var %',sVar.toFixed(2)+'%',gc(sVar));
  h+=ck('% Cart',sPct.toFixed(2)+'%','');
  h+=ck('% Ideal',sId.toFixed(2)+'%','m');
  h+='</div>';
  // arrow
  h+='<div class="sc-arr"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></div>';
  h+='</div>';

  // expandable table
  h+='<div class="sc-body"><table class="sc-tbl">';
  h+='<thead><tr>';
  ['Ativo','Qtd','PM','Vlr Apl.','Preço','Var %','L / P','Total','% Cart','% Ideal'].forEach(function(col,ci){
    h+='<th onclick="sortTable(\''+id+'\','+ci+')">'+col+'<span class="sort-ico"></span></th>';
  });
  h+='</tr></thead><tbody>';
  valid.forEach(function(tk){
    var it=tks[tk];
    var pmkt=PRECOS[tk]||0;
    var pm=it.q>0?it.apl/it.q:0;
    var vAt=it.q*pmkt;
    var lp=vAt-it.apl;
    var vp=pm>0?((pmkt/pm)-1)*100:0;
    var pc=totMkt>0?(vAt/totMkt)*100:0;
    h+='<tr>';
    h+='<td>'+tk+'</td>';
    h+='<td data-val="'+it.q+'">'+it.q.toLocaleString('pt-BR',{maximumFractionDigits:2})+'</td>';
    h+='<td data-val="'+pm+'">'+M(pm)+'</td>';
    h+='<td data-val="'+it.apl+'">'+M(it.apl)+'</td>';
    h+='<td data-val="'+pmkt+'" style="color:'+col+'">'+M(pmkt)+'</td>';
    h+='<td data-val="'+vp+'" style="color:'+(vp>=0?'var(--accent)':'var(--red)')+'">'+vp.toFixed(2)+'%</td>';
    h+='<td data-val="'+lp+'" style="color:'+(lp>=0?'var(--accent)':'var(--red)')+'">'+M(lp)+'</td>';
    h+='<td data-val="'+vAt+'">'+M(vAt)+'</td>';
    h+='<td data-val="'+pc+'">'+pc.toFixed(2)+'%</td>';
    h+='<td data-val="'+ideal+'" style="color:var(--muted)">'+ideal.toFixed(2)+'%</td>';
    h+='</tr>';
  });
  h+='</tbody></table></div></div>';
  return h;
}
function ck(lbl,val,cls){
  return '<div class="sc-kpi"><span class="sc-kpi-lbl">'+lbl+'</span><span class="sc-kpi-val val'+(cls?' '+cls:'')+'" >'+val+'</span></div>';
}

/* ── KPI HELPER ───────────────────────────── */
function kpi(lbl,val,hint,cardCls,valCls){
  return '<div class="kpi anim'+(cardCls?' '+cardCls:'')+'">'
    +'<div class="kpi-lbl">'+lbl+'</div>'
    +'<div class="kpi-val val'+(valCls?' '+valCls:'')+'" >'+val+'</div>'
    +(hint?'<div class="kpi-hint val">'+hint+'</div>':'')
    +'</div>';
}

/* ── PROVENTOS TABLE ──────────────────────── */
function buildProvTable(pv,c){
  var h='<div class="tbl-wrap"><div class="tbl-scroll"><table>';
  h+='<thead><tr>';
  h+='<th style="text-align:left"><button class="btn-rst" onclick="updChart(\''+c+'\',\'TOT\')">↺</button></th>';
  MES.forEach(function(m,i){h+='<th onclick="togCol('+i+')">'+m+'</th>';});
  h+='</tr></thead><tbody>';
  Object.keys(pv.segs).forEach(function(sg){
    var sid='pv-'+sg.replace(/\W+/g,'-');
    var isAberto=_UI.provAberto===sid;
    // ▸ fechado, ▾ aberto
    h+='<tr class="seg-hdr" onclick="togProv(\''+sid+'\',\''+sg+'\',\''+c+'\')"><td colspan="13">'+(isAberto?'▾':'▸')+' '+sg+'</td></tr>';
    pv.segs[sg].forEach(function(at){
      // Começa hidden — abre apenas se era o segmento ativo
      h+='<tr class="'+sid+(isAberto?'':' hide')+'"><td class="td-l" style="padding-left:28px">'+at.tk+'</td>';
      at.m.forEach(function(m,i){
        var colOn=(_UI.colsAtivas&&_UI.colsAtivas[i])?'col-on':'';
        h+='<td class="ci'+i+(colOn?' '+colOn:'')+'"><div class="pc">'
          +'<div class="pu">'+(m.s>0?'R$&nbsp;'+m.u:'—')+'</div>'
          +'<div class="pe">'+(m.q>0?m.q+' cotas':'')+'</div>'
          +'<div class="pt">'+(m.s>0?M(m.s):'')+'</div>'
          +'</div></td>';
      });
      h+='</tr>';
    });
  });
  h+='</tbody><tfoot><tr><td class="td-l">TOTAL</td>';
  pv.tot.forEach(function(t){h+='<td>'+M(t)+'</td>';});
  h+='</tr></tfoot></table></div></div>';
  return h;
}

/* ── CHARTS ───────────────────────────────── */
var _segEvol={};
var _anoEvol=2026;
var _mlEvol=11;

function drawEvol(arr,ano,segEvol){
  var cc=chartColors();var GC=cc.gc,TC=cc.tc;
  if(cE)cE.destroy();
  var ctx=document.getElementById('cvE');if(!ctx)return;
  var hoje=new Date();
  _anoEvol=ano;
  _mlEvol=(ano<hoje.getFullYear())?11:hoje.getMonth();
  _segEvol=segEvol||{};
  cE=new Chart(ctx,{type:'line',data:{labels:MES.slice(0,_mlEvol+1),datasets:[{
    label:'Patrimônio Total',data:arr.slice(0,_mlEvol+1),
    borderColor:'#3ddc84',backgroundColor:'rgba(61,220,132,.07)',
    fill:true,tension:.35,pointRadius:4,
    pointBackgroundColor:'#3ddc84',pointBorderColor:'transparent',borderWidth:2
  }]},options:{responsive:true,maintainAspectRatio:false,
    plugins:{legend:{display:false},tooltip:{callbacks:{label:function(c){return M(c.parsed.y);}}}},
    scales:{x:{grid:{color:GC},ticks:{color:TC}},y:{grid:{color:GC},ticks:{color:TC,callback:function(v){return M(v);}},beginAtZero:false}}
  }});
}

function switchEvolChart(sg,color){
  if(!cE)return;
  var arr,bc,bg;
  var dot=document.getElementById('evol-dot');
  var lbl=document.getElementById('evol-lbl');
  if(!sg||sg==='__TOTAL__'){
    arr=(_segEvol['__TOTAL__']||Array(12).fill(0)).slice(0,_mlEvol+1);
    bc='#3ddc84';bg='rgba(61,220,132,.07)';
    if(dot)dot.style.background=bc;
    if(lbl)lbl.textContent='Patrimônio Total Investido — '+_anoEvol;
  }else{
    arr=(_segEvol[sg]||Array(12).fill(0)).slice(0,_mlEvol+1);
    bc=color||'#4da6ff';bg=bc+'18';
    if(dot)dot.style.background=bc;
    if(lbl)lbl.textContent='Evolução: '+sg+' — '+_anoEvol;
  }
  cE.data.datasets[0].data=arr;
  cE.data.datasets[0].borderColor=bc;
  cE.data.datasets[0].backgroundColor=bg;
  cE.data.datasets[0].pointBackgroundColor=bc;
  cE.update('active');
}

function drawBarPie(pv){
  var cc=chartColors();var GC=cc.gc,TC=cc.tc;
  if(cB)cB.destroy();if(cP)cP.destroy();
  var ctxB=document.getElementById('cvB');
  var ctxP=document.getElementById('cvP');
  if(ctxB){
    cB=new Chart(ctxB,{type:'bar',data:{labels:MES,datasets:[{
      label:'Proventos',data:pv.tot,backgroundColor:'rgba(61,220,132,.65)',borderRadius:4
    }]},options:{responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{callbacks:{label:function(c){return M(c.parsed.y);}}}},
      scales:{x:{grid:{color:GC},ticks:{color:TC}},y:{grid:{color:GC},ticks:{color:TC,callback:function(v){return M(v);}}}}
    }});
  }
  if(ctxP){
    var sgs=Object.keys(pv.segs);
    var vs=sgs.map(function(s){return pv.segs[s].reduce(function(a,at){return a+at.m.reduce(function(x,m){return x+m.s;},0);},0);});
    cP=new Chart(ctxP,{type:'doughnut',data:{labels:sgs,datasets:[{
      data:vs,backgroundColor:PAL.slice(0,sgs.length),borderColor:'transparent',hoverOffset:5
    }]},options:{responsive:true,maintainAspectRatio:false,cutout:'65%',
      plugins:{legend:{position:'right',labels:{color:TC,font:{size:11},boxWidth:10}},
        tooltip:{callbacks:{label:function(c){return c.label+': '+M(c.parsed);}}}}
    }});
  }
}

function drawHistorico(anos,saldos,provs){
  var cc=chartColors();var GC=cc.gc,TC=cc.tc;
  if(cE)cE.destroy();if(cB)cB.destroy();
  var ctxE=document.getElementById('cvE');
  var ctxB=document.getElementById('cvB');
  var lbls=anos.map(String);
  if(ctxE){
    cE=new Chart(ctxE,{type:'bar',data:{labels:lbls,datasets:[
      {label:'Patrimônio',data:saldos,backgroundColor:'rgba(61,220,132,.55)',borderRadius:5},
      {label:'Proventos',data:provs,backgroundColor:'rgba(77,166,255,.5)',borderRadius:5}
    ]},options:{responsive:true,maintainAspectRatio:false,
      plugins:{legend:{labels:{color:TC}},tooltip:{callbacks:{label:function(c){return c.dataset.label+': '+M(c.parsed.y);}}}},
      scales:{x:{grid:{color:GC},ticks:{color:TC}},y:{grid:{color:GC},ticks:{color:TC,callback:function(v){return M(v);}},beginAtZero:true}}
    }});
  }
  if(ctxB){
    cB=new Chart(ctxB,{type:'bar',data:{labels:lbls,datasets:[{
      label:'Proventos',data:provs,
      backgroundColor:anos.map(function(_,i){return PAL[i%PAL.length];}),borderRadius:5
    }]},options:{responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{callbacks:{label:function(c){return M(c.parsed.y);}}}},
      scales:{x:{grid:{color:GC},ticks:{color:TC}},y:{grid:{color:GC},ticks:{color:TC,callback:function(v){return M(v);}}}}
    }});
  }
}


/* Rosca de proventos por segmento — total ou filtrado por ano */
function drawRoscaHist(c,anoFiltro){
  var cc=chartColors();var TC=cc.tc;
  if(cP)cP.destroy();
  var ctx=document.getElementById('cvP');if(!ctx)return;
  var segs=Object.keys(_histProvSegAnual);
  var vals,ttl;
  if(anoFiltro===null){
    vals=segs.map(function(s){return (_histProvSegAnual[s]||[]).reduce(function(a,b){return a+b;},0);});
    ttl='Por Segmento — Total';
  }else{
    var anoIdx=_histAnos.indexOf(anoFiltro);
    vals=segs.map(function(s){return anoIdx>=0&&_histProvSegAnual[s]?(_histProvSegAnual[s][anoIdx]||0):0;});
    ttl='Por Segmento — '+anoFiltro;
  }
  var lbl=document.getElementById('prov-rosca-ttl');
  if(lbl)lbl.textContent=ttl;
  var colors=segs.map(function(_,i){return PAL[i%PAL.length];});
  cP=new Chart(ctx,{type:'doughnut',data:{labels:segs,datasets:[{
    data:vals,backgroundColor:colors,borderColor:'transparent',hoverOffset:6
  }]},options:{responsive:true,maintainAspectRatio:false,cutout:'62%',
    plugins:{
      legend:{position:'right',labels:{color:TC,font:{size:11},boxWidth:10,padding:8}},
      tooltip:{callbacks:{label:function(c){return c.label+': '+M(c.parsed);}}}
    }
  }});
}
function filtrarRoscaAno(ano,c){drawRoscaHist(c,ano);}
function resetRoscaHist(){drawRoscaHist(_histC,null);}

/* ── HELPERS PROVENTOS HISTÓRICOS (modo TODOS) ── */
// Atualiza barras + rosca do painel histórico por segmento ou total
function updChartHist(c,filtro){
  var cc=chartColors();var TC=cc.tc,GC=cc.gc;
  var dot=document.getElementById('hist-prov-dot');
  var lbl=document.getElementById('hist-prov-lbl');
  if(filtro==='TOT'){
    // Barras: proventos anuais totais
    if(cB){
      cB.data.datasets[0].data=_histProvAnual;
      cB.data.datasets[0].label='Proventos';
      cB.data.datasets[0].backgroundColor=_histAnos.map(function(_,i){return PAL[i%PAL.length];});
      cB.update();
    }
    // Rosca: por segmento total
    drawRoscaHist(c,null);
    if(dot)dot.style.background='#3ddc84';
    if(lbl)lbl.textContent='Proventos por Ano — Total';
  }else{
    // Filtrado por segmento
    var provSeg=_histProvSegAnual[filtro]||_histAnos.map(function(){return 0;});
    var col=PAL[Object.keys(_histProvSegAnual).indexOf(filtro)%PAL.length]||'#4da6ff';
    if(cB){
      cB.data.datasets[0].data=provSeg;
      cB.data.datasets[0].label=filtro;
      cB.data.datasets[0].backgroundColor=col+'aa';
      cB.update();
    }
    // Rosca: tickers do segmento
    if(cP){
      var pv=null;
      // Pegar proventos do último ano que tem dados deste segmento
      for(var ai=_histAnos.length-1;ai>=0;ai--){
        var pvA=(DADOS[_histAnos[ai]].prov||{})[c];
        if(pvA&&pvA.segs[filtro]){pv=pvA;break;}
      }
      var lPie=[],dPie=[],dCol=[];
      if(pv&&pv.segs[filtro]){
        // Soma por ticker em todos os anos
        pv.segs[filtro].forEach(function(at,i){
          var tot=_histAnos.reduce(function(s,a){
            var pvx=(DADOS[a].prov||{})[c];
            if(!pvx||!pvx.segs[filtro])return s;
            var atx=pvx.segs[filtro].find(function(x){return x.tk===at.tk;});
            return s+(atx?atx.m.reduce(function(q,m){return q+m.s;},0):0);
          },0);
          lPie.push(at.tk);dPie.push(tot);dCol.push(PAL[i%PAL.length]);
        });
      }
      cP.data.labels=lPie;
      cP.data.datasets[0].data=dPie;
      cP.data.datasets[0].backgroundColor=dCol;
      cP.update();
      var rttl=document.getElementById('prov-rosca-ttl');
      if(rttl)rttl.textContent='Tickers: '+filtro;
    }
    if(dot)dot.style.background=col;
    if(lbl)lbl.textContent='Proventos por Ano — '+filtro;
  }
}

// Abre/fecha linhas do segmento E atualiza gráficos (igual ao togProv do viewAno)
function togProvHist(cls,sg,c,col){
  var rows=document.querySelectorAll('tr.'+cls);
  var wasHidden=rows.length>0&&rows[0].classList.contains('hide');
  // Recolhe todos os grupos pvh-
  document.querySelectorAll('tbody tr[class^="pvh-"],tbody tr[class*=" pvh-"]').forEach(function(r){
    r.classList.add('hide');
  });
  if(wasHidden){
    rows.forEach(function(r){r.classList.remove('hide');});
    updChartHist(c,sg);
  }else{
    updChartHist(c,'TOT');
  }
}

// Destaca coluna de ano ao clicar (mesmo visual do togCol por meses)
function togColHist(i){
  document.querySelectorAll('.cih'+i).forEach(function(el){
    el.classList.toggle('col-on');
  });
}

function updChart(c,filtro){
  if(anoSel==='TODOS')return;
  var pv=(DADOS[anoSel]&&DADOS[anoSel].prov&&DADOS[anoSel].prov[c]);
  if(!pv||!cB||!cP)return;
  var dB=Array(12).fill(0),lP=[],dP=[],dC=[];
  if(filtro==='TOT'){
    dB=pv.tot;
    Object.keys(pv.segs).forEach(function(sg,i){
      lP.push(sg);dC.push(PAL[i%PAL.length]);
      dP.push(pv.segs[sg].reduce(function(a,at){return a+at.m.reduce(function(x,m){return x+m.s;},0);},0));
    });
  }else if(pv.segs[filtro]){
    pv.segs[filtro].forEach(function(at,i){
      lP.push(at.tk);dC.push(PAL[i%PAL.length]);
      var soma=0;at.m.forEach(function(m,j){dB[j]+=m.s;soma+=m.s;});dP.push(soma);
    });
  }
  cB.data.datasets[0].data=dB;cB.update();
  cP.data.labels=lP;cP.data.datasets[0].data=dP;cP.data.datasets[0].backgroundColor=dC;cP.update();
}

/* ── UI HELPERS ───────────────────────────── */
function refreshManual(){
  var btn=document.getElementById('btn-refresh');
  if(btn){btn.style.opacity='.4';btn.style.pointerEvents='none';}
  rebuscarTudo();
  setTimeout(function(){if(btn){btn.style.opacity='1';btn.style.pointerEvents='';}},3000);
}
function toggleHide(){
  var hidden=document.body.classList.toggle('hide-vals');
  var btn=document.getElementById('btn-hide');
  btn.classList.toggle('on',hidden);
  // Swap SVG: olho aberto ↔ olho fechado (riscado)
  document.getElementById('ico-hide').innerHTML=hidden
    ?'<ellipse cx="8" cy="8" rx="6" ry="4" stroke="currentColor" stroke-width="1.4"/><line x1="3" y1="13" x2="13" y2="3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>'
    :'<ellipse cx="8" cy="8" rx="6" ry="4" stroke="currentColor" stroke-width="1.4"/><circle cx="8" cy="8" r="2" fill="currentColor"/>';
}
function toggleTheme(){
  var root=document.documentElement;
  var isLight=root.getAttribute('data-theme')==='light';
  root.setAttribute('data-theme',isLight?'dark':'light');
  var btn=document.getElementById('btn-theme');
  btn.classList.toggle('on',!isLight);
  btn.title=isLight?'Alternar para tema claro':'Alternar para tema escuro';
  // Swap SVG: sol ↔ lua
  document.getElementById('ico-theme').innerHTML=isLight
    ?'<circle cx="8" cy="8" r="3" fill="currentColor"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.2 3.2l1.4 1.4M11.4 11.4l1.4 1.4M3.2 12.8l1.4-1.4M11.4 4.6l1.4-1.4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>'
    :'<path d="M12 8.5A5 5 0 0 1 5.5 2a6 6 0 1 0 6.5 6.5z" fill="currentColor"/>';
  if(clienteAtivo)pick(clienteAtivo);
}
function switchTab(aba){
  _UI.abaAtiva=aba;
  var pC=document.getElementById('tab-carteira');
  var pP=document.getElementById('tab-proventos');
  var pK=document.getElementById('tab-calc');
  var pM=document.getElementById('tab-metas');
  if(pC)pC.classList.toggle('tab-hidden',aba!=='carteira');
  if(pP)pP.classList.toggle('tab-hidden',aba!=='proventos');
  if(pK)pK.classList.toggle('tab-hidden',aba!=='calc');
  if(pM)pM.classList.toggle('tab-hidden',aba!=='metas');
  document.querySelectorAll('.tab-btn').forEach(function(btn,i){
    var abas=['carteira','proventos','calc','metas'];
    btn.classList.toggle('tab-on',abas[i]===aba);
  });
  setTimeout(function(){
    if(cE)cE.resize();
    if(cB)cB.resize();
    if(cP)cP.resize();
    if(aba==='proventos'&&anoSel==='TODOS'&&_histAnos.length){
      if(!cB||!cP){
        var cc2=chartColors();
        if(!cB){
          var ctxB2=document.getElementById('cvB');
          if(ctxB2){
            cB=new Chart(ctxB2,{type:'bar',data:{labels:_histAnos.map(String),datasets:[{label:'Proventos',data:_histProvAnual,backgroundColor:_histAnos.map(function(_,i){return PAL[i%PAL.length];}),borderRadius:5}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{callbacks:{label:function(ct){return M(ct.parsed.y);}}}},scales:{x:{grid:{color:cc2.gc},ticks:{color:cc2.tc}},y:{grid:{color:cc2.gc},ticks:{color:cc2.tc,callback:function(v){return M(v);}}}}}});
          }
        }
        if(!cP)drawRoscaHist(_histC,null);
      }else{if(cB)cB.resize();if(cP)cP.resize();}
    }
    if(aba==='carteira'&&anoSel==='TODOS'&&_histAnos.length&&(!cE)){
      drawHistorico(_histAnos,_histSaldos,_histProvAnual);
    }
    if(aba==='calc'){
      setTimeout(function(){renderCalcChart();},80);
    }
    if(aba==='metas'){
      // Garante que _metaTotMkt e _metaRendUlt estão atualizados
      var _ltSwitch=getLatestData(clienteAtivo||'');
      initMetaState(_ltSwitch.mkt, _ltSwitch.rendUlt);
      calcMetas();
    }
  },60);
}

function flipCard(id,sg,color){
  var card=document.getElementById(id);if(!card)return;
  var wasOpen=card.classList.contains('open');
  document.querySelectorAll('.sc').forEach(function(c){c.classList.remove('open');});
  if(!wasOpen){
    card.classList.add('open');
    _UI.cardAberto=id;
    _UI.cardSg=sg;
    _UI.cardCor=color;
    switchEvolChart(sg,color);
  }else{
    _UI.cardAberto=null;
    _UI.cardSg=null;
    _UI.cardCor=null;
    switchEvolChart('__TOTAL__',null);
  }
}
function tog(cls){document.querySelectorAll('tr.'+cls).forEach(function(r){r.classList.toggle('hide');});}
function togProv(cls,sg,c){
  var rows=document.querySelectorAll('tr.'+cls);
  var wasHidden=rows.length>0&&rows[0].classList.contains('hide');
  // Colapsar todos os grupos pv-
  document.querySelectorAll('tbody tr[class^="pv-"],tbody tr[class*=" pv-"]').forEach(function(r){
    if(!/pvt-/.test(r.className))r.classList.add('hide');
  });
  if(wasHidden){
    rows.forEach(function(r){r.classList.remove('hide');});
    _UI.provAberto=cls;
    updChart(c,sg);
  }else{
    _UI.provAberto=null;
    updChart(c,'TOT');
  }
}
function sortTable(cardId,colIdx){
  var card=document.getElementById(cardId);
  if(!card)return;
  var tbl=card.querySelector('.sc-tbl');
  if(!tbl)return;
  var th=tbl.querySelectorAll('thead th')[colIdx];
  if(!th)return;

  var cur=th.classList.contains('sort-asc')?'asc':th.classList.contains('sort-desc')?'desc':'none';
  var dir=cur==='none'?'asc':cur==='asc'?'desc':'none';

  tbl.querySelectorAll('thead th').forEach(function(h){h.classList.remove('sort-asc','sort-desc');});

  var tbody=tbl.querySelector('tbody');
  var rows=Array.prototype.slice.call(tbody.querySelectorAll('tr'));

  if(dir==='none'){
    rows.sort(function(a,b){return (+a.dataset.ri||0)-(+b.dataset.ri||0);});
  }else{
    th.classList.add('sort-'+dir);
    rows.sort(function(a,b){
      var aCell=a.cells[colIdx];
      var bCell=b.cells[colIdx];
      if(!aCell||!bCell)return 0;
      // Col 0 (Ativo) = always text sort
      if(colIdx===0){
        var aT=aCell.textContent.trim();
        var bT=bCell.textContent.trim();
        var cmp=aT.localeCompare(bT,'pt-BR',{sensitivity:'base'});
        return dir==='asc'?cmp:-cmp;
      }
      // Numeric cols: prefer data-val (raw number), fallback to textContent
      var aRaw=aCell.getAttribute('data-val');
      var bRaw=bCell.getAttribute('data-val');
      if(aRaw===null)aRaw=aCell.textContent.trim().replace(/[^\d.,-]/g,'').replace(',','.');
      if(bRaw===null)bRaw=bCell.textContent.trim().replace(/[^\d.,-]/g,'').replace(',','.');
      var aNum=parseFloat(aRaw);
      var bNum=parseFloat(bRaw);
      var cmp2=(!isNaN(aNum)&&!isNaN(bNum))?(aNum-bNum):aRaw.localeCompare(bRaw,'pt-BR',{sensitivity:'base'});
      return dir==='asc'?cmp2:-cmp2;
    });
  }
  rows.forEach(function(r){tbody.appendChild(r);});
}

/* Add data-ri (row index) to tbl rows on card open for sort reset */
function addRowIndex(cardId){
  var card=document.getElementById(cardId);
  if(!card)return;
  var rows=card.querySelectorAll('.sc-tbl tbody tr');
  rows.forEach(function(r,i){r.dataset.ri=i;});
}

function togCol(i){
  document.querySelectorAll('.ci'+i).forEach(function(el){el.classList.toggle('col-on');});
  if(!_UI.colsAtivas)_UI.colsAtivas={};
  var isOn=document.querySelector('.ci'+i+'.col-on')!==null;
  if(isOn)_UI.colsAtivas[i]=true;
  else delete _UI.colsAtivas[i];
}

/* ── MODAL LANÇAMENTO ─────────────────────── */
// Cole aqui a URL do seu Google Apps Script após publicar como Web App
// Veja o arquivo codigo_gs.html para o código do Apps Script a usar
var APPS_SCRIPT_URL='https://script.google.com/macros/s/AKfycbyLA-p-xDsh5VbGNObA6xbmxJWv33V82oM0xKFWoQ4cHDCx-3U6PAr5BNOGQPznzvol/exec';

var _cvSel='Compra';

function lookupPreco(ticker){
  var hint=document.getElementById('m-preco-hint');
  if(!hint)return;
  if(!ticker||ticker.length<2){hint.style.display='none';return;}
  var p=PRECOS[ticker];
  var sg=SEGMENTOS[ticker]||'';
  if(p&&p>0){
    hint.textContent='Preço atual: '+M(p)+(sg?' · '+sg:'');
    hint.style.color='var(--accent)';
    hint.style.display='block';
    // Preenche preço automaticamente se vazio
    var inp=document.getElementById('m-preco');
    if(inp&&(!inp.value||+inp.value===0)){inp.value=p.toFixed(2);calcTotal();}
    // Preenche segmento automaticamente se encontrado
    if(sg){
      var sel=document.getElementById('m-tipo');
      if(sel){
        // Tenta encontrar opção com match exato ou parcial
        var matched=false;
        for(var i=0;i<sel.options.length;i++){
          if(sel.options[i].value.toUpperCase()===sg.toUpperCase()||
             sg.toUpperCase().indexOf(sel.options[i].value.toUpperCase())>=0||
             sel.options[i].value.toUpperCase().indexOf(sg.toUpperCase())>=0){
            sel.selectedIndex=i;matched=true;break;
          }
        }
      }
    }
  }else{
    hint.textContent='Ativo não encontrado na base';
    hint.style.color='var(--muted)';
    hint.style.display='block';
  }
}

function abrirModal(){
  var sel=document.getElementById('m-cliente');
  sel.innerHTML='';
  var lista=CLIENTES.filter(function(c){return c!=='__ZE__';});
  lista.forEach(function(c){
    var o=document.createElement('option');
    o.value=c;o.textContent=c;
    if(c===clienteAtivo)o.selected=true;
    sel.appendChild(o);
  });
  var hoje=new Date();
  var dd=String(hoje.getDate()).padStart(2,'0');
  var mm=String(hoje.getMonth()+1).padStart(2,'0');
  document.getElementById('m-data').value=hoje.getFullYear()+'-'+mm+'-'+dd;
  // Reset completo de todos os campos
  document.getElementById('m-ativo').value='';
  document.getElementById('m-qtd').value='';
  document.getElementById('m-preco').value='';
  document.getElementById('m-tipo').selectedIndex=0;
  document.getElementById('m-total').textContent='R$ 0,00';
  document.getElementById('m-total').className='';
  _cvSel='Compra';
  document.getElementById('cv-c').classList.add('on');
  document.getElementById('cv-v').classList.remove('on');
  showMsg('','');
  document.getElementById('btn-submit').disabled=false;
  document.getElementById('btn-submit').textContent='Confirmar Lançamento';
  document.getElementById('modal-overlay').classList.add('on');
  setTimeout(function(){document.getElementById('m-ativo').focus();},100);
}
function fecharModal(){
  document.getElementById('modal-overlay').classList.remove('on');
  // Limpa tudo ao fechar para não vazar dados entre lançamentos
  document.getElementById('m-ativo').value='';
  document.getElementById('m-qtd').value='';
  document.getElementById('m-preco').value='';
  document.getElementById('m-total').textContent='R$ 0,00';
  document.getElementById('m-total').className='';
  var hint=document.getElementById('m-preco-hint');
  if(hint)hint.style.display='none';
  showMsg('','');
}
function fecharModalFora(e){if(e.target===document.getElementById('modal-overlay'))fecharModal();}
function setCv(v){
  _cvSel=v;
  document.getElementById('cv-c').classList.toggle('on',v==='Compra');
  document.getElementById('cv-v').classList.toggle('on',v==='Venda');
  calcTotal();
}
function calcTotal(){
  var qtd=parseFloat(document.getElementById('m-qtd').value)||0;
  var preco=parseFloat(document.getElementById('m-preco').value)||0;
  var total=qtd*preco;
  var el=document.getElementById('m-total');
  el.textContent=total.toLocaleString('pt-BR',{style:'currency',currency:'BRL',minimumFractionDigits:2});
  el.className=_cvSel==='Venda'?'r':'';
}
function showMsg(txt,tipo){
  var el=document.getElementById('modal-msg');
  if(!txt){el.style.display='none';return;}
  el.textContent=txt;el.className='modal-msg '+tipo;el.style.display='block';
}
function enviarLancamento(){
  var cliente=document.getElementById('m-cliente').value;
  var ativo=document.getElementById('m-ativo').value.trim().toUpperCase();
  var tipo=document.getElementById('m-tipo').value;
  var qtd=parseFloat(document.getElementById('m-qtd').value);
  var preco=parseFloat(document.getElementById('m-preco').value);
  var dataVal=document.getElementById('m-data').value;
  if(!cliente){showMsg('Selecione um cliente.','err');return;}
  if(!ativo){showMsg('Informe o ticker do ativo.','err');return;}
  if(!qtd||qtd<=0){showMsg('Quantidade deve ser maior que zero.','err');return;}
  if(!preco||preco<=0){showMsg('Preço deve ser maior que zero.','err');return;}
  if(!dataVal){showMsg('Informe a data da operação.','err');return;}
  var p=dataVal.split('-');
  var dataFmt=p[2]+'/'+p[1]+'/'+p[0];
  var total=Math.round(qtd*preco*100)/100;
  var btn=document.getElementById('btn-submit');
  btn.disabled=true;btn.textContent='Enviando…';showMsg('','');
  var payload={acao:'lancar',cliente:cliente,ativo:ativo,tipo:tipo,cv:_cvSel,qtd:qtd,preco:preco,total:total,data:dataFmt};
  if(APPS_SCRIPT_URL.indexOf('SEU_ID_AQUI')>=0){
    console.log('Payload:',payload);
    showMsg('⚠️ Configure APPS_SCRIPT_URL.','err');
    btn.disabled=false;btn.textContent='Confirmar Lançamento';return;
  }
  fetch(APPS_SCRIPT_URL,{
    method:'POST',
    headers:{'Content-Type':'text/plain'},
    body:JSON.stringify(payload)
  })
  .then(function(resp){return resp.text();})
  .then(function(txt){
    // Apps Script confirmou gravação (qualquer resposta não-vazia = sucesso)
    if(!txt||txt.toLowerCase().indexOf('erro')===0){
      showMsg('Erro do servidor: '+txt,'err');
      btn.disabled=false;btn.textContent='Confirmar Lançamento';
      return;
    }
    showMsg('✓ Gravado! Atualizando dados…','ok');
    fecharModal();
    // Rebusca com retry até confirmar que a nova linha está no CSV
    rebuscarAposLancamento(RAW.pa.length,4);
  })
  .catch(function(e){
    showMsg('Erro: '+e.message,'err');
    btn.disabled=false;btn.textContent='Confirmar Lançamento';
  });
}

function indicadorOk(){
  var dot=document.getElementById('refresh-dot');
  if(!dot)return;
  dot.style.background='var(--accent)';dot.style.opacity='1';
  setTimeout(function(){dot.style.opacity='.5';},2000);
}

/* Rebusca tudo do zero (fallback ou refresh automático) */
function rebuscarTudo(){
  var dot=document.getElementById('refresh-dot');
  var meta=document.getElementById('tb-meta');
  if(dot){dot.style.opacity='1';dot.style.background='var(--orange)';}
  if(meta)meta.textContent='Sincronizando…';

  // Google Sheets ignora query params extras no pub CSV, mas precisamos
  // forçar fetch sem cache do browser — usamos cache:'no-store'
  var opts={cache:'no-store'};
  var t='&t='+Date.now();

  Promise.all([
    fetch(URLS.AT+t,opts).then(function(r){return r.text();}),
    fetch(URLS.PA+t,opts).then(function(r){return r.text();}),
    fetch(URLS.DI+t,opts).then(function(r){return r.text();}),
    fetch(URLS.MT+t,opts).then(function(r){return r.text();})
  ]).then(function(txts){
    var mudou=false;
    // Valida CSV real
    if(txts[0]&&txts[0].indexOf('<html')<0&&txts[0].trim().length>0){
      var novoAt=parseCSV(txts[0]);
      if(JSON.stringify(novoAt)!==JSON.stringify(RAW.at)){RAW.at=novoAt;mudou=true;}
    }
    if(txts[1]&&txts[1].indexOf('<html')<0&&txts[1].trim().length>0){
      var novoPa=parseCSV(txts[1]);
      if(JSON.stringify(novoPa)!==JSON.stringify(RAW.pa)){RAW.pa=novoPa;mudou=true;}
    }
    if(txts[2]&&txts[2].indexOf('<html')<0&&txts[2].trim().length>0){
      var novoDi=parseCSV(txts[2]);
      if(JSON.stringify(novoDi)!==JSON.stringify(RAW.di)){RAW.di=novoDi;mudou=true;}
    }
    if(txts[3]&&txts[3].indexOf('<html')<0&&txts[3].trim().length>0){
      var novoMt=parseCSV(txts[3]);
      if(JSON.stringify(novoMt)!==JSON.stringify(RAW.mt)){RAW.mt=novoMt;mudou=true;}
    }
    parseMetas();
    // Sempre reprocessa para refletir preços atuais mesmo sem mudança de movs
    processarEAtualizar();
    if(dot){dot.style.background='var(--accent)';dot.style.opacity='.5';}
    var now=new Date();
    var hm=now.getHours().toString().padStart(2,'0')+':'+now.getMinutes().toString().padStart(2,'0');
    if(meta)meta.textContent=mudou?'Atualizado '+hm:'Sem mudanças '+hm;
  }).catch(function(){
    if(dot){dot.style.background='var(--red)';dot.style.opacity='1';}
    if(meta)meta.textContent='Erro de conexão';
    setTimeout(function(){
      if(dot){dot.style.background='var(--accent)';dot.style.opacity='.5';}
      if(meta)meta.textContent='';
    },4000);
  });
}

/* Rebusca após lançamento: tenta até a nova linha aparecer no CSV */
function rebuscarAposLancamento(linhasAntes,tentativas){
  var dot=document.getElementById('refresh-dot');
  var meta=document.getElementById('tb-meta');
  if(dot){dot.style.opacity='1';dot.style.background='var(--orange)';}
  var opts={cache:'no-store'};
  var t='&t='+Date.now();
  Promise.all([
    fetch(URLS.AT+t,opts).then(function(r){return r.text();}),
    fetch(URLS.PA+t,opts).then(function(r){return r.text();}),
    fetch(URLS.DI+t,opts).then(function(r){return r.text();}),
    fetch(URLS.MT+t,opts).then(function(r){return r.text();})
  ]).then(function(txts){
    var atOk=txts[0]&&txts[0].indexOf('<html')<0&&txts[0].trim().length>0;
    var paOk=txts[1]&&txts[1].indexOf('<html')<0&&txts[1].trim().length>0;
    var diOk=txts[2]&&txts[2].indexOf('<html')<0&&txts[2].trim().length>0;
    var mtOk=txts[3]&&txts[3].indexOf('<html')<0&&txts[3].trim().length>0;
    var novoPa=paOk?parseCSV(txts[1]):null;
    // Verifica se a nova linha já está presente
    if(novoPa&&novoPa.length>linhasAntes){
      // Dado confirmado — atualiza tudo junto
      if(atOk)RAW.at=parseCSV(txts[0]);
      RAW.pa=novoPa;
      if(diOk)RAW.di=parseCSV(txts[2]);
      if(mtOk){RAW.mt=parseCSV(txts[3]);parseMetas();}
      processarEAtualizar();
      if(dot){dot.style.background='var(--accent)';dot.style.opacity='.5';}
      if(meta)meta.textContent='Atualizado '+new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
    }else if(tentativas>1){
      // Dado ainda não propagou — tenta de novo em 2s
      if(dot){dot.style.background='var(--orange)';dot.style.opacity='.8';}
      setTimeout(function(){rebuscarAposLancamento(linhasAntes,tentativas-1);},2000);
    }else{
      // Esgotou tentativas — usa o que tiver
      if(atOk)RAW.at=parseCSV(txts[0]);
      if(paOk)RAW.pa=novoPa;
      if(diOk)RAW.di=parseCSV(txts[2]);
      if(mtOk){RAW.mt=parseCSV(txts[3]);parseMetas();}
      processarEAtualizar();
      if(dot){dot.style.background='var(--accent)';dot.style.opacity='.5';}
    }
  }).catch(function(){
    if(tentativas>1)setTimeout(function(){rebuscarAposLancamento(linhasAntes,tentativas-1);},2000);
    else if(dot){dot.style.background='var(--red)';dot.style.opacity='1';}
  });
}

function processarEAtualizar(){
  // Capturar estado UI ANTES de re-renderizar
  var uiSnap={
    cardAberto: _UI.cardAberto,
    cardSg: _UI.cardSg,
    cardCor: _UI.cardCor,
    provAberto: _UI.provAberto,
    colsAtivas: Object.assign({}, _UI.colsAtivas||{})
  };

  PRECOS={};SEGMENTOS={};INFO_ATIVOS={};
  for(var i=1;i<RAW.at.length;i++){
    var tk=(RAW.at[i][2]||'').trim().toUpperCase();
    if(tk){
      PRECOS[tk]=n(RAW.at[i][3]);
      var sg2=(RAW.at[i][1]||'').trim();if(sg2)SEGMENTOS[tk]=sg2;
      INFO_ATIVOS[tk]={cnpj:(RAW.at[i][4]||'').trim()};
    }
  }
  var aSet={};
  for(var j=1;j<RAW.pa.length;j++){var d=dt(RAW.pa[j][7]);if(d)aSet[d.getFullYear()]=1;}
  var anos=Object.keys(aSet).map(Number).sort();
  DADOS={};anos.forEach(function(a){DADOS[a]=buildAno(a);});
  if(SES.admin)anos.forEach(function(a){injetarZe(a);});
  var cSet={};anos.forEach(function(a){(DADOS[a].cl||[]).forEach(function(c){cSet[c]=1;});});
  CLIENTES=Object.keys(cSet).filter(function(c){return c!=='__ZE__';}).sort();
  buildNav();
  if(clienteAtivo)pick(clienteAtivo);

  // Restaurar estado UI após re-render (DOM já existe)
  setTimeout(function(){
    // 1. Card de carteira aberto
    if(uiSnap.cardAberto){
      var el=document.getElementById(uiSnap.cardAberto);
      if(el){
        el.classList.add('open');
        _UI.cardAberto=uiSnap.cardAberto;
        _UI.cardSg=uiSnap.cardSg;
        _UI.cardCor=uiSnap.cardCor;
        // Restaurar gráfico de evolução no segmento correto
        if(uiSnap.cardSg)switchEvolChart(uiSnap.cardSg,uiSnap.cardCor);
      }
    }
    // 2. Segmento de proventos aberto
    if(uiSnap.provAberto){
      _UI.provAberto=uiSnap.provAberto;
      document.querySelectorAll('tr.'+uiSnap.provAberto).forEach(function(r){r.classList.remove('hide');});
      // Restaurar gráfico de proventos filtrado
      if(clienteAtivo)updChart(clienteAtivo,uiSnap.provAberto.replace('pv-','').replace(/-/g,' ').toUpperCase());
    }
    // 3. Colunas ativas na tabela de proventos
    Object.keys(uiSnap.colsAtivas).forEach(function(i){
      document.querySelectorAll('.ci'+i).forEach(function(el){el.classList.add('col-on');});
      _UI.colsAtivas[i]=true;
    });
  },80);
}

/* ── CALCULADORA DE JUROS COMPOSTOS ─────── */
var cCalc = null;

// 1. Guarda o estado da calculadora para não resetar ao mudar de ano
var _calcState = {
  capital: null,
  aporte: null,
  taxa: null,
  meses: null,
  tipoTaxa: 'mensal',
  aberto: true
};

// 2. Busca sempre os dados mais recentes do cliente
function getLatestData(c) {
  var anos = Object.keys(DADOS).map(Number).sort(function(a,b){return a-b;});
  var lastAno = anos[anos.length-1];
  if(!lastAno) return { mkt: 0, dy: 0, rendUlt: 0 };

  var movs = (DADOS[lastAno].pat || {})[c] || [];
  var seg = consolidar(movs);
  var mkt = 0;
  Object.keys(seg).forEach(function(s){
    Object.keys(seg[s]).forEach(function(tk){
      var it = seg[s][tk];
      if(it.q > 0.0001) mkt += it.q * (PRECOS[tk]||0);
    });
  });

  var pv = (DADOS[lastAno].prov || {})[c] || {tot: Array(12).fill(0)};
  var rendUlt = 0;
  var checkMes = lastAno < new Date().getFullYear() ? 11 : new Date().getMonth();
  for(var mi = checkMes; mi >= 0; mi--){
    if(pv.tot[mi] > 0) { rendUlt = pv.tot[mi]; break; }
  }

  var dy = mkt > 0 ? (rendUlt / mkt) * 100 : 0;
  return { mkt: mkt, dy: dy, rendUlt: rendUlt };
}

// 3. Atualiza a memória quando o usuário digita
function updateCalcState(){
  var elCap = document.getElementById('ci-capital');
  if(elCap) _calcState.capital = parseFloat(elCap.value) || 0;

  var elAp = document.getElementById('ci-aporte');
  if(elAp) _calcState.aporte = parseFloat(elAp.value) || 0;

  var elTx = document.getElementById('ci-taxa');
  if(elTx) _calcState.taxa = parseFloat(elTx.value) || 0;

  var elMs = document.getElementById('ci-meses');
  if(elMs) _calcState.meses = parseInt(elMs.value) || 0;

  calcJuros();
}

function toggleCalcCard(){
  var card = document.getElementById('calc-input-card');
  if(!card) return;
  card.classList.toggle('open');
  _calcState.aberto = card.classList.contains('open');
  atualizarChips();
}

function atualizarChips(){
  var card=document.getElementById('calc-input-card');
  var chips=document.getElementById('calc-chips');
  if(!card||!chips)return;
  if(card.classList.contains('open')){chips.innerHTML='';return;}
  var capital=parseFloat((document.getElementById('ci-capital')||{}).value)||0;
  var aporte =parseFloat((document.getElementById('ci-aporte')||{}).value)||0;
  var taxa   =parseFloat((document.getElementById('ci-taxa')||{}).value)||0;
  var meses  =parseInt((document.getElementById('ci-meses')||{}).value)||0;
  var tipo=_calcState.tipoTaxa==='anual'?'a.a.':'a.m.';
  chips.innerHTML=
    '<div class="calc-chip">Capital <span>'+M(capital)+'</span></div>'+
    '<div class="calc-chip">Aporte <span>'+M(aporte)+'/mês</span></div>'+
    '<div class="calc-chip">Taxa <span>'+taxa+'% '+tipo+'</span></div>'+
    '<div class="calc-chip">Período <span>'+meses+' meses</span></div>';
}

function setTipoTaxa(tipo){
  _calcState.tipoTaxa = tipo;
  var bM = document.getElementById('btn-mensal');
  var bA = document.getElementById('btn-anual');
  if(bM) bM.className = tipo === 'mensal' ? 'on' : '';
  if(bA) bA.className = tipo === 'anual' ? 'on' : '';
  updateCalcState();
}

function calcJuros(){
  var elCap=document.getElementById('ci-capital');
  var elAp =document.getElementById('ci-aporte');
  var elTx =document.getElementById('ci-taxa');
  var elMs =document.getElementById('ci-meses');
  if(!elCap||!elAp||!elTx||!elMs){return;}

  var capital=parseFloat(elCap.value)||0;
  var aporte =parseFloat(elAp.value)||0;
  var taxaInp=parseFloat(elTx.value)||0;
  var meses  =parseInt(elMs.value)||120;

  var tMes;
  if(_calcState.tipoTaxa === 'anual'){
    tMes = Math.pow(1 + taxaInp/100, 1/12) - 1;
  }else{
    tMes = taxaInp/100;
  }
  var tAnual = (Math.pow(1 + tMes, 12) - 1) * 100;
  var tMesEq = tMes * 100;
  var equiv = document.getElementById('taxa-equiv');
  if(equiv){
    if(_calcState.tipoTaxa === 'anual'){
      equiv.textContent = '≈ ' + tMesEq.toFixed(4) + '% a.m.';
    }else{
      equiv.textContent = '≈ ' + tAnual.toFixed(2) + '% a.a.';
    }
  }

  var phint=document.getElementById('periodo-hint');
  if(phint&&meses>0){var anosH=Math.floor(meses/12);var mRH=meses%12;phint.textContent='= '+(anosH>0?anosH+' ano'+(anosH>1?'s':'')+(mRH>0?' e '+mRH+'m':''):(mRH+'m'));}
  if(!meses||meses<1){return;}

  var semDados=(capital===0&&aporte===0);
  var empty=document.getElementById('calc-empty');
  var chartBox=document.getElementById('calc-chart-box');
  var tblBox=document.getElementById('calc-tbl-box');
  if(semDados){
    if(empty)empty.style.display='';
    if(chartBox)chartBox.style.display='none';
    if(tblBox)tblBox.style.display='none';
    var res2=document.getElementById('calc-results');
    if(res2)res2.innerHTML='';
    atualizarChips();
    return;
  }

  // Simulação mês a mês
  var saldo=capital;
  var totalAportado=capital;
  var totalJuros=0;
  var tblAnos=[];
  var jurosAno=0,aporteAno=0;

  for(var i=1;i<=meses;i++){
    var juros=saldo*tMes;
    totalJuros+=juros;
    jurosAno+=juros;
    saldo=saldo+juros+aporte;
    if(i>1){totalAportado+=aporte;aporteAno+=aporte;}
    if(i%12===0||i===meses){
      tblAnos.push({ano:Math.ceil(i/12),mes:i,saldo:saldo,totalAportado:totalAportado,jurosAno:jurosAno,aporteAno:aporteAno,rendaMes:saldo*tMes});
      jurosAno=0;aporteAno=0;
    }
  }

  var totalFinal=saldo;
  var rendaMensalFinal=totalFinal*tMes;
  var retorno=totalAportado>0?((totalFinal/totalAportado-1)*100):0;
  var multiplicador=totalAportado>0?(totalFinal/totalAportado):1;

  if(empty)empty.style.display='none';
  if(chartBox)chartBox.style.display='';
  if(tblBox)tblBox.style.display='';

  // KPIs
  var res=document.getElementById('calc-results');
  if(res){
    res.innerHTML='<div class="calc-kpi-grid">'
      +ck2('Montante Final',M(totalFinal),'','hi')
      +ck2('Total Investido',M(totalAportado),'capital + aportes','')
      +ck2('Juros Acumulados',M(totalJuros),'dinheiro trabalhando','')
      +ck2('Renda Mensal Final',M(rendaMensalFinal),'no '+meses+'° mês','')
      +ck2('Taxa Anual Equiv.',tAnual.toFixed(2)+'%','juros sobre juros','')
      +ck2('Multiplicador',multiplicador.toFixed(2)+'×',retorno.toFixed(1)+'% de retorno','')
      +'</div>';
  }

  // Tabela anual
  var tbl=document.getElementById('calc-tbl');
  if(tbl){
    var th='<thead><tr><th>Ano</th><th>Mês</th><th>Aportes no Ano</th><th>Juros no Ano</th><th>Total Investido</th><th>Montante</th><th>Renda Mensal</th></tr></thead>';
    var tb='<tbody>';
    tblAnos.forEach(function(r){
      tb+='<tr><td>'+r.ano+'°</td><td>'+r.mes+'</td><td>'+M(r.aporteAno)+'</td><td class="g">'+M(r.jurosAno)+'</td><td>'+M(r.totalAportado)+'</td><td style="font-weight:600">'+M(r.saldo)+'</td><td class="g">'+M(r.rendaMes)+'</td></tr>';
    });
    tb+='</tbody>';
    var tf='<tfoot><tr><td colspan="2">TOTAL</td><td>'+M(totalAportado-capital)+'</td><td>'+M(totalJuros)+'</td><td>'+M(totalAportado)+'</td><td>'+M(totalFinal)+'</td><td>'+M(rendaMensalFinal)+'</td></tr></tfoot>';
    tbl.innerHTML=th+tb+tf;
  }

  _renderCalcChart(capital,aporte,tMes,meses);
  atualizarChips();
}

function ck2(lbl,val,sub,cls){
  return '<div class="calc-kpi '+(cls||'')+'">'
    +'<div class="calc-kpi-lbl">'+lbl+'</div>'
    +'<div class="calc-kpi-val '+(cls==='hi'?'g':'')+'">' +val+'</div>'
    +(sub?'<div class="calc-kpi-sub">'+sub+'</div>':'')
    +'</div>';
}

function _renderCalcChart(capital,aporte,tMes,meses){
  if(cCalc){cCalc.destroy();cCalc=null;}
  var ctx=document.getElementById('cvCalc');if(!ctx)return;
  var lbls=[],vSaldo=[],vAport=[],vJuros=[];
  var saldo=capital,totalAportado=capital,totalJuros=0;
  var step=Math.max(1,Math.round(meses/36));
  for(var i=1;i<=meses;i++){
    var j=saldo*tMes;
    totalJuros+=j;
    saldo=saldo+j+aporte;
    if(i>1)totalAportado+=aporte;
    if(i%step===0||i===meses){
      lbls.push(i>=12?(Math.round(i/12)+'a'):i+'m');
      vSaldo.push(+saldo.toFixed(2));
      vAport.push(+totalAportado.toFixed(2));
      vJuros.push(+totalJuros.toFixed(2));
    }
  }
  var cc=chartColors();
  cCalc=new Chart(ctx,{
    type:'line',
    data:{labels:lbls,datasets:[
      {label:'Montante',data:vSaldo,borderColor:'#3ddc84',backgroundColor:'rgba(61,220,132,.08)',fill:true,tension:.35,pointRadius:0,borderWidth:2.5},
      {label:'Total Investido',data:vAport,borderColor:'#4da6ff',backgroundColor:'rgba(77,166,255,.05)',fill:true,tension:.35,pointRadius:0,borderWidth:1.5,borderDash:[5,4]},
      {label:'Juros Acumulados',data:vJuros,borderColor:'#ffb347',backgroundColor:'rgba(255,179,71,.04)',fill:false,tension:.35,pointRadius:0,borderWidth:1.5,borderDash:[2,4]}
    ]},
    options:{responsive:true,maintainAspectRatio:false,
      plugins:{legend:{labels:{color:cc.tc,font:{size:11},boxWidth:14}},
        tooltip:{callbacks:{label:function(ct){return ct.dataset.label+': '+M(ct.parsed.y);}}}},
      scales:{
        x:{grid:{color:cc.gc},ticks:{color:cc.tc,maxTicksLimit:14}},
        y:{grid:{color:cc.gc},ticks:{color:cc.tc,callback:function(v){return M(v);}},beginAtZero:false}
      }
    }
  });
}

// Alias chamado pelo switchTab — sempre executa calcJuros
function renderCalcChart(){
  calcJuros();
}

function silentRefresh(){rebuscarTudo();}

/* ── PARSER BASE_METAS ──────────────────────────────
   Colunas: A=cliente B=tipo C=valor D=aporte E=juros(%) F=id G=criadoEm
   METAS[cliente] agora é uma LISTA (permite múltiplas metas por
   cliente, inclusive mais de uma da mesma categoria), ordenada por
   ordem de lançamento (criadoEm).
──────────────────────────────────────────────────── */
var METAS_PENDENTES={}; // metas salvas localmente ainda não confirmadas pelo CSV publicado (chave = id da meta)

function parseMetas(){
  METAS={};
  if(RAW.mt&&RAW.mt.length>=2){
    for(var i=1;i<RAW.mt.length;i++){
      var row=RAW.mt[i];
      if(!row||!row[0])continue;
      var cli   =(row[0]||'').toString().trim();
      var tipo  =(row[1]||'').toString().trim();
      var valor =parseFloat((row[2]||'').toString().replace(',','.'))||0;
      var aporte=parseFloat((row[3]||'').toString().replace(',','.'))||0;
      var juros =parseFloat((row[4]||'').toString().replace(',','.'))||0;
      var id      =(row[5]||'').toString().trim()||('linha'+i); // fallback p/ linhas antigas sem id
      var criadoEm=(row[6]||'').toString().trim();
      if(!cli||!tipo)continue; // aceita valor=0 (meta ainda não definida)
      var chave=cli.toUpperCase();
      if(!METAS[chave])METAS[chave]=[];
      METAS[chave].push({id:id,tipo:tipo,valor:valor,aporte:aporte,juros:juros,criadoEm:criadoEm,_ordem:i});
    }
  }
  // Ordena cada lista por ordem de lançamento. Linhas antigas sem criadoEm
  // (gravadas antes desse campo existir) caem pela ordem original na planilha.
  Object.keys(METAS).forEach(function(k){
    METAS[k].sort(function(a,b){
      if(a.criadoEm&&b.criadoEm)return a.criadoEm<b.criadoEm?-1:(a.criadoEm>b.criadoEm?1:0);
      return a._ordem-b._ordem;
    });
  });

  // Reaplica metas salvas localmente que o CSV publicado ainda não confirmou.
  // O "Publicar na Web" do Google Sheets (URLS.MT) tem cache próprio que pode
  // levar minutos pra propagar uma escrita, independente do cache do navegador.
  // Sem isso, um refresh manual reconstrói METAS a partir de um CSV desatualizado
  // e a meta recém-salva some da lista até o cache do Google atualizar — mesmo o
  // dado nunca tendo sido perdido na planilha.
  Object.keys(METAS_PENDENTES).forEach(function(pid){
    var pend=METAS_PENDENTES[pid];
    var chave=(pend.cliente||'').toUpperCase();
    var lista=METAS[chave]||(METAS[chave]=[]);
    var existente=lista.filter(function(g){return g.id===pid;})[0];
    var confirmado=existente&&existente.tipo===pend.tipo&&existente.valor===pend.valor&&existente.aporte===pend.aporte&&existente.juros===pend.juros;
    if(confirmado){
      delete METAS_PENDENTES[pid];
    }else{
      METAS[chave]=lista.filter(function(g){return g.id!==pid;});
      METAS[chave].push({id:pid,tipo:pend.tipo,valor:pend.valor,aporte:pend.aporte,juros:pend.juros,criadoEm:pend.criadoEm});
      METAS[chave].sort(function(a,b){
        return (a.criadoEm||'')<(b.criadoEm||'')?-1:((a.criadoEm||'')>(b.criadoEm||'')?1:0);
      });
    }
  });
}

/* ── BUILD ABA CALCULADORA ──────────────────── */
function buildTabCalc(c, abaAtiva) {
  var latest = getLatestData(c);
  var defCap = _calcState.capital !== null ? _calcState.capital : latest.mkt;
  var defAp = _calcState.aporte !== null ? _calcState.aporte : 0;
  var defTaxa = _calcState.taxa !== null ? _calcState.taxa : latest.dy;
  var defMeses = _calcState.meses !== null ? _calcState.meses : 120;
  var tipoT = _calcState.tipoTaxa;

  var anosHist = Object.keys(DADOS).map(Number).sort(function(a,b){return a-b;}).filter(function(a){return (DADOS[a].pat[c]||[]).length>0;});

  var h = '<div id="tab-calc" class="tab-pane' + (abaAtiva==='calc'?'':' tab-hidden') + '">';
  h += '<div class="sec-head"><h3>Calculadora de Juros Compostos</h3>';
  h += '<span class="tag">independente do ano selecionado</span></div>';
  h += '<div class="calc-wrap">';

  h += '<div class="calc-card ' + (_calcState.aberto ? 'open' : '') + '" id="calc-input-card">';
  h += '<div class="calc-card-head" onclick="toggleCalcCard()">';
  h += '<div class="calc-card-title">';
  h += '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.2" stroke="currentColor" stroke-width="1.4"/><rect x="9" y="1" width="6" height="6" rx="1.2" stroke="currentColor" stroke-width="1.4"/><rect x="1" y="9" width="6" height="6" rx="1.2" stroke="currentColor" stroke-width="1.4"/><path d="M9 12h6M12 9v6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
  h += '<span>Parâmetros da Simulação</span></div>';
  h += '<div style="display:flex;align-items:center;gap:12px">';
  h += '<div class="calc-preview" id="calc-chips"></div>';
  h += '<svg class="calc-card-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  h += '</div></div>';

  h += '<div class="calc-card-body"><div class="calc-card-inner">';

  h += '<div class="calc-field"><label>Capital Inicial (R$)</label>';
  h += '<input id="ci-capital" type="number" min="0" value="'+defCap.toFixed(2)+'" oninput="updateCalcState()"/>';
  if(latest.mkt>0) h += '<span class="calc-hint">Carteira atual real: '+M(latest.mkt)+'</span>';
  h += '</div>';

  h += '<div class="calc-field"><label>Aporte Mensal (R$)</label>';
  h += '<input id="ci-aporte" type="number" min="0" value="'+defAp.toFixed(2)+'" oninput="updateCalcState()"/></div>';

  h += '<div class="calc-field"><label>Taxa de Juros (%)</label>';
  h += '<input id="ci-taxa" type="number" min="0" step="0.01" value="'+defTaxa.toFixed(4)+'" oninput="updateCalcState()"/>';
  if(latest.dy>0) h += '<span class="calc-hint">DY último mês real: '+latest.dy.toFixed(4)+'%</span>';
  h += '</div>';

  h += '<div class="calc-field"><label>Período (meses)</label>';
  h += '<input id="ci-meses" type="number" min="1" value="'+defMeses+'" oninput="updateCalcState()"/>';
  h += '<span class="calc-hint" id="periodo-hint"></span></div>';

  h += '<div class="calc-toggle-row"><label>Tipo de taxa</label>';
  h += '<div class="calc-toggle">';
  h += '<button id="btn-mensal" class="'+(tipoT==='mensal'?'on':'')+'" onclick="setTipoTaxa(\'mensal\')">Mensal</button>';
  h += '<button id="btn-anual" class="'+(tipoT==='anual'?'on':'')+'" onclick="setTipoTaxa(\'anual\')">Anual</button>';
  h += '</div><span style="font-family:\'DM Mono\',monospace;font-size:.65rem;color:var(--muted)" id="taxa-equiv"></span></div>';

  h += '</div></div></div>';

  h += '<div id="calc-results"></div>';
  h += '<div class="chart-box" id="calc-chart-box" style="display:none"><div class="chart-ttl">Evolução Patrimonial Projetada</div>';
  h += '<div style="height:260px"><canvas id="cvCalc"></canvas></div></div>';
  h += '<div class="chart-box" id="calc-tbl-box" style="display:none"><div class="chart-ttl">Projeção Ano a Ano</div>';
  h += '<div class="calc-tbl-wrap"><table class="calc-tbl" id="calc-tbl"></table></div></div>';

  if(anosHist.length > 0) {
    h += '<div class="chart-box" id="calc-hist-box"><div class="chart-ttl">Histórico Real — Patrimônio &amp; Proventos</div>';
    h += '<div class="calc-tbl-wrap"><table class="calc-tbl" id="calc-hist-tbl">';
    h += '<thead><tr><th>Ano</th><th>Patrimônio Final</th><th>Proventos Totais</th><th>DY Anual</th><th>Variação Pat.</th></tr></thead><tbody>';
    var patAnterior = 0;
    anosHist.forEach(function(a){
      var sf = 0; var ev = (DADOS[a]&&DADOS[a].evol&&DADOS[a].evol[c])||Array(12).fill(0);
      for(var i=11;i>=0;i--){if(ev[i]>0){sf=ev[i];break;}}
      var pt = ((DADOS[a]&&DADOS[a].prov&&DADOS[a].prov[c])||{tot:Array(12).fill(0)}).tot.reduce(function(s,v){return s+v;},0);
      var dy = sf>0 ? (pt/sf)*100 : 0;
      var varPat = patAnterior>0 ? ((sf/patAnterior-1)*100) : null;
      var varStr = varPat===null ? '—' : (varPat>=0 ? '<span style="color:#3ddc84">▲ '+varPat.toFixed(1)+'%</span>' : '<span style="color:var(--red)">▼ '+Math.abs(varPat).toFixed(1)+'%</span>');
      var anoAtualReal = new Date().getFullYear();
      h += '<tr><td>'+(a<anoAtualReal?'<span style="color:var(--muted)">✓</span> ':'')+a+'</td>';
      h += '<td style="font-weight:600">'+M(sf)+'</td><td class="g">'+M(pt)+'</td>';
      h += '<td class="g">'+(dy>0?dy.toFixed(2)+'%':'—')+'</td><td>'+varStr+'</td></tr>';
      patAnterior = sf;
    });
    h += '</tbody></table></div></div>';
  }

  h += '<div class="calc-empty" id="calc-empty" style="display:none">';
  h += '<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="4" y="4" width="14" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/><rect x="22" y="4" width="14" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/><rect x="4" y="22" width="14" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M22 29h16M30 22v14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
  h += 'Preencha os parâmetros acima para simular</div>';
  h += '</div></div>';
  return h;
}

/* ── BUILD ABA METAS ────────────────────────── */
function buildTabMetas(c, abaAtiva){
  var latest = getLatestData(c);
  var metasCliente = METAS[(c||'').toUpperCase()]||[];

  var h = '<div id="tab-metas" class="tab-pane' + (abaAtiva==='metas'?'':' tab-hidden') + '">';
  h += '<div class="sec-head" style="justify-content:space-between">';
  h += '<div style="display:flex;align-items:center;gap:10px"><h3>Metas</h3>';
  h += '<span class="tag">'+(metasCliente.length?metasCliente.length+' meta'+(metasCliente.length>1?'s':''):'sem meta')+'</span></div>';
  h += '<button class="btn-lancar-meta" id="btn-toggle-meta" onclick="toggleMetaForm()">🎯 Lançar Nova Meta</button></div>';

  h += '<div class="meta-form-panel" id="meta-form-panel">';
  h += '<div class="meta-form-row">';
  h += '<div class="meta-field"><label>Tipo de Meta</label>';
  h += '<select id="meta-tipo" onchange="onMetaTipoChange()">';
  h += '<option value="Patrimônio" selected>Patrimônio</option>';
  h += '<option value="Renda">Renda Mensal</option>';
  h += '</select></div>';
  h += '<div class="meta-field"><label>Valor Alvo (R$)</label>';
  h += '<input id="meta-valor" type="number" min="0" step="100" value="0" oninput="calcMetas()"/>';
  h += '<span class="meta-hint" id="meta-hint">Defina um valor e clique em salvar</span>';
  h += '</div></div>';

  h += '<div class="meta-form-row" id="meta-proj-row">';
  h += '<div class="meta-field"><label>Aporte Mensal (R$)</label>';
  h += '<input id="meta-aporte" type="number" min="0" step="100" value="0" oninput="calcMetas()"/>';
  h += '<span class="meta-hint">Quanto você investe por mês</span></div>';
  h += '<div class="meta-field"><label>Rentabilidade Mensal Esperada (%)</label>';
  h += '<input id="meta-rent" type="number" min="0" step="0.01" value="1.00" oninput="calcMetas()"/>';
  h += '<span class="meta-hint">Ex: 1.00 para 1% ao mês</span></div></div>';

  h += '<div class="meta-draft-wrap"><span class="meta-draft-lbl">Pré-visualização</span>';
  h += '<div id="meta-draft-preview"></div></div>';

  h += '<button class="btn-salvar-meta" id="btn-salvar-meta" onclick="salvarMeta()">💾 Salvar Nova Meta</button>';
  h += '<div class="meta-msg" id="meta-msg"></div></div>';

  h += '<div class="meta-objetivos" id="meta-objetivos">';
  if(metasCliente.length){
    metasCliente.forEach(function(g){
      h += buildMetaCard(g.tipo, g.valor, latest.mkt, latest.rendUlt, g.aporte, g.juros, g.id);
    });
  } else {
    h += '<div class="meta-empty-card"><div style="font-size:2rem;opacity:.25">🎯</div>';
    h += '<p>Nenhuma meta definida ainda.<br>Clique em <strong>Lançar Nova Meta</strong> para começar.</p></div>';
  }
  h += '</div></div>';
  return h;
}

/* chamado após buildTabMetas ser inserido no DOM */
function initMetaState(mkt, rendUlt){
  _metaTotMkt  = mkt    || 0;
  _metaRendUlt = rendUlt|| 0;
}

/* ── HELPER: formata meses em "X ano(s) e Y mês(es)" ── */
function fmtTempo(meses){
  if(!meses||meses<=0)return '—';
  if(meses>600)return 'mais de 50 anos';
  var anos=Math.floor(meses/12);
  var ms=meses%12;
  var s='';
  if(anos>0)s+=anos+' ano'+(anos>1?'s':'');
  if(anos>0&&ms>0)s+=' e ';
  if(ms>0)s+=ms+' mês'+(ms>1?'es':'');
  return s;
}

/* ── HELPER: calcula meses até atingir alvo ── */
function calcTempoMeses(patrimonioAtual,alvo,aporteMensal,rentMensal){
  if(patrimonioAtual>=alvo)return 0;
  if(rentMensal<=0&&aporteMensal<=0)return null; // impossível sem juros e sem aporte
  var saldo=patrimonioAtual;
  var meses=0;
  var MAX=600; // teto de 50 anos
  while(saldo<alvo&&meses<MAX){
    saldo=saldo*(1+rentMensal/100)+aporteMensal;
    meses++;
  }
  return meses>=MAX?null:meses;
}

/* Constrói o HTML de um card de objetivo.
   gid: identificador único da meta (para não colidir ids quando há
   várias metas na lista); usa 'draft' para a pré-visualização do form. */
function buildMetaCard(tipo,alvo,totMkt,rendUlt,aporte,rent,gid){
  gid=gid||'draft';
  var aporteMensal=aporte||0;
  var rentMensal=rent!=null?rent:1;
  var atual=tipo==='Renda'?rendUlt:totMkt;
  var pct=alvo>0?Math.min((atual/alvo)*100,999):0;
  var pctDisp=Math.min(pct,100);
  var falta=Math.max(alvo-atual,0);
  var atingida=alvo>0&&pct>=100;

  // Projeção de tempo (só para Patrimônio)
  var tempoMeses=null;
  if(tipo==='Patrimônio'&&alvo>0&&!atingida){
    tempoMeses=calcTempoMeses(totMkt,alvo,aporteMensal,rentMensal);
  }

  var h='<div class="meta-card'+(atingida?' atingida':'')+'" data-meta-id="'+gid+'">';

  // Cabeçalho: badge + percentual
  h+='<div class="meta-card-header">';
  h+='<div style="display:flex;flex-direction:column;gap:4px">';
  h+='<span class="meta-card-tipo">'+tipo+'</span>';
  h+='<span style="font-family:\'DM Serif Display\',serif;font-size:1.1rem;color:var(--muted)">';
  h+=(tipo==='Renda'?'Renda Mensal vs. Meta':'Patrimônio vs. Meta')+'</span>';
  h+='</div>';
  h+='<span class="meta-card-pct" id="meta-pct-display-'+gid+'">'+(alvo>0?pct.toFixed(1)+'%':'—')+'</span>';
  h+='</div>';

  if(atingida){
    h+='<div class="meta-card-badge-sucesso">🎉 Meta atingida!</div>';
  }

  // Barra de progresso
  h+='<div class="meta-bar-bg"><div id="meta-bar-fill-'+gid+'" class="meta-bar-fill'+(atingida?' atingida':'')+'" style="width:'+(alvo>0?pctDisp:0)+'%"></div></div>';

  // Valores: grade de 3 colunas (ou 4 se tiver tempo estimado)
  var cols=tipo==='Patrimônio'?4:3;
  h+='<div class="meta-card-vals" style="grid-template-columns:repeat('+cols+',1fr)">';

  h+='<div class="meta-val-item"><span class="meta-val-lbl">'+(tipo==='Renda'?'Última Renda':'Patrimônio Atual')+'</span>';
  h+='<span class="meta-val-num g" id="ms-atual-'+gid+'">'+M(atual)+'</span></div>';

  h+='<div class="meta-val-item"><span class="meta-val-lbl">Meta</span>';
  h+='<span class="meta-val-num" id="ms-alvo-'+gid+'">'+M(alvo)+'</span></div>';

  h+='<div class="meta-val-item"><span class="meta-val-lbl">Faltam</span>';
  h+='<span class="meta-val-num'+(atingida?' g':' r')+'" id="ms-falta-'+gid+'">'+(alvo>0?(atingida?'✓ Atingida!':M(falta)):'—')+'</span></div>';

  // Quarta coluna: tempo estimado (só Patrimônio)
  if(tipo==='Patrimônio'){
    h+='<div class="meta-val-item"><span class="meta-val-lbl">Tempo Estimado</span>';
    var tempoTxt=atingida?'✓ Atingida!':(tempoMeses!=null?fmtTempo(tempoMeses):'Indeterminado');
    h+='<span class="meta-val-num" id="ms-tempo-'+gid+'" style="color:var(--accent)">'+tempoTxt+'</span></div>';
  }

  h+='</div>'; // fim meta-card-vals

  // Rodapé de premissas (só Patrimônio, quando ainda não atingiu)
  if(tipo==='Patrimônio'&&!atingida&&aporteMensal>=0){
    h+='<div style="font-family:\'DM Mono\',monospace;font-size:.62rem;color:var(--muted);border-top:1px solid var(--border);padding-top:10px" id="meta-premissas-'+gid+'">';
    h+='Projeção: aporte de '+M(aporteMensal)+'/mês · rentabilidade de '+rentMensal.toFixed(2)+'% a.m.';
    h+='</div>';
  }

  h+='</div>'; // fim meta-card
  return h;
}

// Valores globais injetados por buildTabMetas
var _metaTotMkt=0;
var _metaRendUlt=0;

/* Chamado pelo onchange do select de tipo — mostra/oculta linha de projeção */
function onMetaTipoChange(){
  var tipoEl=document.getElementById('meta-tipo');
  var projRow=document.getElementById('meta-proj-row');
  if(!tipoEl||!projRow)return;
  projRow.style.display=tipoEl.value==='Patrimônio'?'':'none';
  calcMetas();
}

function calcMetas(){
  var tipoEl=document.getElementById('meta-tipo');
  var valorEl=document.getElementById('meta-valor');
  var draftEl=document.getElementById('meta-draft-preview');
  if(!tipoEl||!valorEl||!draftEl)return;
  var tipo=tipoEl.value;
  var alvo=parseFloat(valorEl.value)||0;
  var atual=tipo==='Renda'?_metaRendUlt:_metaTotMkt;

  // Campos <input type="number"> nativos: valor já vem em notação decimal
  // padrão do navegador (ponto = decimal), então usa parseFloat direto —
  // n() é para campos texto em formato BRL e trataria o ponto como milhar.
  var aporteEl=document.getElementById('meta-aporte');
  var rentEl=document.getElementById('meta-rent');
  var aporte=aporteEl?(parseFloat(aporteEl.value)||0):0;
  var rent=rentEl?(parseFloat(rentEl.value)||1):1;

  if(!alvo||alvo<=0){
    draftEl.innerHTML='<div class="meta-empty-card" style="padding:20px"><p style="margin:0">Informe um valor alvo para ver a pré-visualização.</p></div>';
    return;
  }

  // Regenera o card de pré-visualização (id fixo "draft") com os valores atuais do form
  draftEl.innerHTML=buildMetaCard(tipo,alvo,_metaTotMkt,_metaRendUlt,aporte,rent,'draft');
}

/* ── TOGGLE DO FORMULÁRIO DE NOVA META ─────── */
function toggleMetaForm(){
  var panel=document.getElementById('meta-form-panel');
  var btn=document.getElementById('btn-toggle-meta');
  if(!panel||!btn)return;
  var aberto=panel.classList.contains('aberto');
  if(aberto){
    panel.classList.remove('aberto');
    btn.textContent='🎯 Lançar Nova Meta';
    btn.classList.remove('cancelar');
  }else{
    panel.classList.add('aberto');
    btn.textContent='✕ Cancelar Lançamento';
    btn.classList.add('cancelar');
    calcMetas(); // popula a pré-visualização com os valores padrão do form
    // Foca o campo de valor para UX mais fluida
    setTimeout(function(){
      var v=document.getElementById('meta-valor');
      if(v)v.focus();
    },80);
  }
}

function showMetaMsg(txt,tipo){
  var el=document.getElementById('meta-msg');
  if(!el)return;
  if(!txt){el.style.display='none';return;}
  el.textContent=txt;el.className='meta-msg '+tipo;el.style.display='block';
}

/* Gera um id único simples para identificar cada meta lançada
   (evita colisão de ids no DOM quando há várias metas na lista) */
function gerarIdMeta(){
  return 'm'+Date.now().toString(36)+Math.random().toString(36).slice(2,8);
}

/* Reconstrói a lista de cards de metas do cliente ativo a partir de METAS.
   Chamada após salvar uma nova meta e após todo refresh (rebuscarTudo). */
function renderizarListaMetas(){
  var obj=document.getElementById('meta-objetivos');
  if(!obj)return;
  var latest=getLatestData(clienteAtivo);
  var lista=METAS[(clienteAtivo||'').toUpperCase()]||[];
  var tagEl=document.querySelector('#tab-metas .sec-head .tag');
  if(tagEl)tagEl.textContent=lista.length?lista.length+' meta'+(lista.length>1?'s':''):'sem meta';
  if(!lista.length){
    obj.innerHTML='<div class="meta-empty-card"><div style="font-size:2rem;opacity:.25">🎯</div>'+
      '<p>Nenhuma meta definida ainda.<br>Clique em <strong>Lançar Nova Meta</strong> para começar.</p></div>';
    return;
  }
  var h='';
  lista.forEach(function(g){
    h+=buildMetaCard(g.tipo,g.valor,latest.mkt,latest.rendUlt,g.aporte,g.juros,g.id);
  });
  obj.innerHTML=h;
}

function salvarMeta(){
  var tipoEl=document.getElementById('meta-tipo');
  var valorEl=document.getElementById('meta-valor');
  var btn=document.getElementById('btn-salvar-meta');
  if(!tipoEl||!valorEl)return;
  var tipo=tipoEl.value;
  var valor=parseFloat(valorEl.value)||0;
  if(!valor||valor<=0){showMetaMsg('Informe um valor alvo válido.','err');return;}
  if(APPS_SCRIPT_URL.indexOf('SEU_ID_AQUI')>=0){
    showMetaMsg('⚠️ Configure APPS_SCRIPT_URL.','err');return;
  }
  var aporteEl=document.getElementById('meta-aporte');
  var rentEl=document.getElementById('meta-rent');
  var aporte=aporteEl?(parseFloat(aporteEl.value)||0):0;
  var rent=rentEl?(parseFloat(rentEl.value)||1):1;

  // Cada clique em "Salvar" cria uma meta NOVA e independente — nunca
  // sobrescreve outra, mesmo que seja da mesma categoria (Patrimônio/Renda).
  var novoId=gerarIdMeta();
  var criadoEm=new Date().toISOString();

  btn.disabled=true;btn.textContent='Salvando…';showMetaMsg('','');
  var payload={acao:'salvar_meta',cliente:clienteAtivo,tipo:tipo,valor:valor,aporte:aporte,juros:rent,id:novoId,criadoEm:criadoEm};
  fetch(APPS_SCRIPT_URL,{
    method:'POST',
    headers:{'Content-Type':'text/plain;charset=utf-8'},
    body:JSON.stringify(payload)
  })
  .then(function(resp){return resp.text();})
  .then(function(txt){
    if(!txt||txt.toLowerCase().indexOf('erro')===0){
      showMetaMsg('Erro: '+txt,'err');
      btn.disabled=false;btn.textContent='💾 Salvar Nova Meta';
      return;
    }
    var chave=(clienteAtivo||'').toUpperCase();
    var novaMeta={id:novoId,tipo:tipo,valor:valor,aporte:aporte,juros:rent,criadoEm:criadoEm};

    // Marca como pendente até o CSV publicado confirmar (ver parseMetas)
    METAS_PENDENTES[novoId]={cliente:clienteAtivo,tipo:tipo,valor:valor,aporte:aporte,juros:rent,criadoEm:criadoEm};
    if(!METAS[chave])METAS[chave]=[];
    METAS[chave].push(novaMeta);

    showMetaMsg('✓ Meta salva com sucesso!','ok');
    btn.disabled=false;btn.textContent='💾 Salvar Nova Meta';
    var hint=document.getElementById('meta-hint');
    if(hint)hint.textContent='Meta adicionada à lista';

    renderizarListaMetas();

    // Limpa o formulário para permitir lançar outra meta em seguida
    // (o painel permanece aberto — o objetivo é dar suporte a várias metas)
    valorEl.value=0;
    if(aporteEl)aporteEl.value=0;
    if(rentEl)rentEl.value=(1).toFixed(2);
    calcMetas();
  })
  .catch(function(e){
    showMetaMsg('Erro: '+e.message,'err');
    btn.disabled=false;btn.textContent='💾 Salvar Nova Meta';
  });
}


</script>
</body>
</html>

/* Turnia: app web conectada a Supabase */
(function () {
'use strict';

var CFG = { url: 'https://yuqrzicupddfceimegkk.supabase.co', key: 'sb_publishable_PX3R99YAZj6_EJJ9Q3Hctg_ykgvENSi' };
var sb = null;
try { sb = window.supabase.createClient(CFG.url, CFG.key); } catch (e) { sb = null; }

var $ = function (s) { return document.querySelector(s); };
var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
var money = function (n) { return '$\u00a0' + String(Math.round(+n || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); };
var DOWL = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
var DOWS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
var DEFAULT_TZ = 'America/Argentina/Buenos_Aires';
var PPH = 56;
var Q = new URLSearchParams(location.search);

var ART = {"neutral": [["a1", "<rect x=\"40\" y=\"50\" width=\"220\" height=\"210\" rx=\"28\"/><path d=\"M40 105H260M100 28v44M200 28v44\"/><rect x=\"66\" y=\"130\" width=\"34\" height=\"26\" rx=\"8\"/><rect x=\"116\" y=\"130\" width=\"34\" height=\"26\" rx=\"8\"/><rect x=\"166\" y=\"130\" width=\"34\" height=\"26\" rx=\"8\"/><rect x=\"66\" y=\"174\" width=\"34\" height=\"26\" rx=\"8\"/><rect x=\"116\" y=\"174\" width=\"34\" height=\"26\" rx=\"8\"/><rect x=\"166\" y=\"174\" width=\"34\" height=\"26\" rx=\"8\"/><rect x=\"66\" y=\"218\" width=\"34\" height=\"26\" rx=\"8\"/><rect x=\"116\" y=\"218\" width=\"34\" height=\"26\" rx=\"8\"/><rect x=\"166\" y=\"218\" width=\"34\" height=\"26\" rx=\"8\"/>"], ["a2", "<circle cx=\"150\" cy=\"150\" r=\"105\"/><path d=\"M150 85v68l44 26\"/><circle cx=\"150\" cy=\"150\" r=\"7\"/>"]], "peluqueria": [["a1", "<g transform=\"translate(25 10)\"><path d=\"M75 85C75 62 100 52 135 52H205C238 52 252 74 252 96C252 118 238 140 205 140H135C100 140 75 130 75 108Z\"/><path d=\"M75 88L38 80V118L75 108\"/><path d=\"M228 70V122M206 64V128M184 62V130\"/><path d=\"M150 140L132 238Q129 256 147 256H168Q186 256 189 240L204 140\"/><path d=\"M158 178H178\"/><path d=\"M18 70Q5 80 18 90M10 58Q-8 80 10 102\"/></g>"], ["a2", "<rect x=\"105\" y=\"14\" width=\"80\" height=\"262\" rx=\"22\"/><path d=\"M145 14V276\"/><rect x=\"115\" y=\"28\" width=\"22\" height=\"130\" rx=\"8\"/><rect x=\"153\" y=\"28\" width=\"22\" height=\"130\" rx=\"8\"/><path d=\"M105 190H185\"/><circle cx=\"145\" cy=\"226\" r=\"7\"/><path d=\"M130 252H160\"/>"], ["a3", "<rect x=\"20\" y=\"90\" width=\"260\" height=\"56\" rx=\"14\"/><path d=\"M20 118H280\"/><path d=\"M45 146v50M72 146v50M99 146v50M126 146v50M153 146v50M180 146v50M207 146v50M234 146v50M261 146v50\"/>"]], "barberia": [["a1", "<path d=\"M110 80H190A20 20 0 0 1 210 100V232A32 32 0 0 1 178 264H122A32 32 0 0 1 90 232V100A20 20 0 0 1 110 80Z\"/><rect x=\"112\" y=\"46\" width=\"76\" height=\"34\" rx=\"6\"/><path d=\"M122 46V24M136 46V24M150 46V24M164 46V24M178 46V24\"/><rect x=\"138\" y=\"116\" width=\"24\" height=\"52\" rx=\"12\"/><path d=\"M150 126V142\"/><path d=\"M118 192H182M118 208H182M118 224H182\"/><path d=\"M150 264Q150 290 190 292\"/>"], ["a2", "<circle cx=\"67\" cy=\"250\" r=\"26\"/><circle cx=\"153\" cy=\"254\" r=\"26\"/><path d=\"M76 225L195 30L86 232Z\"/><path d=\"M144 230L20 32L136 234Z\"/><circle cx=\"108\" cy=\"176\" r=\"5\"/>"], ["a3", "<rect x=\"20\" y=\"90\" width=\"260\" height=\"56\" rx=\"14\"/><path d=\"M20 118H280\"/><path d=\"M45 146v50M72 146v50M99 146v50M126 146v50M153 146v50M180 146v50M207 146v50M234 146v50M261 146v50\"/>"]], "manicura": [["a1", "<rect x=\"120\" y=\"14\" width=\"40\" height=\"100\" rx=\"12\"/><path d=\"M130 30V98M140 30V98M150 30V98\"/><rect x=\"108\" y=\"114\" width=\"64\" height=\"16\" rx=\"5\"/><rect x=\"64\" y=\"130\" width=\"152\" height=\"150\" rx=\"32\"/><path d=\"M140 170C122 196 112 210 112 226A28 28 0 0 0 168 226C168 210 158 196 140 170Z\"/>"], ["a2", "<path d=\"M150 40C182 92 182 146 150 196C118 146 118 92 150 40Z\"/><path d=\"M150 196C98 178 66 128 56 86C108 94 142 136 150 196Z\"/><path d=\"M150 196C202 178 234 128 244 86C192 94 158 136 150 196Z\"/><path d=\"M150 198C90 206 38 172 18 128C70 120 122 144 150 198Z\"/><path d=\"M150 198C210 206 262 172 282 128C230 120 178 144 150 198Z\"/><path d=\"M60 236Q105 256 150 236Q195 256 240 236\"/>"], ["a3", "<rect x=\"118\" y=\"10\" width=\"60\" height=\"270\" rx=\"30\"/><path d=\"M118 70L178 40M118 110L178 80M118 150L178 120M118 190L178 160M118 230L178 200\"/>"]]};

var RUBROS = {
  manicura: { label: 'Manicura y estética', ph: 'Ej: Lu Nails Studio',
    sub: 'La app que ordena tu centro de estética: turnos, equipo, cobros y la agenda de cada profesional, todo en un solo lugar.',
    desc: 'Uñas, pedicuría, depilación y tratamientos.', icon: 'sparkle',
    servicios: [['Esmaltado semipermanente', 60, 14000], ['Soft gel', 90, 22000], ['Kapping gel', 75, 18000], ['Retiro y esmaltado', 45, 9000]] },
  peluqueria: { label: 'Peluquería', ph: 'Ej: Estudio Vero Hair',
    sub: 'La app que ordena tu peluquería: turnos, equipo, cobros y la agenda de cada estilista, todo en un solo lugar.',
    desc: 'Cortes, color, brushing y tratamientos.', icon: 'scissors',
    servicios: [['Corte y brushing', 60, 15000], ['Color completo', 90, 28000], ['Alisado o tratamiento', 75, 24000], ['Brushing', 45, 9000]] },
  barberia: { label: 'Barbería', ph: 'Ej: Franco Barber Club',
    sub: 'La app que ordena tu barbería: turnos, equipo, cobros y la agenda de cada barbero, todo en un solo lugar.',
    desc: 'Cortes, barba y color.', icon: 'comb',
    servicios: [['Corte clásico', 30, 8000], ['Corte y barba', 60, 13000], ['Perfilado de barba', 30, 6000], ['Color o mechas', 90, 25000]] }
};

var IC = {
  calendar: '<rect x="3" y="4.5" width="18" height="16" rx="3"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/>',
  users: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c.5-3.5 3-5.5 6-5.5s5.5 2 6 5.5"/><circle cx="17.5" cy="9" r="2.4"/><path d="M17 14.5c2.2.2 3.8 1.8 4.2 4.5"/>',
  scissors: '<circle cx="6" cy="6" r="2.8"/><circle cx="6" cy="18" r="2.8"/><path d="M8.5 7.5L20 17M8.5 16.5L20 7"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M5.5 18.5l1.7-1.7M16.8 7.2l1.7-1.7"/>',
  building: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M10 21v-4h4v4"/>',
  store: '<path d="M4 9l1.5-5h13L20 9"/><path d="M4 9a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0"/><path d="M5 11.5V20h14v-8.5M10 20v-5h4v5"/>',
  user: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c.6-3.8 3.4-6 7-6s6.4 2.2 7 6"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16v4M17 18h4"/>',
  comb: '<rect x="4" y="6" width="16" height="6" rx="2"/><path d="M7 12v5M10 12v5M13 12v5M16 12v5"/>'
};
function ico(k) { return '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">' + IC[k] + '</svg>'; }
function logo(s) {
  var src = s >= 72 ? 'img/logo.png' : 'img/icon-192.png';
  return '<img class="logo turnia" width="' + s + '" height="' + s + '" src="' + src + '" alt="Turnia">';
}
function chip(act, label, pressed, data) { return '<button class="chip" data-act="' + act + '" ' + (data || '') + ' aria-pressed="' + (pressed ? 'true' : 'false') + '">' + label + '</button>'; }
function artFor(k) { return '<div class="art" aria-hidden="true">' + (ART[k] || ART.neutral).map(function (p) { return '<svg class="' + p[0] + '" viewBox="0 0 300 300">' + p[1] + '</svg>'; }).join('') + '</div>'; }
function isDark() { var a = document.documentElement.getAttribute('data-theme'); return a ? a === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches; }
function themeChips() { return '<div class="chips">' + chip('theme', 'Claro', !isDark(), 'data-v="light"') + chip('theme', 'Oscuro', isDark(), 'data-v="dark"') + '</div>'; }
function toast(m) { var t = $('#toast'); t.textContent = m; t.classList.add('show'); clearTimeout(toast.h); toast.h = setTimeout(function () { t.classList.remove('show'); }, 3200); }

/* ---------- fechas con zona horaria ---------- */
function tzOff(ms, tz) {
  var f = new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
  var p = {}; f.formatToParts(new Date(ms)).forEach(function (x) { p[x.type] = x.value; });
  return Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second) - ms;
}
function zonedToUtc(ds, min, tz) {
  var a = ds.split('-').map(Number);
  var guess = Date.UTC(a[0], a[1] - 1, a[2], 0, 0, 0) + min * 60000;
  var off = tzOff(guess, tz), t = guess - off, off2 = tzOff(t, tz);
  if (off2 !== off) t = guess - off2;
  return new Date(t);
}
function utcToLocal(iso, tz) {
  var ms = Math.floor(new Date(iso).getTime() / 1000) * 1000;
  var l = new Date(ms + tzOff(ms, tz));
  return { ds: l.toISOString().slice(0, 10), min: l.getUTCHours() * 60 + l.getUTCMinutes(), dow: l.getUTCDay() };
}
function todayDs(tz) { return utcToLocal(new Date().toISOString(), tz).ds; }
function addDays(ds, n) { var a = ds.split('-').map(Number); return new Date(Date.UTC(a[0], a[1] - 1, a[2] + n)).toISOString().slice(0, 10); }
function dowOf(ds) { var a = ds.split('-').map(Number); return new Date(Date.UTC(a[0], a[1] - 1, a[2])).getUTCDay(); }
function dlabel(ds) { return DOWS[dowOf(ds)] + ' ' + (+ds.split('-')[2]); }
function dlong(ds) { return DOWL[dowOf(ds)] + ' ' + (+ds.split('-')[2]); }
function hhm(min) { return Math.floor(min / 60) + ':' + String(min % 60).padStart(2, '0'); }
function mstr(min) { return String(Math.floor(min / 60)).padStart(2, '0') + ':' + String(min % 60).padStart(2, '0'); }
function tmin(t) { var a = String(t).split(':'); return (+a[0]) * 60 + (+a[1]); }
function slugify(s) { return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60); }

/* ---------- estado ---------- */
var S = { items: {}, pagos: {}, route: 'boot', rubro: 'manicura', tiene: false, authMode: 'signup', authMsg: '', af: { name: '', mail: '', pass: '' }, authBusy: false, cf: { n: '', s: '', edited: false, err: '', logoBlob: null, logoPrev: '' },
  seed: true, ob: { step: 0 }, user: null, neg: null, suc: [], mie: [], hor: [], srv: [], sm: [], tab: 'agenda', ds: null, win: 0, tur: [], sheet: null, acct: false,
  P: null, pb: null, seen: false, seenR: false };

function TZ() { return (S.neg && S.neg.zona_horaria) || (S.P && S.P.negocio.zona_horaria) || DEFAULT_TZ; }
function errMsg(e) {
  var c = e && e.code;
  if (c === '23505') return 'Ese dato ya existe, probá con otro.';
  if (c === '23P01') return 'Ya hay un turno en ese horario.';
  if (c === '23503') return 'Tiene datos asociados (por ejemplo turnos). Ocultalo en vez de eliminarlo.';
  if (c === '42501') return 'No tenés permiso para hacer eso.';
  if (e && /failed to fetch|networkerror|load failed/i.test(e.message || '')) return 'No hay conexión con el servidor. Revisá tu internet y probá de nuevo en un momento.';
  return (e && e.message) || 'Algo salió mal. Probá de nuevo.';
}
async function run(p) { var r = await p; if (r.error) throw r.error; return r.data; }
function fail(e) { console.error(e); toast(errMsg(e)); }

function bizLogo(sz) {
  if (S.neg && S.neg.logo_url) return '<img class="logo biz" width="' + sz + '" height="' + sz + '" src="' + esc(S.neg.logo_url) + '" alt="Logo de ' + esc(S.neg.nombre) + '">';
  return logo(sz);
}
function resizeImg(file, max) {
  return new Promise(function (res, rej) {
    var u = URL.createObjectURL(file), im = new Image();
    im.onload = function () {
      var r = Math.min(1, max / Math.max(im.width, im.height)), c = document.createElement('canvas');
      c.width = Math.max(1, Math.round(im.width * r)); c.height = Math.max(1, Math.round(im.height * r));
      c.getContext('2d').drawImage(im, 0, 0, c.width, c.height); URL.revokeObjectURL(u);
      c.toBlob(function (b) { b ? res(b) : rej(new Error('No se pudo procesar la imagen')); }, 'image/png');
    };
    im.onerror = function () { rej(new Error('No se pudo leer la imagen. Probá con un PNG o JPG.')); };
    im.src = u;
  });
}
async function subirLogo(blob) {
  var path = S.neg.id + '/logo-' + Date.now() + '.png';
  var r = await sb.storage.from('logos').upload(path, blob, { contentType: 'image/png' });
  if (r.error) throw r.error;
  var url = sb.storage.from('logos').getPublicUrl(path).data.publicUrl;
  await run(sb.from('negocios').update({ logo_url: url }).eq('id', S.neg.id));
  S.neg.logo_url = url;
}
var DURS = [10, 15, 20, 25, 30, 40, 45, 50, 60, 75, 90, 105, 120, 135, 150, 180, 210, 240];
function durOpts(sel) { var l = DURS.slice(); if (sel && l.indexOf(sel) < 0) { l.push(sel); l.sort(function (a, b) { return a - b; }); } return l.map(function (m) { return '<option value="' + m + '"' + (m === sel ? ' selected' : '') + '>' + m + ' min</option>'; }).join(''); }
function hrSel(sel, key, id) { var o = ''; for (var h = 6; h <= 23; h++) o += '<option value="' + (h * 60) + '"' + (h * 60 === sel ? ' selected' : '') + '>' + h + ':00</option>'; return '<select data-bind="' + key + '" data-id="' + id + '">' + o + '</select>'; }

/* ---------- datos ---------- */
async function loadAll(id) {
  var r = await Promise.all([
    run(sb.from('negocios').select('*').eq('id', id).single()),
    run(sb.from('sucursales').select('*').eq('negocio_id', id).order('nombre')),
    run(sb.from('miembros').select('*').eq('negocio_id', id).eq('activo', true).order('nombre')),
    run(sb.from('horarios').select('*').eq('negocio_id', id)),
    run(sb.from('servicios').select('*').eq('negocio_id', id).order('orden').order('nombre')),
    run(sb.from('servicio_miembros').select('*').eq('negocio_id', id))
  ]);
  S.neg = r[0]; S.suc = r[1];
  S.mie = r[2].sort(function (a, b) { return (a.rol === 'dueno' ? 0 : 1) - (b.rol === 'dueno' ? 0 : 1) || a.nombre.localeCompare(b.nombre); });
  S.hor = r[3]; S.srv = r[4]; S.sm = r[5];
  S.rubro = S.neg.rubro;
}
async function loadTur() {
  if (!S.ds) S.ds = todayDs(TZ());
  var tz = TZ(), a = zonedToUtc(S.ds, 0, tz).toISOString(), b = zonedToUtc(addDays(S.ds, 1), 0, tz).toISOString();
  S.tur = await run(sb.from('turnos').select('*').eq('negocio_id', S.neg.id).gte('inicio', a).lt('inicio', b).neq('estado', 'cancelado').order('inicio'));
  S.items = {}; S.pagos = {};
  var ids = S.tur.map(function (x) { return x.id; });
  if (ids.length) {
    var r = await Promise.all([run(sb.from('turno_servicios').select('*').in('turno_id', ids).order('orden')), run(sb.from('pagos').select('*').in('turno_id', ids).order('creado_en'))]);
    r[0].forEach(function (x) { (S.items[x.turno_id] = S.items[x.turno_id] || []).push(x); });
    r[1].forEach(function (x) { (S.pagos[x.turno_id] = S.pagos[x.turno_id] || []).push(x); });
  }
}
var MEDIOS = { efectivo: 'Efectivo', mercadopago: 'QR Mercado Pago', transferencia: 'Transferencia' };
function turnoNombres(t) { var it = S.items[t.id]; if (it && it.length) return it.map(function (x) { return x.nombre; }).join(' + '); var sv = svcOf(t.servicio_id); return sv ? sv.nombre : 'Servicio'; }
function pagado(t) { return (S.pagos[t.id] || []).filter(function (p) { return p.estado === 'aprobado'; }).reduce(function (a, p) { return a + (+p.monto); }, 0); }
function durTxt(m) { return m >= 60 ? Math.floor(m / 60) + ' h' + (m % 60 ? ' ' + (m % 60) + ' min' : '') : m + ' min'; }
function sched(mid) {
  var rows = S.hor.filter(function (h) { return h.miembro_id === mid; });
  if (!rows.length) return { days: [], from: 540, to: 1140, rows: rows };
  return { days: rows.map(function (h) { return h.dia_semana; }),
    from: Math.min.apply(null, rows.map(function (h) { return tmin(h.desde); })),
    to: Math.max.apply(null, rows.map(function (h) { return tmin(h.hasta); })), rows: rows };
}
async function setSched(mid, days, from, to) {
  await run(sb.from('horarios').delete().eq('miembro_id', mid));
  if (days.length) await run(sb.from('horarios').insert(days.map(function (d) { return { negocio_id: S.neg.id, miembro_id: mid, dia_semana: d, desde: mstr(from), hasta: mstr(to) }; })));
  S.hor = await run(sb.from('horarios').select('*').eq('negocio_id', S.neg.id));
}
function memberName(id) { var m = S.mie.filter(function (x) { return x.id === id; })[0]; return m ? m.nombre : '—'; }
function svcOf(id) { return S.srv.filter(function (x) { return x.id === id; })[0]; }
function whoDoes(sid) { return S.sm.filter(function (x) { return x.servicio_id === sid; }).map(function (x) { return x.miembro_id; }); }

async function enter() {
  try {
    var m = await run(sb.from('miembros').select('negocio_id,rol').eq('user_id', S.user.id).eq('activo', true).limit(1));
    if (!m.length) { S.route = 'crear'; render(); return; }
    await loadAll(m[0].negocio_id);
    S.ds = todayDs(TZ()); S.win = 0; S.tab = 'agenda';
    if (!S.neg.onboarding_listo) { S.ob = { step: 0 }; S.route = 'onb'; render(); return; }
    S.route = 'app'; await loadTur(); render();
  } catch (e) { fail(e); S.route = 'welcome'; render(); }
}

async function sembrar() {
  var own = S.mie[0];
  var rows = RUBROS[S.neg.rubro].servicios.map(function (x, i) { return { negocio_id: S.neg.id, nombre: x[0], duracion_min: x[1], precio: x[2], orden: i }; });
  var sv = await run(sb.from('servicios').insert(rows).select());
  await run(sb.from('servicio_miembros').insert(sv.map(function (x) { return { negocio_id: S.neg.id, servicio_id: x.id, miembro_id: own.id }; })));
  await setSched(own.id, [1, 2, 3, 4, 5, 6], 540, 1140);
}

/* ---------- vistas: inicio ---------- */
function topbar(back) { return '<div class="startbar"><button class="chip" data-act="go" data-v="' + back + '">Volver</button>' + themeChips() + '</div>'; }
function roleCard(act, v, i, title, desc, icon) {
  var c = ['var(--accent)', 'var(--p2)', 'var(--p3)', 'var(--warn)'][i % 4];
  return '<button class="role2" style="--i:' + i + '" data-act="' + act + '" data-v="' + v + '"><span class="blob" style="--bc:' + c + '">' + ico(icon) + '</span><b>' + title + '</b><span>' + desc + '</span></button>';
}
function welcomeView() {
  var ks = ['manicura', 'peluqueria', 'barberia'];
  return '<div class="start first' + (S.seen ? ' still' : '') + '">' + artFor('neutral') +
    '<div class="startbar"><span></span>' + themeChips() + '</div>' +
    '<span class="intro-logo">' + logo(88) + '</span>' +
    '<h1 class="hello">Bienvenido a <em>Turnia</em></h1>' +
    '<p class="sub">Elegí el rubro de tu negocio y armamos la app con sus servicios y su color.</p>' +
    '<div class="roles2 three">' + ks.map(function (k, i) { return roleCard('rubro', k, i, RUBROS[k].label, RUBROS[k].desc, RUBROS[k].icon); }).join('') + '</div>' +
    '<p class="foot">¿Ya tenés cuenta? <button data-act="login-link">Ingresar →</button></p></div>';
}
function rolesView() {
  var R = RUBROS[S.rubro];
  var cards = [['cadena', 'Varias sucursales', 'Tengo sedes y un equipo en cada una', 'building'], ['local', 'Un solo local', 'Tengo local y equipo de profesionales', 'store'],
    ['pro', 'Soy profesional', 'Quiero mi agenda y mis ingresos', 'user'], ['cliente', 'Quiero un turno', 'Reservo desde el link público del local', 'link']];
  return '<div class="start' + (S.seenR ? ' still' : '') + '">' + artFor(S.rubro) +
    '<div class="startbar"><button class="chip" data-act="go" data-v="welcome">Cambiar rubro</button>' + themeChips() + '</div>' +
    '<h1 class="hello">Bienvenido a <em>Turnia</em></h1><p class="sub">' + R.sub + '</p>' +
    '<blockquote class="quote">Turnia conecta tu agenda con tu caja: cada turno ya sabe <b>cuánto vale</b>, <b>quién lo hace</b> y <b>cuánto falta cobrar</b>.</blockquote>' +
    '<div class="roles2">' + cards.map(function (c, i) { return roleCard('role', c[0], i, c[1], c[2], c[3]); }).join('') + '</div>' +
    '<p class="foot">¿Ya tenés cuenta? <button data-act="login-link">Ingresar →</button></p></div>';
}
function infoView() {
  var pro = S.route === 'info-pro';
  return '<div class="start still">' + artFor(S.rubro) + topbar('roles') + '<span class="intro-logo">' + logo(64) + '</span>' +
    '<h1 class="hello" style="font-size:clamp(26px,7vw,38px)">' + (pro ? 'Entrás con la invitación de tu local' : 'Entrá con el link de tu local') + '</h1>' +
    '<div class="card staff cardc">' +
    (pro ? '<p>Pedile al dueño o dueña de tu local que te sume al equipo en Turnia. Cuando la invitación por mail esté lista, vas a ver tu agenda, tus horarios y tus ingresos.</p><p class="hint">Todavía no está habilitada: llega en uno de los próximos pasos.</p>'
      : '<p>Tus clientes reservan desde el link que comparte el local. Si tenés el código del local, escribilo acá.</p><label>Código del local<input id="cli-code" placeholder="ej: lu-nails-studio" autocomplete="off"></label><div class="row"><button class="btn primary" data-act="cli-go">Ir a reservar</button></div>') +
    '</div></div>';
}
function authView() {
  var su = S.authMode === 'signup';
  return '<div class="start still">' + artFor(S.rubro) + topbar(S.tiene === null ? 'welcome' : 'roles') + '<span class="intro-logo">' + logo(64) + '</span>' +
    '<h1 class="hello" style="font-size:clamp(26px,7vw,38px)">' + (su ? 'Creá tu cuenta' : 'Ingresá a <em>Turnia</em>') + '</h1>' +
    '<div class="card staff authcard"><div class="chips">' + chip('auth-mode', 'Crear cuenta', su, 'data-v="signup"') + chip('auth-mode', 'Ya tengo cuenta', !su, 'data-v="login"') + '</div>' +
    (su ? '<label>Tu nombre<input id="a-name" autocomplete="name" placeholder="Nombre y apellido" value="' + esc(S.af.name) + '"></label>' : '') +
    '<label>Email<input id="a-mail" type="email" autocomplete="email" placeholder="vos@mail.com" value="' + esc(S.af.mail) + '"></label>' +
    '<label>Contraseña<input id="a-pass" type="password" autocomplete="' + (su ? 'new-password' : 'current-password') + '" placeholder="Mínimo 6 caracteres" value="' + esc(S.af.pass) + '"></label>' +
    (S.authMsg ? '<p class="msg" role="status">' + esc(S.authMsg) + '</p>' : '') +
    '<div class="row"><button class="btn primary" data-act="auth-submit"' + (S.authBusy ? ' disabled aria-busy="true"' : '') + '>' + (S.authBusy ? '<span class="spin"></span>' + (su ? 'Creando tu cuenta…' : 'Ingresando…') : (su ? 'Crear cuenta' : 'Ingresar')) + '</button></div></div></div>';
}
function crearView() {
  var R = RUBROS[S.rubro], ks = ['manicura', 'peluqueria', 'barberia'];
  return '<div class="start still">' + artFor(S.rubro) + '<div class="startbar"><button class="chip" data-act="logout">Salir</button>' + themeChips() + '</div>' +
    '<span class="intro-logo">' + logo(64) + '</span><h1 class="hello" style="font-size:clamp(26px,7vw,38px)">Creá tu negocio</h1>' +
    '<p class="sub">Solo necesitamos el nombre. Después te voy guiando para configurar el resto.</p>' +
    '<div class="card staff authcard">' +
    '<div class="group"><span class="lbl">Rubro</span><div class="chips">' + ks.map(function (k) { return chip('c-rubro', RUBROS[k].label, S.rubro === k, 'data-v="' + k + '"'); }).join('') + '</div></div>' +
    '<label>Nombre del negocio<input id="c-n" value="' + esc(S.cf.n) + '" placeholder="' + esc(R.ph) + '" autocomplete="off"></label>' +
    '<div class="group"><span class="lbl">Logo (opcional)</span><div class="logorow">' +
    (S.cf.logoPrev ? '<img class="biz" width="64" height="64" src="' + S.cf.logoPrev + '" alt="Logo elegido">' : '<span class="biz ph">' + ico('sparkle') + '</span>') +
    '<label class="btn filebtn">' + (S.cf.logoPrev ? 'Cambiar logo' : 'Subir logo') + '<input id="logo-file" type="file" accept="image/png,image/jpeg,image/webp" hidden></label></div></div>' +
    '<div class="group"><span class="lbl">Estructura</span><div class="chips">' + chip('c-tiene', 'Un solo local', !S.tiene, 'data-v="0"') + chip('c-tiene', 'Varias sucursales', S.tiene, 'data-v="1"') + '</div></div>' +
    (S.cf.err ? '<p class="msg" role="alert">' + esc(S.cf.err) + '</p>' : '') +
    '<div class="row"><button class="btn primary" data-act="c-submit"' + (S.authBusy ? ' disabled aria-busy="true"' : '') + '>' + (S.authBusy ? '<span class="spin"></span>Creando tu negocio…' : 'Crear negocio') + '</button></div></div></div>';
}

/* ---------- guía de configuración ---------- */
var OB = ['logo', 'servicios', 'horarios', 'equipo', 'cobros', 'link', 'panel'];
function obView() {
  var o = S.ob, n = S.neg, R = RUBROS[n.rubro], own = S.mie[0], k = o.step;
  var bar = '<div class="startbar"><span></span>' + themeChips() + '</div>';
  if (k === 0) return '<div class="start still">' + artFor(n.rubro) + bar + '<span class="intro-logo">' + bizLogo(88) + '</span>' +
    '<h1 class="hello">¡Bienvenido, <em>' + esc(n.nombre) + '</em>!</h1>' +
    '<p class="sub">Ahora te ayudo a configurar tu negocio. Son ' + OB.length + ' pasos cortos: logo, servicios, horarios, equipo, cobros, tu link y un recorrido por el panel. Todo se puede cambiar después.</p>' +
    '<div class="row cen"><button class="btn primary" data-act="ob-next">Empezar</button><button class="btn" data-act="ob-skip">Lo hago después</button></div></div>';
  var key = OB[k - 1], body = '', title = '', hint = '';
  if (key === 'logo') {
    title = 'Tu logo'; hint = 'Se muestra en tu panel y en la página donde tus clientes reservan. Podés saltear este paso.';
    body = '<div class="logorow">' + (n.logo_url ? '<img class="biz" width="72" height="72" src="' + esc(n.logo_url) + '" alt="Tu logo">' : '<span class="biz ph" style="width:72px;height:72px">' + ico('sparkle') + '</span>') +
      '<label class="btn filebtn">' + (n.logo_url ? 'Cambiar logo' : 'Subir logo') + '<input id="logo-file" type="file" accept="image/png,image/jpeg,image/webp" hidden></label></div>';
  } else if (key === 'servicios') {
    title = 'Tus servicios'; hint = 'Es lo que tus clientes van a poder elegir. La duración ordena la agenda y el precio alimenta las finanzas.';
    var have = S.srv.map(function (x) { return x.nombre; });
    var sug = R.servicios.map(function (x, i) { return have.indexOf(x[0]) > -1 ? '' : chip('ob-sug', esc(x[0]) + ' · ' + x[1] + ' min · ' + money(x[2]), false, 'data-i="' + i + '"'); }).join('');
    body = (S.srv.length ? '<p class="small muted">Podés ajustar el nombre, la duración y el precio de cada uno: no todos demoran lo mismo.</p><div class="oblist">' + S.srv.map(function (x) { return '<div class="obsvc"><label>Nombre<input data-bind="s-n" data-id="' + x.id + '" value="' + esc(x.nombre) + '"></label><div class="two"><label>Duración<select data-bind="s-min" data-id="' + x.id + '">' + durOpts(x.duracion_min) + '</select></label><label>Precio ($)<input data-bind="s-price" data-id="' + x.id + '" inputmode="numeric" value="' + Math.round(x.precio) + '"></label></div><div class="row"><button class="chip" data-act="ob-svc-del" data-id="' + x.id + '">Quitar</button></div></div>'; }).join('') + '</div>' : '<p class="muted">Todavía no cargaste ninguno.</p>') +
      (sug ? '<div class="group"><span class="lbl">Sugeridos para ' + esc(R.label.toLowerCase()) + ' (tocá para sumar)</span><div class="chips">' + sug + '</div></div>' : '') +
      '<div class="group"><span class="lbl">Cargar uno propio</span><label>Nombre<input id="sv-n" placeholder="Ej: Pedicuría spa" autocomplete="off"></label><div class="two"><label>Duración<select id="sv-min">' + durOpts(60) + '</select></label><label>Precio ($)<input id="sv-p" inputmode="numeric" placeholder="12000"></label></div><p class="err" id="sv-err" role="alert"></p><div class="row"><button class="btn" data-act="ob-svc-add">Agregar</button></div></div>';
  } else if (key === 'horarios') {
    title = 'Tus horarios'; hint = 'Marcá los días que atendés y el horario. Los turnos online solo se ofrecen dentro de este horario.';
    var sc = sched(own.id), order = [1, 2, 3, 4, 5, 6, 0], ab = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
    body = '<div class="days chips">' + order.map(function (d) { return '<button class="chip" data-act="m-day" data-id="' + own.id + '" data-v="' + d + '" aria-label="' + DOWL[d] + '" aria-pressed="' + (sc.days.indexOf(d) > -1) + '">' + ab[d] + '</button>'; }).join('') + '</div>' +
      '<div class="two"><label>Entrás' + hrSel(sc.from, 'm-from', own.id) + '</label><label>Salís' + hrSel(sc.to, 'm-to', own.id) + '</label></div>';
  } else if (key === 'equipo') {
    title = n.tiene_sucursales ? 'Sucursales y equipo' : 'Tu equipo'; hint = 'Sumá a quienes atienden con vos. Cada uno tendrá su columna en la agenda. Podés ajustar sus días y horarios después, en Equipo.';
    var others = S.mie.filter(function (m) { return m.rol !== 'dueno'; });
    body = (n.tiene_sucursales ? '<div class="group"><span class="lbl">Sucursales</span>' + S.suc.map(function (x) { return '<label>Nombre<input data-bind="suc-n" data-id="' + x.id + '" value="' + esc(x.nombre) + '"></label>'; }).join('') + '<div class="row"><button class="btn" data-act="suc-add">+ Agregar sucursal</button></div></div>' : '') +
      '<div class="group"><span class="lbl">Profesionales</span>' + (others.length ? others.map(function (m) { return '<div class="obrow"><input data-bind="m-nombre" data-id="' + m.id + '" value="' + esc(m.nombre) + '" aria-label="Nombre"><button class="chip" data-act="m-del" data-id="' + m.id + '">Quitar</button></div>'; }).join('') : '<p class="muted">Trabajás solo o sola por ahora. Está bien, podés sumar gente cuando quieras.</p>') +
      '<div class="row"><button class="btn" data-act="m-add">+ Agregar profesional</button></div></div>';
  } else if (key === 'cobros') {
    title = 'Cómo vas a cobrar'; hint = 'Por ahora cobrás en el local y marcás cada turno como cobrado desde la agenda. Con eso, Finanzas ya suma lo que entra.';
    body = '<label>Seña al reservar<select data-bind="n-sena">' + [0, 20, 30, 50].map(function (p) { return '<option value="' + p + '"' + (p === n.sena_pct ? ' selected' : '') + '>' + (p ? p + '% del servicio' : 'Sin seña') + '</option>'; }).join('') + '</select></label>' +
      '<div class="card note"><b>Mercado Pago</b><p class="muted small">Lo conectamos en uno de los próximos pasos para que la seña se cobre sola al reservar. Mientras tanto, la seña queda registrada como pendiente y la confirmás vos.</p></div>';
  } else if (key === 'link') {
    title = 'Tu link de reservas'; hint = 'Es la dirección que le pasás a tus clientes por Instagram o WhatsApp. Elegí una fácil de recordar.';
    body = '<label>Dirección<input data-bind="ob-slug" value="' + esc(n.slug) + '" autocomplete="off"></label><p class="hint url">' + esc(pubUrl()) + '</p>' +
      '<div class="row"><button class="btn" data-act="copy" data-v="' + esc(pubUrl()) + '">Copiar link</button><a class="btn" href="' + esc(pubUrl(n.tiene_sucursales && S.suc[0] ? S.suc[0].slug : '')) + '" target="_blank" rel="noopener">Verlo como cliente</a></div>';
  } else if (key === 'panel') {
    title = 'Conocé tu panel'; hint = 'Así se usa día a día:';
    body = '<ul class="tour"><li>' + ico('calendar') + '<span><b>Agenda</b>Ves los turnos del día por profesional. Tocá un hueco libre para cargar uno, o un turno para cobrarlo o cancelarlo.</span></li>' +
      '<li>' + ico('users') + '<span><b>Equipo</b>Días, horarios y comisión de cada persona, y quién atiende por el link.</span></li>' +
      '<li>' + ico('scissors') + '<span><b>Servicios</b>Nombre, duración y precio de lo que ofrecés.</span></li>' +
      '<li>' + ico('gear') + '<span><b>Ajustes</b>Tu link, la seña y los datos del negocio. Desde acá podés volver a abrir esta guía.</span></li></ul>';
  }
  var last = k === OB.length;
  return '<div class="start still">' + artFor(n.rubro) + bar + '<div class="card staff authcard obcard"><div class="obprog" aria-label="Paso ' + k + ' de ' + OB.length + '">' + OB.map(function (_, i) { return '<i class="' + (i < k ? 'on' : '') + '"></i>'; }).join('') + '</div>' +
    '<p class="small muted">Paso ' + k + ' de ' + OB.length + '</p><h2>' + title + '</h2><p class="muted">' + hint + '</p>' + body +
    '<div class="row obnav"><button class="btn" data-act="ob-back">Atrás</button>' + (last ? '' : '<button class="btn" data-act="ob-next" data-skip="1">Saltar</button>') +
    '<button class="btn primary" data-act="' + (last ? 'ob-finish' : 'ob-next') + '">' + (last ? 'Ir a mi agenda' : 'Siguiente') + '</button></div></div></div>';
}

/* ---------- vistas: panel ---------- */
var TABS = [['agenda', 'Agenda', 'calendar'], ['equipo', 'Equipo', 'users'], ['servicios', 'Servicios', 'scissors'], ['ajustes', 'Ajustes', 'gear']];
function shell() {
  var nav = TABS.map(function (t) { return '<button data-act="tab" data-v="' + t[0] + '"' + (S.tab === t[0] ? ' aria-current="page"' : '') + '>' + ico(t[2]) + '<span>' + t[1] + '</span></button>'; }).join('');
  var acct = S.acct ? '<div class="card acct"><div><b>' + esc(S.neg.nombre) + '</b><div class="small muted">' + esc(S.user && S.user.email || '') + '</div></div>' +
    '<div class="group"><span class="lbl">Apariencia</span>' + themeChips() + '</div><button class="btn" data-act="logout">Cerrar sesión</button></div>' : '';
  var body = { agenda: agendaView, equipo: equipoView, servicios: serviciosView, ajustes: ajustesView }[S.tab]();
  return '<div class="top"><div class="l">' + bizLogo(36) + '<div><div class="nm">Turnia</div><div class="sub">' + esc(S.neg.nombre) + '</div></div></div>' +
    '<div class="r"><button class="chip" data-act="acct" aria-expanded="' + S.acct + '" style="display:flex;align-items:center;gap:6px">' + ico('gear') + 'Cuenta</button></div>' + acct + '</div>' +
    '<div class="shell"><nav class="nav" aria-label="Secciones">' + nav + '</nav><main>' + body + '</main></div>' + (S.sheet ? sheetView() : '');
}

function agendaView() {
  var tz = TZ(), base = addDays(todayDs(tz), -1 + S.win * 7), days = [];
  for (var i = 0; i < 8; i++) days.push(addDays(base, i));
  var today = todayDs(tz);
  var chips = '<div class="chips"><button class="chip" data-act="win" data-v="-1" aria-label="Semana anterior">‹</button>' +
    days.map(function (d) { return chip('ds', (d === today ? 'Hoy · ' : '') + dlabel(d), S.ds === d, 'data-v="' + d + '"'); }).join('') +
    '<button class="chip" data-act="win" data-v="1" aria-label="Semana siguiente">›</button></div>';
  if (!S.srv.length) return '<div class="head"><h2>Agenda</h2></div><div class="card staff"><p>Todavía no cargaste servicios. Andá a <b>Servicios</b> para crear los que ofrecés.</p><div class="row"><button class="btn primary" data-act="tab" data-v="servicios">Ir a Servicios</button></div></div>';
  var gs = 9, ge = 19;
  S.mie.forEach(function (m) { var sc = sched(m.id); if (sc.rows.length) { gs = Math.min(gs, Math.floor(sc.from / 60)); ge = Math.max(ge, Math.ceil(sc.to / 60)); } });
  var H = (ge - gs) * PPH, dow = dowOf(S.ds), times = '';
  for (var h = gs; h < ge; h++) times += '<div style="top:' + ((h - gs) * PPH) + 'px">' + h + ':00</div>';
  var total = 0, count = 0;
  var cols = S.mie.map(function (m) {
    var rows = S.hor.filter(function (x) { return x.miembro_id === m.id && x.dia_semana === dow; }), off = '';
    if (!rows.length) off = '<div class="off" style="top:0;height:' + H + 'px"></div>';
    else {
      var a = Math.min.apply(null, rows.map(function (x) { return tmin(x.desde); })), z = Math.max.apply(null, rows.map(function (x) { return tmin(x.hasta); }));
      if (a > gs * 60) off += '<div class="off" style="top:0;height:' + ((a - gs * 60) / 60 * PPH) + 'px"></div>';
      if (z < ge * 60) off += '<div class="off" style="top:' + ((z - gs * 60) / 60 * PPH) + 'px;height:' + ((ge * 60 - z) / 60 * PPH) + 'px"></div>';
    }
    var ap = S.tur.filter(function (t) { return t.miembro_id === m.id; }).map(function (t) {
      var l = utcToLocal(t.inicio, tz), hgt = t.duracion_min / 60 * PPH - 2, sv = svcOf(t.servicio_id), cls = t.estado_pago === 'sena' ? 'seña' : t.estado_pago;
      total += +t.precio; count++;
      return '<button class="appt c' + m.color + '" data-act="appt" data-v="' + t.id + '" style="top:' + ((l.min - gs * 60) / 60 * PPH + 1) + 'px;height:' + hgt + 'px">' +
        '<b><i class="dot ' + cls + '"></i>' + esc(t.cliente_nombre) + '</b>' + (hgt > 38 ? '<span>' + esc(turnoNombres(t)) + ' · ' + hhm(l.min) + '</span>' : '') + '</button>';
    }).join('');
    return '<div class="ag-c" data-mid="' + m.id + '" data-gs="' + gs + '" style="height:' + H + 'px">' + off + ap + '</div>';
  }).join('');
  var heads = S.mie.map(function (m) { var sc = sched(m.id), w = sc.days.indexOf(dow) > -1; return '<div class="ag-h c' + m.color + '"><i class="pdot"></i>' + esc(m.nombre) + '<small>' + (w ? hhm(sc.from) + ' a ' + hhm(sc.to) : 'No trabaja') + '</small></div>'; }).join('');
  return '<div class="head"><h2>Agenda</h2><button class="btn primary" data-act="new">+ Nuevo turno</button></div>' + chips +
    '<p class="muted small">' + dlong(S.ds) + ' · ' + count + ' turnos · ' + money(total) + ' previstos. Tocá un hueco libre para cargar un turno.</p>' +
    '<div class="legend"><span><i class="dot pagado"></i>Cobrado</span><span><i class="dot seña"></i>Con seña</span><span><i class="dot pendiente"></i>Sin cobrar</span><span>Rayado: fuera de horario</span></div>' +
    '<div class="agenda"><div class="ag" style="--n:' + S.mie.length + '"><div class="ag-h"></div>' + heads + '<div class="ag-t" style="height:' + H + 'px">' + times + '</div>' + cols + '</div></div>';
}

function equipoView() {
  var order = [1, 2, 3, 4, 5, 6, 0], ab = ['D', 'L', 'M', 'M', 'J', 'V', 'S'], RL = { dueno: 'Dueño o dueña', encargado: 'Encargado', profesional: 'Profesional' };
  var hrs = function (sel, key, id) { var o = ''; for (var h = 6; h <= 23; h++) o += '<option value="' + (h * 60) + '"' + (h * 60 === sel ? ' selected' : '') + '>' + h + ':00</option>'; return '<select data-bind="' + key + '" data-id="' + id + '">' + o + '</select>'; };
  var cards = S.mie.map(function (m) {
    var sc = sched(m.id);
    var days = order.map(function (d) { return '<button class="chip" data-act="m-day" data-id="' + m.id + '" data-v="' + d + '" aria-label="' + DOWL[d] + '" aria-pressed="' + (sc.days.indexOf(d) > -1) + '">' + ab[d] + '</button>'; }).join('');
    var cm = ''; [0, 30, 35, 40, 45, 50, 60].forEach(function (c) { cm += '<option value="' + c + '"' + (c === m.comision_pct ? ' selected' : '') + '>' + c + '%</option>'; });
    var sucSel = (S.neg.tiene_sucursales && S.suc.length > 1) ? '<label>Sucursal<select data-bind="m-suc" data-id="' + m.id + '">' + S.suc.map(function (s) { return '<option value="' + s.id + '"' + (s.id === m.sucursal_id ? ' selected' : '') + '>' + esc(s.nombre) + '</option>'; }).join('') + '</select></label>' : '';
    return '<div class="card staff c' + m.color + '"><div class="top2"><span class="tag">' + RL[m.rol] + '</span>' + chip('m-pub', 'Atiende por el link', m.atiende_publico, 'data-id="' + m.id + '"') + '</div>' +
      '<label>Nombre<input data-bind="m-nombre" data-id="' + m.id + '" value="' + esc(m.nombre) + '"></label>' +
      '<div class="days chips">' + days + '</div>' +
      '<div class="two"><label>Entra' + hrs(sc.from, 'm-from', m.id) + '</label><label>Sale' + hrs(sc.to, 'm-to', m.id) + '</label><label>Comisión<select data-bind="m-comm" data-id="' + m.id + '">' + cm + '</select></label>' + sucSel + '</div>' +
      (m.rol !== 'dueno' ? '<div class="row"><button class="btn danger" data-act="m-del" data-id="' + m.id + '">Quitar del equipo</button></div>' : '') + '</div>';
  }).join('');
  return '<div class="head"><h2>Equipo</h2><button class="btn primary" data-act="m-add">+ Profesional</button></div>' +
    '<p class="muted small">Los días y horarios mandan sobre la agenda y sobre los turnos que ven tus clientes en el link.</p><div class="grid">' + cards + '</div>';
}

function serviciosView() {
  var opts = durOpts;
  var cards = S.srv.map(function (x) {
    var who = whoDoes(x.id), on = x.visible;
    var chips = S.mie.map(function (m) { return chip('s-who', esc(m.nombre), who.indexOf(m.id) > -1, 'data-sid="' + x.id + '" data-id="' + m.id + '"'); }).join('');
    return '<div class="card staff"><div class="top2"><span class="stat ' + (on ? 'on' : 'off2') + '">' + (on ? 'Visible para clientes' : 'Oculto') + '</span><button class="chip" data-act="s-vis" data-id="' + x.id + '">' + (on ? 'Ocultar' : 'Mostrar') + '</button></div>' +
      '<label>Nombre<input data-bind="s-n" data-id="' + x.id + '" value="' + esc(x.nombre) + '"></label>' +
      '<div class="two"><label>Duración<select data-bind="s-min" data-id="' + x.id + '">' + opts(x.duracion_min) + '</select></label><label>Precio ($)<input data-bind="s-price" data-id="' + x.id + '" inputmode="numeric" value="' + Math.round(x.precio) + '"></label></div>' +
      '<div class="group"><span class="lbl">Quién lo hace</span><div class="chips">' + chips + '</div></div>' +
      '<div class="row"><button class="btn danger" data-act="s-del" data-id="' + x.id + '">Eliminar</button></div></div>';
  }).join('');
  return '<div class="head"><h2>Servicios</h2></div>' +
    '<p class="muted small">Lo que cargues acá es lo que tus clientes pueden elegir en el link público. La duración ordena la agenda y el precio alimenta las finanzas.</p>' +
    '<div class="card staff"><h3>Agregar servicio</h3><label>Nombre<input id="sv-n" placeholder="Ej: Pedicuría spa" autocomplete="off"></label>' +
    '<div class="two"><label>Duración<select id="sv-min">' + opts(60) + '</select></label><label>Precio ($)<input id="sv-p" inputmode="numeric" placeholder="12000"></label></div>' +
    '<p class="err" id="sv-err" role="alert"></p><div class="row"><button class="btn primary" data-act="s-add">Agregar</button></div></div>' +
    '<div class="grid">' + cards + '</div>';
}

function pubUrl(sucSlug) { return location.origin + location.pathname + '?n=' + S.neg.slug + (sucSlug ? '&s=' + sucSlug : ''); }
function ajustesView() {
  var n = S.neg;
  var links = (n.tiene_sucursales && S.suc.length > 1) ? S.suc.map(function (s) { return '<div class="group"><span class="lbl">' + esc(s.nombre) + '</span><span class="url">' + esc(pubUrl(s.slug)) + '</span><div class="row"><button class="btn" data-act="copy" data-v="' + esc(pubUrl(s.slug)) + '">Copiar</button></div></div>'; }).join('')
    : '<div class="linkbox"><span class="url">' + esc(pubUrl()) + '</span><button class="btn" data-act="copy" data-v="' + esc(pubUrl()) + '">Copiar</button></div>';
  var sucs = n.tiene_sucursales ? '<div class="card staff"><h3>Sucursales</h3>' + S.suc.map(function (s) { return '<label>Nombre<input data-bind="suc-n" data-id="' + s.id + '" value="' + esc(s.nombre) + '"></label>'; }).join('') + '<div class="row"><button class="btn" data-act="suc-add">+ Agregar sucursal</button></div></div>' : '';
  return '<div class="head"><h2>Ajustes</h2></div>' +
    '<div class="card staff"><h3>Tu link de reservas</h3>' + links + '<p class="muted small">Pegalo en Instagram, WhatsApp o Google. Tus clientes reservan desde ahí, sin instalar nada ni crear cuenta.</p>' +
    '<div class="row"><a class="btn" href="' + esc(pubUrl(n.tiene_sucursales && S.suc[0] ? S.suc[0].slug : '')) + '" target="_blank" rel="noopener">Ver como cliente</a></div></div>' +
    '<div class="card staff"><h3>Guía de configuración</h3><p class="muted small">Repasá logo, servicios, horarios, equipo, cobros y link paso a paso.</p><div class="row"><button class="btn" data-act="ob-guia">Abrir la guía</button></div></div>' +
    '<div class="card staff"><h3>Negocio</h3><label>Nombre<input data-bind="n-nombre" value="' + esc(n.nombre) + '"></label>' +
    '<label>Seña al reservar<select data-bind="n-sena">' + [0, 20, 30, 50].map(function (p) { return '<option value="' + p + '"' + (p === n.sena_pct ? ' selected' : '') + '>' + (p ? p + '% del servicio' : 'Sin seña') + '</option>'; }).join('') + '</select></label>' +
    '<p class="hint">El cobro de la seña con Mercado Pago llega en un próximo paso. Por ahora queda guardada la preferencia.</p></div>' + sucs;
}

function sheetView() {
  var sh = S.sheet, tz = TZ(), inner = '';
  if (sh.type === 'new') {
    var gs = 9, ge = 19; S.mie.forEach(function (m) { var sc = sched(m.id); if (sc.rows.length) { gs = Math.min(gs, Math.floor(sc.from / 60)); ge = Math.max(ge, Math.ceil(sc.to / 60)); } });
    var to = ''; for (var t = gs * 60; t < ge * 60; t += 30) to += '<option value="' + t + '"' + (t === sh.min ? ' selected' : '') + '>' + hhm(t) + '</option>';
    if (!sh.svcs) { sh.svcs = [S.srv[0].id]; sh.dur = S.srv[0].duracion_min; sh.price = Math.round(S.srv[0].precio); sh.client = ''; }
    inner = '<h3>Nuevo turno</h3><p class="muted small">' + dlong(S.ds) + '</p>' +
      '<label>Cliente<input id="f-client" placeholder="Nombre y apellido" autocomplete="off" value="' + esc(sh.client) + '"></label>' +
      '<div class="group"><span class="lbl">Servicios (podés elegir varios)</span><div class="chips">' + S.srv.map(function (x) { return chip('sh-svc', esc(x.nombre), sh.svcs.indexOf(x.id) > -1, 'data-id="' + x.id + '"'); }).join('') + '</div></div>' +
      '<div class="two"><label>Duración total<select id="f-dur">' + durOpts(sh.dur) + '</select></label><label>Precio total ($)<input id="f-price" inputmode="numeric" value="' + sh.price + '"></label></div>' +
      '<div class="two"><label>Profesional<select id="f-mie">' + S.mie.map(function (m) { return '<option value="' + m.id + '"' + (m.id === sh.mid ? ' selected' : '') + '>' + esc(m.nombre) + '</option>'; }).join('') + '</select></label><label>Hora<select id="f-time">' + to + '</select></label></div>' +
      '<p class="err" id="f-err" role="alert"></p><div class="row"><button class="btn primary" data-act="sheet-save">Guardar turno</button><button class="btn" data-act="sheet-close">Cancelar</button></div>';
  } else {
    var a = S.tur.filter(function (x) { return x.id === sh.id; })[0]; if (!a) return '';
    var l = utcToLocal(a.inicio, tz), paid = pagado(a), saldo = Math.max(0, +a.precio - paid), cls = a.estado_pago === 'sena' ? 'seña' : a.estado_pago;
    var label = a.estado_pago === 'pagado' ? 'Cobrado' : a.estado_pago === 'sena' ? 'Pagó ' + money(paid) + ' de ' + money(a.precio) + ' · falta ' + money(saldo) : 'Sin cobrar';
    var its = S.items[a.id] || [];
    var lines = its.length > 1 ? '<ul class="lines">' + its.map(function (x) { return '<li><span>' + esc(x.nombre) + ' <small>' + x.duracion_min + ' min</small></span><b>' + money(x.precio) + '</b></li>'; }).join('') + '</ul>' : '';
    var pays = (S.pagos[a.id] || []).length ? '<ul class="lines">' + S.pagos[a.id].map(function (p) { return '<li><span>' + esc(MEDIOS[p.medio] || p.medio) + '</span><b>' + money(p.monto) + '</b></li>'; }).join('') + '</ul>' : '';
    var cb = sh.cobro, acts;
    if (cb) {
      acts = '<div class="group"><span class="lbl">¿Cómo paga?</span><div class="chips">' + Object.keys(MEDIOS).map(function (k) { return chip('cb-medio', MEDIOS[k], cb.medio === k, 'data-v="' + k + '"'); }).join('') + '</div></div>' +
        '<label>Monto a cobrar ($)<input id="cb-monto" inputmode="numeric" value="' + cb.monto + '"></label><p class="hint">Si paga una parte, queda el resto pendiente.</p><p class="err" id="cb-err" role="alert"></p>' +
        '<div class="row"><button class="btn primary" data-act="cb-ok"' + (cb.busy ? ' disabled' : '') + '>Confirmar cobro</button><button class="btn" data-act="cb-no">Volver</button></div>';
    } else if (sh.confirm) {
      acts = '<p class="err" style="min-height:0"><b>¿Cancelar este turno?</b></p><div class="row"><button class="btn danger" data-act="t-cancel-yes">Sí, cancelar</button><button class="btn" data-act="t-cancel-no">No</button></div>';
    } else {
      acts = '<div class="row">' + (a.estado_pago !== 'pagado' ? '<button class="btn primary" data-act="cb-start">Cobrar' + (saldo ? ' ' + money(saldo) : '') + '</button>' : '') + '<button class="btn danger" data-act="t-cancel-ask">Cancelar turno</button><button class="btn" data-act="sheet-close">Cerrar</button></div>';
    }
    inner = '<h3>' + esc(a.cliente_nombre) + '</h3><p>' + esc(turnoNombres(a)) + ' · ' + durTxt(a.duracion_min) + ' · <b>' + money(a.precio) + '</b></p>' + lines +
      '<p class="muted">' + dlong(l.ds) + ' · ' + hhm(l.min) + ' a ' + hhm(l.min + a.duracion_min) + ' · con ' + esc(memberName(a.miembro_id)) + '</p>' +
      '<p><i class="dot ' + cls + '"></i><b>' + label + '</b>' + (a.origen === 'link' ? ' · reservó por el link' : '') + '</p>' + pays + acts;
  }
  return '<div class="scrim" data-scrim="1"><div class="sheet" role="dialog" aria-modal="true">' + inner + '</div></div>';
}

/* ---------- vistas: reserva pública ---------- */
function pubSel() { var d = S.P; return S.pb.svcs.map(function (id) { return d.servicios.filter(function (x) { return x.id === id; })[0]; }).filter(Boolean); }
function pubTot() { var l = pubSel(); return { n: l.length, dur: l.reduce(function (a, x) { return a + x.duracion_min; }, 0), precio: l.reduce(function (a, x) { return a + (+x.precio); }, 0) }; }
function pubEligible() {
  var d = S.P, b = S.pb, sel = pubSel();
  return d.equipo.filter(function (m) {
    if (b.suc && m.sucursal_id !== b.suc) return false;
    if (sel.some(function (sv) { return sv.miembros.indexOf(m.id) < 0; })) return false;
    return true;
  });
}
function pubSlots() {
  var d = S.P, b = S.pb, tz = d.negocio.zona_horaria, tot = pubTot();
  if (!tot.n || !b.ds) return [];
  var dow = dowOf(b.ds), oc = b.ocup[b.ds] || [], now = Date.now() + 30 * 60000, set = {};
  pubEligible().filter(function (m) { return b.mid === 'any' || m.id === b.mid; }).forEach(function (m) {
    m.horarios.filter(function (h) { return h.dia === dow; }).forEach(function (h) {
      var a = tmin(h.desde), z = tmin(h.hasta);
      for (var t = a; t + tot.dur <= z; t += 30) {
        var s = zonedToUtc(b.ds, t, tz).getTime(), e = s + tot.dur * 60000;
        if (s < now) continue;
        var busy = oc.some(function (o) { return o.miembro_id === m.id && new Date(o.inicio).getTime() < e && new Date(o.fin).getTime() > s; });
        if (!busy && set[t] === undefined) set[t] = m.id;
      }
    });
  });
  return Object.keys(set).map(Number).sort(function (a, c) { return a - c; }).map(function (t) { return { t: t, mid: set[t] }; });
}
function pubView() {
  var d = S.P;
  if (!d) return '<div class="pubwrap"><div class="pubhead">' + logo(40) + '<div class="nm">Turnia</div></div><div class="card staff"><h3>No encontramos este local</h3><p class="muted">Revisá que el link esté completo o pedile uno nuevo al local.</p></div></div>';
  var b = S.pb, tz = d.negocio.zona_horaria, hdr = '<div class="pubhead">' + (d.negocio.logo_url ? '<img class="logo biz" width="40" height="40" src="' + esc(d.negocio.logo_url) + '" alt="">' : logo(40)) + '<div><div class="nm">' + esc(d.negocio.nombre) + '</div><div class="small muted">Reservá tu turno online</div></div></div>';
  if (b.done) {
    var l = utcToLocal(b.done.inicio, tz), lst = b.doneSvcs || [];
    return artFor(d.negocio.rubro) + '<div class="pubwrap">' + hdr + '<div class="card staff"><h2>¡Turno reservado!</h2><p>' + dlong(l.ds) + ' a las ' + hhm(l.min) + ' · ' + durTxt(b.done.duracion_min) + '</p>' +
      '<ul class="lines">' + lst.map(function (x) { return '<li><span>' + esc(x.nombre) + '</span><b>' + money(x.precio) + '</b></li>'; }).join('') + '<li><span><b>Total</b></span><b>' + money(b.done.precio) + '</b></li></ul>' +
      (+b.done.senia_requerida > 0 ? '<p class="muted">El local te va a pedir una seña de ' + money(b.done.senia_requerida) + ' para confirmar.</p>' : '<p class="muted">Pagás en el local.</p>') +
      '<div class="row"><button class="btn primary" data-act="p-again">Reservar otro turno</button></div></div></div>';
  }
  var sucs = d.sucursales.length > 1 ? '<div class="step"><span class="lbl">Sucursal</span><div class="chips">' + d.sucursales.map(function (s) { return chip('p-suc', esc(s.nombre), b.suc === s.id, 'data-v="' + s.id + '"'); }).join('') + '</div></div>' : '';
  var svcs = d.servicios.map(function (x) { var on = b.svcs.indexOf(x.id) > -1; return '<button class="svc" data-act="p-svc" data-v="' + x.id + '" aria-pressed="' + on + '"><div><b>' + (on ? '✓ ' : '') + esc(x.nombre) + '</b><span>' + x.duracion_min + ' min</span></div><em>' + money(x.precio) + '</em></button>'; }).join('');
  var tot = pubTot(), body = '', sum = '';
  if (tot.n) {
    sum = '<p class="pubsum" role="status"><b>' + tot.n + (tot.n === 1 ? ' servicio' : ' servicios') + '</b> · ' + durTxt(tot.dur) + ' · <b>' + money(tot.precio) + '</b></p>';
    var E = pubEligible();
    if (!E.length) body = '<div class="card staff"><p>Ningún profesional hace todos esos servicios juntos. Probá con otra combinación, o reservá por separado.</p></div>';
    else {
      var pros = chip('p-mid', 'Cualquiera', b.mid === 'any', 'data-v="any"') + E.map(function (m) { return chip('p-mid', esc(m.nombre), b.mid === m.id, 'data-v="' + m.id + '"'); }).join('');
      var today = todayDs(tz), days = [];
      for (var i = 0; i < 14; i++) { var ds = addDays(today, i), dw = dowOf(ds); if (E.some(function (m) { return m.horarios.some(function (h) { return h.dia === dw; }); })) days.push(ds); }
      var slots = b.ds ? pubSlots() : [];
      body = '<div class="step"><span class="lbl">Profesional</span><div class="chips">' + pros + '</div></div>' +
        '<div class="step"><span class="lbl">Día</span>' + (days.length ? '<div class="chips">' + days.map(function (x) { return chip('p-ds', (x === today ? 'Hoy · ' : '') + dlabel(x), b.ds === x, 'data-v="' + x + '"'); }).join('') + '</div>' : '<p class="muted">No hay días disponibles con esa selección.</p>') + '</div>' +
        (b.ds ? '<div class="step"><span class="lbl">Horario</span>' + (b.loading ? '<p class="muted">Buscando horarios…</p>' : (slots.length ? '<div class="chips">' + slots.map(function (x) { return chip('p-min', hhm(x.t), b.min === x.t, 'data-v="' + x.t + '"'); }).join('') + '</div>' : '<p class="muted">No quedan horarios ese día. Probá con otro día o profesional.</p>')) + '</div>' : '') +
        (b.min !== null ? '<div class="card staff"><h3>Tus datos</h3><label>Nombre<input id="p-name" autocomplete="name" placeholder="Nombre y apellido"></label><label>Teléfono (opcional)<input id="p-tel" type="tel" autocomplete="tel" placeholder="Para avisarte si hay cambios"></label>' +
          '<p class="err" id="p-err" role="alert">' + esc(b.err) + '</p><div class="row"><button class="btn primary" data-act="p-submit"' + (b.busy ? ' disabled aria-busy="true"' : '') + '>' + (b.busy ? '<span class="spin"></span>Reservando…' : 'Confirmar turno') + '</button></div></div>' : '');
    }
  }
  return artFor(d.negocio.rubro) + '<div class="pubwrap">' + hdr + '<div class="step"><span class="lbl">Servicios (elegí uno o varios)</span><div class="svcs">' + (svcs || '<p class="muted">Este local todavía no cargó servicios.</p>') + '</div>' + sum + '</div>' + sucs + body +
    '<p class="small muted" style="text-align:center">Reservas con Turnia</p></div>';
}

/* ---------- render ---------- */
function render() {
  var rb = S.rubro;
  if (S.route === 'welcome' || S.route === 'boot') rb = '';
  if ((S.route === 'app' || S.route === 'onb') && S.neg) rb = S.neg.rubro;
  if (S.route === 'pub' && S.P) rb = S.P.negocio.rubro;
  if (rb === 'barberia') document.documentElement.setAttribute('data-rubro', 'barberia'); else document.documentElement.removeAttribute('data-rubro');
  var h = '';
  switch (S.route) {
    case 'boot': h = '<div class="loading">Cargando…</div>'; break;
    case 'sinconexion': h = '<div class="loading"><div class="card staff cardc"><h3>No pude conectar</h3><p class="muted">No se cargó la conexión con la base de datos. Revisá tu internet y volvé a abrir el link.</p></div></div>'; break;
    case 'welcome': h = welcomeView(); S.seen = true; break;
    case 'roles': h = rolesView(); S.seenR = true; break;
    case 'info-pro': case 'info-cli': h = infoView(); break;
    case 'auth': h = authView(); break;
    case 'crear': h = crearView(); break;
    case 'onb': h = obView(); break;
    case 'app': h = shell(); break;
    case 'pub': h = pubView(); break;
  }
  $('#app').innerHTML = h;
}

/* ---------- acciones ---------- */
async function pubOcup(ds) {
  var b = S.pb, tz = S.P.negocio.zona_horaria;
  b.loading = true; render();
  try {
    b.ocup[ds] = await run(sb.rpc('turnos_ocupados', { p_slug: S.P.negocio.slug, p_desde: zonedToUtc(ds, 0, tz).toISOString(), p_hasta: zonedToUtc(addDays(ds, 1), 0, tz).toISOString() })) || [];
  } catch (e) { fail(e); b.ocup[ds] = []; }
  b.loading = false; render();
}
async function pubLoad(slug) {
  S.route = 'pub';
  try {
    var d = await run(sb.rpc('negocio_publico', { p_slug: slug }));
    S.P = d || null;
    if (d) {
      var s = Q.get('s'), sel = d.sucursales.filter(function (x) { return x.slug === s; })[0] || (d.sucursales.length === 1 ? d.sucursales[0] : null);
      S.pb = { svcs: [], mid: 'any', suc: sel ? sel.id : null, ds: null, min: null, done: null, err: '', ocup: {}, loading: false, busy: false };
    }
  } catch (e) { fail(e); S.P = null; }
  render();
}

document.addEventListener('click', async function (e) {
  var t = e.target.closest('[data-act]');
  if (!t) {
    if (e.target.dataset && e.target.dataset.scrim) { S.sheet = null; render(); return; }
    var col = e.target.closest('.ag-c');
    if (col && S.route === 'app') {
      var y = e.clientY - col.getBoundingClientRect().top, gs = +col.dataset.gs;
      S.sheet = { type: 'new', mid: col.dataset.mid, min: gs * 60 + Math.floor(y / PPH * 2) * 30 }; render();
    }
    return;
  }
  var act = t.dataset.act, v = t.dataset.v, id = t.dataset.id;
  try {
    switch (act) {
      case 'theme': document.documentElement.setAttribute('data-theme', v); try { localStorage.setItem('turnia-theme', v); } catch (x) { } break;
      case 'rubro': S.rubro = v; S.route = 'roles'; S.seenR = false; break;
      case 'go': S.route = v; break;
      case 'login-link': S.authMode = 'login'; S.authMsg = ''; S.tiene = null; S.route = 'auth'; break;
      case 'role':
        if (v === 'pro') S.route = 'info-pro';
        else if (v === 'cliente') S.route = 'info-cli';
        else { S.tiene = (v === 'cadena'); S.authMode = 'signup'; S.authMsg = ''; S.route = 'auth'; }
        break;
      case 'cli-go': { var code = slugify($('#cli-code').value); if (!code) { toast('Escribí el código del local'); return; } location.href = location.pathname + '?n=' + code; return; }
      case 'auth-mode': saveAF(); S.authMode = v; S.authMsg = ''; break;
      case 'auth-submit': {
        saveAF(); var mail = S.af.mail.trim(), pass = S.af.pass, su = S.authMode === 'signup';
        if (!/^\S+@\S+\.\S+$/.test(mail)) { S.authMsg = 'Revisá el email.'; break; }
        if (pass.length < 6) { S.authMsg = 'La contraseña debe tener al menos 6 caracteres.'; break; }
        S.authBusy = true; S.authMsg = ''; render();
        var r;
        try { r = su ? await sb.auth.signUp({ email: mail, password: pass, options: { emailRedirectTo: location.origin + location.pathname, data: { full_name: ($('#a-name') && $('#a-name').value.trim()) || '' } } }) : await sb.auth.signInWithPassword({ email: mail, password: pass }); }
        catch (ex) { r = { error: ex }; }
        S.authBusy = false;
        if (r.error) { var em = r.error.message || ''; S.authMsg = /Invalid login/i.test(em) ? 'Email o contraseña incorrectos.' : /already registered|already been registered/i.test(em) ? 'Ese mail ya tiene cuenta. Tocá "Ya tengo cuenta" para ingresar.' : /rate limit/i.test(em) ? 'Demasiados intentos. Esperá unos minutos y probá de nuevo.' : errMsg(r.error); break; }
        if (r.data && r.data.session) { S.user = r.data.session.user; await enter(); return; }
        S.authMsg = 'Te mandamos un mail para confirmar la cuenta. Abrilo y después volvé acá a ingresar.'; S.authMode = 'login'; break;
      }
      case 'logout': await sb.auth.signOut(); location.href = location.pathname; return;
      case 'c-rubro': saveCF(); S.rubro = v; break;
      case 'c-tiene': saveCF(); S.tiene = v === '1'; break;
      case 'c-seed': saveCF(); S.seed = !S.seed; break;
      case 'c-submit': {
        saveCF();
        var nom = S.cf.n.trim();
        if (nom.length < 2) { S.cf.err = 'Escribí el nombre del negocio.'; break; }
        S.cf.err = ''; S.authBusy = true; render();
        try {
          var base = slugify(nom); if (base.length < 3) base = 'negocio-' + Math.random().toString(36).slice(2, 6);
          var neg = null, intento = 0;
          while (!neg) {
            try { neg = await run(sb.from('negocios').insert({ nombre: nom, slug: intento ? base.slice(0, 54) + '-' + Math.random().toString(36).slice(2, 5) : base, rubro: S.rubro, tiene_sucursales: !!S.tiene }).select().single()); }
            catch (er2) { if (er2.code === '23505' && ++intento < 5) continue; throw er2; }
          }
          await loadAll(neg.id);
          await setSched(S.mie[0].id, [1, 2, 3, 4, 5, 6], 540, 1140);
          if (S.cf.logoBlob) { try { await subirLogo(S.cf.logoBlob); } catch (ex) { toast('No se pudo subir el logo. Lo podés cargar en la guía.'); } }
          S.cf.logoBlob = null; S.cf.logoPrev = '';
          S.authBusy = false; S.ob = { step: 0 }; S.route = 'onb'; S.ds = todayDs(TZ());
        } catch (er) { S.authBusy = false; S.cf.err = errMsg(er); }
        break;
      }
      case 'ob-next': S.ob.step = Math.min(OB.length, S.ob.step + 1); break;
      case 'ob-back': S.ob.step = Math.max(0, S.ob.step - 1); break;
      case 'ob-skip': case 'ob-finish':
        await run(sb.from('negocios').update({ onboarding_listo: true }).eq('id', S.neg.id)); S.neg.onboarding_listo = true;
        S.route = 'app'; S.tab = 'agenda'; S.ds = todayDs(TZ()); S.win = 0; await loadTur();
        if (act === 'ob-finish') toast('¡Listo! Tu negocio está configurado.'); break;
      case 'ob-sug': {
        var sg = RUBROS[S.neg.rubro].servicios[+t.dataset.i];
        var ns2 = await run(sb.from('servicios').insert({ negocio_id: S.neg.id, nombre: sg[0], duracion_min: sg[1], precio: sg[2], orden: S.srv.length }).select().single());
        if (S.mie.length) await run(sb.from('servicio_miembros').insert(S.mie.map(function (x) { return { negocio_id: S.neg.id, servicio_id: ns2.id, miembro_id: x.id }; })));
        await loadAll(S.neg.id); break;
      }
      case 'ob-svc-add': {
        var on = $('#sv-n').value.trim(), omin = +$('#sv-min').value, op = parseInt($('#sv-p').value.replace(/\D/g, ''), 10), oer = $('#sv-err');
        if (!on || !op) { oer.textContent = 'Completá el nombre y un precio en números.'; return; }
        var ns3 = await run(sb.from('servicios').insert({ negocio_id: S.neg.id, nombre: on, duracion_min: omin, precio: op, orden: S.srv.length }).select().single());
        if (S.mie.length) await run(sb.from('servicio_miembros').insert(S.mie.map(function (x) { return { negocio_id: S.neg.id, servicio_id: ns3.id, miembro_id: x.id }; })));
        await loadAll(S.neg.id); break;
      }
      case 'ob-svc-del': await run(sb.from('servicios').delete().eq('id', id)); await loadAll(S.neg.id); break;
      case 'ob-guia': S.ob = { step: 1 }; S.route = 'onb'; break;
      case 'tab': S.tab = v; S.acct = false; S.sheet = null; break;
      case 'acct': S.acct = !S.acct; break;
      case 'win': S.win += +v; break;
      case 'ds': S.ds = v; await loadTur(); break;
      case 'new': S.sheet = { type: 'new', mid: S.mie[0].id, min: 600 }; break;
      case 'appt': S.sheet = { type: 'detail', id: v }; break;
      case 'sheet-close': S.sheet = null; break;
      case 'sh-svc': {
        var shn = S.sheet; shn.client = $('#f-client').value; shn.mid = $('#f-mie').value; shn.min = +$('#f-time').value;
        var ii = shn.svcs.indexOf(id); if (ii > -1) { if (shn.svcs.length > 1) shn.svcs.splice(ii, 1); } else shn.svcs.push(id);
        var chosen = shn.svcs.map(svcOf); shn.dur = chosen.reduce(function (a, x) { return a + x.duracion_min; }, 0); shn.price = Math.round(chosen.reduce(function (a, x) { return a + (+x.precio); }, 0));
        break;
      }
      case 'sheet-save': {
        var nm = $('#f-client').value.trim(), err = $('#f-err'), shs = S.sheet, chosen2 = shs.svcs.map(svcOf), m = S.mie.filter(function (x) { return x.id === $('#f-mie').value; })[0], min = +$('#f-time').value;
        var pr0 = parseInt($('#f-price').value.replace(/\D/g, ''), 10);
        if (!nm) { err.textContent = 'Escribí el nombre del cliente.'; return; }
        if (isNaN(pr0)) { err.textContent = 'Escribí el precio en números.'; return; }
        var tn;
        try {
          tn = await run(sb.from('turnos').insert({ negocio_id: S.neg.id, sucursal_id: m.sucursal_id, miembro_id: m.id, servicio_id: chosen2[0].id, cliente_nombre: nm, inicio: zonedToUtc(S.ds, min, TZ()).toISOString(), duracion_min: +$('#f-dur').value, precio: pr0, origen: 'panel' }).select().single());
        } catch (er) { err.textContent = errMsg(er); return; }
        try {
          await run(sb.from('turno_servicios').insert(chosen2.map(function (x, i) { return { negocio_id: S.neg.id, turno_id: tn.id, servicio_id: x.id, nombre: x.nombre, duracion_min: x.duracion_min, precio: x.precio, orden: i }; })));
        } catch (er3) { await sb.from('turnos').delete().eq('id', tn.id); err.textContent = errMsg(er3); return; }
        S.sheet = null; await loadTur(); toast('Turno guardado'); break;
      }
      case 'cb-start': { var ta = S.tur.filter(function (x) { return x.id === S.sheet.id; })[0]; S.sheet.cobro = { medio: null, monto: Math.max(0, Math.round(+ta.precio - pagado(ta))) }; break; }
      case 'cb-no': S.sheet.cobro = null; break;
      case 'cb-medio': { var mo = $('#cb-monto'); if (mo) S.sheet.cobro.monto = mo.value; S.sheet.cobro.medio = v; break; }
      case 'cb-ok': {
        var cb = S.sheet.cobro, tb = S.tur.filter(function (x) { return x.id === S.sheet.id; })[0], cerr = $('#cb-err');
        var monto = parseInt(String($('#cb-monto').value).replace(/\D/g, ''), 10), saldo2 = Math.max(0, Math.round(+tb.precio - pagado(tb)));
        if (!cb.medio) { cerr.textContent = 'Elegí cómo paga.'; return; }
        if (isNaN(monto) || monto <= 0) { cerr.textContent = 'Escribí el monto en números.'; return; }
        if (monto > saldo2) { cerr.textContent = 'El monto supera lo que falta cobrar (' + money(saldo2) + ').'; return; }
        cb.busy = true; render();
        try {
          await run(sb.from('pagos').insert({ negocio_id: S.neg.id, turno_id: tb.id, monto: monto, tipo: monto >= saldo2 ? (pagado(tb) > 0 ? 'saldo' : 'total') : 'saldo', medio: cb.medio, estado: 'aprobado' }));
          await run(sb.from('turnos').update({ estado_pago: monto >= saldo2 ? 'pagado' : 'sena' }).eq('id', tb.id));
        } catch (er4) { cb.busy = false; fail(er4); break; }
        S.sheet = null; await loadTur(); toast('Cobro registrado: ' + MEDIOS[cb.medio]); break;
      }
      case 't-cancel-ask': S.sheet.confirm = true; break;
      case 't-cancel-no': S.sheet.confirm = false; break;
      case 't-cancel-yes': await run(sb.from('turnos').update({ estado: 'cancelado' }).eq('id', S.sheet.id)); S.sheet = null; await loadTur(); toast('Turno cancelado'); break;
      case 'm-add': {
        var n = S.mie.length;
        var nuevo = await run(sb.from('miembros').insert({ negocio_id: S.neg.id, sucursal_id: S.suc[0] ? S.suc[0].id : null, nombre: 'Nueva persona', color: (n % 3) + 1 }).select().single());
        if (S.srv.length) await run(sb.from('servicio_miembros').insert(S.srv.map(function (x) { return { negocio_id: S.neg.id, servicio_id: x.id, miembro_id: nuevo.id }; })));
        await setSched(nuevo.id, [1, 2, 3, 4, 5, 6], 540, 1140);
        await loadAll(S.neg.id); toast('Profesional agregado: cambiale el nombre'); break;
      }
      case 'm-day': {
        var sc = sched(id), d = +v, days = sc.days.slice(), k = days.indexOf(d);
        if (k > -1) days.splice(k, 1); else days.push(d);
        await setSched(id, days, sc.from, sc.to); break;
      }
      case 'm-pub': { var mm = S.mie.filter(function (x) { return x.id === id; })[0]; await run(sb.from('miembros').update({ atiende_publico: !mm.atiende_publico }).eq('id', id)); await loadAll(S.neg.id); break; }
      case 'm-del': await run(sb.from('miembros').update({ activo: false }).eq('id', id)); await loadAll(S.neg.id); await loadTur(); toast('Quitado del equipo'); break;
      case 's-add': {
        var sn = $('#sv-n').value.trim(), smin = +$('#sv-min').value, sp = parseInt($('#sv-p').value.replace(/\D/g, ''), 10), ser = $('#sv-err');
        if (!sn || !sp) { ser.textContent = 'Completá el nombre y un precio en números.'; return; }
        var ns = await run(sb.from('servicios').insert({ negocio_id: S.neg.id, nombre: sn, duracion_min: smin, precio: sp, orden: S.srv.length }).select().single());
        if (S.mie.length) await run(sb.from('servicio_miembros').insert(S.mie.map(function (x) { return { negocio_id: S.neg.id, servicio_id: ns.id, miembro_id: x.id }; })));
        await loadAll(S.neg.id); toast('Servicio agregado'); break;
      }
      case 's-vis': { var sx = svcOf(id); await run(sb.from('servicios').update({ visible: !sx.visible }).eq('id', id)); await loadAll(S.neg.id); break; }
      case 's-who': {
        var sid = t.dataset.sid, mid = id, has = S.sm.some(function (x) { return x.servicio_id === sid && x.miembro_id === mid; });
        if (has) await run(sb.from('servicio_miembros').delete().eq('servicio_id', sid).eq('miembro_id', mid));
        else await run(sb.from('servicio_miembros').insert({ negocio_id: S.neg.id, servicio_id: sid, miembro_id: mid }));
        await loadAll(S.neg.id); break;
      }
      case 's-del': await run(sb.from('servicios').delete().eq('id', id)); await loadAll(S.neg.id); toast('Servicio eliminado'); break;
      case 'suc-add': {
        var cnt = S.suc.length + 1;
        await run(sb.from('sucursales').insert({ negocio_id: S.neg.id, nombre: 'Sucursal ' + cnt, slug: 'sucursal-' + cnt + '-' + Math.random().toString(36).slice(2, 5) }));
        await loadAll(S.neg.id); toast('Sucursal agregada'); break;
      }
      case 'copy': try { await navigator.clipboard.writeText(v); toast('Link copiado'); } catch (x) { toast('Copialo a mano: ' + v); } return;
      case 'p-suc': S.pb.suc = v; S.pb.mid = 'any'; S.pb.ds = null; S.pb.min = null; break;
      case 'p-svc': {
        var ix = S.pb.svcs.indexOf(v); if (ix > -1) S.pb.svcs.splice(ix, 1); else if (S.pb.svcs.length < 6) S.pb.svcs.push(v);
        S.pb.min = null; S.pb.err = '';
        if (S.pb.mid !== 'any' && !pubEligible().some(function (m) { return m.id === S.pb.mid; })) S.pb.mid = 'any';
        if (S.pb.ds && S.pb.svcs.length) { render(); await pubOcup(S.pb.ds); return; }
        break;
      }
      case 'p-mid': S.pb.mid = v === 'any' ? 'any' : v; S.pb.min = null; break;
      case 'p-ds': S.pb.ds = v; S.pb.min = null; await pubOcup(v); return;
      case 'p-min': S.pb.min = +v; S.pb.err = ''; break;
      case 'p-submit': {
        var b = S.pb, pn = $('#p-name').value.trim(), pt = $('#p-tel').value.trim();
        if (pn.length < 2) { b.err = 'Escribí tu nombre.'; break; }
        var slot = pubSlots().filter(function (x) { return x.t === b.min; })[0];
        if (!slot) { b.err = 'Ese horario ya no está disponible. Elegí otro.'; b.min = null; break; }
        var mid2 = b.mid === 'any' ? slot.mid : b.mid, mem = S.P.equipo.filter(function (x) { return x.id === mid2; })[0];
        b.busy = true; b.err = ''; render();
        try {
          b.doneSvcs = pubSel();
          b.done = await run(sb.rpc('reservar_turno', { p_slug: S.P.negocio.slug, p_sucursal: b.suc || (mem && mem.sucursal_id) || null, p_miembro: mid2, p_servicios: b.svcs, p_inicio: zonedToUtc(b.ds, b.min, S.P.negocio.zona_horaria).toISOString(), p_nombre: pn, p_telefono: pt || null }));
        } catch (er) { b.err = errMsg(er); if (er.code === '23P01') { b.min = null; b.busy = false; await pubOcup(b.ds); return; } }
        b.busy = false; break;
      }
      case 'p-again': S.pb.svcs = []; S.pb.ds = null; S.pb.min = null; S.pb.done = null; S.pb.mid = 'any'; S.pb.ocup = {}; break;
    }
  } catch (er) { fail(er); S.authBusy = false; }
  render();
});

document.addEventListener('change', async function (e) {
  if (e.target.id === 'f-svc') { var sv0 = svcOf(e.target.value), fd = $('#f-dur'); if (sv0 && fd) fd.innerHTML = durOpts(sv0.duracion_min); var fp = $('#f-price'); if (fp) fp.value = Math.round(sv0.precio); return; }
  if (e.target.id === 'logo-file') {
    var f = e.target.files && e.target.files[0]; if (!f) return;
    try {
      var blob = await resizeImg(f, 512);
      if (S.route === 'crear') { S.cf.logoBlob = blob; S.cf.logoPrev = URL.createObjectURL(blob); saveCF(); }
      else { toast('Subiendo logo…'); await subirLogo(blob); toast('Logo guardado'); }
    } catch (er) { fail(er); }
    render(); return;
  }
  var t = e.target.closest('[data-bind]'); if (!t) return;
  var k = t.dataset.bind, v = t.value, id = t.dataset.id;
  try {
    if (k === 'm-nombre') { var nn = v.trim(); if (!nn) { toast('El nombre no puede quedar vacío'); render(); return; } await run(sb.from('miembros').update({ nombre: nn }).eq('id', id)); await loadAll(S.neg.id); }
    else if (k === 'm-suc') { await run(sb.from('miembros').update({ sucursal_id: v }).eq('id', id)); await loadAll(S.neg.id); }
    else if (k === 'm-comm') { await run(sb.from('miembros').update({ comision_pct: +v }).eq('id', id)); await loadAll(S.neg.id); }
    else if (k === 'm-from' || k === 'm-to') {
      var sc = sched(id), from = k === 'm-from' ? +v : sc.from, to = k === 'm-to' ? +v : sc.to;
      if (to <= from) { toast('La hora de salida tiene que ser posterior a la de entrada'); render(); return; }
      await setSched(id, sc.days, from, to);
    }
    else if (k === 's-n') { var sn = v.trim(); if (!sn) { toast('El nombre no puede quedar vacío'); render(); return; } await run(sb.from('servicios').update({ nombre: sn }).eq('id', id)); await loadAll(S.neg.id); }
    else if (k === 's-min') { await run(sb.from('servicios').update({ duracion_min: +v }).eq('id', id)); await loadAll(S.neg.id); }
    else if (k === 's-price') { var pr = parseInt(String(v).replace(/\D/g, ''), 10); if (isNaN(pr)) { toast('Escribí el precio en números'); render(); return; } await run(sb.from('servicios').update({ precio: pr }).eq('id', id)); await loadAll(S.neg.id); }
    else if (k === 'ob-slug') {
      var sl = slugify(v); if (sl.length < 3) { toast('El link debe tener al menos 3 letras o números'); render(); return; }
      await run(sb.from('negocios').update({ slug: sl }).eq('id', S.neg.id)); await loadAll(S.neg.id);
    }
    else if (k === 'n-nombre') { var nm = v.trim(); if (nm.length < 2) { toast('El nombre es muy corto'); render(); return; } await run(sb.from('negocios').update({ nombre: nm }).eq('id', S.neg.id)); await loadAll(S.neg.id); }
    else if (k === 'n-sena') { await run(sb.from('negocios').update({ sena_pct: +v }).eq('id', S.neg.id)); await loadAll(S.neg.id); }
    else if (k === 'suc-n') { var sx = v.trim(); if (sx.length < 2) { toast('El nombre es muy corto'); render(); return; } await run(sb.from('sucursales').update({ nombre: sx }).eq('id', id)); await loadAll(S.neg.id); }
    toast('Guardado');
  } catch (er) { fail(er); try { await loadAll(S.neg.id); } catch (x) { } }
  render();
});

function saveAF() { var n = $('#a-name'), m = $('#a-mail'), p = $('#a-pass'); if (n) S.af.name = n.value; if (m) S.af.mail = m.value; if (p) S.af.pass = p.value; }
function saveCF() { var n = $('#c-n'); if (n) S.cf.n = n.value; }
document.addEventListener('input', function (e) { if (e.target.id === 'c-n') S.cf.n = e.target.value; });
document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && S.sheet) { S.sheet = null; render(); } });

/* ---------- arranque ---------- */
async function boot() {
  try { var th = localStorage.getItem('turnia-theme'); if (th === 'light' || th === 'dark') document.documentElement.setAttribute('data-theme', th); } catch (x) { }
  render();
  if (!sb) { S.route = 'sinconexion'; render(); return; }
  var n = Q.get('n');
  if (n) { await pubLoad(n.toLowerCase().trim()); return; }
  try {
    var r = await sb.auth.getSession(), ses = r.data && r.data.session;
    if (!ses) { S.route = 'welcome'; render(); return; }
    S.user = ses.user; await enter();
  } catch (e) { fail(e); S.route = 'welcome'; render(); }
}
boot();
})();

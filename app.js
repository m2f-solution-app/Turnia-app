/* Turnia: app web conectada a Supabase */
(function () {
'use strict';

var CFG = { url: 'https://yuqrzicupddfceimegkk.supabase.co', key: 'sb_publishable_PX3R99YAZj6_EJJ9Q3Hctg_ykgvENSi', vapid: 'BEbGwoA4ddBO-ggucdgq_JkDNU-ZhtFrEJn_lpx0Qd-d08PnlfnR7_EZn6piW-HIjB_u2lOppa2hpZxbWsmsCgE' };
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
  coin: '<circle cx="12" cy="12" r="9"/><path d="M12 6.5v11M9.2 9.3c0-1 1.2-1.8 2.8-1.8s2.8.8 2.8 1.8-1.2 1.6-2.8 1.9-2.8.9-2.8 1.9 1.2 1.8 2.8 1.8 2.8-.8 2.8-1.8"/>',
  home: '<path d="M4 11l8-7 8 7"/><path d="M6 10v10h12V10"/><path d="M10 20v-6h4v6"/>',
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
var S = { items: {}, pagos: {}, al: { senas: [], dev: [] }, mine: null, mineCancel: false, route: 'boot', rubro: 'manicura', tiene: false, authMode: 'signup', authMsg: '', af: { name: '', mail: '', pass: '' }, authBusy: false, cf: { n: '', s: '', edited: false, err: '', logoBlob: null, logoPrev: '' },
  seed: true, ob: { step: 0 }, fin: { range: 'semana', view: 'resumen', ref: null, loaded: false, tur: [], pag: [], gas: [], top: [], can: [] }, user: null, neg: null, suc: [], mie: [], hor: [], srv: [], sm: [], tab: 'agenda', ds: null, win: 0, tur: [], sheet: null, acct: false,
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
function resizeImg(file, max, type, q) {
  return new Promise(function (res, rej) {
    var u = URL.createObjectURL(file), im = new Image();
    im.onload = function () {
      var r = Math.min(1, max / Math.max(im.width, im.height)), c = document.createElement('canvas');
      c.width = Math.max(1, Math.round(im.width * r)); c.height = Math.max(1, Math.round(im.height * r));
      c.getContext('2d').drawImage(im, 0, 0, c.width, c.height); URL.revokeObjectURL(u);
      c.toBlob(function (b) { b ? res(b) : rej(new Error('No se pudo procesar la imagen')); }, type || 'image/png', q);
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
function senaFields(n) {
  return '<label>Seña al reservar (% del total, 0 = sin seña)<input type="number" inputmode="numeric" min="0" max="100" step="1" data-bind="n-sena" value="' + (+n.sena_pct || 0) + '" placeholder="30"></label>' +
    '<label>Tu alias para recibir la seña<input data-bind="n-alias" value="' + esc(n.alias_pago || '') + '" placeholder="ej: lu.nails.mp" autocomplete="off"></label>' +
    '<div class="two"><label>Tiempo para pagar la seña<select data-bind="n-hold">' + [30, 60, 120].map(function (m) { return '<option value="' + m + '"' + (m === n.hold_min ? ' selected' : '') + '>' + durTxt(m) + '</option>'; }).join('') + '</select></label>' +
    '<label>Devolver la seña si cancela con<select data-bind="n-cancel">' + [12, 24, 48].map(function (h) { return '<option value="' + h + '"' + (h === n.cancel_horas ? ' selected' : '') + '>' + h + ' h de anticipación</option>'; }).join('') + '</select></label></div>' +
    (n.sena_pct > 0 && !n.alias_pago ? '<p class="err" role="alert">Cargá tu alias: sin alias, la seña no se pide al reservar.</p>' : '<p class="hint">Cuando una clienta reserva, el horario queda retenido ese tiempo. Si no transfiere, se libera solo. Cuando te llega la plata, la confirmás con un toque en la agenda. Más adelante, esto se cobra solo con Mercado Pago.</p>');
}
function hrSel(sel, key, id, k) { var o = '', list = []; for (var m = 360; m <= 1410; m += 30) list.push(m); if (list.indexOf(sel) < 0) list.push(sel); list.sort(function (x, y) { return x - y; }); list.forEach(function (m) { o += '<option value="' + m + '"' + (m === sel ? ' selected' : '') + '>' + (m === 1440 ? '24:00' : hhm(m)) + '</option>'; }); return '<select data-bind="' + key + '" data-id="' + id + '" data-k="' + (k || 0) + '">' + o + '</select>'; }

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
  S.items = {}; S.pagos = {};
  try { await sb.rpc('liberar_vencidos'); } catch (e) { }
  S.tur = await run(sb.from('turnos').select('*').eq('negocio_id', S.neg.id).gte('inicio', a).lt('inicio', b).neq('estado', 'cancelado').order('inicio'));
  var nowIso = new Date().toISOString();
  var al = await Promise.all([
    run(sb.from('turnos').select('*').eq('negocio_id', S.neg.id).eq('estado', 'reservado').eq('estado_pago', 'pendiente').gt('senia_requerida', 0).gt('vence_en', nowIso).order('inicio')),
    run(sb.from('turnos').select('*').eq('negocio_id', S.neg.id).eq('devolucion', 'pendiente').order('inicio'))]);
  var lim = new Date(Date.now() + 30 * 3600000).toISOString();
  var av = await Promise.all([
    run(sb.from('turnos').select('*').eq('negocio_id', S.neg.id).eq('estado', 'reservado').gte('inicio', nowIso).is('aviso_conf_en', null).order('inicio').limit(30)),
    run(sb.from('turnos').select('*').eq('negocio_id', S.neg.id).eq('estado', 'reservado').gte('inicio', nowIso).lt('inicio', lim).is('aviso_rec_en', null).order('inicio').limit(30))]);
  var avm = {}, avl = [];
  av[0].map(function (x) { return [x, 'conf']; }).concat(av[1].map(function (x) { return [x, 'rec']; })).forEach(function (p) {
    var x = p[0], hold = +x.senia_requerida > 0 && x.estado_pago === 'pendiente';
    if (hold || avm[x.id]) return;
    avm[x.id] = 1; x.__aviso = p[1]; avl.push(x);
  });
  avl.sort(function (a, b) { return a.inicio < b.inicio ? -1 : 1; });
  S.al = { senas: al[0], dev: al[1], avisar: avl };
  S.extra = [];
  if (S.sheet && S.sheet.id && !findTurno(S.sheet.id)) S.extra = await run(sb.from('turnos').select('*').eq('id', S.sheet.id));
  var seen = {}, ids = [], cids = {};
  S.tur.concat(S.al.senas, S.al.dev, S.al.avisar, S.extra).forEach(function (x) { if (!seen[x.id]) { seen[x.id] = 1; ids.push(x.id); } if (x.cliente_id) cids[x.cliente_id] = 1; });
  S.cli = {};
  var cl = Object.keys(cids);
  if (cl.length) (await run(sb.from('clientes').select('id,nombre,telefono,alertas').in('id', cl))).forEach(function (c) { S.cli[c.id] = c; });
  if (ids.length) {
    var r = await Promise.all([run(sb.from('turno_servicios').select('*').in('turno_id', ids).order('orden')), run(sb.from('pagos').select('*').in('turno_id', ids).order('creado_en'))]);
    r[0].forEach(function (x) { (S.items[x.turno_id] = S.items[x.turno_id] || []).push(x); });
    r[1].forEach(function (x) { (S.pagos[x.turno_id] = S.pagos[x.turno_id] || []).push(x); });
  }
}
var MEDIOS = { efectivo: 'Efectivo', mercadopago: 'QR Mercado Pago', transferencia: 'Transferencia' };
function findTurno(id) { return S.tur.concat(S.al.senas, S.al.dev, S.al.avisar || [], S.extra || [], (S.home && S.home.manana) || []).filter(function (x) { return x.id === id; })[0]; }
function turnoNombres(t) { var it = S.items[t.id]; if (it && it.length) return it.map(function (x) { return x.nombre; }).join(' + '); var sv = svcOf(t.servicio_id); return sv ? sv.nombre : 'Servicio'; }
function pagado(t) { return (S.pagos[t.id] || []).filter(function (p) { return p.estado === 'aprobado'; }).reduce(function (a, p) { return a + (+p.monto); }, 0); }
function durTxt(m) { return m >= 60 ? Math.floor(m / 60) + ' h' + (m % 60 ? ' ' + (m % 60) + ' min' : '') : m + ' min'; }
function sched(mid) {
  var rows = S.hor.filter(function (h) { return h.miembro_id === mid; });
  if (!rows.length) return { days: [], from: 540, to: 1140, rows: rows, franjas: [[540, 1140]] };
  var seen = {}, fr = [];
  rows.forEach(function (h) { var key = h.desde + '-' + h.hasta; if (!seen[key]) { seen[key] = 1; fr.push([tmin(h.desde), tmin(h.hasta)]); } });
  fr.sort(function (a, b) { return a[0] - b[0]; });
  var days = []; rows.forEach(function (h) { if (days.indexOf(h.dia_semana) < 0) days.push(h.dia_semana); });
  return { days: days, from: Math.min.apply(null, rows.map(function (h) { return tmin(h.desde); })), to: Math.max.apply(null, rows.map(function (h) { return tmin(h.hasta); })), rows: rows, franjas: fr };
}
async function setSched(mid, days, a, b) {
  var fr = Array.isArray(a) ? a : [[a, b]];
  await run(sb.from('horarios').delete().eq('miembro_id', mid));
  var ins = []; days.forEach(function (d) { fr.forEach(function (f) { ins.push({ negocio_id: S.neg.id, miembro_id: mid, dia_semana: d, desde: mstr(f[0] % 1440), hasta: f[1] >= 1440 ? '23:59' : mstr(f[1]) }); }); });
  if (ins.length) await run(sb.from('horarios').insert(ins));
  S.hor = await run(sb.from('horarios').select('*').eq('negocio_id', S.neg.id));
}
function franjaTxt(fr) { return fr.map(function (f) { return hhm(f[0]) + '–' + (f[1] >= 1440 ? '24:00' : hhm(f[1])); }).join(' y '); }
function schedBlock(m) {
  var sc = sched(m.id), order = [1, 2, 3, 4, 5, 6, 0], ab = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
  var days = order.map(function (d) { return '<button class="chip" data-act="m-day" data-id="' + m.id + '" data-v="' + d + '" aria-label="' + DOWL[d] + '" aria-pressed="' + (sc.days.indexOf(d) > -1) + '">' + ab[d] + '</button>'; }).join('');
  var fr = sc.franjas.slice(0, 2);
  var rows = fr.map(function (f, i) {
    return '<div class="franja"><span class="lbl">' + (fr.length > 1 ? 'Franja ' + (i + 1) : 'Horario') + '</span><label>Desde' + hrSel(f[0], 'm-from', m.id, i) + '</label><label>Hasta' + hrSel(f[1], 'm-to', m.id, i) + '</label>' + (i === 1 ? '<button class="chip" data-act="m-f2-del" data-id="' + m.id + '">Quitar</button>' : '') + '</div>';
  }).join('');
  return '<div class="days chips">' + days + '</div>' + rows + (fr.length < 2 ? '<div class="row"><button class="btn" data-act="m-f2-add" data-id="' + m.id + '">+ Agregar segunda franja (corte al mediodía)</button></div>' : '');
}
function memberName(id) { var m = S.mie.filter(function (x) { return x.id === id; })[0]; return m ? m.nombre : '—'; }
function svcOf(id) { return S.srv.filter(function (x) { return x.id === id; })[0]; }
function whoDoes(sid) { return S.sm.filter(function (x) { return x.servicio_id === sid; }).map(function (x) { return x.miembro_id; }); }

/* ---------- notificaciones push ---------- */
var PUSH_OK = ('serviceWorker' in navigator) && ('PushManager' in window) && ('Notification' in window);
function isIOS() { return /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); }
function isStandalone() { try { return window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true; } catch (e) { return false; } }
function b64u(str) { var pad = '='.repeat((4 - str.length % 4) % 4), b = (str + pad).replace(/-/g, '+').replace(/_/g, '/'), r = atob(b), o = new Uint8Array(r.length); for (var i = 0; i < r.length; i++) o[i] = r.charCodeAt(i); return o; }
function pushLater() { try { return localStorage.getItem('turnia-push-later') === '1'; } catch (e) { return false; } }
async function pushRefresh() {
  S.push = { sup: PUSH_OK, perm: PUSH_OK ? Notification.permission : 'denied', on: false, ios: isIOS() && !isStandalone() && !PUSH_OK };
  if (PUSH_OK) { try { var reg = await navigator.serviceWorker.getRegistration(); var sub = reg && await reg.pushManager.getSubscription(); S.push.on = !!sub && Notification.permission === 'granted'; } catch (e) { } }
}
async function pushOn() {
  var perm = await Notification.requestPermission();
  if (perm !== 'granted') { await pushRefresh(); toast(perm === 'denied' ? 'Las notificaciones quedaron bloqueadas en este navegador' : 'No activaste las notificaciones'); return; }
  var reg = await navigator.serviceWorker.ready;
  var sub = await reg.pushManager.getSubscription() || await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64u(CFG.vapid) });
  var j = sub.toJSON();
  await run(sb.from('push_subs').upsert({ negocio_id: S.neg.id, user_id: S.user.id, endpoint: j.endpoint, p256dh: j.keys.p256dh, auth: j.keys.auth, ua: navigator.userAgent.slice(0, 200) }, { onConflict: 'endpoint' }));
  await pushRefresh(); toast('Notificaciones activadas en este dispositivo');
}
async function pushOff() {
  var reg = await navigator.serviceWorker.getRegistration(), sub = reg && await reg.pushManager.getSubscription();
  if (sub) { var ep = sub.endpoint; await sub.unsubscribe(); await run(sb.from('push_subs').delete().eq('endpoint', ep)); }
  await pushRefresh(); toast('Notificaciones desactivadas en este dispositivo');
}
async function pushTest() {
  var r = await sb.functions.invoke('push-notify', { body: { tipo: 'test' } });
  if (r.error) throw r.error;
  toast(r.data && r.data.enviados ? 'Te mandamos una prueba' : 'No se pudo enviar. Probá desactivar y volver a activar.');
}
function pushCard() {
  var p = S.push || {}, body;
  if (p.ios) body = '<p class="muted small">En iPhone, las notificaciones funcionan con la app instalada: abrí esta página en Safari, tocá <b>Compartir</b> y elegí <b>Agregar a inicio</b>. Después abrila desde el ícono y activalas acá.</p>';
  else if (!p.sup) body = '<p class="muted small">Este navegador no permite notificaciones. Probá con Chrome o con la app instalada.</p>';
  else if (p.perm === 'denied') body = '<p class="muted small">Las notificaciones están bloqueadas para este sitio. Habilitalas desde el candado junto a la dirección del navegador y volvé acá.</p>';
  else if (p.on) body = '<p class="muted small">Este dispositivo recibe un aviso cuando alguien reserva, cancela o avisa que transfirió la seña. Al tocarlo se abre el turno.</p><div class="row"><button class="btn" data-act="push-test">Enviar prueba</button><button class="btn" data-act="push-off">Desactivar</button></div>';
  else body = '<p class="muted small">Recibí un aviso cuando alguien reserve, cancele o avise que transfirió la seña. Al tocarlo se abre el turno. Se activa en cada dispositivo que uses.</p><div class="row"><button class="btn primary" data-act="push-on">Activar en este dispositivo</button></div>';
  return '<div class="card staff"><h3>Notificaciones</h3>' + body + '</div>';
}
async function openTurno(id) {
  if (!S.neg || S.route !== 'app') { S.openId = id; return; }
  try {
    var tt = await run(sb.from('turnos').select('inicio').eq('id', id).limit(1));
    if (tt[0]) { var tz = TZ(), ds = utcToLocal(tt[0].inicio, tz).ds; S.ds = ds; S.win = Math.floor((Math.round((Date.parse(ds) - Date.parse(todayDs(tz))) / 86400000) + 1) / 7); }
  } catch (e) { }
  S.tab = 'agenda'; S.acct = false; S.sheet = { type: 'detail', id: id }; await loadTur(); render();
}
async function enter() {
  try {
    var m = await run(sb.from('miembros').select('negocio_id,rol').eq('user_id', S.user.id).eq('activo', true).limit(1));
    if (!m.length) { S.route = 'crear'; render(); return; }
    await loadAll(m[0].negocio_id);
    S.ds = todayDs(TZ()); S.win = 0; S.tab = 'inicio';
    if (!S.neg.onboarding_listo) { S.ob = { step: 0 }; S.route = 'onb'; render(); return; }
    await pushRefresh();
    S.route = 'app';
    var ab = null; try { ab = new URLSearchParams(location.search).get('abrir') || S.openId; } catch (e) { }
    S.openId = null;
    if (ab) { try { history.replaceState(null, '', location.pathname); } catch (e) { } await openTurno(ab); } else { await loadHome(); }
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
    title = 'Tus horarios'; hint = 'Marcá los días que atendés y el horario. Si cortás al mediodía, agregá una segunda franja (por ejemplo de 8 a 12 y de 16 a 20). Los turnos online solo se ofrecen dentro de estos horarios.';
    body = schedBlock(own);
  } else if (key === 'equipo') {
    title = n.tiene_sucursales ? 'Sucursales y equipo' : 'Tu equipo'; hint = 'Sumá a quienes atienden con vos. Cada uno tendrá su columna en la agenda. Podés ajustar sus días y horarios después, en Equipo.';
    var others = S.mie.filter(function (m) { return m.rol !== 'dueno'; });
    body = (n.tiene_sucursales ? '<div class="group"><span class="lbl">Sucursales</span>' + S.suc.map(function (x) { return '<label>Nombre<input data-bind="suc-n" data-id="' + x.id + '" value="' + esc(x.nombre) + '"></label>'; }).join('') + '<div class="row"><button class="btn" data-act="suc-add">+ Agregar sucursal</button></div></div>' : '') +
      '<div class="group"><span class="lbl">Profesionales</span>' + (others.length ? others.map(function (m) { return '<div class="obrow"><input data-bind="m-nombre" data-id="' + m.id + '" value="' + esc(m.nombre) + '" aria-label="Nombre"><button class="chip" data-act="m-del" data-id="' + m.id + '">Quitar</button></div>'; }).join('') : '<p class="muted">Trabajás solo o sola por ahora. Está bien, podés sumar gente cuando quieras.</p>') +
      '<div class="row"><button class="btn" data-act="m-add">+ Agregar profesional</button></div></div>';
  } else if (key === 'cobros') {
    title = 'Cómo vas a cobrar'; hint = 'Elegí si pedís seña al reservar. El saldo lo cobrás en el local y lo registrás desde la agenda (efectivo, QR Mercado Pago o transferencia).';
    body = senaFields(n) + '<div class="card note"><b>Mercado Pago</b><p class="muted small">Lo conectamos más adelante: la clienta pagará la seña en Mercado Pago y volverá a Turnia con el turno confirmado. Mientras tanto, usa tu alias.</p></div>';
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
var TABS = [['inicio', 'Inicio', 'home'], ['agenda', 'Agenda', 'calendar'], ['equipo', 'Equipo', 'users'], ['servicios', 'Servicios', 'scissors'], ['finanzas', 'Finanzas', 'coin'], ['ajustes', 'Ajustes', 'gear']];
function shell() {
  var nav = TABS.map(function (t) { return '<button data-act="tab" data-v="' + t[0] + '"' + (S.tab === t[0] ? ' aria-current="page"' : '') + '>' + ico(t[2]) + '<span>' + t[1] + '</span></button>'; }).join('');
  var acct = S.acct ? '<div class="card acct"><div><b>' + esc(S.neg.nombre) + '</b><div class="small muted">' + esc(S.user && S.user.email || '') + '</div></div>' +
    '<div class="group"><span class="lbl">Apariencia</span>' + themeChips() + '</div><button class="btn" data-act="logout">Cerrar sesión</button></div>' : '';
  var body = { inicio: inicioView, agenda: agendaView, equipo: equipoView, servicios: serviciosView, finanzas: finanzasView, ajustes: ajustesView, clientas: function () { return S.fx ? fichaView() : clientasView(); } }[S.tab]();
  return '<div class="top"><div class="l">' + bizLogo(36) + '<div><div class="nm">Turnia</div><div class="sub">' + esc(S.neg.nombre) + '</div></div></div>' +
    '<div class="r"><button class="chip" data-act="acct" aria-expanded="' + S.acct + '" style="display:flex;align-items:center;gap:6px">' + ico('gear') + 'Cuenta</button></div>' + acct + '</div>' +
    '<div class="shell"><nav class="nav" aria-label="Secciones">' + nav + '</nav><main>' + body + '</main></div>' + (S.sheet ? sheetView() : '') + (S.ph ? '<div class="lightbox" data-act="ph-close" role="dialog" aria-label="Foto"><img src="' + esc(S.ph) + '" alt="Foto del trabajo"><button class="btn" data-act="ph-close">Cerrar</button></div>' : '');
}

function waPhone(raw) {
  var d = String(raw || '').replace(/\D/g, '');
  if (!d) return '';
  d = d.replace(/^00/, '');
  if (d.indexOf('54') === 0) { d = d.slice(2); }
  d = d.replace(/^0/, '');
  if (d.indexOf('9') === 0 && d.length === 11) d = d.slice(1);
  if (d.length === 12) { for (var i = 2; i <= 4; i++) { if (d.substr(i, 2) === '15') { d = d.slice(0, i) + d.slice(i + 2); break; } } }
  return '549' + d;
}
function waMsg(t, kind) {
  var tz = TZ(), l = utcToLocal(t.inicio, tz), c = S.cli[t.cliente_id], nom = String(t.cliente_nombre || '').trim().split(/\s+/)[0] || '',
    srv = turnoNombres(t), fecha = DOWL[dowOf(l.ds)].toLowerCase() + ' ' + (+l.ds.split('-')[2]) + ' a las ' + hhm(l.min), url = location.origin + location.pathname + '?n=' + S.neg.slug + '&t=' + t.token, ln = S.neg.nombre;
  if (kind === 'dev') return 'Hola ' + nom + ', te escribimos de ' + ln + '. Tu turno (' + srv + ', ' + fecha + ') quedó cancelado y te vamos a devolver la seña de ' + money(pagado(t) || +t.senia_requerida) + '. ¡Gracias por avisar a tiempo!';
  if (kind === 'rec') return 'Hola ' + nom + ', te recordamos tu turno en ' + ln + ': ' + srv + ', ' + fecha + '. Si no podés venir, avisanos o cancelalo acá: ' + url + ' ¡Te esperamos!';
  var sena = +t.senia_requerida > 0 && (t.estado_pago === 'sena' || t.estado_pago === 'pagado');
  return 'Hola ' + nom + ', tu turno en ' + ln + ' quedó confirmado: ' + srv + ', ' + fecha + '.' + (sena ? ' Recibimos tu seña, ¡gracias!' : '') + ' Podés verlo o cancelarlo acá: ' + url + (sena ? ' Si cancelás con ' + S.neg.cancel_horas + ' h o más de anticipación, te devolvemos la seña.' : '');
}
function waBlock(a) {
  var c = S.cli[a.cliente_id], ph = c ? waPhone(c.telefono) : '', tz = TZ(), fmt = function (iso) { var l = utcToLocal(iso, tz); return dlabel(l.ds) + ' ' + hhm(l.min); };
  var hold = +a.senia_requerida > 0 && a.estado_pago === 'pendiente' && a.estado === 'reservado';
  if (a.estado !== 'reservado' || hold) return '';
  if (!ph) return '<div class="card note"><b>Avisar a la clienta</b><p class="muted small">No tiene teléfono cargado, por eso no puedo armar el mensaje.</p></div>';
  return '<div class="card note"><b>Avisar por WhatsApp</b><div class="row"><button class="btn' + (a.aviso_conf_en ? '' : ' primary') + '" data-act="wa" data-v="conf">' + (a.aviso_conf_en ? 'Reenviar confirmación' : 'Enviar confirmación') + '</button><button class="btn" data-act="wa" data-v="rec">' + (a.aviso_rec_en ? 'Reenviar recordatorio' : 'Enviar recordatorio') + '</button></div>' +
    '<p class="muted small">' + (a.aviso_conf_en ? '✓ Confirmación enviada ' + fmt(a.aviso_conf_en) + '. ' : 'Confirmación sin enviar. ') + (a.aviso_rec_en ? '✓ Recordatorio enviado ' + fmt(a.aviso_rec_en) + '.' : '') + ' Se abre WhatsApp con el mensaje escrito; vos solo lo enviás.</p></div>';
}
function pushBanner() {
  var h = '', pp = S.push;
  if (!pp && !S.pushLoading) { S.pushLoading = true; pushRefresh().then(function () { S.pushLoading = false; render(); }); }
  if (pp && !pushLater()) {
    if (pp.ios) h += '<div class="card note"><b>Activá las notificaciones</b><p class="muted small">En iPhone, instalá la app: en Safari tocá Compartir y después Agregar a inicio. Abrila desde el ícono y activalas en Ajustes.</p><div class="row"><button class="btn" data-act="push-later">Ahora no</button></div></div>';
    else if (pp.sup && pp.perm === 'default' && !pp.on) h += '<div class="card note"><b>Enterate al instante</b><p class="muted small">Activá las notificaciones y te avisamos cuando alguien reserve, cancele o avise que transfirió la seña.</p><div class="row"><button class="btn primary" data-act="push-on">Activar</button><button class="btn" data-act="push-later">Ahora no</button></div></div>';
  }
  return h;
}
function alertsHtml() {
  var tz = TZ(), h = pushBanner();
  if (S.al.senas.length) h += '<div class="card staff alertc"><h3>Señas por confirmar (' + S.al.senas.length + ')</h3>' + S.al.senas.map(function (t) {
    var l = utcToLocal(t.inicio, tz), v = utcToLocal(t.vence_en, tz);
    return '<div class="alrow"><span><b>' + esc(t.cliente_nombre) + '</b> · ' + dlabel(l.ds) + ' ' + hhm(l.min) + ' · seña ' + money(t.senia_requerida) + '<br><small>Vence a las ' + hhm(v.min) + (t.aviso_pago ? ' · <b>avisó que transfirió</b>' : '') + '</small></span><button class="btn primary" data-act="appt" data-v="' + t.id + '">Ver</button></div>';
  }).join('') + '</div>';
  if (S.al.dev.length) h += '<div class="card staff alertc"><h3>Señas para devolver (' + S.al.dev.length + ')</h3>' + S.al.dev.map(function (t) {
    var l = utcToLocal(t.inicio, tz), amt = pagado(t) || +t.senia_requerida;
    return '<div class="alrow"><span><b>' + esc(t.cliente_nombre) + '</b> canceló a tiempo (' + dlabel(l.ds) + ' ' + hhm(l.min) + ')<br><small>Devolver ' + money(amt) + '</small></span><button class="btn" data-act="wa-dev" data-id="' + t.id + '">Avisar</button><button class="btn" data-act="dev-ok" data-id="' + t.id + '">Ya devolví</button></div>';
  }).join('') + '</div>';
  if ((S.al.avisar || []).length) h += '<div class="card staff alertc"><h3>Para avisar (' + S.al.avisar.length + ')</h3>' + S.al.avisar.map(function (t) {
    var l = utcToLocal(t.inicio, tz);
    return '<div class="alrow"><span><b>' + esc(t.cliente_nombre) + '</b> · ' + dlabel(l.ds) + ' ' + hhm(l.min) + '<br><small>' + (t.__aviso === 'rec' ? 'Falta el recordatorio' : 'Falta confirmar el turno') + '</small></span><button class="btn primary" data-act="appt" data-v="' + t.id + '">Avisar</button></div>';
  }).join('') + '</div>';
  return h;
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
    var rows = S.hor.filter(function (x) { return x.miembro_id === m.id && x.dia_semana === dow; }).sort(function (x, y) { return tmin(x.desde) - tmin(y.desde); }), off = '';
    var cur = gs * 60, seg = function (from, to) { if (to > from) off += '<div class="off" style="top:' + ((from - gs * 60) / 60 * PPH) + 'px;height:' + ((to - from) / 60 * PPH) + 'px"></div>'; };
    rows.forEach(function (x) { seg(cur, Math.min(tmin(x.desde), ge * 60)); cur = Math.max(cur, tmin(x.hasta)); });
    seg(cur, ge * 60);
    var ap = S.tur.filter(function (t) { return t.miembro_id === m.id; }).map(function (t) {
      var l = utcToLocal(t.inicio, tz), hgt = t.duracion_min / 60 * PPH - 2, sv = svcOf(t.servicio_id), cls = t.estado_pago === 'sena' ? 'seña' : t.estado_pago;
      total += +t.precio; count++;
      return '<button class="appt c' + m.color + '" data-act="appt" data-v="' + t.id + '" style="top:' + ((l.min - gs * 60) / 60 * PPH + 1) + 'px;height:' + hgt + 'px">' +
        '<b><i class="dot ' + cls + '"></i>' + esc(t.cliente_nombre) + (+t.senia_requerida > 0 && t.estado_pago === 'pendiente' ? ' · seña pendiente' : '') + '</b>' + (hgt > 38 ? '<span>' + esc(turnoNombres(t)) + ' · ' + hhm(l.min) + '</span>' : '') + '</button>';
    }).join('');
    return '<div class="ag-c" data-mid="' + m.id + '" data-gs="' + gs + '" style="height:' + H + 'px">' + off + ap + '</div>';
  }).join('');
  var heads = S.mie.map(function (m) { var sc = sched(m.id), w = sc.days.indexOf(dow) > -1; return '<div class="ag-h c' + m.color + '"><i class="pdot"></i>' + esc(m.nombre) + '<small>' + (w ? franjaTxt(S.hor.filter(function (x) { return x.miembro_id === m.id && x.dia_semana === dow; }).map(function (x) { return [tmin(x.desde), tmin(x.hasta)]; }).sort(function (p, q) { return p[0] - q[0]; })) : 'No trabaja') + '</small></div>'; }).join('');
  return '<div class="head"><h2>Agenda</h2><button class="btn primary" data-act="new">+ Nuevo turno</button></div>' + alertsHtml() + chips +
    '<p class="muted small">' + dlong(S.ds) + ' · ' + count + ' turnos · ' + money(total) + ' previstos. Tocá un hueco libre para cargar un turno.</p>' +
    '<div class="legend"><span><i class="dot pagado"></i>Cobrado</span><span><i class="dot seña"></i>Con seña</span><span><i class="dot pendiente"></i>Sin cobrar</span><span>Rayado: fuera de horario</span></div>' +
    '<div class="agenda"><div class="ag" style="--n:' + S.mie.length + '"><div class="ag-h"></div>' + heads + '<div class="ag-t" style="height:' + H + 'px">' + times + '</div>' + cols + '</div></div>';
}

var MODS = { comision: 'Comisión', alquiler: 'Alquiler del puesto', sueldo: 'Sueldo fijo' };
var PERS = { dia: 'por día de trabajo', semana: 'por semana', mes: 'por mes' };
function acuerdoBlock(m, cm) {
  var mod = m.modalidad || 'comision', mo = '', pe = '';
  Object.keys(MODS).forEach(function (k) { mo += '<option value="' + k + '"' + (k === mod ? ' selected' : '') + '>' + MODS[k] + '</option>'; });
  Object.keys(PERS).forEach(function (k) { pe += '<option value="' + k + '"' + (k === (m.periodo || 'dia') ? ' selected' : '') + '>' + PERS[k] + '</option>'; });
  var h = '<div class="acuerdo"><label>Acuerdo con el local<select data-bind="m-mod" data-id="' + m.id + '">' + mo + '</select></label>';
  if (mod === 'comision') h += '<label>Se queda con<select data-bind="m-comm" data-id="' + m.id + '">' + cm + '</select></label><p class="muted small">El resto de lo que factura es del local.</p>';
  else {
    var sv = S.srv.map(function (x) { return '<option value="' + x.id + '">' + esc(x.nombre) + ' (' + money(x.precio) + ')</option>'; }).join('');
    h += '<div class="two"><label>' + (mod === 'alquiler' ? 'Paga al local' : 'Cobra del local') + ' ($)<input inputmode="numeric" data-bind="m-monto" data-id="' + m.id + '" value="' + (+m.monto_fijo || '') + '" placeholder="16000"></label>' +
      '<label>Período<select data-bind="m-per" data-id="' + m.id + '">' + pe + '</select></label></div>' +
      (S.srv.length ? '<div class="calc"><span class="muted small">Calcularlo en servicios:</span><select id="calc-n-' + m.id + '"><option>1</option><option selected>2</option><option>3</option><option>4</option><option>5</option></select><select id="calc-s-' + m.id + '">' + sv + '</select><button class="chip" data-act="m-calc" data-id="' + m.id + '">Usar este monto</button></div>' : '') +
      '<p class="muted small">' + (mod === 'alquiler' ? 'Se queda con todo lo que factura; el local cobra el alquiler.' : 'El local se queda con lo que factura y le paga este sueldo.') + (m.periodo === 'dia' || !m.periodo ? ' Cuenta los días que figura trabajando en su horario.' : '') + '</p>';
  }
  return h + '</div>';
}
function dimOf(ds) { var a = ds.split('-'); return new Date(Date.UTC(+a[0], +a[1], 0)).getUTCDate(); }
/* Monto fijo del período visible: por día = días de horario transcurridos; semana/mes = proporcional a los días transcurridos */
function fijoPeriodo(m, r, today) {
  var monto = +m.monto_fijo || 0, tot = 0, days = sched(m.id).days;
  for (var d = r.s; d < r.e && d <= today; d = addDays(d, 1)) {
    if (m.periodo === 'semana') tot += monto / 7; else if (m.periodo === 'mes') tot += monto / dimOf(d); else if (days.indexOf(dowOf(d)) > -1) tot += monto;
  }
  return Math.round(tot);
}
async function loadClientas() {
  var r = await Promise.all([run(sb.from('clientes').select('*').eq('negocio_id', S.neg.id).order('creado_en', { ascending: false }).limit(500)), run(sb.from('turnos').select('id,cliente_id,inicio,estado').eq('negocio_id', S.neg.id).order('inicio', { ascending: false }).limit(3000))]);
  var agg = {};
  r[1].forEach(function (t) { if (!t.cliente_id || (t.estado !== 'reservado' && t.estado !== 'completado')) return; var a = agg[t.cliente_id] = agg[t.cliente_id] || { n: 0, last: null }; a.n++; if (!a.last || t.inicio > a.last) a.last = t.inicio; });
  S.cl = r[0].map(function (c) { var a = agg[c.id] || { n: 0, last: null }; return { c: c, n: a.n, last: a.last }; }).sort(function (x, y) { return y.n - x.n; });
  render();
}
/* ---------- ficha de la clienta ---------- */
var CAMPOS = {
  manicura: ['Técnica o tratamiento', 'Color, producto o marca', 'Forma, largo o zona', 'Próximo retoque'],
  peluqueria: ['Servicio realizado', 'Fórmula (marca y tono)', 'Oxidante y tiempo', 'Productos recomendados'],
  barberia: ['Corte (máquina, largo)', 'Degradé o perfilado', 'Barba', 'Productos recomendados']
};
function dfull(ds) { return dlabel(ds) + ' ' + MESES[+ds.split('-')[1] - 1].slice(0, 3).toLowerCase(); }
async function loadFicha(id, abrirForm) {
  var r = await Promise.all([
    run(sb.from('clientes').select('*').eq('id', id).single()),
    run(sb.from('turnos').select('id,inicio,duracion_min,precio,estado,miembro_id,estado_pago,descuento_pct,servicio_id').eq('cliente_id', id).order('inicio', { ascending: false }).limit(200)),
    run(sb.from('cliente_registros').select('*').eq('cliente_id', id).order('creado_en', { ascending: false }).limit(200))]);
  var tur = r[1].filter(function (t) { return t.estado === 'reservado' || t.estado === 'completado' || t.estado === 'ausente'; }), ids = tur.map(function (t) { return t.id; }), items = {};
  if (ids.length) (await chunkedIn('turno_servicios', 'turno_id', ids)).forEach(function (x) { (items[x.turno_id] = items[x.turno_id] || []).push(x); });
  var paths = []; r[2].forEach(function (g) { (g.fotos || []).forEach(function (f) { paths.push(f); }); });
  var urls = {};
  if (paths.length) { try { var sg = await sb.storage.from('fichas').createSignedUrls(paths, 3600); (sg.data || []).forEach(function (x) { if (x.signedUrl) urls[x.path] = x.signedUrl; }); } catch (e) { } }
  var keep = S.fx && S.fx.id === id ? S.fx.form : null;
  S.fx = { id: id, c: r[0], tur: tur, items: items, reg: r[2], urls: urls, form: keep, delRg: null, busy: false };
  if (abrirForm) fichaOpenForm(abrirForm === true ? null : abrirForm);
  render();
}
function fichaOpenForm(turnoId) {
  var fx = S.fx, now = Date.now(), def = turnoId;
  if (!def) { var past = fx.tur.filter(function (t) { return new Date(t.inicio).getTime() <= now + 3600000 && t.estado !== 'ausente'; })[0]; def = past ? past.id : ''; }
  fx.form = { turno_id: def, texto: '', campos: {}, files: [], err: '' };
}
function fxSnap() {
  var f = S.fx && S.fx.form; if (!f) return;
  var t = document.getElementById('rg-t'), tu = document.getElementById('rg-turno'); if (t) f.texto = t.value; if (tu) f.turno_id = tu.value;
  Array.prototype.forEach.call(document.querySelectorAll('[data-campo]'), function (i) { f.campos[i.dataset.campo] = i.value; });
}
function thumbs(g, fx) {
  return (g.fotos || []).length ? '<div class="thumbs">' + g.fotos.map(function (p) { return fx.urls[p] ? '<button class="thumb" data-act="ph-open" data-v="' + esc(fx.urls[p]) + '" aria-label="Ver foto"><img loading="lazy" src="' + esc(fx.urls[p]) + '" alt=""></button>' : '<span class="thumb ph"></span>'; }).join('') + '</div>' : '';
}
function regHtml(g, fx) {
  var camp = Object.keys(g.campos || {}).filter(function (k) { return String(g.campos[k] || '').trim(); }).map(function (k) { return '<div><span>' + esc(k) + '</span><b>' + esc(g.campos[k]) + '</b></div>'; }).join('');
  var l = utcToLocal(g.creado_en, TZ());
  return '<div class="reg"><div class="reg-h"><small class="muted">Anotado el ' + dfull(l.ds) + ' ' + hhm(l.min) + '</small>' +
    (fx.delRg === g.id ? '<span class="btns"><button class="btn danger" data-act="rg-del-yes" data-id="' + g.id + '">Eliminar</button><button class="btn" data-act="rg-del-no">No</button></span>' : '<button class="chip" data-act="rg-del" data-id="' + g.id + '" aria-label="Eliminar registro">×</button>') + '</div>' +
    (camp ? '<div class="kv">' + camp + '</div>' : '') + (g.texto ? '<p class="rtext">' + esc(g.texto).replace(/\n/g, '<br>') + '</p>' : '') + thumbs(g, fx) + '</div>';
}
function fichaView() {
  var fx = S.fx, c = fx.c;
  if (!c) return '<div class="head"><button class="btn" data-act="cl-back">‹ Clientas</button></div><div class="loading">Cargando…</div>';
  var tz = TZ(), now = Date.now(), rub = S.neg.rubro, ph = waPhone(c.telefono);
  var past = fx.tur.filter(function (t) { return new Date(t.inicio).getTime() <= now && t.estado !== 'ausente'; }), next = fx.tur.filter(function (t) { return new Date(t.inicio).getTime() > now; });
  var since = fx.tur.length ? utcToLocal(fx.tur[fx.tur.length - 1].inicio, tz).ds : null;
  var head = '<div class="head"><button class="btn" data-act="cl-back">‹ Clientas</button></div>' +
    '<div class="card staff"><h2 style="margin:0 0 4px">' + esc(c.nombre) + '</h2><p class="muted small" style="margin:0 0 10px">' + esc(c.telefono || 'Sin teléfono') + (c.dni ? ' · DNI ' + esc(c.dni) : '') + '</p>' +
    '<div class="kpis kpis3"><div class="kpi"><small>Vino</small><b>' + past.length + (past.length === 1 ? ' vez' : ' veces') + '</b></div><div class="kpi"><small>Cliente desde</small><b class="sm">' + (since ? dfull(since) : '—') + '</b></div><div class="kpi"><small>Próximos</small><b>' + next.length + '</b></div></div>' +
    '<div class="row">' + (ph ? '<a class="btn" href="https://wa.me/' + ph + '" target="_blank" rel="noopener">WhatsApp</a>' : '') + '</div></div>' +
    '<div class="card staff"><label>Alergias y cuidados<textarea data-bind="c-alert" data-id="' + c.id + '" rows="2" maxlength="600" placeholder="Ej: alérgica al látex, piel sensible, cuero cabelludo irritado">' + esc(c.alertas || '') + '</textarea></label><p class="hint">Se muestra al abrir cualquiera de sus turnos, para que nadie se lo pase por alto.</p></div>';
  var f = fx.form, form = '';
  if (f) {
    var opts = '<option value="">Sin turno asociado</option>' + fx.tur.filter(function (t) { return t.estado !== 'ausente'; }).slice(0, 12).map(function (t) { var l = utcToLocal(t.inicio, tz), its = fx.items[t.id] || []; return '<option value="' + t.id + '"' + (t.id === f.turno_id ? ' selected' : '') + '>' + dfull(l.ds) + ' ' + hhm(l.min) + (its.length ? ' · ' + esc(its.map(function (x) { return x.nombre; }).join(' + ')) : '') + '</option>'; }).join('');
    form = '<div class="card staff"><h3>Registrar trabajo</h3><label>Turno<select id="rg-turno">' + opts + '</select></label>' +
      '<div class="two">' + (CAMPOS[rub] || CAMPOS.manicura).map(function (k) { return '<label>' + esc(k) + '<input data-campo="' + esc(k) + '" value="' + esc(f.campos[k] || '') + '" autocomplete="off"></label>'; }).join('') + '</div>' +
      '<label>Observaciones<textarea id="rg-t" rows="3" maxlength="2000" placeholder="Qué se hizo, cómo respondió, qué hay que repetir o evitar la próxima vez">' + esc(f.texto) + '</textarea></label>' +
      '<div class="group"><span class="lbl">Fotos (hasta 8)</span><div class="thumbs">' + f.files.map(function (x, i) { return '<span class="thumb"><img src="' + x.prev + '" alt=""><button class="x" data-act="rg-rmf" data-v="' + i + '" aria-label="Quitar foto">×</button></span>'; }).join('') +
      (f.files.length < 8 ? '<label class="thumb add" aria-label="Agregar fotos"><input id="rg-files" type="file" accept="image/*" multiple hidden><span>+</span></label>' : '') + '</div><p class="hint">Se guardan privadas: solo las ve tu equipo. Pedile permiso a la clienta antes de sacar la foto.</p></div>' +
      '<p class="err" id="rg-err" role="alert">' + esc(f.err || '') + '</p><div class="row"><button class="btn primary" data-act="rg-save"' + (fx.busy ? ' disabled aria-busy="true"' : '') + '>' + (fx.busy ? '<span class="spin"></span>Guardando…' : 'Guardar registro') + '</button><button class="btn" data-act="rg-cancel">Cancelar</button></div></div>';
  } else form = '<div class="row"><button class="btn primary" data-act="rg-new">+ Registrar trabajo</button></div>';
  // historial: turnos con sus registros + registros sueltos
  var byT = {}, loose = [];
  fx.reg.forEach(function (g) { if (g.turno_id && fx.tur.some(function (t) { return t.id === g.turno_id; })) (byT[g.turno_id] = byT[g.turno_id] || []).push(g); else loose.push(g); });
  var ev = fx.tur.map(function (t) { return { k: 'turno', d: t.inicio, t: t }; }).concat(loose.map(function (g) { return { k: 'nota', d: g.creado_en, g: g }; })).sort(function (a, b) { return a.d < b.d ? 1 : -1; });
  var hist = ev.length ? ev.map(function (e) {
    if (e.k === 'nota') return '<div class="visit nota"><div class="vh"><b>Nota suelta</b></div>' + regHtml(e.g, fx) + '</div>';
    var t = e.t, l = utcToLocal(t.inicio, tz), its = fx.items[t.id] || [], fut = new Date(t.inicio).getTime() > now;
    return '<div class="visit"><div class="vh"><b>' + dfull(l.ds) + ' · ' + hhm(l.min) + '</b><span class="tag' + (fut ? ' fut' : '') + '">' + (fut ? 'Próximo' : t.estado === 'completado' ? 'Atendida' : 'Turno') + '</span></div>' +
      '<p class="vs">' + esc(its.length ? its.map(function (x) { return x.nombre; }).join(' + ') : 'Servicio') + ' · con ' + esc(memberName(t.miembro_id)) + ' · ' + money(t.precio) + (+t.descuento_pct > 0 ? ' <small class="muted">(' + t.descuento_pct + '% fidelidad)</small>' : '') + '</p>' +
      (byT[t.id] || []).map(function (g) { return regHtml(g, fx); }).join('') +
      (!fut && !(byT[t.id] || []).length ? '<button class="chip" data-act="rg-new" data-v="' + t.id + '">+ Anotar este turno</button>' : '') + '</div>';
  }).join('') : '<p class="muted">Todavía no tiene turnos. Cuando venga, su historial aparece acá.</p>';
  return head + form + '<div class="card staff"><h3>Historial</h3>' + hist + '</div>';
}
function clientasView() {
  var tz = TZ(), q = (S.cq || '').toLowerCase().replace(/\s+/g, ' ').trim(), n = S.neg, list = (S.cl || []).filter(function (x) { return !q || (x.c.nombre || '').toLowerCase().indexOf(q) > -1 || String(x.c.telefono || '').replace(/\D/g, '').indexOf(q.replace(/\D/g, '') || '§') > -1; });
  var rows = list.map(function (x) {
    var c = x.c, ph = waPhone(c.telefono), pos = n.fid_activa && x.n ? (((x.n - 1) % n.fid_cada) + 1) : 0, l = x.last ? utcToLocal(x.last, tz) : null;
    return '<div class="card staff cli"><div class="top2"><b>' + esc(c.nombre) + '</b><span class="tag">' + x.n + (x.n === 1 ? ' turno' : ' turnos') + '</span></div>' +
      '<p class="muted small">' + esc(c.telefono || 'Sin teléfono') + (l ? ' · último: ' + dlabel(l.ds) : '') + '</p>' +
      (n.fid_activa ? '<div class="fmini" aria-label="Sellos ' + pos + ' de ' + n.fid_cada + '">' + Array.apply(null, Array(n.fid_cada)).map(function (_, i) { return '<i class="' + (i < pos ? 'on' : '') + '"></i>'; }).join('') + '<small>' + (x.n && x.n % n.fid_cada === 0 ? 'Tarjeta completa' : pos + ' de ' + n.fid_cada) + '</small></div>' : '') +
      (c.alertas ? '<p class="alertline"><b>Cuidado:</b> ' + esc(c.alertas) + '</p>' : '') + '<div class="two"><label>DNI (opcional, uso interno)<input inputmode="numeric" data-bind="c-dni" data-id="' + c.id + '" value="' + esc(c.dni || '') + '" placeholder="Sin cargar"></label><div class="row" style="align-self:end"><button class="btn primary" data-act="cl-open" data-id="' + c.id + '">Ver ficha</button>' + (ph ? '<a class="btn" href="https://wa.me/' + ph + '" target="_blank" rel="noopener">WhatsApp</a>' : '') + '</div></div></div>';
  }).join('');
  return '<div class="head"><h2>Mis clientas</h2><button class="btn" data-act="tab" data-v="ajustes">‹ Ajustes</button></div>' +
    '<label>Buscar<input id="cq" value="' + esc(S.cq || '') + '" placeholder="Nombre o teléfono" autocomplete="off"></label>' +
    (S.cl ? (rows || '<p class="muted">' + (S.cl.length ? 'No hay resultados.' : 'Todavía no hay clientas. Aparecen cuando reservan por el link o cuando cargás su teléfono en un turno.') + '</p>') : '<div class="loading">Cargando…</div>');
}
document.addEventListener('input', function (e) { if (e.target.id === 'cq') { S.cq = e.target.value; var pos = e.target.selectionStart; render(); var c = document.getElementById('cq'); if (c) { c.focus(); try { c.setSelectionRange(pos, pos); } catch (x) { } } } });
/* ---------- inicio ---------- */
async function loadHome() {
  var tz = TZ(), today = todayDs(tz);
  S.ds = today; S.win = 0;
  await loadTur();
  var a = zonedToUtc(addDays(today, 1), 0, tz).toISOString(), b = zonedToUtc(addDays(today, 2), 0, tz).toISOString(), since = new Date(Date.now() - 86400000).toISOString();
  var r = await Promise.all([
    run(sb.from('turnos').select('*').eq('negocio_id', S.neg.id).gte('inicio', a).lt('inicio', b).neq('estado', 'cancelado').order('inicio')),
    run(sb.from('turnos').select('id').eq('negocio_id', S.neg.id).eq('origen', 'link').gte('creado_en', since))]);
  var man = r[0].filter(isFirm), ids = man.map(function (x) { return x.id; }), need = {};
  man.forEach(function (x) { if (x.cliente_id && !S.cli[x.cliente_id]) need[x.cliente_id] = 1; });
  if (ids.length) (await run(sb.from('turno_servicios').select('*').in('turno_id', ids).order('orden'))).forEach(function (x) { (S.items[x.turno_id] = S.items[x.turno_id] || []).push(x); });
  var nk = Object.keys(need);
  if (nk.length) (await run(sb.from('clientes').select('id,nombre,telefono,alertas').in('id', nk))).forEach(function (c) { S.cli[c.id] = c; });
  S.home = { manana: man, linkN: r[1].length, loaded: true };
  render();
}
function homeRow(t, right, sub) {
  var tz = TZ(), l = utcToLocal(t.inicio, tz), cls = t.estado_pago === 'sena' ? 'seña' : t.estado_pago;
  return '<div class="alrow"><span><b><i class="dot ' + cls + '"></i>' + hhm(l.min) + ' · ' + esc(t.cliente_nombre) + '</b><br><small>' + (sub || esc(turnoNombres(t)) + ' · ' + esc(memberName(t.miembro_id))) + '</small></span>' + (right || '') + '</div>';
}
function inicioView() {
  var h = S.home;
  if (!h || !h.loaded) return '<div class="head"><h2>Inicio</h2></div><div class="loading">Cargando…</div>';
  var tz = TZ(), today = todayDs(tz), now = Date.now(), dow = dowOf(today);
  var firm = S.tur.filter(isFirm), fact = 0, cob = 0, booked = 0;
  firm.forEach(function (t) { fact += +t.precio; cob += Math.min(+t.precio, pagado(t)); booked += +t.duracion_min; });
  var cap = 0; S.hor.forEach(function (x) { if (x.dia_semana === dow && S.mie.some(function (m) { return m.id === x.miembro_id; })) cap += tmin(x.hasta) - tmin(x.desde); });
  var occ = cap ? Math.min(100, Math.round(booked / cap * 100)) : 0;
  var kp = '<div class="kpis"><div class="kpi"><small>Turnos de hoy</small><b>' + firm.length + '</b></div><div class="kpi"><small>Facturado hoy</small><b>' + money(fact) + '</b></div><div class="kpi"><small>Ya cobrado</small><b class="good">' + money(cob) + '</b></div><div class="kpi"><small>Por cobrar</small><b>' + money(Math.max(0, fact - cob)) + '</b></div></div>';
  var occH = '<div class="card"><div class="top2"><b>Ocupación de hoy</b><span class="muted small">' + (cap ? occ + '% · ' + durTxt(booked) + ' de ' + durTxt(cap) : 'Sin horarios hoy') + '</span></div><div class="occ" role="img" aria-label="Ocupación ' + occ + '%"><i style="width:' + occ + '%"></i></div>' +
    '<p class="muted small" style="margin:8px 0 0">' + (h.linkN ? h.linkN + (h.linkN === 1 ? ' reserva nueva' : ' reservas nuevas') + ' por el link en las últimas 24 h.' : 'Sin reservas nuevas por el link en las últimas 24 h.') + '</p></div>';
  var next = firm.filter(function (t) { return new Date(t.fin || t.inicio).getTime() > now; })[0];
  var nextH = '<div class="card staff"><h3>' + (next && new Date(next.inicio).getTime() <= now ? 'En curso ahora' : 'Próximo turno') + '</h3>' + (next ? homeRow(next, '<button class="btn primary" data-act="appt" data-v="' + next.id + '">Abrir</button>') : '<p class="muted">No quedan turnos para hoy.</p>') + '</div>';
  // para recordar: turnos de hoy (que no pasaron) y de mañana sin recordatorio
  var rem = firm.filter(function (t) { return new Date(t.inicio).getTime() > now; }).map(function (t) { return [t, 'Hoy']; }).concat(h.manana.map(function (t) { return [t, 'Mañana']; })).filter(function (x) { return x[0].estado === 'reservado' && !x[0].aviso_rec_en; });
  var conf = (S.al.avisar || []).filter(function (t) { return t.__aviso === 'conf'; }).slice(0, 4);
  var remRows = rem.map(function (x) {
    var t = x[0], c = S.cli[t.cliente_id], ph = c && waPhone(c.telefono), l = utcToLocal(t.inicio, tz);
    return '<div class="alrow"><span><b>' + x[1] + ' ' + hhm(l.min) + ' · ' + esc(t.cliente_nombre) + '</b><br><small>' + esc(turnoNombres(t)) + (ph ? '' : ' · sin teléfono') + '</small></span>' + (ph ? '<button class="btn primary" data-act="wa" data-v="rec" data-id="' + t.id + '">Recordar</button>' : '<button class="btn" data-act="appt" data-v="' + t.id + '">Ver</button>') + '</div>';
  }).join('');
  var confRows = conf.map(function (t) {
    var l = utcToLocal(t.inicio, tz); return '<div class="alrow"><span><b>' + dlabel(l.ds) + ' ' + hhm(l.min) + ' · ' + esc(t.cliente_nombre) + '</b><br><small>Falta enviar la confirmación</small></span><button class="btn" data-act="wa" data-v="conf" data-id="' + t.id + '">Confirmar</button></div>';
  }).join('');
  var remH = '<div class="card staff alertc"><h3>Para recordar' + (rem.length ? ' (' + rem.length + ')' : '') + '</h3>' + (remRows || '<p class="muted">Todas las clientas de hoy y mañana ya fueron recordadas.</p>') + (confRows ? '<h4>Sin confirmación enviada</h4>' + confRows : '') + '</div>';
  // pendientes
  var sinCobrar = firm.filter(function (t) { return new Date(t.fin || t.inicio).getTime() < now && t.estado_pago !== 'pagado'; });
  var pend = '';
  S.al.senas.slice(0, 4).forEach(function (t) { var l = utcToLocal(t.inicio, tz); pend += '<div class="alrow"><span><b>' + esc(t.cliente_nombre) + '</b> · seña ' + money(t.senia_requerida) + '<br><small>' + dlabel(l.ds) + ' ' + hhm(l.min) + (t.aviso_pago ? ' · <b>avisó que transfirió</b>' : ' · esperando transferencia') + '</small></span><button class="btn primary" data-act="appt" data-v="' + t.id + '">Confirmar</button></div>'; });
  S.al.dev.slice(0, 3).forEach(function (t) { var l = utcToLocal(t.inicio, tz); pend += '<div class="alrow"><span><b>' + esc(t.cliente_nombre) + '</b> canceló a tiempo<br><small>Devolver ' + money(pagado(t) || +t.senia_requerida) + ' · era ' + dlabel(l.ds) + ' ' + hhm(l.min) + '</small></span><span class="btns"><button class="btn" data-act="wa-dev" data-id="' + t.id + '">Avisar</button><button class="btn" data-act="dev-ok" data-id="' + t.id + '">Ya devolví</button></span></div>'; });
  sinCobrar.slice(0, 5).forEach(function (t) { pend += homeRow(t, '<button class="btn" data-act="appt" data-v="' + t.id + '">Cobrar</button>', 'Falta cobrar ' + money(Math.max(0, Math.round(+t.precio - pagado(t))))); });
  var pendH = '<div class="card staff alertc"><h3>Para resolver</h3>' + (pend || '<p class="muted">Nada pendiente. ¡Todo al día!</p>') + '</div>';
  // agenda de hoy
  var ag = firm.length ? firm.map(function (t) { return homeRow(t, '<button class="btn" data-act="appt" data-v="' + t.id + '">Ver</button>'); }).join('') : '<p class="muted">Hoy no tenés turnos cargados.</p>';
  var mn = h.manana, mnTxt = mn.length ? 'Mañana: <b>' + mn.length + (mn.length === 1 ? ' turno' : ' turnos') + '</b>, el primero a las ' + hhm(utcToLocal(mn[0].inicio, tz).min) + '.' : 'Mañana todavía no tenés turnos.';
  var agH = '<div class="card staff"><div class="top2"><h3>Agenda de hoy</h3><span class="muted small">' + dlong(today) + '</span></div>' + ag + '<p class="muted small" style="margin:8px 0">' + mnTxt + '</p><div class="row"><button class="btn primary" data-act="new">+ Nuevo turno</button><button class="btn" data-act="tab" data-v="agenda">Ver agenda completa</button><button class="btn" data-act="tab" data-v="clientas">Mis clientas</button></div></div>';
  return '<div class="head"><h2>Hola, ' + esc(S.neg.nombre) + '</h2></div><p class="muted small" style="margin-top:-6px">' + dlong(today) + ' de ' + MESES[+today.split('-')[1] - 1].toLowerCase() + '</p>' +
    pushBanner() + kp + occH + nextH + remH + pendH + agH;
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
      schedBlock(m) +
      acuerdoBlock(m, cm) + (sucSel ? '<div class="two">' + sucSel + '</div>' : '') +
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
function fidConfig(n) {
  var on = !!n.fid_activa;
  return '<div class="card staff"><div class="top2"><h3>Tarjeta de fidelidad</h3>' + chip('fid-toggle', on ? 'Activada' : 'Desactivada', on, '') + '</div>' +
    '<p class="muted small">Cada turno suma un sello a la tarjeta de la clienta, que ve cuando le confirmás. Al completar la tarjeta, el turno siguiente lleva descuento. La clienta se reconoce por su teléfono.</p>' +
    (on ? '<div class="two"><label>Descuento en el turno número<input type="number" inputmode="numeric" min="2" max="20" data-bind="n-fidcada" value="' + n.fid_cada + '"></label><label>Descuento (%)<input type="number" inputmode="numeric" min="1" max="100" data-bind="n-fidpct" value="' + n.fid_pct + '"></label></div>' +
      '<p class="hint">Ejemplo: la clienta paga normal sus primeros ' + (n.fid_cada - 1) + ' turnos y el ' + n.fid_cada + '.º tiene ' + n.fid_pct + '% de descuento. Después arranca una tarjeta nueva.</p>' : '') +
    '<div class="row"><button class="btn" data-act="tab" data-v="clientas">Ver mis clientas</button></div></div>';
}
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
    '</div><div class="card staff"><h3>Seña y cancelaciones</h3>' + senaFields(n) + '</div>' + pushCard() + fidConfig(n) + sucs;
}

function sheetView() {
  var sh = S.sheet, tz = TZ(), inner = '';
  if (sh.type === 'new') {
    var gs = 9, ge = 19; S.mie.forEach(function (m) { var sc = sched(m.id); if (sc.rows.length) { gs = Math.min(gs, Math.floor(sc.from / 60)); ge = Math.max(ge, Math.ceil(sc.to / 60)); } });
    var to = ''; for (var t = gs * 60; t < ge * 60; t += 30) to += '<option value="' + t + '"' + (t === sh.min ? ' selected' : '') + '>' + hhm(t) + '</option>';
    if (!sh.svcs) { sh.svcs = [S.srv[0].id]; sh.dur = S.srv[0].duracion_min; sh.price = Math.round(S.srv[0].precio); sh.client = ''; }
    inner = '<h3>Nuevo turno</h3><p class="muted small">' + dlong(S.ds) + '</p>' +
      '<label>Cliente<input id="f-client" placeholder="Nombre y apellido" autocomplete="off" value="' + esc(sh.client) + '"></label>' +
      '<label>Teléfono (opcional)<input id="f-tel" type="tel" inputmode="tel" placeholder="Para avisarle y sumar a su tarjeta" autocomplete="off" value="' + esc(sh.tel || '') + '"></label>' +
      '<div class="group"><span class="lbl">Servicios (podés elegir varios)</span><div class="chips">' + S.srv.map(function (x) { return chip('sh-svc', esc(x.nombre), sh.svcs.indexOf(x.id) > -1, 'data-id="' + x.id + '"'); }).join('') + '</div></div>' +
      '<div class="two"><label>Duración total<select id="f-dur">' + durOpts(sh.dur) + '</select></label><label>Precio total ($)<input id="f-price" inputmode="numeric" value="' + sh.price + '"></label></div>' +
      '<div class="two"><label>Profesional<select id="f-mie">' + S.mie.map(function (m) { return '<option value="' + m.id + '"' + (m.id === sh.mid ? ' selected' : '') + '>' + esc(m.nombre) + '</option>'; }).join('') + '</select></label><label>Hora<select id="f-time">' + to + '</select></label></div>' +
      '<p class="err" id="f-err" role="alert"></p><div class="row"><button class="btn primary" data-act="sheet-save">Guardar turno</button><button class="btn" data-act="sheet-close">Cancelar</button></div>';
  } else {
    var a = findTurno(sh.id); if (!a) return '';
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
      var penSena = +a.senia_requerida > 0 && a.estado_pago === 'pendiente' && a.estado === 'reservado';
      acts = waBlock(a) + (a.cliente_id ? '<div class="row"><button class="btn" data-act="cl-open" data-v="reg" data-id="' + a.cliente_id + '" data-t="' + a.id + '">Anotar trabajo y fotos</button><button class="btn" data-act="cl-open" data-id="' + a.cliente_id + '">Ficha de la clienta</button></div>' : '') + (penSena ? '<div class="card note"><b>Seña pendiente: ' + money(a.senia_requerida) + '</b><p class="muted small">' + (a.vence_en ? 'El horario está retenido hasta las ' + hhm(utcToLocal(a.vence_en, tz).min) + '. ' : '') + (a.aviso_pago ? 'La clienta avisó que ya transfirió. ' : '') + 'Cuando veas la plata en tu cuenta, confirmala.</p><div class="row"><button class="btn primary" data-act="sena-ok">Confirmar seña recibida</button></div></div>' : '') +
        '<div class="row">' + (a.estado_pago !== 'pagado' ? '<button class="btn' + (penSena ? '' : ' primary') + '" data-act="cb-start">Cobrar' + (saldo ? ' ' + money(saldo) : '') + '</button>' : '') + '<button class="btn danger" data-act="t-cancel-ask">Cancelar turno</button><button class="btn" data-act="sheet-close">Cerrar</button></div>';
    }
    inner = '<h3>' + esc(a.cliente_nombre) + '</h3><p>' + esc(turnoNombres(a)) + ' · ' + durTxt(a.duracion_min) + ' · <b>' + money(a.precio) + '</b></p>' + lines +
      '<p class="muted">' + dlong(l.ds) + ' · ' + hhm(l.min) + ' a ' + hhm(l.min + a.duracion_min) + ' · con ' + esc(memberName(a.miembro_id)) + '</p>' +
      (S.cli[a.cliente_id] && S.cli[a.cliente_id].alertas ? '<p class="alertline"><b>Cuidado:</b> ' + esc(S.cli[a.cliente_id].alertas) + '</p>' : '') +
      '<p><i class="dot ' + cls + '"></i><b>' + label + '</b>' + (a.origen === 'link' ? ' · reservó por el link' : '') + '</p>' + pays + acts;
  }
  return '<div class="scrim" data-scrim="1"><div class="sheet" role="dialog" aria-modal="true">' + inner + '</div></div>';
}


/* ---------- finanzas ---------- */
var CATS = { insumos: 'Insumos y productos', alquiler: 'Alquiler del local', sueldos: 'Sueldos y cargas sociales', servicios: 'Servicios (luz, agua, internet)', impuestos: 'Impuestos y monotributo', publicidad: 'Publicidad y redes', mantenimiento: 'Mantenimiento y arreglos', equipamiento: 'Equipamiento y muebles', comisiones: 'Comisiones y gastos bancarios', limpieza: 'Limpieza', capacitacion: 'Capacitación', otros: 'Otros' };
var MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
function weekStart(ds) { return addDays(ds, -((dowOf(ds) + 6) % 7)); }
function monthStart(ds) { return ds.slice(0, 8) + '01'; }
function nextMonthDs(ds) { var a = ds.split('-').map(Number); return new Date(Date.UTC(a[0], a[1], 1)).toISOString().slice(0, 10); }
function prevMonthDs(ds) { var a = ds.split('-').map(Number); return new Date(Date.UTC(a[0], a[1] - 2, 1)).toISOString().slice(0, 10); }
function finRange() {
  var f = S.fin, ref = f.ref || todayDs(TZ()), s, e, cs, ce;
  if (f.range === 'mes') { s = monthStart(ref); e = nextMonthDs(ref); cs = s; ce = e; }
  else if (f.range === 'semana') { s = weekStart(ref); e = addDays(s, 7); cs = s; ce = e; }
  else { s = ref; e = addDays(ref, 1); cs = weekStart(ref); ce = addDays(cs, 7); }
  return { s: s, e: e, cs: cs, ce: ce, ref: ref };
}
function isFirm(t) { return t.estado !== 'cancelado' && !(t.estado_pago === 'pendiente' && +t.senia_requerida > 0 && t.vence_en); }
async function chunkedIn(table, col, ids) {
  var out = [];
  for (var i = 0; i < ids.length; i += 80) out = out.concat(await run(sb.from(table).select('*').in(col, ids.slice(i, i + 80))));
  return out;
}
function prevRange(r) { var f = S.fin; if (f.range === 'mes') return { s: prevMonthDs(r.s), e: r.s }; var n = f.range === 'semana' ? 7 : 1; return { s: addDays(r.s, -n), e: r.s }; }
async function loadFin() {
  var r = finRange(), tz = TZ(), f = S.fin, pr = prevRange(r);
  try { await sb.rpc('liberar_vencidos'); } catch (e) { }
  var z = function (d) { return zonedToUtc(d, 0, tz).toISOString(); };
  var a = z(r.cs), b = z(r.ce), rs = z(r.s), re = z(r.e);
  var res = await Promise.all([
    run(sb.from('turnos').select('*').eq('negocio_id', S.neg.id).gte('inicio', a).lt('inicio', b).neq('estado', 'cancelado').order('inicio')),
    run(sb.from('gastos').select('*').eq('negocio_id', S.neg.id).gte('fecha', r.s).lt('fecha', r.e).order('fecha', { ascending: false })),
    run(sb.from('turnos').select('*').eq('negocio_id', S.neg.id).eq('estado', 'reservado').eq('estado_pago', 'pendiente').gt('senia_requerida', 0).gt('vence_en', new Date().toISOString())),
    run(sb.from('turnos').select('*').eq('negocio_id', S.neg.id).eq('devolucion', 'pendiente')),
    run(sb.from('turnos').select('precio,estado,estado_pago,senia_requerida,vence_en').eq('negocio_id', S.neg.id).gte('inicio', z(pr.s)).lt('inicio', z(pr.e)).neq('estado', 'cancelado')),
    run(sb.from('turnos').select('id,estado,estado_pago,vence_en').eq('negocio_id', S.neg.id).gte('inicio', rs).lt('inicio', re).in('estado', ['cancelado', 'ausente'])),
    run(sb.from('clientes').select('id').eq('negocio_id', S.neg.id).gte('creado_en', rs).lt('creado_en', re))]);
  f.tur = res[0]; f.gas = res[1]; f.holds = res[2]; f.devs = res[3];
  f.prevFact = res[4].filter(isFirm).reduce(function (x, t) { return x + (+t.precio); }, 0);
  f.can = res[5].filter(function (t) { return !(t.estado === 'cancelado' && t.estado_pago === 'pendiente' && t.vence_en); });
  f.cliNew = res[6].length;
  f.pag = f.tur.length ? (await chunkedIn('pagos', 'turno_id', f.tur.map(function (x) { return x.id; }))).filter(function (p) { return p.estado === 'aprobado'; }) : [];
  var tz2 = TZ(), inIds = f.tur.filter(function (t) { if (!isFirm(t)) return false; var d = utcToLocal(t.inicio, tz2).ds; return d >= r.s && d < r.e; }).map(function (t) { return t.id; });
  var its = inIds.length ? await chunkedIn('turno_servicios', 'turno_id', inIds) : [], agg = {};
  its.forEach(function (x) { var o = agg[x.nombre] = agg[x.nombre] || { nombre: x.nombre, n: 0, tot: 0 }; o.n++; o.tot += +x.precio; });
  f.top = Object.keys(agg).map(function (k) { return agg[k]; }).sort(function (x, y) { return y.tot - x.tot; });
  f.loaded = true;
}
function finChart(vals, labels, sel) {
  var W = 520, H = 230, L = 40, B = 28, T = 18, R = 8, max = niceMax(Math.max.apply(null, vals.concat([1])));
  var ph = H - T - B, bw = (W - L - R) / vals.length, g = '', bars = '', many = vals.length > 10;
  for (var i = 0; i <= 4; i++) { var y = T + ph * (1 - i / 4); g += '<line class="g" x1="' + L + '" x2="' + (W - R) + '" y1="' + y + '" y2="' + y + '"/><text x="' + (L - 6) + '" y="' + (y + 4) + '" text-anchor="end">' + kfmt(max * i / 4) + '</text>'; }
  vals.forEach(function (v, i) {
    var h = v / max * ph, bwid = bw * (many ? 0.7 : 0.52), x = L + i * bw + (bw - bwid) / 2, y = T + ph - h;
    bars += '<rect class="bar' + (sel === null || sel === i ? ' sel' : '') + '" x="' + x + '" y="' + y + '" width="' + bwid + '" height="' + h + '" rx="' + (many ? 2 : 5) + '"/>' +
      (v > 0 && !many ? '<text class="v" x="' + (x + bwid / 2) + '" y="' + (y - 5) + '" text-anchor="middle">' + Math.round(v / 1000) + 'k</text>' : '') +
      (!many || i % 5 === 0 ? '<text x="' + (x + bwid / 2) + '" y="' + (H - 8) + '" text-anchor="middle">' + labels[i] + '</text>' : '');
  });
  return '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Facturación por día en miles de pesos">' + g + bars + '</svg>';
}
function niceMax(x) { var m = Math.pow(10, Math.floor(Math.log10(x))), f = [1, 2, 4, 6, 8, 10]; for (var i = 0; i < f.length; i++) { if (f[i] * m >= x) return f[i] * m; } return 10 * m; }
function kfmt(n) { return n >= 1000 ? (n / 1000) + 'k' : String(n); }
function finanzasView() {
  var f = S.fin, vw = f.view || 'resumen';
  var head = '<div class="head"><h2>Finanzas</h2><div class="chips">' + chip('fin-range', 'Día', f.range === 'dia', 'data-v="dia"') + chip('fin-range', 'Semana', f.range === 'semana', 'data-v="semana"') + chip('fin-range', 'Mes', f.range === 'mes', 'data-v="mes"') + '</div></div>' +
    '<div class="seg" role="tablist">' + [['resumen', 'Resumen'], ['cobrado', 'Cobrado'], ['gastos', 'Gastos']].map(function (x) { return '<button role="tab" data-act="fin-view" data-v="' + x[0] + '" aria-selected="' + (vw === x[0]) + '">' + x[1] + '</button>'; }).join('') + '</div>';
  if (!f.loaded) return head + '<div class="loading">Cargando números…</div>';
  var r = finRange(), tz = TZ(), today = todayDs(tz);
  var lbl = f.range === 'dia' ? dlong(r.s) : f.range === 'semana' ? 'Semana del ' + (+r.s.split('-')[2]) + ' al ' + (+addDays(r.e, -1).split('-')[2]) + ' de ' + MESES[+addDays(r.e, -1).split('-')[1] - 1].toLowerCase() : MESES[+r.s.split('-')[1] - 1] + ' ' + r.s.split('-')[0];
  var nav = '<div class="finnav"><button class="chip" data-act="fin-nav" data-v="-1" aria-label="Anterior">‹</button><b>' + lbl + '</b><button class="chip" data-act="fin-nav" data-v="1" aria-label="Siguiente">›</button>' + (r.ref !== today ? '<button class="chip" data-act="fin-hoy">Hoy</button>' : '') + '</div>';
  var firm = f.tur.filter(isFirm), dsOf = function (t) { return utcToLocal(t.inicio, tz).ds; };
  var inR = firm.filter(function (t) { var d = dsOf(t); return d >= r.s && d < r.e; });
  var pagBy = {}; f.pag.forEach(function (p) { pagBy[p.turno_id] = (pagBy[p.turno_id] || 0) + (+p.monto); });
  var st = function (list) { var o = { n: list.length, fact: 0, cob: 0 }; list.forEach(function (t) { o.fact += +t.precio; o.cob += Math.min(+t.precio, pagBy[t.id] || 0); }); o.por = Math.max(0, o.fact - o.cob); return o; };
  var K = st(inR);
  var com = 0, comCob = 0, factAlq = 0, cobAlq = 0, alqTot = 0, sueTot = 0;
  var rows = S.mie.map(function (m) {
    var k = st(inR.filter(function (t) { return t.miembro_id === m.id; })), mod = m.modalidad || 'comision', pro, loc, nota = '';
    if (mod === 'alquiler') { var al = fijoPeriodo(m, r, today); factAlq += k.fact; cobAlq += k.cob; alqTot += al; pro = k.fact - al; loc = al; nota = 'Alquiler ' + money(m.monto_fijo) + ' ' + PERS[m.periodo || 'dia']; }
    else if (mod === 'sueldo') { var su = fijoPeriodo(m, r, today); sueTot += su; pro = su; loc = k.fact - su; nota = 'Sueldo ' + money(m.monto_fijo) + ' ' + PERS[m.periodo || 'dia']; }
    else { pro = Math.round(k.fact * m.comision_pct / 100); loc = k.fact - pro; com += pro; comCob += Math.round(k.cob * m.comision_pct / 100); nota = 'Comisión ' + m.comision_pct + '%'; }
    return '<tr><td><i class="pdot c' + m.color + '"></i>' + esc(m.nombre) + '<br><small class="muted">' + nota + '</small></td><td>' + k.n + '</td><td>' + money(k.fact) + '</td><td>' + money(pro) + '</td><td>' + money(loc) + '</td></tr>';
  }).join('');
  var gt = f.gas.reduce(function (a, g) { return a + (+g.monto); }, 0), neta = K.fact - com - sueTot - factAlq + alqTot - gt, netaCob = K.cob - comCob - sueTot - cobAlq + alqTot - gt;
  var holdsAmt = f.holds.reduce(function (a, t) { return a + (+t.senia_requerida); }, 0), devsAmt = f.devs.reduce(function (a, t) { return a + (+t.senia_requerida); }, 0);
  var holds = f.holds.length ? '<p class="small muted">' + f.holds.length + (f.holds.length === 1 ? ' seña' : ' señas') + ' por confirmar (' + money(holdsAmt) + '), todavía no cuentan.</p>' : '';
  var devs = f.devs.length ? '<p class="small muted">Tenés ' + f.devs.length + (f.devs.length === 1 ? ' seña' : ' señas') + ' para devolver (' + money(devsAmt) + ').</p>' : '';
  var body = '';

  if (vw === 'resumen') {
    var days = [], labels = [], d;
    for (d = r.cs; d < r.ce; d = addDays(d, 1)) { days.push(d); labels.push(f.range === 'mes' ? String(+d.split('-')[2]) : DOWS[dowOf(d)] + ' ' + (+d.split('-')[2])); }
    var vals = days.map(function (dd) { return firm.filter(function (t) { return dsOf(t) === dd; }).reduce(function (a, t) { return a + (+t.precio); }, 0); });
    var sel = f.range === 'dia' ? days.indexOf(r.s) : null;
    var dl = f.prevFact > 0 ? Math.round((K.fact - f.prevFact) / f.prevFact * 100) : null, pl = f.range === 'dia' ? 'ayer' : f.range === 'semana' ? 'la semana anterior' : 'el mes anterior';
    var cmp = dl === null ? '<small class="delta">Sin datos del período anterior</small>' : '<small class="delta ' + (dl >= 0 ? 'good' : 'bad') + '">' + (dl >= 0 ? '▲ ' : '▼ ') + Math.abs(dl) + '% vs ' + pl + '</small>';
    var tk = K.n ? Math.round(K.fact / K.n) : 0, canN = f.can.length, canP = (canN + K.n) ? Math.round(canN / (canN + K.n) * 100) : 0;
    var kp = '<div class="kpis"><div class="kpi"><small>Facturación</small><b>' + money(K.fact) + '</b>' + cmp + '</div><div class="kpi"><small>Ya cobrado</small><b class="good">' + money(K.cob) + '</b></div><div class="kpi"><small>Por cobrar</small><b>' + money(K.por) + '</b></div><div class="kpi"><small>Turnos</small><b>' + K.n + '</b></div><div class="kpi"><small>Ticket promedio</small><b>' + money(tk) + '</b></div><div class="kpi kpi-net"><small>Ganancia neta</small><b class="' + (neta >= 0 ? 'good' : 'bad') + '">' + money(neta) + '</b></div></div>';
    var topMax = f.top.length ? f.top[0].tot : 1;
    var top = f.top.length ? '<div class="card"><h3>Servicios que más facturan</h3>' + f.top.slice(0, 5).map(function (x) { return '<div class="hbar"><div class="hl"><span>' + esc(x.nombre) + ' <small class="muted">' + x.n + (x.n === 1 ? ' vez' : ' veces') + '</small></span><b>' + money(x.tot) + '</b></div><div class="hb"><i style="width:' + Math.max(4, Math.round(x.tot / topMax * 100)) + '%"></i></div></div>'; }).join('') + '</div>' : '';
    var dowc = [0, 0, 0, 0, 0, 0, 0], hrc = {};
    inR.forEach(function (t) { var l = utcToLocal(t.inicio, tz); dowc[dowOf(l.ds)]++; var hh = Math.floor(l.min / 60); hrc[hh] = (hrc[hh] || 0) + 1; });
    var dmax = Math.max.apply(null, dowc.concat([1])), ord = [1, 2, 3, 4, 5, 6, 0], tops = Object.keys(hrc).sort(function (x, y) { return hrc[y] - hrc[x]; }).slice(0, 3);
    var rhythm = (f.range !== 'dia' && K.n) ? '<div class="card"><h3>Cuándo se llena tu agenda</h3><div class="bars2">' + ord.map(function (dw) { return '<div><b>' + dowc[dw] + '</b><i style="height:' + Math.max(3, Math.round(dowc[dw] / dmax * 70)) + 'px"></i><span>' + DOWS[dw] + '</span></div>'; }).join('') + '</div>' + (tops.length ? '<p class="muted small" style="margin:10px 0 0">Horarios más pedidos: <b>' + tops.map(function (x) { return x + ':00'; }).join(', ') + '</b></p>' : '') + '</div>' : (K.n && tops.length ? '<div class="card"><h3>Horarios del día</h3><p class="muted small" style="margin:0">Más turnos a las <b>' + tops.map(function (x) { return x + ':00'; }).join(', ') + '</b>.</p></div>' : '');
    var health = '<div class="card"><h3>Salud del negocio</h3><div class="tbl2"><div><span>Clientas nuevas</span><b>' + f.cliNew + '</b></div><div><span>Cancelaciones y ausencias</span><b>' + canN + (canN + K.n ? ' (' + canP + '%)' : '') + '</b></div><div><span>Gastos del período</span><b>' + money(gt) + (K.fact ? ' (' + Math.round(gt / K.fact * 100) + '% de lo facturado)' : '') + '</b></div><div><span>Ganancia neta cobrada</span><b class="' + (netaCob >= 0 ? 'good' : 'bad') + '">' + money(netaCob) + '</b></div></div>' + holds + devs + '</div>';
    var sedes = '';
    if (S.neg.tiene_sucursales && S.suc.length > 1) {
      sedes = '<div class="card"><h3>Comparar sucursales</h3><div class="scroll"><table class="tbl"><thead><tr><th>Sede</th><th>Turnos</th><th>Factura</th><th>Cobrado</th></tr></thead><tbody>' + S.suc.map(function (sc) {
        var k = st(inR.filter(function (t) { return t.sucursal_id === sc.id; })); return '<tr><td>' + esc(sc.nombre) + '</td><td>' + k.n + '</td><td>' + money(k.fact) + '</td><td>' + money(k.cob) + '</td></tr>';
      }).join('') + '</tbody></table></div></div>';
    }
    var out = '<div class="card staff"><h3>Cómo se calcula tu ganancia neta</h3><div class="scroll"><table class="tbl"><tbody>' +
      '<tr><td>Facturación</td><td>' + money(K.fact) + '</td></tr>' + (com ? '<tr><td>Comisiones del equipo</td><td>− ' + money(com) + '</td></tr>' : '') + (sueTot ? '<tr><td>Sueldos fijos</td><td>− ' + money(sueTot) + '</td></tr>' : '') + (factAlq ? '<tr><td>Facturado por quienes alquilan <small class="muted">es de ellos</small></td><td>− ' + money(factAlq) + '</td></tr><tr><td>Alquileres cobrados</td><td>+ ' + money(alqTot) + '</td></tr>' : '') +
      '<tr><td>Gastos <small class="muted"><button class="chip" data-act="fin-view" data-v="gastos">ver detalle</button></small></td><td>− ' + money(gt) + '</td></tr>' +
      '<tr><td><b>Ganancia neta</b> <small class="muted">sobre lo facturado</small></td><td><span class="res ' + (neta >= 0 ? 'good' : 'bad') + '">' + money(neta) + '</span></td></tr>' +
      '<tr><td><b>Ganancia neta cobrada</b> <small class="muted">solo lo que ya entró</small></td><td><span class="res ' + (netaCob >= 0 ? 'good' : 'bad') + '">' + money(netaCob) + '</span></td></tr></tbody></table></div></div>';
    body = kp + '<div class="card"><h3>Facturación por día</h3>' + finChart(vals, labels, sel) + '</div>' + top + rhythm + health +
      '<div class="card"><h3>Por profesional</h3><div class="scroll"><table class="tbl"><thead><tr><th>Nombre</th><th>Turnos</th><th>Factura</th><th>Para el profesional</th><th>Para el local</th></tr></thead><tbody>' + rows + '</tbody></table></div></div>' + sedes + out;
  } else if (vw === 'cobrado') {
    var porMedio = Object.keys(MEDIOS).map(function (k) {
      var tot = f.pag.filter(function (p) { return p.medio === k && inR.some(function (t) { return t.id === p.turno_id; }); }).reduce(function (a, p) { return a + (+p.monto); }, 0);
      return { k: k, tot: tot };
    });
    var totCob = porMedio.reduce(function (a, x) { return a + x.tot; }, 0);
    var kp2 = '<div class="kpis"><div class="kpi"><small>Cobrado</small><b class="good">' + money(totCob) + '</b></div><div class="kpi"><small>Por cobrar</small><b>' + money(K.por) + '</b></div><div class="kpi"><small>Señas por confirmar</small><b>' + money(holdsAmt) + '</b></div><div class="kpi"><small>Señas a devolver</small><b>' + money(devsAmt) + '</b></div></div>';
    var medH = '<div class="card"><h3>Cómo cobraste</h3>' + porMedio.map(function (x) { var pc = totCob ? Math.round(x.tot / totCob * 100) : 0; return '<div class="hbar"><div class="hl"><span>' + MEDIOS[x.k] + ' <small class="muted">' + pc + '%</small></span><b>' + money(x.tot) + '</b></div><div class="hb"><i style="width:' + (x.tot ? Math.max(4, pc) : 0) + '%"></i></div></div>'; }).join('') + holds + devs + '</div>';
    var nameBy = {}; f.tur.forEach(function (t) { nameBy[t.id] = t; });
    var pagos = f.pag.filter(function (p) { return nameBy[p.turno_id] && inR.some(function (t) { return t.id === p.turno_id; }); }).sort(function (x, y) { return (y.creado_en || '') < (x.creado_en || '') ? -1 : 1; });
    var plist = pagos.length ? '<div class="card"><h3>Cobros del período (' + pagos.length + ')</h3>' + pagos.map(function (p) { var t = nameBy[p.turno_id], l = utcToLocal(t.inicio, tz); return '<div class="alrow"><span><b>' + esc(t.cliente_nombre) + '</b><br><small>' + esc(MEDIOS[p.medio] || p.medio) + (p.tipo === 'sena' ? ' · seña' : '') + ' · turno ' + dlabel(l.ds) + ' ' + hhm(l.min) + '</small></span><b>' + money(p.monto) + '</b></div>'; }).join('') + '</div>' : '<div class="card"><h3>Cobros del período</h3><p class="muted">Todavía no hay cobros en este período.</p></div>';
    var pendL = inR.filter(function (t) { return +t.precio - (pagBy[t.id] || 0) > 0; });
    var pendH = pendL.length ? '<div class="card"><h3>Pendiente de cobro (' + pendL.length + ')</h3>' + pendL.map(function (t) { var l = utcToLocal(t.inicio, tz); return '<div class="alrow"><span><b>' + esc(t.cliente_nombre) + '</b><br><small>' + dlabel(l.ds) + ' ' + hhm(l.min) + '</small></span><b>' + money(Math.round(+t.precio - (pagBy[t.id] || 0))) + '</b></div>'; }).join('') + '</div>' : '';
    body = kp2 + medH + plist + pendH;
  } else {
    var byCat = Object.keys(CATS).map(function (k) { return [k, f.gas.filter(function (g) { return (g.categoria || 'otros') === k; }).reduce(function (a, g) { return a + (+g.monto); }, 0)]; }).filter(function (x) { return x[1] > 0; }).sort(function (x, y) { return y[1] - x[1]; });
    var defF = (today >= r.s && today < r.e) ? today : r.s;
    var form = '<div class="card staff"><h3>Cargar un gasto</h3><label>Concepto<input id="g-d" placeholder="Ej: Esmaltes y limas" autocomplete="off"></label>' +
      '<div class="two"><label>Monto ($)<input id="g-a" inputmode="numeric" placeholder="15000"></label><label>Fecha<input id="g-f" type="date" value="' + defF + '"></label></div>' +
      '<label>Categoría<select id="g-c">' + Object.keys(CATS).map(function (k) { return '<option value="' + k + '">' + CATS[k] + '</option>'; }).join('') + '</select></label>' +
      '<p class="err" id="g-err" role="alert"></p><div class="row"><button class="btn primary" data-act="g-add">Agregar gasto</button></div></div>';
    var kp3 = '<div class="kpis"><div class="kpi"><small>Gastos del período</small><b>' + money(gt) + '</b></div><div class="kpi"><small>% de lo facturado</small><b>' + (K.fact ? Math.round(gt / K.fact * 100) + '%' : '—') + '</b></div></div>';
    var catH = byCat.length ? '<div class="card"><h3>En qué se va la plata</h3>' + byCat.map(function (x) { return '<div class="hbar"><div class="hl"><span>' + CATS[x[0]] + ' <small class="muted">' + Math.round(x[1] / gt * 100) + '%</small></span><b>' + money(x[1]) + '</b></div><div class="hb"><i style="width:' + Math.max(4, Math.round(x[1] / byCat[0][1] * 100)) + '%"></i></div></div>'; }).join('') + '</div>' : '';
    var gl = f.gas.length ? '<div class="card"><h3>Gastos cargados (' + f.gas.length + ')</h3>' + f.gas.map(function (g) { return '<div class="alrow"><span><b>' + esc(g.concepto) + '</b><br><small>' + esc(CATS[g.categoria] || 'Otros') + ' · ' + dlabel(g.fecha) + '</small></span><span class="btns"><b>− ' + money(g.monto) + '</b><button class="chip" data-act="g-del" data-id="' + g.id + '" aria-label="Eliminar gasto">×</button></span></div>'; }).join('') + '</div>' : '<div class="card"><h3>Gastos cargados</h3><p class="muted">No cargaste gastos en este período.</p></div>';
    body = kp3 + form + catH + gl;
  }
  return head + nav + body;
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
function pubSlots(ds) {
  var d = S.P, b = S.pb, tz = d.negocio.zona_horaria, tot = pubTot();
  if (!tot.n || !ds) return [];
  var dow = dowOf(ds), oc = b.occ || [], now = Date.now() + 30 * 60000, set = {};
  pubEligible().filter(function (m) { return b.mid === 'any' || m.id === b.mid; }).forEach(function (m) {
    m.horarios.filter(function (h) { return h.dia === dow; }).forEach(function (h) {
      var a = tmin(h.desde), z = tmin(h.hasta);
      for (var t = a; t + tot.dur <= z; t += 30) {
        var s = zonedToUtc(ds, t, tz).getTime(), e = s + tot.dur * 60000;
        if (s < now) continue;
        var busy = oc.some(function (o) { return o.miembro_id === m.id && new Date(o.inicio).getTime() < e && new Date(o.fin).getTime() > s; });
        if (!busy && set[t] === undefined) set[t] = m.id;
      }
    });
  });
  return Object.keys(set).map(Number).sort(function (a, c) { return a - c; }).map(function (t) { return { t: t, mid: set[t] }; });
}
var FRASES = {
  manicura: ['Unas manos cuidadas dicen mucho sin decir nada.', 'El mejor accesorio es un esmaltado impecable.', 'Hoy te elegís a vos. Tus uñas lo van a agradecer.', 'Los pequeños detalles hacen los días más lindos.'],
  peluqueria: ['Un buen look empieza con ganas de cambiar.', 'Tu pelo cuenta quién sos: hoy lo hacemos brillar.', 'Cada visita es un paso más hacia tu mejor versión.', 'Cuando te sentís linda, se nota.'],
  barberia: ['Un buen corte cambia el día.', 'La prolijidad es la mejor carta de presentación.', 'El estilo es decir quién sos sin hablar.', 'Salís con otra cara, volvés con otra actitud.']
};
var CHECK = '<svg viewBox="0 0 24 24" width="60%" height="60%" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
function fidCard(info, st, token) {
  var f = info.fid; if (!f || (st !== 'ok' && st !== 'pagar')) return '';
  var cada = +f.cada, n = +f.n, pos = ((n - 1) % cada) + 1, premio = n % cada === 0, pend = st === 'pagar', firm = pend ? pos - 1 : pos, rub = info.negocio.rubro, anim = S.stampSeen !== token && !pend;
  var slots = '';
  for (var i = 1; i <= cada; i++) {
    var on = i <= firm, gift = i === cada, cur = i === pos;
    slots += '<div class="fslot' + (on ? ' on' : '') + (gift ? ' gift' : '') + (cur && !pend && anim ? ' new' : '') + (cur && pend ? ' next' : '') + '"' + (cur ? ' aria-label="Tu turno número ' + pos + '"' : '') + '>' +
      (on ? '<span class="stamp">' + (gift ? '<b>−' + f.pct + '%</b>' : CHECK) + '</span>' : (gift ? '<b class="gl">−' + f.pct + '%</b>' : '<span class="num">' + i + '</span>')) + '</div>';
  }
  var left = cada - pos, msg;
  if (pend) msg = 'Tu sello se firma cuando se confirme la seña.';
  else if (premio) msg = '¡Completaste tu tarjeta! Este turno ya tiene tu <b>' + f.pct + '% de descuento</b> aplicado.';
  else if (left === 1) msg = '¡Tu próximo turno tiene <b>' + f.pct + '% de descuento</b>!';
  else msg = 'Te faltan <b>' + left + ' turnos</b> para tu <b>' + f.pct + '% de descuento</b>.';
  var fr = (FRASES[rub] || FRASES.manicura)[n % 4];
  if (anim) setTimeout(function () { S.stampSeen = token; }, 2600);
  return '<div class="fidcard" role="group" aria-label="Tarjeta de fidelidad"><div class="fhead"><span class="fkick">Tarjeta de fidelidad</span><b>' + esc(info.negocio.nombre) + '</b></div>' +
    '<div class="fgrid">' + slots + '</div><p class="fmsg">' + msg + '</p>' +
    (pend ? '' : '<div class="firma"><span>' + esc(info.negocio.nombre) + '</span><small>sello ' + pos + ' de ' + cada + ' · ' + dlabel(utcToLocal(new Date().toISOString(), info.negocio.zona_horaria).ds) + '</small></div>') +
    '<p class="ffrase">“' + fr + '”</p></div>';
}
function fidPreviewHtml(b) {
  var d = S.P && S.P.negocio, f = b && b.fid; if (!d || !d.fid_activa || !f) return '';
  var tot = pubTot();
  if (f.premio) return '<div class="fidnote gift"><b>' + (f.conocida ? '¡Hola de nuevo, ' + esc(f.nombre) + '!' : '¡Bienvenida!') + '</b> Este va a ser tu turno número ' + f.n + ': tiene <b>' + f.pct + '% de descuento</b>' + (tot.precio ? ' (pagás ' + money(Math.round(tot.precio * (100 - f.pct) / 100)) + ' en vez de ' + money(tot.precio) + ')' : '') + '.</div>';
  var left = f.cada - (((f.n - 1) % f.cada) + 1);
  return '<div class="fidnote">' + (f.conocida ? '<b>¡Hola de nuevo, ' + esc(f.nombre) + '!</b> Este será tu turno número ' + f.n + '. ' : 'Con este turno empezás tu tarjeta de fidelidad. ') + 'Te ' + (left === 1 ? 'falta 1 turno' : 'faltan ' + left + ' turnos') + ' para tu ' + f.pct + '% de descuento.</div>';
}
function mineView(info) {
  var t = info.turno, tz = info.negocio.zona_horaria, l = utcToLocal(t.inicio, tz), now = Date.now(), vence = t.vence_en ? new Date(t.vence_en).getTime() : 0;
  var st = t.estado === 'cancelado' ? 'cancelado' : t.estado === 'completado' ? 'ok' : (t.estado_pago === 'pendiente' && +t.senia_requerida > 0) ? (vence > now ? 'pagar' : 'vencido') : 'ok';
  var head = { pagar: ['Reservamos tu turno', 'Falta un paso: transferí la seña para confirmarlo.'], vencido: ['Se venció el tiempo para pagar la seña', 'El horario se liberó. Podés reservar de nuevo.'], cancelado: ['Turno cancelado', ''], ok: ['¡Turno confirmado!', ''] }[st];
  var h = '<div class="card staff mine ' + st + '"><h2>' + head[0] + '</h2>' + (head[1] ? '<p class="muted">' + head[1] + '</p>' : '') +
    '<p><b>' + dlong(l.ds) + ' a las ' + hhm(l.min) + '</b> · ' + durTxt(t.duracion_min) + '</p>' +
    '<ul class="lines">' + info.items.map(function (x) { return '<li><span>' + esc(x.nombre) + ' <small>' + x.duracion_min + ' min</small></span><b>' + money(x.precio) + '</b></li>'; }).join('') + (+t.descuento_pct > 0 ? '<li><span>Descuento por fidelidad (' + t.descuento_pct + '%)</span><b>−' + money(Math.round(info.items.reduce(function (a, x) { return a + (+x.precio); }, 0) - t.precio)) + '</b></li>' : '') + '<li><span><b>Total</b></span><b>' + money(t.precio) + '</b></li></ul>';
  if (st === 'pagar') {
    var vv = utcToLocal(t.vence_en, tz);
    h += '<div class="paybox"><p class="small muted">Transferí a este alias</p><div class="aliasrow"><b class="alias">' + esc(info.alias_pago || '') + '</b><button class="btn" data-act="copy" data-v="' + esc(info.alias_pago || '') + '">Copiar</button></div>' +
      '<p>Monto de la seña: <b>' + money(t.senia_requerida) + '</b></p><p class="small muted">Tenés hasta las <b>' + hhm(vv.min) + '</b> para transferir. El resto (' + money(t.precio - t.senia_requerida) + ') se paga en el local.</p></div>' +
      (t.aviso_pago ? '<p class="msg" role="status">Le avisamos al local que transferiste. Cuando vea el pago, el turno queda confirmado. Esta pantalla se actualiza sola.</p>' : '<div class="row"><button class="btn primary" data-act="m-avisar">Ya transferí</button><button class="btn" data-act="m-refresh">Actualizar</button></div>');
  } else if (st === 'ok') {
    var pend = Math.max(0, t.precio - (+info.pagado || 0));
    h += (+info.pagado > 0 ? '<p>Ya pagaste <b>' + money(info.pagado) + '</b>. ' : '<p>') + (pend > 0 ? 'El resto (' + money(pend) + ') se paga en el local.' : 'Está todo pago.') + '</p>';
  } else if (st === 'cancelado') {
    h += t.devolucion ? '<p>Cancelaste a tiempo, así que el local te va a <b>devolver la seña</b>. Te la van a transferir a la brevedad.</p>' : '<p class="muted">Si ya habías transferido la seña, consultá con el local.</p>';
  }
  if (st === 'pagar' || st === 'ok') {
    if (S.mineCancel) h += '<div class="card note"><b>¿Cancelar este turno?</b><p class="muted small">' + (info.puede_devolver ? 'Como faltan más de ' + info.cancel_horas + ' horas, si ya pagaste la seña, te la devuelven.' : 'Faltan menos de ' + info.cancel_horas + ' horas, por eso la seña no se devuelve.') + '</p><div class="row"><button class="btn danger" data-act="m-cancel-yes">Sí, cancelar</button><button class="btn" data-act="m-cancel-no">No, mantener</button></div></div>';
    else h += '<div class="row"><button class="btn" data-act="m-cancel">Cancelar turno</button></div>';
  }
  h += '<div class="row"><a class="btn' + (st === 'vencido' || st === 'cancelado' ? ' primary' : '') + '" href="' + esc(location.pathname + '?n=' + info.negocio.slug) + '">Reservar otro turno</a></div></div>';
  return h + fidCard(info, st, S.pb && S.pb.token || 'x');
}
async function mineLoad(token) {
  S.mine = await run(sb.rpc('turno_publico', { p_token: token }));
  if (!S.mine) throw new Error('No encontramos ese turno');
}
var pollT = null;
function mineNeedsPoll() { var m = S.mine; return S.route === 'pub' && m && m.turno.estado === 'reservado' && m.turno.estado_pago === 'pendiente' && +m.turno.senia_requerida > 0; }
function startPoll() {
  if (pollT) return;
  pollT = setInterval(async function () {
    if (!mineNeedsPoll() || document.hidden) return;
    var before = JSON.stringify(S.mine.turno);
    try { await mineLoad(S.pb.token); } catch (e) { return; }
    if (JSON.stringify(S.mine.turno) !== before || new Date(S.mine.turno.vence_en).getTime() < Date.now()) render();
  }, 20000);
}
function pubView() {
  var d = S.P;
  if (!d) return '<div class="pubwrap"><div class="pubhead">' + logo(40) + '<div class="nm">Turnia</div></div><div class="card staff"><h3>No encontramos este local</h3><p class="muted">Revisá que el link esté completo o pedile uno nuevo al local.</p></div></div>';
  var b = S.pb, tz = d.negocio.zona_horaria, hdr = '<div class="pubhead">' + (d.negocio.logo_url ? '<img class="logo biz" width="40" height="40" src="' + esc(d.negocio.logo_url) + '" alt="">' : logo(40)) + '<div><div class="nm">' + esc(d.negocio.nombre) + '</div><div class="small muted">Reservá tu turno online</div></div></div>';
  if (b.done && S.mine) return artFor(d.negocio.rubro) + '<div class="pubwrap">' + hdr + mineView(S.mine) + '</div>';
  var sucs = d.sucursales.length > 1 ? '<div class="step"><span class="lbl">Sucursal</span><div class="chips">' + d.sucursales.map(function (s) { return chip('p-suc', esc(s.nombre), b.suc === s.id, 'data-v="' + s.id + '"'); }).join('') + '</div></div>' : '';
  var svcs = d.servicios.map(function (x) { var on = b.svcs.indexOf(x.id) > -1; return '<button class="svc" data-act="p-svc" data-v="' + x.id + '" aria-pressed="' + on + '"><div><b>' + (on ? '✓ ' : '') + esc(x.nombre) + '</b><span>' + x.duracion_min + ' min</span></div><em>' + money(x.precio) + '</em></button>'; }).join('');
  var tot = pubTot(), body = '', sum = '';
  if (tot.n) {
    sum = '<p class="pubsum" role="status"><b>' + tot.n + (tot.n === 1 ? ' servicio' : ' servicios') + '</b> · ' + durTxt(tot.dur) + ' · <b>' + money(tot.precio) + '</b>' + (d.negocio.sena_pct > 0 ? '<br><small>Seña para confirmar: ' + money(Math.round(tot.precio * d.negocio.sena_pct / 100)) + ' (' + d.negocio.sena_pct + '%). Después de reservar tenés ' + durTxt(d.negocio.hold_min) + ' para transferirla.</small>' : '') + (d.negocio.fid_activa ? '<br><small>Tarjeta de fidelidad: cada ' + d.negocio.fid_cada + '.º turno tiene ' + d.negocio.fid_pct + '% de descuento.</small>' : '') + '</p>';
    var E = pubEligible();
    if (!E.length) body = '<div class="card staff"><p>Ningún profesional hace todos esos servicios juntos. Probá con otra combinación, o reservá por separado.</p></div>';
    else {
      var pros = chip('p-mid', 'Cualquiera', b.mid === 'any', 'data-v="any"') + E.map(function (m) { return chip('p-mid', esc(m.nombre), b.mid === m.id, 'data-v="' + m.id + '"'); }).join('');
      var today = todayDs(tz), days = [];
      var sugs = [];
      for (var i = 0; i < 14; i++) {
        var ds = addDays(today, i), dw = dowOf(ds);
        if (!E.some(function (m) { return m.horarios.some(function (h) { return h.dia === dw; }); })) continue;
        var sl = pubSlots(ds); days.push({ ds: ds, n: sl.length });
        sl.forEach(function (x) { if (sugs.length < 4 && (sugs.length === 0 || sugs[sugs.length - 1].ds !== ds || sugs.filter(function (y) { return y.ds === ds; }).length < 2)) sugs.push({ ds: ds, t: x.t }); });
      }
      var slots = b.ds ? pubSlots(b.ds) : [];
      var sugHtml = '<div class="step"><span class="lbl">' + (tot.n > 1 ? 'Próximos horarios con lugar para todo (' + durTxt(tot.dur) + ')' : 'Próximos horarios disponibles') + '</span>' + (sugs.length ? '<div class="chips">' + sugs.map(function (x) { return chip('p-sug', dlabel(x.ds) + ' · ' + hhm(x.t), b.ds === x.ds && b.min === x.t, 'data-v="' + x.ds + '|' + x.t + '"'); }).join('') + '</div>' : '<p class="muted">No encontramos un horario con lugar para todo en los próximos 14 días. Probá con menos servicios o con otro profesional.</p>') + '</div>';
      body = '<div class="step"><span class="lbl">Profesional</span><div class="chips">' + pros + '</div></div>' + sugHtml +
        '<div class="step"><span class="lbl">O elegí el día</span>' + (days.length ? '<div class="chips">' + days.map(function (x) { return x.n ? chip('p-ds', (x.ds === today ? 'Hoy · ' : '') + dlabel(x.ds), b.ds === x.ds, 'data-v="' + x.ds + '"') : '<button class="chip" disabled aria-label="' + dlabel(x.ds) + ', sin lugar">' + dlabel(x.ds) + ' · completo</button>'; }).join('') + '</div>' : '<p class="muted">No hay días disponibles con esa selección.</p>') + '</div>' +
        (b.ds ? '<div class="step"><span class="lbl">Horario</span>' + (b.loading ? '<p class="muted">Actualizando horarios…</p>' : (slots.length ? '<div class="chips">' + slots.map(function (x) { return chip('p-min', hhm(x.t), b.min === x.t, 'data-v="' + x.t + '"'); }).join('') + '</div>' : '<p class="muted">No quedan horarios ese día. Probá con otro día o profesional.</p>')) + '</div>' : '') +
        (b.min !== null ? '<div class="card staff"><h3>Tus datos</h3><label>Nombre<input id="p-name" autocomplete="name" placeholder="Nombre y apellido" value="' + esc(b.name || '') + '"></label><label>Teléfono / WhatsApp<input id="p-tel" type="tel" inputmode="tel" autocomplete="tel" placeholder="Ej: 11 2345 6789" value="' + esc(b.tel || '') + '"></label><p class="hint">Lo usamos para avisarte si hay cambios en tu turno.</p><div id="p-fid">' + fidPreviewHtml(b) + '</div>' +
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
async function pubOccLoad() {
  var b = S.pb; if (!b || !S.P) return;
  var now = new Date();
  try { b.occ = await run(sb.rpc('turnos_ocupados', { p_slug: S.P.negocio.slug, p_desde: now.toISOString(), p_hasta: new Date(now.getTime() + 16 * 86400000).toISOString() })) || []; }
  catch (e) { b.occ = b.occ || []; }
}
async function pubLoad(slug) {
  S.route = 'pub';
  try {
    var d = await run(sb.rpc('negocio_publico', { p_slug: slug }));
    S.P = d || null;
    if (d) {
      var s = Q.get('s'), sel = d.sucursales.filter(function (x) { return x.slug === s; })[0] || (d.sucursales.length === 1 ? d.sucursales[0] : null);
      S.pb = { svcs: [], mid: 'any', suc: sel ? sel.id : null, ds: null, min: null, done: null, err: '', occ: [], loading: false, busy: false };
    }
    if (d) await pubOccLoad();
    var tk = Q.get('t');
    if (d && tk) { try { await mineLoad(tk); S.pb.token = tk; S.pb.done = true; startPoll(); } catch (e) { toast('No encontramos ese turno'); } }
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
        S.route = 'app'; S.tab = 'inicio'; S.ds = todayDs(TZ()); S.win = 0; await loadHome();
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
      case 'push-on': await pushOn(); break;
      case 'push-off': await pushOff(); break;
      case 'push-test': await pushTest(); break;
      case 'push-later': try { localStorage.setItem('turnia-push-later', '1'); } catch (x) { } break;
      case 'cl-open': S.sheet = null; S.tab = 'clientas'; S.fx = { id: id, c: null, tur: [], items: {}, reg: [], urls: {}, form: null }; render(); await loadFicha(id, v === 'reg' ? (t.dataset.t || true) : false); break;
      case 'cl-back': S.fx = null; render(); await loadClientas(); break;
      case 'rg-new': fxSnap(); fichaOpenForm(v || null); break;
      case 'rg-cancel': (S.fx.form || {}).files && S.fx.form.files.forEach(function (x) { try { URL.revokeObjectURL(x.prev); } catch (e) { } }); S.fx.form = null; break;
      case 'rg-rmf': fxSnap(); S.fx.form.files.splice(+v, 1); break;
      case 'rg-del': S.fx.delRg = id; break;
      case 'rg-del-no': S.fx.delRg = null; break;
      case 'rg-del-yes': {
        var gdel = S.fx.reg.filter(function (x) { return x.id === id; })[0];
        if (gdel && (gdel.fotos || []).length) { try { await sb.storage.from('fichas').remove(gdel.fotos); } catch (e) { } }
        await run(sb.from('cliente_registros').delete().eq('id', id)); await loadFicha(S.fx.id); toast('Registro eliminado'); break;
      }
      case 'rg-save': {
        fxSnap(); var fxs = S.fx, fm = fxs.form, hasC = Object.keys(fm.campos).some(function (k) { return String(fm.campos[k] || '').trim(); });
        if (!fm.texto.trim() && !hasC && !fm.files.length) { fm.err = 'Escribí algo o agregá una foto para guardar.'; break; }
        fxs.busy = true; fm.err = ''; render();
        var up = [];
        try {
          for (var i = 0; i < fm.files.length; i++) {
            var pth = S.neg.id + '/' + fxs.id + '/' + Date.now() + '-' + i + '.jpg';
            var ur = await sb.storage.from('fichas').upload(pth, fm.files[i].blob, { contentType: 'image/jpeg' });
            if (ur.error) throw ur.error; up.push(pth);
          }
          var cp = {}; Object.keys(fm.campos).forEach(function (k) { var vv = String(fm.campos[k] || '').trim(); if (vv) cp[k] = vv.slice(0, 200); });
          await run(sb.from('cliente_registros').insert({ negocio_id: S.neg.id, cliente_id: fxs.id, turno_id: fm.turno_id || null, texto: fm.texto.trim() || null, campos: cp, fotos: up }));
        } catch (er) {
          if (up.length) { try { await sb.storage.from('fichas').remove(up); } catch (e2) { } }
          fxs.busy = false; fm.err = errMsg(er); break;
        }
        fm.files.forEach(function (x) { try { URL.revokeObjectURL(x.prev); } catch (e) { } });
        S.fx.form = null; await loadFicha(fxs.id); toast('Registro guardado'); break;
      }
      case 'ph-open': S.ph = v; break;
      case 'ph-close': S.ph = null; break;
      case 'fid-toggle': await run(sb.from('negocios').update({ fid_activa: !S.neg.fid_activa }).eq('id', S.neg.id)); await loadAll(S.neg.id); break;
      case 'cq-clear': S.cq = ''; break;
      case 'tab': if (v === 'inicio') { S.tab = v; S.acct = false; S.sheet = null; render(); await loadHome(); break; }
        if (v === 'clientas') { S.tab = v; S.fx = null; S.acct = false; S.sheet = null; render(); await loadClientas(); break; } S.tab = v; S.acct = false; S.sheet = null; if (v === 'finanzas') { S.fin.loaded = false; render(); await loadFin(); } break;
      case 'fin-view': S.fin.view = v; break;
      case 'fin-range': S.fin.range = v; S.fin.loaded = false; render(); await loadFin(); break;
      case 'fin-hoy': S.fin.ref = null; S.fin.loaded = false; render(); await loadFin(); break;
      case 'fin-nav': {
        var rr = finRange(), dir = +v;
        S.fin.ref = S.fin.range === 'mes' ? (dir > 0 ? nextMonthDs(rr.s) : prevMonthDs(rr.s)) : addDays(rr.s, dir * (S.fin.range === 'semana' ? 7 : 1));
        S.fin.loaded = false; render(); await loadFin(); break;
      }
      case 'g-add': {
        var gd = $('#g-d').value.trim(), ga = parseInt($('#g-a').value.replace(/\D/g, ''), 10), ge2 = $('#g-err');
        if (!gd || isNaN(ga)) { ge2.textContent = 'Escribí el concepto y el monto en números.'; return; }
        var rg = finRange(), fecha = ($('#g-f') && $('#g-f').value) || rg.s;
        if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) { ge2.textContent = 'Elegí una fecha válida.'; return; }
        await run(sb.from('gastos').insert({ negocio_id: S.neg.id, concepto: gd, monto: ga, fecha: fecha, categoria: $('#g-c').value }));
        if (fecha < rg.s || fecha >= rg.e) { S.fin.ref = fecha; S.fin.loaded = false; render(); }
        await loadFin(); toast('Gasto agregado'); break;
      }
      case 'g-del': await run(sb.from('gastos').delete().eq('id', id)); await loadFin(); toast('Gasto eliminado'); break;
      case 'acct': S.acct = !S.acct; break;
      case 'win': S.win += +v; break;
      case 'ds': S.ds = v; await loadTur(); break;
      case 'new': S.sheet = { type: 'new', mid: S.mie[0].id, min: 600 }; break;
      case 'appt': S.sheet = { type: 'detail', id: v }; break;
      case 'sheet-close': S.sheet = null; break;
      case 'sh-svc': {
        var shn = S.sheet; shn.client = $('#f-client').value; shn.tel = $('#f-tel').value; shn.mid = $('#f-mie').value; shn.min = +$('#f-time').value;
        var ii = shn.svcs.indexOf(id); if (ii > -1) { if (shn.svcs.length > 1) shn.svcs.splice(ii, 1); } else shn.svcs.push(id);
        var chosen = shn.svcs.map(svcOf); shn.dur = chosen.reduce(function (a, x) { return a + x.duracion_min; }, 0); shn.price = Math.round(chosen.reduce(function (a, x) { return a + (+x.precio); }, 0));
        break;
      }
      case 'sheet-save': {
        var nm = $('#f-client').value.trim(), err = $('#f-err'), shs = S.sheet, chosen2 = shs.svcs.map(svcOf), m = S.mie.filter(function (x) { return x.id === $('#f-mie').value; })[0], min = +$('#f-time').value;
        var pr0 = parseInt($('#f-price').value.replace(/\D/g, ''), 10);
        if (!nm) { err.textContent = 'Escribí el nombre del cliente.'; return; }
        if (isNaN(pr0)) { err.textContent = 'Escribí el precio en números.'; return; }
        var tn, cliId = null, descM = 0, prF = pr0, telM = $('#f-tel').value.trim(), keyM = telM.replace(/\D/g, '').slice(-8);
        if (telM && keyM.length < 8) { err.textContent = 'El teléfono parece incompleto.'; return; }
        try {
          if (keyM.length >= 8) {
            var fnd = await run(sb.from('clientes').select('*').eq('negocio_id', S.neg.id).eq('tel_key', keyM).limit(1));
            var cli = fnd[0] || await run(sb.from('clientes').insert({ negocio_id: S.neg.id, nombre: nm, telefono: telM }).select().single());
            cliId = cli.id;
            if (S.neg.fid_activa) {
              var prev = await run(sb.from('turnos').select('id').eq('negocio_id', S.neg.id).eq('cliente_id', cliId).in('estado', ['reservado', 'completado']));
              if ((prev.length + 1) % S.neg.fid_cada === 0) { descM = S.neg.fid_pct; prF = Math.round(pr0 * (100 - descM) / 100); }
            }
          }
          tn = await run(sb.from('turnos').insert({ negocio_id: S.neg.id, sucursal_id: m.sucursal_id, miembro_id: m.id, servicio_id: chosen2[0].id, cliente_id: cliId, cliente_nombre: nm, inicio: zonedToUtc(S.ds, min, TZ()).toISOString(), duracion_min: +$('#f-dur').value, precio: prF, origen: 'panel', descuento_pct: descM }).select().single());
        } catch (er) { err.textContent = errMsg(er); return; }
        try {
          await run(sb.from('turno_servicios').insert(chosen2.map(function (x, i) { return { negocio_id: S.neg.id, turno_id: tn.id, servicio_id: x.id, nombre: x.nombre, duracion_min: x.duracion_min, precio: x.precio, orden: i }; })));
        } catch (er3) { await sb.from('turnos').delete().eq('id', tn.id); err.textContent = errMsg(er3); return; }
        S.sheet = null; await loadTur(); toast(descM ? 'Turno guardado con ' + descM + '% de descuento por fidelidad (' + money(prF) + ')' : 'Turno guardado'); break;
      }
      case 'cb-start': { var ta = findTurno(S.sheet.id); S.sheet.cobro = { medio: null, monto: Math.max(0, Math.round(+ta.precio - pagado(ta))) }; break; }
      case 'cb-no': S.sheet.cobro = null; break;
      case 'cb-medio': { var mo = $('#cb-monto'); if (mo) S.sheet.cobro.monto = mo.value; S.sheet.cobro.medio = v; break; }
      case 'cb-ok': {
        var cb = S.sheet.cobro, tb = findTurno(S.sheet.id), cerr = $('#cb-err');
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
      case 't-cancel-yes': {
        var tc = findTurno(S.sheet.id), conPago = pagado(tc) > 0;
        await run(sb.from('turnos').update(conPago ? { estado: 'cancelado', devolucion: 'pendiente' } : { estado: 'cancelado' }).eq('id', S.sheet.id));
        S.sheet = null; await loadTur(); toast(conPago ? 'Turno cancelado. Acordate de devolver la seña.' : 'Turno cancelado'); break;
      }
      case 'sena-ok': {
        var ts = findTurno(S.sheet.id);
        await run(sb.from('pagos').insert({ negocio_id: S.neg.id, turno_id: ts.id, monto: ts.senia_requerida, tipo: 'sena', medio: 'transferencia', estado: 'aprobado' }));
        await run(sb.from('turnos').update({ estado_pago: 'sena', vence_en: null }).eq('id', ts.id));
        S.sheet = { type: 'detail', id: ts.id }; await loadTur(); toast('Seña confirmada. Ahora podés avisarle por WhatsApp.'); break;
      }
      case 'wa': case 'wa-dev': {
        var wt = findTurno(act === 'wa' ? (id || S.sheet.id) : id), kind = act === 'wa' ? v : 'dev', wc = wt && S.cli[wt.cliente_id], ph = wc ? waPhone(wc.telefono) : '';
        if (!ph) { toast('Esta clienta no tiene teléfono cargado'); break; }
        window.open('https://wa.me/' + ph + '?text=' + encodeURIComponent(waMsg(wt, kind)), '_blank', 'noopener');
        if (kind !== 'dev') { var up = {}; up[kind === 'rec' ? 'aviso_rec_en' : 'aviso_conf_en'] = new Date().toISOString(); if (kind === 'rec' && !wt.aviso_conf_en) up.aviso_conf_en = up.aviso_rec_en; await run(sb.from('turnos').update(up).eq('id', wt.id)); var keep = S.sheet; if (S.tab === 'inicio') await loadHome(); else await loadTur(); S.sheet = keep; toast('Marcado como avisado'); }
        break;
      }
      case 'dev-ok': {
        await run(sb.from('pagos').update({ estado: 'reintegrado' }).eq('turno_id', id).eq('estado', 'aprobado'));
        await run(sb.from('turnos').update({ devolucion: 'hecha' }).eq('id', id));
        if (S.tab === 'inicio') await loadHome(); else await loadTur(); toast('Devolución registrada'); break;
      }
      case 'm-add': {
        var n = S.mie.length;
        var nuevo = await run(sb.from('miembros').insert({ negocio_id: S.neg.id, sucursal_id: S.suc[0] ? S.suc[0].id : null, nombre: 'Nueva persona', color: (n % 3) + 1 }).select().single());
        if (S.srv.length) await run(sb.from('servicio_miembros').insert(S.srv.map(function (x) { return { negocio_id: S.neg.id, servicio_id: x.id, miembro_id: nuevo.id }; })));
        await setSched(nuevo.id, [1, 2, 3, 4, 5, 6], 540, 1140);
        await loadAll(S.neg.id); toast('Profesional agregado: cambiale el nombre'); break;
      }
      case 'm-f2-add': {
        var sa = sched(id), f1 = sa.franjas[0], ini = Math.max(f1[1] + 120, 960), fin = Math.min(ini + 240, 1410);
        if (f1[1] + 60 > 1380) { toast('No hay lugar para una segunda franja después de ' + hhm(f1[1])); break; }
        if (ini >= 1380) { ini = f1[1] + 60; fin = Math.min(ini + 120, 1410); }
        await setSched(id, sa.days.length ? sa.days : [1, 2, 3, 4, 5, 6], [f1, [ini, fin]]); break;
      }
      case 'm-f2-del': { var sd = sched(id); await setSched(id, sd.days, [sd.franjas[0]]); break; }
      case 'm-day': {
        var sc = sched(id), d = +v, days = sc.days.slice(), k = days.indexOf(d);
        if (k > -1) days.splice(k, 1); else days.push(d);
        await setSched(id, days, sc.franjas); break;
      }
      case 'm-calc': { var cn = +document.getElementById('calc-n-' + id).value, cs = S.srv.filter(function (x) { return x.id === document.getElementById('calc-s-' + id).value; })[0]; if (cs) { await run(sb.from('miembros').update({ monto_fijo: Math.round(cn * +cs.precio) }).eq('id', id)); await loadAll(S.neg.id); toast(cn + ' × ' + cs.nombre + ' = ' + money(cn * +cs.precio)); } break; }
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
        break;
      }
      case 'p-mid': S.pb.mid = v === 'any' ? 'any' : v; S.pb.min = null; break;
      case 'p-ds': S.pb.ds = v; S.pb.min = null; S.pb.loading = true; render(); await pubOccLoad(); S.pb.loading = false; break;
      case 'p-sug': { var pr2 = v.split('|'); S.pb.ds = pr2[0]; S.pb.min = +pr2[1]; S.pb.err = ''; break; }
      case 'p-min': S.pb.min = +v; S.pb.err = ''; break;
      case 'p-submit': {
        var b = S.pb, pn = $('#p-name').value.trim(), pt = $('#p-tel').value.trim(); b.name = pn; b.tel = pt;
        if (pn.length < 2) { b.err = 'Escribí tu nombre.'; break; }
        if (pt.replace(/\D/g, '').length < 8) { b.err = 'Escribí tu teléfono con característica (mínimo 8 números) para poder avisarte.'; break; }
        var slot = pubSlots(b.ds).filter(function (x) { return x.t === b.min; })[0];
        if (!slot) { b.err = 'Ese horario ya no está disponible. Elegí otro.'; b.min = null; break; }
        var mid2 = b.mid === 'any' ? slot.mid : b.mid, mem = S.P.equipo.filter(function (x) { return x.id === mid2; })[0];
        b.busy = true; b.err = ''; render();
        try {
          var res = await run(sb.rpc('reservar_turno', { p_slug: S.P.negocio.slug, p_sucursal: b.suc || (mem && mem.sucursal_id) || null, p_miembro: mid2, p_servicios: b.svcs, p_inicio: zonedToUtc(b.ds, b.min, S.P.negocio.zona_horaria).toISOString(), p_nombre: pn, p_telefono: pt || null }));
          b.token = res.token; history.replaceState(null, '', location.pathname + '?n=' + S.P.negocio.slug + '&t=' + res.token);
          await mineLoad(res.token); b.done = true; startPoll();
        } catch (er) { b.err = errMsg(er); if (er.code === '23P01') { b.min = null; b.busy = false; await pubOccLoad(); render(); return; } }
        b.busy = false; break;
      }
      case 'm-avisar': await run(sb.rpc('avisar_pago', { p_token: S.pb.token })); await mineLoad(S.pb.token); toast('Avisamos al local'); break;
      case 'm-refresh': await mineLoad(S.pb.token); break;
      case 'm-cancel': S.mineCancel = true; break;
      case 'm-cancel-no': S.mineCancel = false; break;
      case 'm-cancel-yes': await run(sb.rpc('cancelar_turno_publico', { p_token: S.pb.token })); S.mineCancel = false; await mineLoad(S.pb.token); toast('Turno cancelado'); break;
      case 'p-again': S.pb.svcs = []; S.pb.ds = null; S.pb.min = null; S.pb.done = null; S.pb.mid = 'any'; await pubOccLoad(); break;
    }
  } catch (er) { fail(er); S.authBusy = false; }
  render();
});

document.addEventListener('change', async function (e) {
  if (e.target.id === 'rg-files' && S.fx && S.fx.form) {
    var fl = Array.prototype.slice.call(e.target.files || []); fxSnap();
    try {
      for (var q = 0; q < fl.length && S.fx.form.files.length < 8; q++) { var bl = await resizeImg(fl[q], 1280, 'image/jpeg', 0.82); S.fx.form.files.push({ blob: bl, prev: URL.createObjectURL(bl) }); }
    } catch (er) { S.fx.form.err = errMsg(er); }
    render(); return;
  }
  if (e.target.id === 'p-tel' && S.pb && S.P) {
    var b0 = S.pb; b0.tel = e.target.value; b0.fid = null;
    if (S.P.negocio.fid_activa && b0.tel.replace(/\D/g, '').length >= 8) { try { b0.fid = await run(sb.rpc('fidelidad_preview', { p_slug: S.P.negocio.slug, p_telefono: b0.tel })); } catch (x) { } }
    var bx = document.getElementById('p-fid'); if (bx) bx.innerHTML = fidPreviewHtml(b0);
    return;
  }
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
    else if (k === 'm-mod') { await run(sb.from('miembros').update({ modalidad: v }).eq('id', id)); await loadAll(S.neg.id); }
    else if (k === 'm-monto') { var mv = Math.round(+String(v).replace(/[^0-9.]/g, '')) || 0; await run(sb.from('miembros').update({ monto_fijo: mv }).eq('id', id)); await loadAll(S.neg.id); }
    else if (k === 'm-per') { await run(sb.from('miembros').update({ periodo: v }).eq('id', id)); await loadAll(S.neg.id); }
    else if (k === 'm-comm') { await run(sb.from('miembros').update({ comision_pct: +v }).eq('id', id)); await loadAll(S.neg.id); }
    else if (k === 'm-from' || k === 'm-to') {
      var sc = sched(id), fi = +t.dataset.k || 0, fr = sc.franjas.map(function (x) { return x.slice(); });
      fr[fi][k === 'm-from' ? 0 : 1] = +v;
      if (fr[fi][1] <= fr[fi][0]) { toast('La hora de salida tiene que ser posterior a la de entrada'); render(); return; }
      if (fr[1] && fr[1][0] < fr[0][1]) { toast('La segunda franja tiene que empezar después de que termine la primera'); render(); return; }
      await setSched(id, sc.days, fr);
    }
    else if (k === 's-n') { var sn = v.trim(); if (!sn) { toast('El nombre no puede quedar vacío'); render(); return; } await run(sb.from('servicios').update({ nombre: sn }).eq('id', id)); await loadAll(S.neg.id); }
    else if (k === 's-min') { await run(sb.from('servicios').update({ duracion_min: +v }).eq('id', id)); await loadAll(S.neg.id); }
    else if (k === 's-price') { var pr = parseInt(String(v).replace(/\D/g, ''), 10); if (isNaN(pr)) { toast('Escribí el precio en números'); render(); return; } await run(sb.from('servicios').update({ precio: pr }).eq('id', id)); await loadAll(S.neg.id); }
    else if (k === 'ob-slug') {
      var sl = slugify(v); if (sl.length < 3) { toast('El link debe tener al menos 3 letras o números'); render(); return; }
      await run(sb.from('negocios').update({ slug: sl }).eq('id', S.neg.id)); await loadAll(S.neg.id);
    }
    else if (k === 'n-nombre') { var nm = v.trim(); if (nm.length < 2) { toast('El nombre es muy corto'); render(); return; } await run(sb.from('negocios').update({ nombre: nm }).eq('id', S.neg.id)); await loadAll(S.neg.id); }
    else if (k === 'n-alias') { var al = v.trim(); if (al && al.length < 3) { toast('El alias es muy corto'); render(); return; } await run(sb.from('negocios').update({ alias_pago: al || null }).eq('id', S.neg.id)); await loadAll(S.neg.id); }
    else if (k === 'n-hold') { await run(sb.from('negocios').update({ hold_min: +v }).eq('id', S.neg.id)); await loadAll(S.neg.id); }
    else if (k === 'n-cancel') { await run(sb.from('negocios').update({ cancel_horas: +v }).eq('id', S.neg.id)); await loadAll(S.neg.id); }
    else if (k === 'n-fidcada') { var fc = Math.round(+v); if (isNaN(fc) || fc < 2 || fc > 20) { toast('Tiene que ser entre 2 y 20 turnos'); render(); return; } await run(sb.from('negocios').update({ fid_cada: fc }).eq('id', S.neg.id)); await loadAll(S.neg.id); }
    else if (k === 'n-fidpct') { var fp2 = Math.round(+v); if (isNaN(fp2) || fp2 < 1 || fp2 > 100) { toast('El descuento tiene que ser entre 1 y 100%'); render(); return; } await run(sb.from('negocios').update({ fid_pct: fp2 }).eq('id', S.neg.id)); await loadAll(S.neg.id); }
    else if (k === 'c-alert') { await run(sb.from('clientes').update({ alertas: String(v).trim().slice(0, 600) || null }).eq('id', id)); if (S.cli && S.cli[id]) S.cli[id].alertas = String(v).trim() || null; if (S.fx && S.fx.c) S.fx.c.alertas = String(v).trim() || null; toast('Guardado'); return; }
    else if (k === 'c-dni') { await run(sb.from('clientes').update({ dni: String(v).replace(/[^0-9.]/g, '').slice(0, 15) || null }).eq('id', id)); toast('DNI guardado'); return; }
    else if (k === 'n-sena') { var sp = Math.round(+String(v).replace(',', '.')); if (isNaN(sp) || sp < 0 || sp > 100) { toast('La seña tiene que ser entre 0 y 100%'); render(); return; } await run(sb.from('negocios').update({ sena_pct: sp }).eq('id', S.neg.id)); await loadAll(S.neg.id); }
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
document.addEventListener('input', function (e) { var t = e.target; if (S.pb && t && (t.id === 'p-name' || t.id === 'p-tel')) S.pb[t.id === 'p-name' ? 'name' : 'tel'] = t.value; });
try { if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) { navigator.serviceWorker.register('sw.js').catch(function () { }); navigator.serviceWorker.addEventListener('message', function (e) { if (e.data && e.data.abrir) openTurno(e.data.abrir); }); } } catch (e) { }
boot();
})();

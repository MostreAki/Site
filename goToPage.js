// goToPage.js – navegação do CrieAki para o catálogo/notícias com o tema escolhido // Este arquivo é carregado em crieaki.html após o <script type="module">. // Ele lê as variáveis globais definidas lá (window.bgColor, window.textColor, etc.), // persiste no localStorage e navega para a página escolhida com querystring opcional.

(function(){ function saveThemeToLS(){ const keys = ['bgColor','textColor','btnColor','headerColor','footerColor','containerColor']; keys.forEach(k => { const v = window[k]; if (typeof v === 'string' && v.trim()) { try{ localStorage.setItem(k, v); }catch(e){} } }); }

function themeQuery(){ const enc = v => encodeURIComponent((v||'').replace(/^#/, '')); // tira # e encode const q = new URLSearchParams(); if (window.bgColor)        q.set('bg',   '#' + enc(window.bgColor).replace(/%23/g,'')); if (window.textColor)      q.set('text', '#' + enc(window.textColor).replace(/%23/g,'')); if (window.btnColor)       q.set('btn',  '#' + enc(window.btnColor).replace(/%23/g,'')); if (window.headerColor)    q.set('head', '#' + enc(window.headerColor).replace(/%23/g,'')); if (window.footerColor)    q.set('foot', '#' + enc(window.footerColor).replace(/%23/g,'')); if (window.containerColor) q.set('box',  '#' + enc(window.containerColor).replace(/%23/g,'')); return q.toString(); }

// Alvo padrão: catálogo. Ajuste estes caminhos conforme seus arquivos reais: const ROUTES = { catalogo: 'Catalogo_Digital_MostreAki.html', // ou 'catalogo.html' noticias: 'noticias.html' };

window.goToPage = function(){ // Garante que uma opção foi escolhida; default para catálogo. const page = (window.selectedPage === 'noticias') ? 'noticias' : 'catalogo';

// Se o usuário estiver logado, você pode opcionalmente personalizar a URL com slug
// Ex.: `/${window.userName}/catalogo.html` – depende da sua infra/hosting.

// Persiste tema
saveThemeToLS();

// Monta URL destino com tema na query (também funciona sem, pois o catálogo lê LS)
const base = ROUTES[page];
const qs   = themeQuery();
const url  = qs ? `${base}?${qs}` : base;

// Vai!
location.href = url;

} })();


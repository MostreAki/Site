/* goToPage.js – MostreAki */
(function () {
  const val = (v, fb) => (v == null || v === "") ? fb : v;
  const both = (a,b,v)=>{ try{ localStorage.setItem(a,v); localStorage.setItem(b,v);}catch{} };

  function readTheme() {
    return {
      bg:   val(window.bgColor,        localStorage.getItem('bgColor') || '#0b0c10'),
      text: val(window.textColor,      localStorage.getItem('textColor') || '#eaf0f6'),
      btn:  val(window.btnColor,       localStorage.getItem('btnColor')  || '#26c281'),
      head: val(window.headerColor,    localStorage.getItem('headerColor') || '#111318'),
      foot: val(window.footerColor,    localStorage.getItem('footerColor') || '#111318'),
      box:  val(window.containerColor, localStorage.getItem('containerColor') || '#111318'),
    };
  }

  function persistTheme(t){
    both('bg','bgColor', t.bg);
    both('text','textColor', t.text);
    both('btn','btnColor', t.btn);
    both('head','headerColor', t.head);
    both('foot','footerColor', t.foot);
    both('box','containerColor', t.box);
  }

  function buildUrl(){
    const q = new URLSearchParams();
    const t = readTheme();
    persistTheme(t);

    q.set('bg', t.bg); q.set('text', t.text); q.set('btn', t.btn);
    q.set('head', t.head); q.set('foot', t.foot); q.set('box', t.box);

    const uid = window.userUid || localStorage.getItem('userUid');
    const store = window.userName || localStorage.getItem('userName');
    if (uid) q.set('uid', uid);
    if (store) q.set('store', store);
    q.set('v', Date.now()); // quebra cache

    return `catalogo-template.html?${q.toString()}`;
  }

  window.goToPage = function(){ window.location.href = buildUrl(); };
})();

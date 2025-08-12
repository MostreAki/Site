// goToPage_preview.js – MostreAki (teste com template)
// Redireciona para catalogo-template.html passando tema + uid + name
// Mantém também no localStorage para fallback.

window.goToPage = async () => {
  const { selectedPage, userName, userUid } = window;
  if (!selectedPage || !userName || !userUid) {
    alert('Você precisa estar logado e escolher uma opção antes de avançar.');
    return;
  }

  const theme = {
    bgColor: window.bgColor,
    textColor: window.textColor,
    btnColor: window.btnColor,
    headerColor: window.headerColor,
    footerColor: window.footerColor,
    containerColor: window.containerColor,
  };
  Object.entries(theme).forEach(([k, v]) => {
    if (typeof v === 'string' && v.trim()) {
      try { localStorage.setItem(k, v); } catch (e) {}
    }
  });
  try { localStorage.setItem('userName', userName); localStorage.setItem('userUid', userUid); } catch(e){}

  const withHash = (c) => (c?.startsWith('#') ? c : ('#' + (c || '')));
  const qs = new URLSearchParams({
    name: userName,
    uid: userUid,
  });
  if (theme.bgColor)        qs.set('bg',   withHash(theme.bgColor));
  if (theme.textColor)      qs.set('text', withHash(theme.textColor));
  if (theme.btnColor)       qs.set('btn',  withHash(theme.btnColor));
  if (theme.headerColor)    qs.set('head', withHash(theme.headerColor));
  if (theme.footerColor)    qs.set('foot', withHash(theme.footerColor));
  if (theme.containerColor) qs.set('box',  withHash(theme.containerColor));

  const route = (selectedPage === 'noticias') ? '/noticias-template.html' : '/catalogo-template.html';
  location.href = `${route}?${qs.toString()}`;
};

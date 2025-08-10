window.goToPage = () => {
  if (!selectedPage || !window.userName || !window.userUid) {
    alert('Você precisa estar logado e escolher uma opção antes de avançar.');
    return;
  }

  // Salva as cores escolhidas no localStorage
  const save = (k, v) => localStorage.setItem(k, v);
  save('bgColor', bgColor);
  save('btnColor', btnColor);
  save('textColor', textColor);
  save('headerColor', headerColor);
  save('footerColor', footerColor);
  save('containerColor', containerColor);

  // Redireciona de acordo com a página
  if (selectedPage === 'catalogo') {
    window.location.href = `/catalogo.html#uid=${window.userUid}&name=${window.userName}`;
  } else {
    window.location.href = `/noticias.html#uid=${window.userUid}&name=${window.userName}`;
  }
};
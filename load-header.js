// load-header.js
fetch("/header.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("header-container").innerHTML = data;

    // Ativa o menu hamburguer
    window.toggleMenu = function () {
      const menu = document.getElementById("menu");
      menu.style.display = menu.style.display === "block" ? "none" : "block";
    };

    // Função do botão Entrar
    window.handleAuthAction = function () {
      const modal = document.getElementById("modalLogin");
      if (modal) modal.style.display = "block";
    };
  });
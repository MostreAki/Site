
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
  import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

  const app = initializeApp({
    apiKey: "AIzaSyBrKUtwP4T77oXE22cjOFVhfEUiJ7yctIE",
    authDomain: "mostreaki-2025.firebaseapp.com",
    projectId: "mostreaki-2025",
    storageBucket: "mostreaki-2025.appspot.com",
    messagingSenderId: "748712068097",
    appId: "1:748712068097:web:09cf043fbb45917ef6ec00"
  });

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const authText = document.getElementById("authText");
  const userCircle = document.getElementById("userCircle");

  function exibirMensagem(texto, erro = false) {
    const m = document.getElementById("mensagem");
    m.textContent = texto;
    m.className = erro ? "mensagem erro" : "mensagem";
    m.style.display = "block";
    setTimeout(() => m.style.display = "none", 3000);
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      authText.textContent = "Sair";
      authText.style.display = "inline";
      authText.onclick = () => {
        signOut(auth).then(() => {
          localStorage.removeItem("fotoPerfil");
          location.reload();
        });
      };
      if (user.photoURL) {
        userCircle.style.backgroundImage = `url('${user.photoURL}')`;
        localStorage.setItem("fotoPerfil", user.photoURL);
        userCircle.textContent = "";
      } else {
        userCircle.textContent = user.email.charAt(0).toUpperCase();
      }
      userCircle.style.display = "flex";
    } else {
      authText.textContent = "Entrar";
      authText.style.display = "inline";
      authText.onclick = abrirModal;
      userCircle.style.display = "none";
    }
  });

  window.toggleMenu = () => {
    const m = document.getElementById("menu");
    m.style.display = m.style.display === "flex" ? "none" : "flex";
  }

  window.abrirModal = () => document.getElementById("modalLogin").style.display = "flex";
  window.fecharModal = () => document.getElementById("modalLogin").style.display = "none";
  window.toggleSenha = () => {
    const input = document.getElementById("senha");
    input.type = input.type === "password" ? "text" : "password";
  }

  window.entrarEmail = () => {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    signInWithEmailAndPassword(auth, email, senha)
      .then(() => {
        exibirMensagem("Você logou com sucesso!");
        fecharModal();
      })
      .catch(() => exibirMensagem("Erro ao entrar. Verifique os dados.", true));
  }

  window.entrarGoogle = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        if (result.user.photoURL) {
          localStorage.setItem("fotoPerfil", result.user.photoURL);
        }
        exibirMensagem("Login com Google realizado!");
        fecharModal();
      })
      .catch(() => exibirMensagem("Erro ao entrar com Google.", true));
  }

  window.redefinirSenha = () => {
    const email = document.getElementById("email").value;
    if (!email) return exibirMensagem("Digite o e-mail para redefinir.", true);
    sendPasswordResetEmail(auth, email)
      .then(() => exibirMensagem("Email de recuperação enviado!"))
      .catch(() => exibirMensagem("Erro ao enviar redefinição.", true));
  }

  window.cadastrarUsuario = () => {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    createUserWithEmailAndPassword(auth, email, senha)
      .then(() => {
        exibirMensagem("Cadastro realizado com sucesso!");
        fecharModal();
      })
      .catch(() => exibirMensagem("Erro ao cadastrar. Tente outro e-mail.", true));
  }

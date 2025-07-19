import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "SUA_API",
  authDomain: "SEU_DOMINIO.firebaseapp.com",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_BUCKET",
  messagingSenderId: "SEU_ID",
  appId: "SEU_APP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Aguarda até que o botão esteja no DOM (por conta do load-header.js)
const observer = new MutationObserver(() => {
  const btn = document.getElementById("loginBtn");
  const foto = document.getElementById("fotoPerfil");
  const texto = document.getElementById("textoPerfil");

  if (btn && foto && texto) {
    // Já existe no DOM, pode parar de observar
    observer.disconnect();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Se tiver foto
        if (user.photoURL) {
          foto.src = user.photoURL;
          foto.style.display = "inline-block";
          texto.style.display = "none";
        } else {
          // Mostra só a primeira letra do nome
          texto.textContent = user.displayName ? user.displayName[0] : "U";
          texto.style.display = "inline-block";
          foto.style.display = "none";
        }

        btn.onclick = () => signOut(auth);
        btn.title = "Sair";
      } else {
        // Usuário deslogado
        texto.textContent = "Entrar";
        texto.style.display = "inline-block";
        foto.style.display = "none";
        btn.onclick = () => document.getElementById("modalLogin").style.display = "block";
        btn.title = "Entrar";
      }
    });
  }
});

// Inicia o observador
observer.observe(document.body, { childList: true, subtree: true });

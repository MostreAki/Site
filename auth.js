// auth.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

const firebaseConfig = {
  apiKey: "AIzaSyBrKUtwP4T77oXE22cjOFVhfEUiJ7yctIE",
  authDomain: "mostreaki-2025.firebaseapp.com",
  projectId: "mostreaki-2025",
  storageBucket: "mostreaki-2025.appspot.com",
  messagingSenderId: "748712068097",
  appId: "1:748712068097:web:09cf043fbb45917ef6ec00"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.handleAuthAction = function () {
  const action = document.getElementById("authText")?.textContent;
  if (action === "Entrar") {
    document.getElementById("loginModal").style.display = "flex";
  } else {
    signOut(auth).then(() => {
      localStorage.removeItem("fotoPerfil");
      location.reload();
    });
  }
};

onAuthStateChanged(auth, (user) => {
  const userCircle = document.getElementById("userCircle");
  const authText = document.getElementById("authText");

  if (!userCircle || !authText) return;

  if (user) {
    const foto = localStorage.getItem("fotoPerfil") || user.photoURL;

    if (foto) {
      userCircle.innerHTML = `<img src="${foto}" alt="Foto de Perfil" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">`;
      localStorage.setItem("fotoPerfil", foto);
    } else {
      const nome = user.displayName || user.email;
      const iniciais = nome.trim().charAt(0).toUpperCase();
      userCircle.textContent = iniciais;
      userCircle.style.backgroundImage = "";
    }

    userCircle.style.display = "flex";
    authText.textContent = "Sair";
    authText.style.display = "inline";
  } else {
    userCircle.innerHTML = "";
    userCircle.style.display = "none";
    authText.textContent = "Entrar";
    authText.style.display = "inline";
  }
});

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import {
  getDatabase,
  ref,
  set,
  get,
  child
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js';

const firebaseConfig = {
  apiKey: "AIzaSyBrKUtwP4T77oXE22cjOFVhfEUiJ7yctIE",
  authDomain: "mostreaki-2025.firebaseapp.com",
  projectId: "mostreaki-2025",
  storageBucket: "mostreaki-2025.appspot.com",
  messagingSenderId: "748712068097",
  appId: "1:748712068097:web:09cf043fbb45917ef6ec00",
  databaseURL: "https://mostreaki-2025-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

window.handleAuthAction = function () {
  const action = document.getElementById("authText").textContent;
  if (action === "Entrar") {
    document.getElementById("loginModal").style.display = "flex";
  } else {
    signOut(auth).then(() => {
      localStorage.clear();
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
      userCircle.style.backgroundImage = `url('${foto}')`;
      userCircle.textContent = "";
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

    // Se estiver na página de conta, carrega os dados
    if (window.location.pathname.includes("minhaconta")) {
      carregarDadosUsuario(user.uid);
    }
  } else {
    userCircle.style.display = "none";
    authText.textContent = "Entrar";
    authText.style.display = "inline";
  }
});

// 🟢 Salvar dados sociais no Firebase
window.salvarDados = function () {
  const user = auth.currentUser;
  if (!user) return;

  const dados = {
    instagram: document.getElementById("instagram").value,
    facebook: document.getElementById("facebook").value,
    whatsapp: document.getElementById("whatsapp").value,
    youtube: document.getElementById("youtube").value,
  };

  set(ref(db, 'usuarios/' + user.uid), dados)
    .then(() => {
      alert("Dados salvos com sucesso no Firebase! 💾");
    })
    .catch((error) => {
      alert("Erro ao salvar: " + error.message);
    });
};

// 🟢 Carregar dados salvos
function carregarDadosUsuario(uid) {
  get(child(ref(db), `usuarios/${uid}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const dados = snapshot.val();
      document.getElementById("instagram").value = dados.instagram || "";
      document.getElementById("facebook").value = dados.facebook || "";
      document.getElementById("whatsapp").value = dados.whatsapp || "";
      document.getElementById("youtube").value = dados.youtube || "";
    }
  });
}

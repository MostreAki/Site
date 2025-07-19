// verifica-login.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Configuração Firebase (a mesma usada no projeto)
const firebaseConfig = {
  apiKey: "AIzaSyBrKUtwP4T77oXE22cjOFVhfEUiJ7yctIE",
  authDomain: "mostreaki-2025.firebaseapp.com",
  projectId: "mostreaki-2025",
  storageBucket: "mostreaki-2025.appspot.com",
  messagingSenderId: "748712068097",
  appId: "1:748712068097:web:09cf043fbb45917ef6ec00"
};

// Inicializa o Firebase
initializeApp(firebaseConfig);
const auth = getAuth();

const emailsPermitidos = [
  "mostreaki@mostreaki.com.br",
  "clientevip@gmail.com",
  "exemplo@assinante.com"
];

// Verifica se o usuário está logado
onAuthStateChanged(auth, (user) => {
  if (!user || !emailsPermitidos.includes(user.email)) {
    alert("⚠️ Acesso restrito. Apenas assinantes podem acessar.");
    window.location.href = "/index.html?login=obrigatorio";
  }
});

// seguranca.js (NA RAIZ DO PROJETO)
import { initializeApp, getApps } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

// CONFIG DO SEU PROJETO (MESMA DO cadastro.html)
const cfg = {
  apiKey: "AIzaSyBrKUtwP4T77oXE22cjOFVhfEUiJ7yctIE",
  authDomain: "mostreaki-2025.firebaseapp.com",
  projectId: "mostreaki-2025",
  storageBucket: "mostreaki-2025.firebasestorage.app",
  messagingSenderId: "748712068097",
  appId: "1:748712068097:web:09cf043fbb45917ef6ec00"
};

// Inicializa o Firebase (só uma vez)
const app = getApps().length ? getApps()[0] : initializeApp(cfg);
const auth = getAuth(app);
const db = getFirestore(app);

// PÁGINAS PROTEGIDAS (adicione mais se quiser)
const PAGINAS_PROTEGIDAS = ['/planos.html'];

// BLOQUEIO
onAuthStateChanged(auth, async (user) => {
  if (!user) return;

  const snap = await getDoc(doc(db, 'usuarios', user.uid));
  const data = snap.data();

  if (!data?.cadastroCompleto && PAGINAS_PROTEGIDAS.includes(location.pathname)) {
    location.href = '/cadastro.html';
  }
});

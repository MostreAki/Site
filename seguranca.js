// seguranca.js
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const auth = getAuth();
const db = getFirestore();

// SÓ EM PÁGINAS PROTEGIDAS
const PAGINAS_PROTEGIDAS = ['/planos.html', '/minha-conta.html'];

onAuthStateChanged(auth, async (user) => {
  if (!user) return;

  const snap = await getDoc(doc(db, 'usuarios', user.uid));
  const data = snap.data();

  if (!data?.cadastroCompleto && PAGINAS_PROTEGIDAS.includes(location.pathname)) {
    location.href = '/cadastro.html';
  }
});
// seguranca.js
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const auth = getAuth();
const db = getFirestore();

// PÁGINAS QUE EXIGEM CADASTRO COMPLETO
const PAGINAS_PROTEGIDAS = [
  '/planos.html',
  '/minha-conta.html',
  '/catalogo.html',
  '/configuracoes.html',
  '/dashboard.html'
];

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    if (!['/login.html', '/cadastro.html', '/index.html'].includes(location.pathname)) {
      location.href = '/login.html';
    }
    return;
  }

  const snap = await getDoc(doc(db, 'usuarios', user.uid));
  const data = snap.data();

  if (!data?.cadastroCompleto) {
    if (location.pathname !== '/cadastro.html') {
      location.href = '/cadastro.html';
    }
  }
});

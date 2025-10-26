<!-- BLOQUEIO DE ACESSO SEM CADASTRO COMPLETO -->
<script type="module">
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const auth = getAuth();
const db = getFirestore();

// Lista de páginas que SÓ podem ser acessadas com cadastro completo
const paginasProtegidas = [
  '/planos.html',
  '/minha-conta.html',
  '/catalogo.html',
  '/configuracoes.html'
];

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    // Se não está logado → vai pro login
    if (location.pathname !== '/login.html' && location.pathname !== '/cadastro.html') {
      location.href = '/login.html';
    }
    return;
  }

  // Verifica se cadastro está completo
  const snap = await getDoc(doc(db, 'usuarios', user.uid));
  const data = snap.data();

  if (!data?.cadastroCompleto) {
    // SE NÃO COMPLETOU → REDIRECIONA FORÇADO
    if (location.pathname !== '/cadastro.html') {
      location.href = '/cadastro.html';
    }
  } else {
    // SE COMPLETOU → LIBERA TUDO
    if (paginasProtegidas.includes(location.pathname)) {
      // Tudo ok, pode ficar
    }
  }
});
</script>
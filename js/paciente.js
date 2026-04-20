const user = JSON.parse(localStorage.getItem("usuario_logado"));

if (!user || user.role !== "paciente") {
    window.location.href = "index.html";
}

function logout() {
    // limpa sessão
    localStorage.removeItem("usuario_logado");
    localStorage.removeItem("login_time");

    // redireciona para login
    window.location.href = "index.html";
}

<script>
  if ('serviceWorker' in navigator) {
    // O escopo garante que o SW não toque na index.html da raiz
    navigator.serviceWorker.register('/templates/sw.js', { scope: '/templates/' })
      .then(reg => console.log('PWA ativo apenas em /templates/'))
      .catch(err => console.error('Erro de registro:', err));
  }
</script>

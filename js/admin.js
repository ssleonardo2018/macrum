// FUNÇÃO PARA ALTERNAR ENTRE SEÇÕES
function alternarSecao(secaoId) {
    // Esconde todas as seções
    const secoes = document.querySelectorAll('.content-section');
    secoes.forEach(s => s.style.display = 'none');

    // Mostra a secao clicada
    const target = document.getElementById('section-' + secaoId);
    if (target) {
        target.style.display = 'block';
    }

    // Atualiza o título no Header
    const titulos = {
        'dashboard': 'Painel Admin',
        'usuarios': 'Gestão de Pacientes',
        'unidades': 'Unidades',
        'estoque': 'Estoque de Suplementos',
        'relatorios': 'Relatórios'
    };
    document.getElementById('page-title').innerText = titulos[secaoId] || 'Macrum Admin';

    // Atualiza visual do Menu Ativo
    document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));
    const menuAtivo = document.getElementById('btn-' + secaoId);
    if (menuAtivo) menuAtivo.classList.add('active');
}

// LÓGICA DE LOGOUT
function logout() {
    if(confirm("Deseja sair do painel administrativo?")) {
        window.location.href = "index.html";
    }
}

// FUNÇÕES DO MODAL (Exemplos simples)
function abrirModalUsuario() {
    document.getElementById('modal-container').style.display = 'flex';
}

function fecharModal() {
    document.getElementById('modal-container').style.display = 'none';
}

// FECHAR MODAL CLICANDO FORA
window.onclick = function(event) {
    const modal = document.getElementById('modal-container');
    if (event.target == modal) fecharModal();
}
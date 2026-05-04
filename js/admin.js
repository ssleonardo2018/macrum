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

const usuarios = [
    { nome: "João Silva", email: "joao@email.com", perfil: "Paciente" },
    { nome: "Maria Souza", email: "maria@email.com", perfil: "Paciente" },
    { nome: "Carlos Lima", email: "carlos@email.com", perfil: "Nutricionista" }
];

function renderizarUsuarios() {
    const tbody = document.getElementById("lista-usuarios");

    // limpa antes de renderizar
    tbody.innerHTML = "";

    usuarios.forEach((usuario, index) => {
        const linha = `
            <tr>
                <td>${usuario.nome}</td>
                <td>${usuario.email}</td>
                <td>${usuario.perfil}</td>
                <td>
                    <button onclick="editarUsuario(${index})">✏️</button>
                    <button onclick="excluirUsuario(${index})">🗑️</button>
                </td>
            </tr>
        `;

        tbody.innerHTML += linha;
    });
}

function excluirUsuario(index) {
    usuarios.splice(index, 1);
    renderizarUsuarios();
}

function editarUsuario(index) {
    const usuario = usuarios[index];
    alert("Editar: " + usuario.nome);
}

document.addEventListener("DOMContentLoaded", () => {
    renderizarUsuarios();
});

document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', function () {
        document.querySelectorAll('.mobile-nav a')
            .forEach(l => l.classList.remove('active'));

        this.classList.add('active');
    });
});
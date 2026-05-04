document.addEventListener('DOMContentLoaded', () => {
    // Botões do Menu
    const botoes = {
        inicio: document.getElementById('btn-inicio'),
        plano: document.getElementById('btn-plano'),
        evolucao: document.getElementById('btn-evolucao'),
        chat: document.getElementById('btn-chat'),
        sair: document.getElementById('btn-sair')
    };

    // Divs de Seção
    const secoes = {
        inicio: document.getElementById('section-inicio'),
        plano: document.getElementById('section-plano'),
        evolucao: document.getElementById('section-evolucao'),
        chat: document.getElementById('section-chat')
    };

    function mudarTela(id) {
        // Esconde tudo
        Object.values(secoes).forEach(s => s.style.display = 'none');
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

        // Mostra a correta
        if(id === 'chat') {
            secoes[id].style.display = 'flex';
        } else {
            secoes[id].style.display = 'block';
        }
        
        // Ativa o botão
        botoes[id].classList.add('active');
    }

    // Listeners
    botoes.inicio.addEventListener('click', () => mudarTela('inicio'));
    botoes.plano.addEventListener('click', () => mudarTela('plano'));
    botoes.evolucao.addEventListener('click', () => mudarTela('evolucao'));
    botoes.chat.addEventListener('click', () => mudarTela('chat'));

    // Botão Sair
    botoes.sair.addEventListener('click', () => {
        if(confirm("Deseja realmente sair?")) {
            window.location.href = "index.html";
        }
    });
});
const user = JSON.parse(localStorage.getItem("usuario_logado"));

if (!user || user.role !== "admin") {
    window.location.href = "login.html";;
}

function logout() {
    // limpa sessão
    localStorage.removeItem("usuario_logado");
    localStorage.removeItem("login_time");

    // redireciona para login
    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
    carregarDashboard();
});

function carregarDashboard() {

    const dados = API_DADOS.dashboard;

    // Atualiza cards
    document.querySelectorAll(".stat-card h3")[0].innerText = dados.totalPacientes.toLocaleString();
    document.querySelectorAll(".stat-card h3")[1].innerText = dados.atendimentosHoje;
    document.querySelectorAll(".stat-card h3")[2].innerText = dados.alertasEstoque;

    // Atendimentos mensais (simples lista)
    const mensalDiv = document.querySelector("#chartMensal").parentElement;
    mensalDiv.innerHTML += gerarListaMensal();

    // Distribuição
    const distribuicaoDiv = document.querySelector("#chartPizza").parentElement;
    distribuicaoDiv.innerHTML += gerarDistribuicao();

    // Estoque
    const estoqueDiv = document.querySelector("#chartBarras").parentElement;
    estoqueDiv.innerHTML += gerarEstoque();
}

function gerarListaMensal() {
    const meses = API_DADOS.atendimentosMensais;

    let html = "<ul>";

    meses.forEach((valor, i) => {
        html += `<li>Mês ${i + 1}: ${valor} atendimentos</li>`;
    });

    html += "</ul>";
    return html;
}

function gerarDistribuicao() {
    const d = API_DADOS.distribuicaoModulo;

    return `
        <ul>
            <li>Consultas: ${d.consultas}%</li>
            <li>Dietas: ${d.dietas}%</li>
            <li>Exames: ${d.exames}%</li>
            <li>Outros: ${d.outros}%</li>
        </ul>
    `;
}

function gerarEstoque() {
    const lista = API_DADOS.estoque;

    let html = "<ul>";

    lista.forEach(item => {
        html += `<li>${item.nome}: ${item.quantidade} unidades</li>`;
    });

    html += "</ul>";
    return html;
}

document.addEventListener("DOMContentLoaded", () => {
    carregarDashboard();
    gerarGraficos();
});

function carregarDashboard() {
    const dados = API_DADOS.dashboard;

    const cards = document.querySelectorAll(".stat-card h3");

    animarNumero(cards[0], dados.totalPacientes);
    animarNumero(cards[1], dados.atendimentosHoje);
    animarNumero(cards[2], dados.alertasEstoque);
    }

    setInterval(() => {
  /*  atualizarDados(); */
}, 5000);

// 📊 GRÁFICOS
function gerarGraficos() {

    // 📈 Linha (Mensal)
    new Chart(document.getElementById("chartMensal"), {
        type: "line",
        data: {
            labels: ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],
            datasets: [{
                label: "Atendimentos",
                data: API_DADOS.atendimentosMensais,
                borderWidth: 2
            }]
        }
    });

    // 🍕 Pizza
    new Chart(document.getElementById("chartPizza"), {
        type: "pie",
        data: {
            labels: ["Consultas", "Dietas", "Exames", "Outros"],
            datasets: [{
                data: Object.values(API_DADOS.distribuicaoModulo)
            }]
        }
    });

    // 📊 Barras
    new Chart(document.getElementById("chartBarras"), {
        type: "bar",
        data: {
            labels: API_DADOS.estoque.map(i => i.nome),
            datasets: [{
                label: "Quantidade",
                data: API_DADOS.estoque.map(i => i.quantidade)
            }]
        }
    });
}

function animarNumero(elemento, valorFinal) {
    let atual = 0;
    const incremento = valorFinal / 50;

    const intervalo = setInterval(() => {
        atual += incremento;

        if (atual >= valorFinal) {
            elemento.innerText = valorFinal.toLocaleString();
            clearInterval(intervalo);
        } else {
            elemento.innerText = Math.floor(atual).toLocaleString();
        }
    }, 20);
}


// ALTERA O ACTIVE DO NEMU ENTRE AS OPÇÕES QUE FOREM CLICADAS
document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleciona todos os links ou botões do menu
    const menuItems = document.querySelectorAll('.menu-item'); // Use a classe comum a todos eles

    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            
            // 2. Remove a classe 'active' de todos os itens de uma vez
            menuItems.forEach(btn => btn.classList.remove('active'));

            // 3. Adiciona a classe 'active' apenas ao botão que foi clicado
            this.classList.add('active');
            
            // Dica: Se quiser integrar com a lógica anterior de ocultar painéis:
            // gerenciarSecoes(this.id); 
        });
    });
});








// EXIBE O CONTEUDO DO BOTÃO VISÃO GERAL(HOME) NO MENU

document.addEventListener('DOMContentLoaded', () => {
    // 1. Selecionar os elementos necessários
    const home = document.getElementById('home')
    // Nota: Ajuste o seletor acima para o ID ou classe real do seu botão de usuários
    const painelGeral = document.querySelector('.section-dashboard'); // Altere para a classe do seu container principal
    const sectionUsuarios = document.getElementById('section-usuarios');


    const HomeDesktop = document.getElementById('home'); // ID do menu lateral
    const homeMobile = document.getElementById('homeMobile'); // ADICIONE ESTE ID NO SEU HTML MOBILE


    // 2. Adicionar o evento de clique
    home.addEventListener('click', (e) => {
        e.preventDefault(); // Evita o recarregamento da página se for um link

        // 3. Lógica de ocultar/exibir
        if (sectionUsuarios) sectionUsuarios.style.display = 'none';
        
        if (painelGeral) {
            painelGeral.style.display = 'block';
            painelGeral.classList.add('active'); // Opcional para animações CSS
        }


    });
});






//O script vai escutar o clique para mudar o display de none para block.
const btnAbrir = document.getElementById('btn-abrir');
const btnFechar = document.getElementById('btn-fechar');
const modal = document.getElementById('modal-container');

// Abrir o modal
btnAbrir.onclick = function() {
    modal.style.display = "block";
}

// Fechar o modal ao clicar no X
btnFechar.onclick = function() {
    modal.style.display = "none";
}

// Fechar o modal se o usuário clicar fora da caixa branca (no fundo escuro)
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}







// 1. Função genérica para trocar de seção
function navegarPara(idSecao) {
    const painelGeral = document.querySelector('.section-dashboard');
   
    const secaoAlvo = document.getElementById(idSecao);

    // Esconde o Dashboard principal
    if (painelGeral) painelGeral.style.display = 'none';


    // Exibe a seção desejada
    if (secaoAlvo) {
        secaoAlvo.style.display = 'block';
        secaoAlvo.classList.add('active');
    }
}

// 2. Inicialização dos eventos (Mobile e Desktop)
document.addEventListener('DOMContentLoaded', () => {
    // Selecionamos todos os botões que devem abrir a seção de usuários
    // Use uma classe comum neles ou selecione pelos IDs
    const btnUsuarioDesktop = document.getElementById('btnUsuarios'); // ID do menu lateral
    const btnUsuarioMobile = document.getElementById('btnUsuariosMobile'); // ADICIONE ESTE ID NO SEU HTML MOBILE

    // Evento para o botão Desktop
    if (btnUsuarioDesktop) {
        btnUsuarioDesktop.addEventListener('click', (e) => {
            e.preventDefault();
            navegarPara('section-usuarios');
        });
    }

    // Evento para o botão Mobile
    if (btnUsuarioMobile) {
        btnUsuarioMobile.addEventListener('click', (e) => {
            e.preventDefault();
            navegarPara('section-usuarios');
        });
    }
});





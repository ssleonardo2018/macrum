const API_DADOS = (() => {

    return {

        dashboard: {
            totalPacientes: 12540,
            atendimentosHoje: 145,
            alertasEstoque: 3
        },

        atendimentosMensais: [120, 150, 180, 200, 170, 220, 250, 300, 280, 260, 310, 330],

        distribuicaoModulo: {
            consultas: 40,
            dietas: 25,
            exames: 20,
            outros: 15
        },

        estoque: [
            { nome: "Whey Protein", quantidade: 50 },
            { nome: "Creatina", quantidade: 30 },
            { nome: "BCAA", quantidade: 20 },
            { nome: "Vitaminas", quantidade: 15 }
        ]

    };

})();
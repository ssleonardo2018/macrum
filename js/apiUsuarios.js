const API = (() => {

    const usuarios = [
        { nome: "Admin", email: "admin@macrum.com", senha: "123", role: "admin" },
        { nome: "João", email: "paciente@mail.com", senha: "123", role: "paciente" },
        { nome: "Maria", email: "nutri@mail.com", senha: "123", role: "nutricionista" }
    ];

    return {
        login(email, senha) {
            return usuarios.find(
                user => user.email === email && user.senha === senha
            );
        }
    };

})();
document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("loginForm");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const senha = document.getElementById("password").value.trim();

        // validação básica
        if (!email || !senha) {
            alert("Preencha todos os campos");
            return;
        }

        // verifica usuário
        const user = API.login(email, senha);

        if (!user) {
            alert("E-mail ou senha inválidos");
            return;
        }

        // salva usuário logado
        localStorage.setItem("usuario_logado", JSON.stringify(user));

        // redireciona
        redirecionar(user.role);
    });

});

function redirecionar(role) {

    if (role === "admin") {
        window.location.href = "./admin.html";

    } else if (role === "nutricionista") {
        window.location.href = "./nutricionista.html";

    } else {
        window.location.href = "./paciente.html";
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const googleBtn = document.getElementById("googleLoginBtn"); // Certifique-se de ter este ID no seu botão do Google no HTML

    // 1. LOGIN TRADICIONAL (E-mail e Senha)
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const senha = document.getElementById("password").value.trim();

        if (!email || !senha) {
            alert("Preencha todos os campos");
            return;
        }

        const user = API.login(email, senha);

        if (!user) {
            alert("E-mail ou senha inválidos");
            return;
        }

        localStorage.setItem("usuario_logado", JSON.stringify(user));
        redirecionar(user.role);
    });

    // 2. LOGIN COM GOOGLE
    if (googleBtn) {
        googleBtn.addEventListener("click", async () => {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: 'https://github.io'
                }
            });

            if (error) {
                alert("Erro ao conectar com o Google: " + error.message);
            }
            // O redirecionamento para o Google acontece automaticamente aqui
        });
    }

    // 3. VERIFICAR SESSÃO AO VOLTAR DO GOOGLE
    // Como o Google redireciona de volta para a página, precisamos checar se o login funcionou
    checkUserSession();
});

async function checkUserSession() {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
        // Aqui você define qual a "role" padrão para quem loga pelo Google
        // Geralmente novos usuários entram como 'paciente'
        const user = {
            email: session.user.email,
            role: "paciente" 
        };
        
        localStorage.setItem("usuario_logado", JSON.stringify(user));
        redirecionar(user.role);
    }
}

function redirecionar(role) {
    if (role === "admin") {
        window.location.href = "./admin.html";
    } else if (role === "nutricionista") {
        window.location.href = "./nutricionista.html";
    } else {
        window.location.href = "./paciente.html";
    }
}

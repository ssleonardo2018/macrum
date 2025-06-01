<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $nome = htmlspecialchars($_POST['nome']);
        $email = htmlspecialchars($_POST['email']);
        $mensagem = htmlspecialchars($_POST['mensagem']);
    
        $to = "ssleonardo2018@gmail.com";
        $subject = "macrum - Nova mensagem do formulário.";
        $body = "Nome: $nome\nE-mail: $email\nMensagem: $mensagem";
        $headers = "From: $email";
    
        if (mail($to, $subject, $body, $headers)) {
            echo "Mensagem enviada com sucesso!";
        } else {
            echo "Erro ao enviar a mensagem.";
        }
    }
    ?>

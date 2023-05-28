function entrar() {
    // aguardar();

    var usernameVar = ipt_username.value;
    var senhaVar = ipt_senha.value;

    if (usernameVar == "" || senhaVar == "") {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Campo obrigatório vazio.',
            showConfirmButton: true,
        });
        // finalizarAguardar();
        return false;
    }
    console.log("FORM LOGIN: ", usernameVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            usernameServer: usernameVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                sessionStorage.QTD_POSTAGENS_USUARIO = json.qtd_postagens;
                sessionStorage.QTD_CURTIDAS_USUARIO = json.qtd_curtidas;
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.USERNAME_USUARIO = json.username;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.TIPO_USUARIO = json.tpUsuario;
                sessionStorage.ID_USUARIO = json.idUsuario;

                if (sessionStorage.TIPO_USUARIO == 0) {
                    setTimeout(function () {
                        window.location = "./area-restrita/admin/dashboard.html";
                    }, 1000); // apenas para exibir o loading    
                } else {
                    setTimeout(function () {
                        window.location = "./area-restrita/acervo.html";
                    }, 1000); // apenas para exibir o loading
                }

            });

        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Usuário e/ou Senha inválidos! Tente Novamente.',
                showConfirmButton: false,
                timer: 1500
            });
            
            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
                // finalizarAguardar(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

// function sumirMensagem() {
//     cardErro.style.display = "none"
// }
function cadastrar() {

    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var nomeVar = ipt_nome.value;
    var emailVar = ipt_email.value;
    var usernameVar = ipt_username.value;
    var senhaVar = ipt_senha.value;
    var confirmacaoSenhaVar = ipt_confirmar_senha.value;

    if (nomeVar == "" || emailVar == "" || usernameVar == "" || senhaVar == "" || confirmacaoSenhaVar == "") {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Campo obrigatório vazio.',
            showConfirmButton: true,
        });
        // finalizarAguardar();
        return false;
    } else if(emailVar.indexOf("@") == -1 || emailVar.endsWith("@")){
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Email inválido.',
            text: 'É necessário que haja um @ e domínio de e-mail após esse @',
            showConfirmButton: true,
        });

        return false;
        
    } else if(senhaVar != confirmacaoSenhaVar){
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Senhas não coincidem.',
            showConfirmButton: true,
        });

        return false;
     }else if(senhaVar.length < 4 || senhaVar.length > 50){
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'A senha deve conter no mínimo 4 e no máximo 50 caracteres.',
            showConfirmButton: true,
        });

        return false;
    }

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeServer: nomeVar,
            emailServer: emailVar,
            usernameServer: usernameVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Cadastro realizado com sucesso.',
                showConfirmButton: false,
                timer: 1500
            });

            setTimeout(() => {
                window.location = "login.html";
            }, "1700")

            // limparFormulario();
            // finalizarAguardar();
        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        finalizarAguardar();
    });

    return false;
}
// function sumirMensagem() {
//     cardErro.style.display = "none"
// }

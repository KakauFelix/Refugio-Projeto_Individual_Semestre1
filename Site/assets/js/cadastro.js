function cadastrarUsuario(){
    var nome = ipt_nome.value;
    var email = ipt_email.value;
    var username = ipt_username.value;
    var senha = ipt_senha.value;
    var confirmacao_senha = ipt_confirmar_senha.value;

    if(nome == "" || email == "" || username == "" || senha == "" || confirmacao_senha == ""){
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Campo obrigatório vazio.',
            showConfirmButton: true,
        });
    }else if(email.indexOf("@") == -1 || email.endsWith("@")){
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Email inválido.',
            text: 'É necessário que haja um @ e domínio de e-mail após esse @',
            showConfirmButton: true,
        });
    }else if(senha != confirmacao_senha){
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Senhas não coincidem.',
            showConfirmButton: true,
        });
    }else if(senha.length < 4 || senha.length > 50){
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'A senha deve conter no mínimo 4 e no máximo 50 caracteres.',
            showConfirmButton: true,
        });
    }else{
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cadastro realizado com sucesso.',
            showConfirmButton: false,
            timer: 1500
        });
        
        setTimeout(function() {
            window.parent.location.href = "../login.html";
        }, 1700);
    }
}
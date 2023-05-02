function logar(){
    var username = ipt_username.value;
    var senha = ipt_senha.value;

    if (username.toLowerCase() == "useradmin" && senha == "1234") {
        window.parent.location.href = "./area-restrita/admin/dashboard.html";
    }
    else if (username.toLowerCase() == "usercomum" && senha == "1234") {
        window.parent.location.href = "./area-restrita/acervo.html";
    }
    else {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Usuário e/ou Senha inválidos! Tente Novamente.',
            showConfirmButton: false,
            timer: 1500
        });
    }
}
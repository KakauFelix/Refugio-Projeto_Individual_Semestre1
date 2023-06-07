var idUsuario = sessionStorage.getItem(`ID_USUARIO`)
var imgUsuario = sessionStorage.getItem(`IMG_USUARIO`);
campo_username_usuario.innerHTML = sessionStorage.USERNAME_USUARIO;
campo_nome_usuario.innerHTML = sessionStorage.NOME_USUARIO;
campo_email_usuario.innerHTML = sessionStorage.EMAIL_USUARIO;

fetch(`/usuarios/buscarDadosAtulizados/${idUsuario}`).then(function (resposta) {
    if (resposta.ok) {
        if (resposta.status == 204) {
            console.log("Nenhum resultado encontrado.");
            throw "Nenhum resultado encontrado!!";
        }

        resposta.json().then(function (resposta) {
            console.log("Dados recebidos: ", JSON.stringify(resposta));
            var usuario = resposta[0];

            campo_username_usuario.innerHTML = usuario.username;
            campo_nome_usuario.innerHTML = usuario.nome;
            campo_email_usuario.innerHTML = usuario.email;
            img_perfil_usuario.src = `../assets/images/area-restrita/usuarios/${usuario.imgUsuario}`;
            imgUsuario = usuario.imgUsuario;
        });
    } else {
        throw ('Houve um erro na API!');
    }
}).catch(function (resposta) {
    console.error(resposta);
    // finalizarAguardar();
});

fetch(`/usuarios/buscarIndicadoresPerfil/${idUsuario}`).then(function (resposta) {
    if (resposta.ok) {
        if (resposta.status == 204) {
            console.log("Nenhum resultado encontrado.");
            throw "Nenhum resultado encontrado!!";
        }

        resposta.json().then(function (resposta) {
            console.log("Dados recebidos: ", JSON.stringify(resposta));
            var indicadores = resposta[0];

            campo_qtd_curtidas_usuario.innerHTML = indicadores.qtdCurtidas;
            campo_qtd_postagens_usuario.innerHTML = indicadores.qtdPostagens;

        });
    } else {
        throw ('Houve um erro na API!');
    }
}).catch(function (resposta) {
    console.error(resposta);
    // finalizarAguardar();
});

function abrirModalAtualizarPerfil() {
    div_modal_editar_perfil.style.display = 'flex';

    div_modal_editar_perfil.innerHTML = `
    <div class="box_modal_editar_perfil">
        <img src="../assets/images/icons/close.png" class="modal_close" width="50"
            onclick="fecharModalAtualizarPerfil()" alt="icone fechar">
        <div class="div_update_perfil">
            <h2>Atualizar Perfil
                <hr>
            </h2>
            <img class="img_usuario" id="img_perfil_usuario"
                src="../assets/images/area-restrita/usuarios/${imgUsuario}" alt="Imagem do Usuário">
            <form class="forms_update_perfil">
                <div class="campo_imgUsuario">
                    <label>Selecione uma imagem para utilizar de perfil:</label>
                    <input type="file" id="ipt_img_usuario">
                </div>
                <label>Nome:</label>
                <input id="ipt_nome" type="text" maxlength="100" value="${sessionStorage.NOME_USUARIO}" required>
                <label>E-mail:</label>
                <input id="ipt_email" type="email" maxlength="100" value="${sessionStorage.EMAIL_USUARIO}" required>
                <label>Username:</label>
                <input id="ipt_username" type="text" maxlength="25" value="${sessionStorage.USERNAME_USUARIO}" required>
                <label>Senha:</label>
                <input id="ipt_senha" type="password" value="${sessionStorage.SENHA_USUARIO}" minlength="4" maxlength="50" required>
                <label>Confirmar senha:</label>
                <input id="ipt_confirmar_senha" type="password" value="${sessionStorage.SENHA_USUARIO}" minlength="4" maxlength="50" required>
            </form>
            <button class="btnAtualizar" onclick="atualizarPerfil(${idUsuario})">Atualizar Perfil</button>
        </div>
    </div>
    `;
}

function fecharModalAtualizarPerfil() {
    div_modal_editar_perfil.style.display = 'none';
}

function atualizarPerfil() {
    var nomeVar = ipt_nome.value;
    var emailVar = ipt_email.value;
    var usernameVar = ipt_username.value;
    var senhaVar = ipt_senha.value;
    var confirmarSenhaVar = ipt_confirmar_senha.value;
    var imgUsuario = ipt_img_usuario.value;

    // console.log(imgCapa);

    const formData = new FormData();
    formData.append('imgUsuario', ipt_img_usuario.files[0]);
    formData.append('nome', nomeVar);
    formData.append('email', emailVar);
    formData.append('username', usernameVar);
    formData.append('senha', senhaVar);

    if (nomeVar == "" || emailVar == "" || usernameVar == "" || senhaVar == "" || confirmarSenhaVar == "") {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Campo obrigatório vazio.',
            showConfirmButton: true,
        });
        // finalizarAguardar();
        return false;
    } else if (senhaVar != confirmarSenhaVar) {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Senhas não coincidem!',
            showConfirmButton: true,
        });
    } else if (imgUsuario == "") {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Selecione uma imagem de perfil para continuar... ',
            showConfirmButton: true,
        });
        // finalizarAguardar();
        return false;
    } else {
        fetch(`/usuarios/atualizar/${idUsuario}`, {
            method: "PUT",
            body : formData
        }).then(function (resposta) {

            console.log("resposta: ", resposta);

            if (resposta.ok) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Perfil atualização realizado com sucesso.',
                    showConfirmButton: false,
                    timer: 1500
                });

                setTimeout(() => {
                    if (pagina == "acervo") {
                        window.location = "acervo.html";
                        
                    } else {
                        window.location = "forum.html";
                        
                    }
                }, "1500")

                // limparFormulario();
                // finalizarAguardar();
            } else {
                throw ("Houve um erro ao tentar realizar o cadastro!");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            // finalizarAguardar();
        });

        return false;

    }
}

function atualizarExibicaoPerfilUsuario(idUsuario) {
    fetch(`/usuarios/buscarDadosAtulizados/${idUsuario}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                console.log("Nenhum resultado encontrado.");
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                var usuario = resposta[0];

                campo_username_usuario.innerHTML = usuario.username;
                campo_nome_usuario.innerHTML = usuario.nome;
                campo_email_usuario.innerHTML = usuario.email;
                img_perfil_usuario.src = `../assets/images/area-restrita/usuarios/${usuario.imgUsuario}`
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
        // finalizarAguardar();
    });
}
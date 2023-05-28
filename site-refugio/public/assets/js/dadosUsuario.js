var idUsuario = sessionStorage.getItem(`ID_USUARIO`)
campo_username_usuario.innerHTML = sessionStorage.USERNAME_USUARIO;
campo_nome_usuario.innerHTML = sessionStorage.NOME_USUARIO;
campo_email_usuario.innerHTML = sessionStorage.EMAIL_USUARIO;

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
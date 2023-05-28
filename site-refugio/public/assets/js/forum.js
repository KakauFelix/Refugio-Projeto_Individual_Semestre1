var objDiv = document.getElementById("div_msgs");
objDiv.scrollTop = objDiv.scrollHeight;

fetch("/postagemForum/listar").then(function (resposta) {
    if (resposta.ok) {
        if (resposta.status == 204) {
            // var feed = document.getElementById("feed_container");
            // var mensagem = document.createElement("span");
            // mensagem.innerHTML = "Nenhum resultado encontrado."
            // feed.appendChild(mensagem);   
            console.log("Nenhum resultado encontrado.");
            throw "Nenhum resultado encontrado!!";
        }

        resposta.json().then(function (resposta) {
            console.log("Dados recebidos: ", JSON.stringify(resposta));

            for (let i = 0; i < resposta.length; i++) {
                var postagem = resposta[i];

                div_msgs.innerHTML += `
                    <div class="cardMsg">
                        <img class="img_usuario_msg" src="../assets/images/area-restrita/usuarios/img_usuario_padrao.png" alt="imagem do usuário">
                        <div class="box_msg">
                            <div class="infos_msg">
                                <span>${postagem.username}</span>
                                <span>${postagem.dataHora}</span>
                            </div>
                            <div class="msg">
                                <p>${postagem.mensagem}</p>
                            </div>
                        </div>
                    </div>
                `;
            }

            // finalizarAguardar();
        });
    } else {
        throw ('Houve um erro na API!');
    }
}).catch(function (resposta) {
    console.error(resposta);
    // finalizarAguardar();
});

function fazerPostagem() {
    var msgPostagemVar = ipt_msg.value;
    var idUsuario = sessionStorage.getItem(`ID_USUARIO`);

    if (msgPostagemVar == "") {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Mensagem vazia!',
            text: 'É necessário preencher o campo da mensagem para realizar a postagem',
            showConfirmButton: true,
        });
        // finalizarAguardar();
        return false;
    } else {
        // Enviando o valor da nova input
        fetch("/postagemForum/realizarPostagem", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                msgPostagemServer: msgPostagemVar,
                idUsuarioServer: idUsuario
            })
        }).then(function (resposta) {

            console.log("resposta: ", resposta);

            if (resposta.ok) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'success',
                    title: 'Postagem realizada com sucesso!'
                  })

                setTimeout(() => {
                    window.location = "forum.html";
                }, "2000")

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
}

function buscarPelaData() {
    var data_buscada = ipt_busca_data.value;
    console.log(data_buscada);

    fetch(`/postagemForum/buscarPorData/${data_buscada}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                div_msgs.innerHTML = `
                    <center>
                        <span class="msgNadaEncontrado">
                            Não existe ou não foi encontrado postagens nessa data, busque por outra data... :)
                        </span><br>
                        <button class="btnLimparFiltros" onclick="limparFiltros()">Limpar Filtros</button>
                    </center>
                `;   
                console.log("Nenhum resultado encontrado.");
                throw "Nenhum resultado encontrado!!";
            }
    
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
    
                div_msgs.innerHTML = "";

                for (let i = 0; i < resposta.length; i++) {
                    var postagem = resposta[i];
    
                    div_msgs.innerHTML += `
                        <div class="cardMsg">
                            <img class="img_usuario_msg" src="../assets/images/area-restrita/usuarios/img_usuario_padrao.png" alt="imagem do usuário">
                            <div class="box_msg">
                                <div class="infos_msg">
                                    <span>${postagem.username}</span>
                                    <span>${postagem.dataHora}</span>
                                </div>
                                <div class="msg">
                                    <p>${postagem.mensagem}</p>
                                </div>
                            </div>
                        </div>
                    `;
                }
                
                // finalizarAguardar();
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
        // finalizarAguardar();
    });
}

function buscarPeloUsuario() {
    var usuario_buscado = ipt_busca_usuario.value;
    console.log(usuario_buscado);

    fetch(`/postagemForum/buscarPorUsuario/${usuario_buscado}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                div_msgs.innerHTML = `
                    <center>
                        <span class="msgNadaEncontrado">
                            Não existe ou não foi encontrado postagens desse usuario no momento, tente buscar por outro usuário... :)
                        </span><br>
                        <button class="btnLimparFiltros" onclick="limparFiltros()">Limpar Filtros</button>
                    </center>
                `;   
                console.log("Nenhum resultado encontrado.");
                throw "Nenhum resultado encontrado!!";
            }
    
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
    
                div_msgs.innerHTML = "";
                
                for (let i = 0; i < resposta.length; i++) {
                    var postagem = resposta[i];
    
                    div_msgs.innerHTML += `
                        <div class="cardMsg">
                            <img class="img_usuario_msg" src="../assets/images/area-restrita/usuarios/img_usuario_padrao.png" alt="imagem do usuário">
                            <div class="box_msg">
                                <div class="infos_msg">
                                    <span>${postagem.username}</span>
                                    <span>${postagem.dataHora}</span>
                                </div>
                                <div class="msg">
                                    <p>${postagem.mensagem}</p>
                                </div>
                            </div>
                        </div>
                    `;
                }
                
                // finalizarAguardar();
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
        // finalizarAguardar();
    });
}

function limparFiltros() {
    window.location = "forum.html";
}
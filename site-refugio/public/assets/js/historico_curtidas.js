var idUsuario = sessionStorage.getItem(`ID_USUARIO`);

fetch(`/filmeSerie/listarFilmesCurtidosUsuario/${idUsuario}`).then(function (resposta) {
    if (resposta.ok) {
        if (resposta.status == 204) {
            conteiner_acervo_historico.innerHTML = `
                <center>
                    <span class="msgNadaEncontrado">
                        Não há filmes curtidos no seu histórico... :)
                    </span><br>
                    <button class="btnLimparFiltros" onclick="irParaAcervo()">Voltar para o acervo</button>

                </center>
            `;   
            console.log("Nenhum resultado encontrado.");
            throw "Nenhum resultado encontrado!!";
        }

        resposta.json().then(function (resposta) {
            console.log("Dados recebidos: ", JSON.stringify(resposta));

            for (let i = 0; i < resposta.length; i++) {
                var filmeSerie = resposta[i];

                if (filmeSerie.statusCurtida == 1) {
                    var iconeCurtida = "icon_curtido.png";
                    var funcaoBtnCurtir = `descurtirFilme(${filmeSerie.idFilmeSerie}, ${idUsuario}, ${i})`;

                } else {
                    var iconeCurtida = "icon_curtir.png";
                    var funcaoBtnCurtir = `curtirFilme(${filmeSerie.idFilmeSerie}, ${idUsuario}, ${i})`;
                }

                conteiner_acervo_historico.innerHTML += `
                    <div class="card">
                        <img src="../assets/images/area-restrita/acervo/${filmeSerie.imgCapa}" class="img_capa" alt="Capa do Filme">
                        <div class="legend_card">
                            <b><p>${filmeSerie.qtdCurtidas} likes</p></b>
                            <div>
                                <img src="../assets/images/icons/${iconeCurtida}" id="img_btn_curtir${i}" class="icons_cards" alt="icone curtir" onclick="${funcaoBtnCurtir}">
                                <img src="../assets/images/icons/icon_expandir.png" class="icons_cards" alt="icone expandir tela" onclick="abrirModalFilme(${filmeSerie.idFilmeSerie})">
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

var iconsRanking = [
    'icon_star1.png',
    'icon_star2.png',
    'icon_star3.png',
    'icon_star4.png',
    'icon_star5.png'
];

fetch("/filmeSerie/listarRanking").then(function (resposta) {
    if (resposta.ok) {
        if (resposta.status == 204) {  
            console.log("Nenhum resultado encontrado.");
            throw "Nenhum resultado encontrado!!";
        }

        resposta.json().then(function (resposta) {
            console.log("Dados recebidos: ", JSON.stringify(resposta));

            for (let i = 0; i < resposta.length; i++) {
                var filmeSerie = resposta[i];

                ranking_filmes_series.innerHTML += `
                    <tr>
                        <td><img src="../assets/images/icons/${iconsRanking[i]}" alt="icone de estrela"></td>
                        <td>${filmeSerie.titulo}</td>
                    </tr>
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

fetch("/genero/listarRanking").then(function (resposta) {
    if (resposta.ok) {
        if (resposta.status == 204) {
            console.log("Nenhum resultado encontrado.");
            throw "Nenhum resultado encontrado!!";
        }

        resposta.json().then(function (resposta) {
            console.log("Dados recebidos: ", JSON.stringify(resposta));

            for (let i = 0; i < resposta.length; i++) {
                var genero = resposta[i];

                ranking_generos.innerHTML += `
                    <tr>
                        <td><img src="../assets/images/icons/${iconsRanking[i]}" alt="icone de estrela"></td>
                        <td>${genero.genero}</td>
                    </tr>
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

function descurtirFilme(idFilmeSerie, idUsuario, numeroIdBtn){
    var imgBtnCurtir = document.querySelector(`#img_btn_curtir${numeroIdBtn}`);
    console.log(`fd - filme: ${idFilmeSerie}, usuário: ${idUsuario}`);

    fetch(`/curtidas/descurtir/${idFilmeSerie}/${idUsuario}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({})
    }).then(function (resposta) {

        if (resposta.ok) {
            imgBtnCurtir.setAttribute('src', '../assets/images/icons/icon_curtir.png'); 

            setTimeout(() => {
                window.location = "historico_curtidas.html";
            }, "1000")

        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar atualizar a curtida! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function abrirModalFilme(idfilmeSerie) {
    console.log(idfilmeSerie);
    
    fetch(`/filmeSerie/buscarInformacoes/${idfilmeSerie}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                div_modal_filme.innerHTML = `
                <center>
                    <span class="msgNadaEncontrado">
                        Não existe ou não foi encontrado postagens de filmes... :)
                    </span><br>
                    <button class="btnLimparFiltros" onclick="limparFiltros()">Recarregar Página</button>
                </center>
                `;   
                console.log("Nenhum resultado encontrado.");
                throw "Nenhum resultado encontrado!!";
            }
            
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                var filmeSerie = resposta[0];

                div_modal_filme.innerHTML = `
                    <div class="box_modal">
                        <img src="../assets/images/icons/close.png" class="modal_close" width="50"  onclick="fecharModalFilme()" alt="icone fechar">
                        <div class="dados_filme">
                            <img class="img_capa" src="../assets/images/area-restrita/acervo/${filmeSerie.imgCapa}" alt="capa do filme">
                            <div>
                                <h2>${filmeSerie.titulo} <hr></h2>
                                <p><b>Ano de Lançamento:</b> ${filmeSerie.anoLancamento}</p>
                                <p><b>Gênero:</b> ${filmeSerie.genero}</p>
                                <p><b>Categoria:</b>  ${filmeSerie.categoria}</p>
                                <p><b>Roteiro:</b> ${filmeSerie.roteirista}</p>
                                <p><b>Diretor:</b>  ${filmeSerie.diretor}</p>
                            </div>
                        </div>
                        <div><hr></div>
                        <div>
                            <p>${filmeSerie.sinopse}</p>
                        </div>
                    </div>
                `;
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
        // finalizarAguardar();
    });

    div_modal_filme.style.display = 'flex';

}

function fecharModalFilme() {
    div_modal_filme.style.display = 'none';
}

function buscarFilmeSerie() {
    var filme_serie_buscado = ipt_busca.value;

    if (filme_serie_buscado == "") {
        window.location = "historico_curtidas.html";
    }

    fetch(`/filmeSerie/buscarFilmeSerieCurtido/${idUsuario}/${filme_serie_buscado}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                conteiner_acervo_historico.innerHTML = `
                    <center>
                        <span class="msgNadaEncontrado">
                            Não há filmes curtidos no seu histórico com esse nome...   :)                        
                        </span><br>
                        <button class="btnLimparFiltros" onclick="irParaAcervo()">Voltar para o acervo</button>
                    </center>
                `;   
                console.log("Nenhum resultado encontrado.");
                throw "Nenhum resultado encontrado!!";
            }
    
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                conteiner_acervo_historico.innerHTML = "";
    
                for (let i = 0; i < resposta.length; i++) {
                    var filmeSerie = resposta[i];
    
                    if (filmeSerie.statusCurtida == 1) {
                        var iconeCurtida = "icon_curtido.png";
                        var funcaoBtnCurtir = `descurtirFilme(${filmeSerie.idFilmeSerie}, ${idUsuario}, ${i})`;
    
                    } else {
                        var iconeCurtida = "icon_curtir.png";
                        var funcaoBtnCurtir = `curtirFilme(${filmeSerie.idFilmeSerie}, ${idUsuario}, ${i})`;
                    }
    
                    conteiner_acervo_historico.innerHTML += `
                        <div class="card">
                            <img src="../assets/images/area-restrita/acervo/${filmeSerie.imgCapa}" class="img_capa" alt="Capa do Filme">
                            <div class="legend_card">
                                <b><p>${filmeSerie.qtdCurtidas} likes</p></b>
                                <div>
                                    <img src="../assets/images/icons/${iconeCurtida}" id="img_btn_curtir${i}" class="icons_cards" alt="icone curtir" onclick="${funcaoBtnCurtir}">
                                    <img src="../assets/images/icons/icon_expandir.png" class="icons_cards" alt="icone expandir tela" onclick="abrirModalFilme(${filmeSerie.idFilmeSerie})">
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

function irParaAcervo() {
    window.location = "acervo.html";
}
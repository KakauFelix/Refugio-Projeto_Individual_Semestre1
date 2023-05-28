var idUsuario = sessionStorage.getItem(`ID_USUARIO`);

// fetch(`/filmeSerie/listar/${idUsuario}`).then(function (resposta) {
//     if (resposta.ok) {
//         if (resposta.status == 204) {
//             // var feed = document.getElementById("feed_container");
//             // var mensagem = document.createElement("span");
//             // mensagem.innerHTML = "Nenhum resultado encontrado."
//             // feed.appendChild(mensagem);   
//             console.log("Nenhum resultado encontrado.");
//             throw "Nenhum resultado encontrado!!";
//         }

//         resposta.json().then(function (resposta) {
//             console.log("Dados recebidos: ", JSON.stringify(resposta));

//             for (let i = 0; i < resposta.length; i++) {
//                 var filmeSerie = resposta[i];

//                 if (filmeSerie.usuarioCurtiu == 1) {
//                     var iconeCurtida = "icon_curtido.png"  
//                     var funcaoBtnCurtir = descurtirFilme(filmeSerie.idFilmeSerie, idUsuario);

//                 } else {
//                     var iconeCurtida = "icon_curtir.png"
//                     var funcaoBtnCurtir = curtirFilme(filmeSerie.idFilmeSerie, idUsuario);
//                 }

//                 conteiner_acervo.innerHTML += `
//                     <div class="card">
//                         <img src="../assets/images/area-restrita/acervo/${filmeSerie.imgCapa}" class="img_capa" alt="Capa do Filme">
//                         <div class="legend_card">
//                             <b><p>${filmeSerie.qtdCurtidas} likes</p></b>
//                             <div>
//                                 <img src="../assets/images/icons/${iconeCurtida}" id="img_btn_curtir" class="icons_cards" alt="icone curtir" onclick="${funcaoBtnCurtir}">
//                                 <img src="../assets/images/icons/icon_expandir.png" class="icons_cards" alt="icone expandir tela" onclick="abrirModalFilme(${filmeSerie.idFilmeSerie})">
//                             </div>
//                         </div>
//                     </div>
//                 `;
//             }

//             // finalizarAguardar();
//         });
//     } else {
//         throw ('Houve um erro na API!');
//     }
// }).catch(function (resposta) {
//     console.error(resposta);
//     // finalizarAguardar();
// });

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


function curtirFilme(idFilmeSerie, idUsuario){
    img_btn_curtir.src = "../assets/images/icons/icon_curtido.png";
}

function descurtirFilme(idFilmeSerie, idUsuario){
    img_btn_curtir.src = "../assets/images/icons/icon_curtir.png";
}

function abrirModalFilme() {
    div_modal_filme.style.display = 'flex';

}

function fecharModalFilme() {
    div_modal_filme.style.display = 'none';
}

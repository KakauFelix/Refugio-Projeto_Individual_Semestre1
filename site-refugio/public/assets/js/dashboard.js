// const ctx = document.getElementById('myChart');

// new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: labels,
//         datasets: [{
//         label: 'Qtde. de Curtidas de Filmes e Séries desse gênero',
//         data: [],
//         borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//         y: {
//             beginAtZero: true
//         }
//         },
//         plugins: {
//             title: {
//                 display: true,
//                 text: 'Curtidas de Filmes e Séries por Gênero',
//                 font: {
//                     size: '20px'
//                 },
//                 color: '#ffffff'
//             }
//         }
//     }
// });

fetch("/usuarios/buscarIndicador").then(function (resposta) {
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

            p_qtd_usuarios.innerHTML = resposta[0].qtd_usuarios;

            // finalizarAguardar();
        });
    } else {
        throw ('Houve um erro na API!');
    }
}).catch(function (resposta) {
    console.error(resposta);
    // finalizarAguardar();
});

fetch("/filmeSerie/buscarIndicador").then(function (resposta) {
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

            p_qtd_filmes.innerHTML = resposta[0].qtd_filmes_series;

            // finalizarAguardar();
        });
    } else {
        throw ('Houve um erro na API!');
    }
}).catch(function (resposta) {
    console.error(resposta);
    // finalizarAguardar();
});

fetch("/postagemForum/buscarIndicador").then(function (resposta) {
    if (resposta.ok) {
        if (resposta.status == 204) {   
            console.log("Nenhum resultado encontrado.");
            throw "Nenhum resultado encontrado!!";
        }

        resposta.json().then(function (resposta) {
            console.log("Dados recebidos: ", JSON.stringify(resposta));

            p_qtd_postagens.innerHTML = resposta[0].qtd_postagens_forum;

            // finalizarAguardar();
        });
    } else {
        throw ('Houve um erro na API!');
    }
}).catch(function (resposta) {
    console.error(resposta);
    // finalizarAguardar();
});

window.onload = obterDadosGraficos();

function obterDadosGraficos() {
    obterDadosGrafico()
}

function obterDadosGrafico() {
    fetch(`/genero/obterDadosGrafico`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGrafico(resposta);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function plotarGrafico(resposta) {

    console.log('iniciando plotagem do gráfico...');

    // Adicionando gráfico criado em div na tela
    const ctx = document.getElementById('myChart');

    // Criando estrutura para plotar gráfico - labels
    let labels = [];
    var dados = [];

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        labels.push(registro.genero);
        dados.push(registro.qtdCurtidas);
    }

    // Criando estrutura para plotar gráfico - dados
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
            label: 'Qtde. de Curtidas de Filmes e Séries desse gênero',
            data: dados,
            borderWidth: 1
            }]
        },
        options: {
            scales: {
            y: {
                beginAtZero: true
            }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Curtidas de Filmes e Séries por Gênero',
                    font: {
                        size: '20px'
                    },
                    color: '#ffffff'
                }
            }
        }
    });

    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
    console.log(resposta)

    console.log('----------------------------------------------')
    console.log('O gráfico será plotado com os respectivos valores:')
    console.log('Labels:')
    console.log(labels)
    console.log('Dados:')
    console.log(dados)
    console.log('----------------------------------------------')

    
}
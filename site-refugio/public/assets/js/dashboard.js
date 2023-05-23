const ctx = document.getElementById('myChart');

new Chart(ctx, {
type: 'bar',
data: {
    labels: ['Comédia', 'Romance', 'Ação', 'Ficção', 'Terror', 'Aventura', 'Fantasia'],
    datasets: [{
    label: 'Qtde. de Curtidas de Filmes e Séries desse gênero',
    data: [12, 19, 3, 5, 2, 3, 10],
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

            // var feed = document.getElementById("feed_container");
            // feed.innerHTML = "";

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

// fetch("/filmeSerie/buscarIndicador").then(function (resposta) {
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

//             // var feed = document.getElementById("feed_container");
//             // feed.innerHTML = "";

//             p_qtd_filmes.innerHTML = resposta[0].qtd_filmes_series;

//             // finalizarAguardar();
//         });
//     } else {
//         throw ('Houve um erro na API!');
//     }
// }).catch(function (resposta) {
//     console.error(resposta);
//     // finalizarAguardar();
// });
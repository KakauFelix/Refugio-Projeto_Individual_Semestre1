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
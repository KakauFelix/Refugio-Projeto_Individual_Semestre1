var database = require("../database/config");

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(filmeSerie) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", filmeSerie);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO filmesSeries (titulo, anoLancamento, sinopse, fkCategoria, fkGenero, imgCapa) VALUES ('${filmeSerie.titulo}', ${filmeSerie.anoLancamento}, '${filmeSerie.sinopse}', ${filmeSerie.categoria}, ${filmeSerie.genero}, '${filmeSerie.imgCapa}');
    `;

    // var instrucao2 = `
        
    // `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listar(idUsuario) {
    console.log("to no model" + idUsuario);

    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");

    var instrucao = `
        SELECT filmesSeries.*, 
            IFNULL(curtidas.qtdCurtidas, 0) AS qtdCurtidas,
            IFNULL(curtidas.usuarioCurtiu, 0) AS usuarioCurtiu
        FROM filmesSeries
        LEFT JOIN 
            (SELECT fkFilmeSerie, COUNT(*) AS qtdCurtidas, 
                MAX(CASE WHEN fkUsuario = ${idUsuario} THEN 1 ELSE 0 END) AS usuarioCurtiu
            FROM curtidas GROUP BY fkFilmeSerie) 
            curtidas ON filmesSeries.idFilmeSerie = curtidas.fkFilmeSerie;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarIndicador() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT COUNT(idFilmeSerie) AS qtd_filmes_series FROM filmesSeries;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarRanking() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT filmesSeries.titulo, 
            COUNT(idCurtida) AS qtdCurtidas
        FROM filmesSeries
        LEFT JOIN curtidas ON curtidas.fkFilmeSerie = filmesSeries.idFilmeSerie
        GROUP BY filmesSeries.titulo
        ORDER BY qtdCurtidas DESC
        LIMIT 5;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar,
    listar,
    buscarIndicador,
    listarRanking
};
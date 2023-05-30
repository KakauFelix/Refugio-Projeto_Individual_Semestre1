var database = require("../database/config");

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(filmeSerie) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", filmeSerie);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO filmesSeries (titulo, anoLancamento, sinopse, fkCategoria, fkGenero, fkRoteiristaPrincipal, fkDiretorPrincipal, imgCapa) VALUES ('${filmeSerie.titulo}', ${filmeSerie.anoLancamento}, '${filmeSerie.sinopse}', ${filmeSerie.categoria}, ${filmeSerie.genero}, ${filmeSerie.roteirista}, ${filmeSerie.diretor}, '${filmeSerie.imgCapa}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listar(idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");

    var instrucao = `
        SELECT fs.idFilmeSerie, 
            fs.titulo, 
            fs.imgCapa, 
            IFNULL(c.quantidadeCurtidas, 0) AS qtdCurtidas,
            IFNULL(c.statusCurtida, 0) AS statusCurtida
        FROM filmesSeries fs
        LEFT JOIN 
            (SELECT fkFilmeSerie, 
                COUNT(*) AS quantidadeCurtidas,
                MAX(CASE WHEN fkUsuario = ${idUsuario} THEN statusCurtida ELSE 0 END) AS statusCurtida
            FROM curtidas WHERE curtidas.statusCurtida = 1
            GROUP BY fkFilmeSerie) c ON fs.idFilmeSerie = c.fkFilmeSerie
        ORDER BY fs.titulo;
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

function buscarInformacoes(idFilmeSerie) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");

    var instrucao = `
        SELECT filmesSeries.idFilmeSerie, 
            filmesSeries.titulo, 
            filmesSeries.anoLancamento, 
            filmesSeries.sinopse, 
            filmesSeries.imgCapa, 
            genero.idGenero, 
            genero.genero, 
            categoria.idCategoria,
            categoria.categoria,
            roteirista.nome as roteirista,
            diretor.nome as diretor
        FROM filmesSeries
        LEFT JOIN genero ON filmesSeries.fkGenero = genero.idGenero
        LEFT JOIN categoria ON filmesSeries.fkCategoria - categoria.idCategoria
        LEFT JOIN produtor as roteirista ON filmesSeries.fkRoteiristaPrincipal = roteirista.idProdutor
        LEFT JOIN produtor as diretor ON filmesSeries.fkDiretorPrincipal = diretor.idProdutor
        WHERE filmesSeries.idFilmeSerie = ${idFilmeSerie};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarFilmeSerie(idUsuario, filme_serie_buscado) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");

    var instrucao = `
        SELECT fs.idFilmeSerie, 
            fs.titulo, 
            fs.imgCapa, 
            IFNULL(c.quantidadeCurtidas, 0) AS qtdCurtidas,
            IFNULL(c.statusCurtida, 0) AS statusCurtida
        FROM filmesSeries fs
        LEFT JOIN 
            (SELECT fkFilmeSerie, 
                COUNT(*) AS quantidadeCurtidas,
                MAX(CASE WHEN fkUsuario = ${idUsuario} THEN statusCurtida ELSE 0 END) AS statusCurtida
            FROM curtidas WHERE curtidas.statusCurtida = 1
            GROUP BY fkFilmeSerie) c ON fs.idFilmeSerie = c.fkFilmeSerie
        WHERE fs.titulo LIKE '%${filme_serie_buscado}%'
        ORDER BY fs.titulo;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletar(idFilmeSerie) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idFilmeSerie);
    
    var instrucao = `
        DELETE FROM curtidas WHERE fkFilmeSerie = ${idFilmeSerie};
    `;

    var instrucao2 = `
        DELETE FROM filmesSeries WHERE idFilmeSerie = ${idFilmeSerie};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao), database.executar(instrucao2);
}

function atualizar(filmeSerie) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", filmeSerie);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    // var instrucao = `
    //     INSERT INTO filmesSeries (titulo, anoLancamento, sinopse, fkCategoria, fkGenero, fkRoteiristaPrincipal, fkDiretorPrincipal, imgCapa) VALUES ('${filmeSerie.titulo}', ${filmeSerie.anoLancamento}, '${filmeSerie.sinopse}', ${filmeSerie.categoria}, ${filmeSerie.genero}, ${filmeSerie.roteirista}, ${filmeSerie.diretor}, '${filmeSerie.imgCapa}');
    // `;

    var instrucao = `
        UPDATE filmesSeries SET titulo = '${filmeSerie.titulo}', anoLancamento = ${filmeSerie.anoLancamento}, sinopse = '${filmeSerie.sinopse}', fkCategoria = ${filmeSerie.categoria}, fkGenero = ${filmeSerie.genero}, fkRoteiristaPrincipal = ${filmeSerie.roteirista}, fkDiretorPrincipal = ${filmeSerie.diretor}, imgCapa = '${filmeSerie.imgCapa}' WHERE idFilmeSerie = ${filmeSerie.idFilmeSerie}
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar,
    listar,
    buscarIndicador,
    listarRanking,
    buscarInformacoes,
    buscarFilmeSerie,
    deletar,
    atualizar
};
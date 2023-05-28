var database = require("../database/config");

function verificarCurtida(idFilmeSerie, idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");

    var instrucao = `
        SELECT * FROM curtidas
        WHERE fkFilmeSerie = ${idFilmeSerie} AND fkUsuario = ${idUsuario};       
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarCurtida(idFilmeSerie, idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarCurtida():", idFilmeSerie, idUsuario);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO curtidas (fkUsuario, fkFilmeSerie, statusCurtida) VALUES ('${idUsuario}', '${idFilmeSerie}', 1);
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function descurtir(idFilmeSerie, idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");

    var instrucao = `
        UPDATE curtidas SET statusCurtida = 0
        WHERE fkFilmeSerie = ${idFilmeSerie} AND fkUsuario = ${idUsuario};       
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function ativarCurtida(idFilmeSerie, idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");

    var instrucao = `
        UPDATE curtidas SET statusCurtida = 1
        WHERE fkFilmeSerie = ${idFilmeSerie} AND fkUsuario = ${idUsuario};       
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    verificarCurtida,
    cadastrarCurtida,
    descurtir,
    ativarCurtida
};
var database = require("../database/config")

function realizarPostagem(msgPostagem, idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", msgPostagem, idUsuario);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO postagemForum (fkUsuario, dataHora, mensagem) VALUES 
            ('${idUsuario}', now(), '${msgPostagem}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarIndicador() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT COUNT(*) AS qtd_postagens_forum FROM postagemForum;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT postagemForum.idPostagemForum, 
            usuario.imgUsuario,
            usuario.username,
            DATE_FORMAT(dataHora, "%d/%m/%Y - %H:%i:%S") as dataHora,
            postagemForum.mensagem
        FROM postagemForum
        JOIN usuario ON postagemForum.fkUsuario = usuario.idUsuario
        ORDER BY dataHora DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarPorData(data_buscada) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT postagemForum.idPostagemForum, 
            usuario.imgUsuario,
            usuario.username,
            DATE_FORMAT(dataHora, "%d/%m/%Y - %H:%i:%S") as dataHora,
            postagemForum.mensagem
        FROM postagemForum
        JOIN usuario ON postagemForum.fkUsuario = usuario.idUsuario
        WHERE postagemForum.dataHora LIKE '${data_buscada}%'
        ORDER BY dataHora DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarPorUsuario(usuario_buscado) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT postagemForum.idPostagemForum,
            usuario.imgUsuario, 
            usuario.username,
            DATE_FORMAT(dataHora, "%d/%m/%Y - %H:%i:%S") as dataHora,
            postagemForum.mensagem
        FROM postagemForum
        JOIN usuario ON postagemForum.fkUsuario = usuario.idUsuario
        WHERE usuario.username LIKE '${usuario_buscado}%'
        ORDER BY dataHora DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    realizarPostagem,
    buscarIndicador,
    listar,
    buscarPorData,
    buscarPorUsuario
};
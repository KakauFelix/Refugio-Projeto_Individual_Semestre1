var postagemForumModel = require("../models/postagemForumModel");

var sessoes = [];

function realizarPostagem(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var msgPostagem = req.body.msgPostagemServer;
    var idUsuario = req.body.idUsuarioServer;

    // Faça as validações dos valores
    if (msgPostagem == undefined) {
        res.status(400).send("Seu msgPostagem está undefined!");
    } else if (idUsuario == undefined) {
        res.status(400).send("Seu idUsuario está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo postagemForumModel.js
        postagemForumModel.realizarPostagem(msgPostagem, idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function buscarIndicador(req, res) {
    postagemForumModel.buscarIndicador()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function listar(req, res) {
    postagemForumModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function buscarPorData(req, res) {
    var data_buscada = req.params.data_buscada;

    postagemForumModel.buscarPorData(data_buscada)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function buscarPorUsuario(req, res) {
    var usuario_buscado = req.params.usuario_buscado;
    
    postagemForumModel.buscarPorUsuario(usuario_buscado)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    realizarPostagem,
    buscarIndicador,
    listar,
    buscarPorData,
    buscarPorUsuario
}
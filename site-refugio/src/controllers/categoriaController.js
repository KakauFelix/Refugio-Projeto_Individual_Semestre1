var categoriaModel = require("../models/categoriaModel");

function testar(req, res) {
    console.log("ENTRAMOS NA categoriaController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nomeCategoria = req.body.nomeCategoriaServer;

    // Faça as validações dos valores
    if (nomeCategoria == undefined) {
        res.status(400).send("o nome do categoria está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo categoriaModel.js
        categoriaModel.cadastrar(nomeCategoria)
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

function listar(req, res) {
    categoriaModel.listar()
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

function deletar(req, res) {
    var idCategoria = req.params.idCategoria;

    categoriaModel.deletar(idCategoria)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function atualizar(req, res) {
    var idCategoria = req.params.idCategoria;
    var categoria = req.body.categoria;

    categoriaModel.atualizar(idCategoria,categoria)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar atualização: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    cadastrar,
    listar,
    deletar,
    atualizar,
    testar
}
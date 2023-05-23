var produtorModel = require("../models/produtorModel");

function testar(req, res) {
    console.log("ENTRAMOS NA produtorController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nomeProdutor = req.body.nomeProdutorServer;

    // Faça as validações dos valores
    if (nomeProdutor == undefined) {
        res.status(400).send("o nome do produtor está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo produtorModel.js
        produtorModel.cadastrar(nomeProdutor)
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
    produtorModel.listar()
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
    var idProdutor = req.params.idProdutor;

    produtorModel.deletar(idProdutor)
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

module.exports = {
    cadastrar,
    listar,
    deletar,
    testar
}
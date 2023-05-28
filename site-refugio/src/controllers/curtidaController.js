var curtidaModel = require("../models/curtidaModel");

function verificarCurtida(req, res) {
    var idFilmeSerie = req.params.idFilmeSerie;
    var idUsuario = req.params.idUsuario;

    console.log("entrei no controller curtida idUsuario: " + idUsuario);

    curtidaModel.verificarCurtida(idFilmeSerie, idUsuario)
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

function cadastrarCurtida(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var idFilmeSerie = req.body.idFilmeSerieServer;
    var idUsuario = req.body.idUsuarioServer;

    // Faça as validações dos valores
    if (idFilmeSerie == undefined) {
        res.status(400).send("o nome do produtor está undefined!");
    } else if (idUsuario == undefined) {
        res.status(400).send("o nome do produtor está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo produtorModel.js
        curtidaModel.cadastrarCurtida(idFilmeSerie, idUsuario)
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

function descurtir(req, res) {
    var idFilmeSerie = req.params.idFilmeSerie;
    var idUsuario = req.params.idUsuario;

    curtidaModel.descurtir(idFilmeSerie, idUsuario)
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

function ativarCurtida(req, res) {
    var idFilmeSerie = req.params.idFilmeSerie;
    var idUsuario = req.params.idUsuario;

    curtidaModel.ativarCurtida(idFilmeSerie, idUsuario)
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

module.exports = {
    verificarCurtida,
    cadastrarCurtida,
    descurtir,
    ativarCurtida
}
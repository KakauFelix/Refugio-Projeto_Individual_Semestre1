var filmeSerieModel = require("../models/filmeSerieModel");

function testar(req, res) {
    console.log("ENTRAMOS NA filmeSerieController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function cadastrar(req, res) {
    const imgCapa = req.file.filename;

    const {titulo, anoLancamento, genero, categoria, roteirista, diretor, sinopse} = req.body

    const filmeSerie = { titulo, anoLancamento, genero, categoria, roteirista, diretor, sinopse, imgCapa }
    
    filmeSerieModel.cadastrar(filmeSerie)
    .then(resultado => {
        res.status(201).send("filme/serie criado com sucesso");
    }).catch(err => {
        res.status(500).send(err);
    });

}

function listar(req, res) {
    var idUsuario = req.body.idUsuario;

    console.log("to no controller" + idUsuario);

    filmeSerieModel.listar(idUsuario)
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

function buscarIndicador(req, res) {
    filmeSerieModel.buscarIndicador()
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

function listarRanking(req, res) {
    filmeSerieModel.listarRanking()
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
    cadastrar,
    listar,
    buscarIndicador,
    listarRanking,
    testar
}
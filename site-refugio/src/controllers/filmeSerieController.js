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
    var idUsuario = req.params.idUsuario;

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

function buscarInformacoes(req, res) {
    var idFilmeSerie = req.params.idFilmeSerie;

    filmeSerieModel.buscarInformacoes(idFilmeSerie)
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

function buscarFilmeSerie(req, res) {
    var idUsuario = req.params.idUsuario;
    var filme_serie_buscado = req.params.filme_serie_buscado;

    filmeSerieModel.buscarFilmeSerie(idUsuario, filme_serie_buscado)
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
    var idFilmeSerie = req.params.idFilmeSerie;

    filmeSerieModel.deletar(idFilmeSerie)
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
    var idFilmeSerie = req.params.idFilmeSerie;
    const imgCapa = req.file.filename;

    const {titulo, anoLancamento, genero, categoria, roteirista, diretor, sinopse} = req.body

    const filmeSerie = {idFilmeSerie, titulo, anoLancamento, genero, categoria, roteirista, diretor, sinopse, imgCapa }
    
    filmeSerieModel.atualizar(filmeSerie)
    .then(resultado => {
        res.status(201).send("filme/serie criado com sucesso");
    }).catch(err => {
        res.status(500).send(err);
    });

}

module.exports = {
    cadastrar,
    listar,
    buscarIndicador,
    listarRanking,
    buscarInformacoes, 
    buscarFilmeSerie, 
    deletar,
    atualizar,
    testar
}
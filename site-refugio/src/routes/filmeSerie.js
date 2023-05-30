var express = require("express");
var router = express.Router();
const upload = require('../config/configUploadCapaFilme'); // ARQUIVO COM A COFIGURAÇÃO DO UPLOAD
var filmeSerieController = require("../controllers/filmeSerieController");

router.get("/", function (req, res) {
    filmeSerieController.testar(req, res);
});

router.get("/listar/:idUsuario", function (req, res) {
    filmeSerieController.listar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de filmeSerieController.js
router.post("/have", upload.single('imgCapa'), (req, res) => {
    console.log("entrei no have");
    filmeSerieController.cadastrar(req, res);
});

router.get("/buscarIndicador", function (req, res) {
    filmeSerieController.buscarIndicador(req, res);
});

router.get("/listarRanking", function (req, res) {
    filmeSerieController.listarRanking(req, res);
});

router.get("/buscarInformacoes/:idFilmeSerie", function (req, res) {  
    filmeSerieController.buscarInformacoes(req, res);
});

router.get("/buscarFilmeSerie/:idUsuario/:filme_serie_buscado", function (req, res) {
    filmeSerieController.buscarFilmeSerie(req, res);
});

router.delete("/deletar/:idFilmeSerie", function (req, res) {
    console.log("entrei na rota deletar filme");
    filmeSerieController.deletar(req, res);
});

router.put("/atualizar/:idFilmeSerie", upload.single('imgCapa'), (req, res) => {
    filmeSerieController.atualizar(req, res);
});

module.exports = router;
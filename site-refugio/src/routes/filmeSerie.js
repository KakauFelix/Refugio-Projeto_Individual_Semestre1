var express = require("express");
var router = express.Router();
const upload = require('../config/configUploadCapaFilme'); // ARQUIVO COM A COFIGURAÇÃO DO UPLOAD
var filmeSerieController = require("../controllers/filmeSerieController");

router.get("/", function (req, res) {
    filmeSerieController.testar(req, res);
});

router.post("/listar/:idUsuario", function (req, res) { 
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

module.exports = router;
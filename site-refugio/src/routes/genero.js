var express = require("express");
var router = express.Router();

var generoController = require("../controllers/generoController");

router.get("/", function (req, res) {
    generoController.testar(req, res);
});

router.get("/listar", function (req, res) {
    generoController.listar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de generoController.js
router.post("/cadastrar", function (req, res) {
    generoController.cadastrar(req, res);
});

router.delete("/deletar/:idGenero", function (req, res) {
    generoController.deletar(req, res);
});

module.exports = router;
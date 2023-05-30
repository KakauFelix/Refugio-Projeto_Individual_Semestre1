var express = require("express");
var router = express.Router();

var categoriaController = require("../controllers/categoriaController");

router.get("/", function (req, res) {
    categoriaController.testar(req, res);
});

router.get("/listar", function (req, res) {
    categoriaController.listar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de categoriaController.js
router.post("/cadastrar", function (req, res) {
    categoriaController.cadastrar(req, res);
});

router.delete("/deletar/:idCategoria", function (req, res) {
    categoriaController.deletar(req, res);
});

router.put("/atualizar/:idCategoria", function (req, res) {
    categoriaController.atualizar(req, res);
});

module.exports = router;
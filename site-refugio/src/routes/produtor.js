var express = require("express");
var router = express.Router();

var produtorController = require("../controllers/produtorController");

router.get("/", function (req, res) {
    produtorController.testar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de produtorController.js
router.post("/cadastrar", function (req, res) {
    produtorController.cadastrar(req, res);
})

router.get("/listar", function (req, res) {
    produtorController.listar(req, res);
});

router.delete("/deletar/:idProdutor", function (req, res) {
    produtorController.deletar(req, res);
});

module.exports = router;
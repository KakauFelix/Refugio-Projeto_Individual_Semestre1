var express = require("express");
var router = express.Router();

var postagemForumController = require("../controllers/postagemForumController");

router.get("/", function (req, res) {
    postagemForumController.testar(req, res);
});

router.get("/listar", function (req, res) {
    postagemForumController.listar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de postagemForumController.js
router.post("/cadastrar", function (req, res) {
    postagemForumController.cadastrar(req, res);
})

router.get("/buscarIndicador", function (req, res) {
    usuarioController.buscarIndicador(req, res);
});

module.exports = router;
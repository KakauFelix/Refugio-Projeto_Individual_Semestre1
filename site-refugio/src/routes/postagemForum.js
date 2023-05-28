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
router.post("/realizarPostagem", function (req, res) {
    postagemForumController.realizarPostagem(req, res);
})

router.get("/buscarIndicador", function (req, res) {
    usuarioController.buscarIndicador(req, res);
});

router.get("/buscarPorData/:data_buscada", function (req, res) {
    postagemForumController.buscarPorData(req, res);
});

router.get("/buscarPorUsuario/:usuario_buscado", function (req, res) {
    postagemForumController.buscarPorUsuario(req, res);
});

module.exports = router;
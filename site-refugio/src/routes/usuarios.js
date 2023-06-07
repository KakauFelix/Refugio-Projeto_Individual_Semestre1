var express = require("express");
var router = express.Router();
const upload = require('../config/configUploadImgUsuario'); // ARQUIVO COM A COFIGURAÇÃO DO UPLOAD

var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

router.get("/buscarIndicador", function (req, res) {
    usuarioController.buscarIndicador(req, res);
});

router.get("/buscarIndicadoresPerfil/:idUsuario", function (req, res) {
    usuarioController.buscarIndicadoresPerfil(req, res);
});

router.put("/atualizar/:idUsuario", upload.single('imgUsuario'), (req, res) => {
    usuarioController.atualizar(req, res);
});

router.get("/buscarDadosAtulizados/:idUsuario", function (req, res) {
    usuarioController.buscarDadosAtulizados(req, res);
});

module.exports = router;
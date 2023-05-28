var express = require("express");
var router = express.Router();
var curtidaController = require("../controllers/curtidaController");

router.get("/verificarCurtida/:idFilmeSerie/:idUsuario", function (req, res) { 
    console.log("entrei na rota curtida");
    curtidaController.verificarCurtida(req, res);
});

router.post("/cadastrarCurtida", function (req, res) {
    curtidaController.cadastrarCurtida(req, res);
})

router.put("/descurtir/:idFilmeSerie/:idUsuario", function (req, res) {
    curtidaController.descurtir(req, res);
});

router.put("/ativarCurtida/:idFilmeSerie/:idUsuario", function (req, res) {
    curtidaController.ativarCurtida(req, res);
});

module.exports = router;
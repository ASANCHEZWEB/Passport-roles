//IMPORTACION DE EXPRESS Y METODO EXPRESS ROUTER PARA PODER EXPORTAR LAS RUTAS
const express = require("express");
const router = express.Router();
const ensureLogin = require("connect-ensure-login");
router.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("private-views/userInf", { user: req.user });
});


module.exports = router;

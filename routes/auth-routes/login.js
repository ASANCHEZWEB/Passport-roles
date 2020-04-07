//IMPORTACION DE EXPRESS Y METODO EXPRESS ROUTER PARA PODER EXPORTAR LAS RUTAS
const express = require("express");
const router = express.Router();
const passport = require("passport");
//IMPORTACION DEL MODELO USER PARA USARLO EN EL REGISTRO DE USUARIOS
const User = require("../../models/user");

router.get("/login", (req, res, next) => {
  res.render("auth-views/login", { message: req.flash("error") });
});

router.post("/login",passport.authenticate("local", {
    successRedirect: "/private-page",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true,
  })
);

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/login");
  });
module.exports = router;

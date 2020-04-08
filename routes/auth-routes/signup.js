//IMPORTACION DE EXPRESS Y METODO EXPRESS ROUTER PARA PODER EXPORTAR LAS RUTAS
const express = require("express");
const router = express.Router();

//IMPORTACION DEL MODELO USER PARA USARLO EN EL REGISTRO DE USUARIOS
const User = require("../../models/user");

//IMPORTACION DE BCRYPT PARA ENCRIPTACIONES
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

//RUTAS
//SOLICITO EL HBS CON EL FORMULARIO DE SIGNUP
router.get("/signup", (req, res, next) => {
  res.render("auth-views/signup");
});

//ENVIO EL USUARIO A LA BASE DE DATOS
router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  let role = "cliente";
  //Compruebo si se ha rellenado vacio
  if (username === "" || password === "") {
    res.render("auth-views/signup", {
      message: "Indicate username and password",
    });
    return;
  }
  //Compruebo si el username a registrar ya está registrado
  User.findOne({ username })
    .then((user) => {
      //En caso de que exista respondo ese mensaje
      if (user !== null) {
        res.render("auth-views/signup", {
          message: "The username already exists",
        });
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
      if (username === "Admin") {
        role = "Admin";
      }
      const newUser = new User({
        username,
        password: hashPass,
        role: role,
      });
      //En el caso de que no exista , creo un nuevo usuario con usando la instancia newUser.
      newUser.save((err) => {
        if (err) {
          //En caso de error responde ese mensaje
          res.render("auth-views/signup", { message: "Something went wrong" });
        } else {
          //Si se ha guardado bien en la db redirecciona a /.
          res.redirect("/");
        }
      });
    })
    //Si  lo anterior falla por lo que sea responde el catch con un error.
    .catch((error) => {
      next(error);
    });
});

module.exports = router;

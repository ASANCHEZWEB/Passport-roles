//IMPORTACION DE EXPRESS Y METODO EXPRESS ROUTER PARA PODER EXPORTAR LAS RUTAS
const express = require("express");
const router = express.Router();
const ensureLogin = require("connect-ensure-login");
const Notification = require("../../models/notification");

router.get("/notifications", ensureLogin.ensureLoggedIn(), (req, res) => {
  let userRole = false;
  if (req.user.role === "Admin") {
    userRole = true;
  }
  Notification.find()
    .then((notiArray) =>
      res.render("private-views/notifications.hbs", {
        user: userRole,
        nose: notiArray,
      })
    )
    .catch((errorCallback) => console.log(errorCallback));
});

router.post("/notifications", ensureLogin.ensureLoggedIn(), (req, res) => {
  const tittle = req.body.tittle;
  const description = req.body.description;

  const newNotification = new Notification({
    tittle: tittle,
    description: description,
  });

  newNotification.save((err) => {
    if (err) {
      //En caso de error responde ese mensaje
      res.render("private-views/notifications.hbs", {
        message: "Something went wrong",
      });
    } else {
      //Si se ha guardado bien en la db redirecciona a /notifications.
      res.redirect("/notifications");
    }
  });
});

module.exports = router;

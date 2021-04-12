const express = require("express");
const router = express.Router();
const mysql = require("mysql");

//middleware para comprobar si el  administrador ha cerrado sesion
router.use("/admin/", (peticion, respuesta, siguiente) => {
  if (!peticion.session.usuario) {
    peticion.flash("mensaje", "Debe iniciar sesión")
    respuesta.redirect("/inicio")
  } else {
    siguiente()
  }
})

module.exports = router

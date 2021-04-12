const express = require("express");
const router = express.Router();
const mysql = require("mysql");

var pool = mysql.createPool({
  connectionLimit: 20,
  host: "localhost",
  user: "root",
  password: "admin",
  database: "bd_tikets",
});


//RUTA QUE MUESTRA TODOS LOS TIKETS
/**********************************************************************************************/
router.get("/admin/index", (peticion, respuesta) => {
    pool.getConnection((err, connection) => {
        
        let consulta;
        let modificadorConsulta = ""

        let modificadorPagina = "";
        let pagina = 0;

        const busqueda = peticion.query.busqueda ? peticion.query.busqueda : ""
        const seleccion = peticion.query.seleccion ? peticion.query.seleccion : ""

        if (seleccion != "Seleccione" && busqueda != "") {
            
            modificadorConsulta = `
                WHERE
                ${seleccion} = '${busqueda}'`
            modificadorPagina = "";
        } else {
            pagina = peticion.query.pagina ? parseInt(peticion.query.pagina) : 0;

            if (pagina < 0) {
                pagina = 0;
            }
            modificadorPagina = `LIMIT 5 OFFSET ${pagina * 5}`;
        }

        consulta = `
            SELECT
            *
            FROM tikets
            ${modificadorConsulta}
            ORDER BY fecha_actualizacion DESC
            ${modificadorPagina}`

        connection.query(consulta, (error, filas, campos) => {
          respuesta.render("admin/index", {
                usuario: peticion.session.usuario,
                tikets: filas,
                busqueda: busqueda,
                seleccion: seleccion,
                pagina: pagina,
                mensaje: peticion.flash("mensaje")
            })
        })
        connection.release();
    })
})
/**********************************************************************************************/

//RUTA PARA CERRAR SESION Y DESTRUIR LA VARIABLE SESION
/**********************************************************************************************/
router.get("/admin/procesar_cerrar_sesion", (peticion, respuesta) => {

  peticion.session.destroy()
  respuesta.redirect("/")
})
/**********************************************************************************************/

//RUTA QUE RENDERIZA LA PAGINA AGREGAR TIKETS
/**********************************************************************************************/
router.get("/admin/agregar", (peticion, respuesta) => {
  respuesta.render("admin/agregar", {
    mensaje: peticion.flash("mensaje"),
    usuario: peticion.session.usuario
  })
})
/**********************************************************************************************/

//RUTA PARA PROCESAR Y AGREGAR TIKETS
/**********************************************************************************************/
router.post("/admin/procesar_agregar", (peticion, respuesta) => {
  pool.getConnection((err, connection) => {

    const consulta = `
        INSERT INTO
        tikets
        (usuario, estado, asunto)
        VALUES
        (
          ${connection.escape(peticion.body.usuario)},
          ${connection.escape(peticion.body.estado)},
          ${connection.escape(peticion.body.asunto)}
        )`
    
    connection.query(consulta, (error, filas, campos) => {
      const nuevoTiketId = filas.insertId
      peticion.flash("mensaje", `${nuevoTiketId}`)
      respuesta.redirect("/admin/index")
    })
    connection.release()
  })
})
/**********************************************************************************************/

//RUTA PARA EDITAR UN TIKET
/**********************************************************************************************/
router.get("/admin/editar/:id", (peticion, respuesta) => {
  pool.getConnection((err, connection) => {

    const consulta = `
      SELECT * FROM tikets
      WHERE
      id = ${connection.escape(peticion.params.id)}`
    
    
    connection.query(consulta, (error, filas, campos) => {

      let fecha_creacion = `${filas[0].fecha_creacion.getFullYear()}/${filas[0].fecha_creacion.getMonth() + 1}/${filas[0].fecha_creacion.getDate()} - ${filas[0].fecha_creacion.getHours()}:${filas[0].fecha_creacion.getMinutes()}:${filas[0].fecha_creacion.getSeconds()}`
      let fecha_actualizacion = `${filas[0].fecha_actualizacion.getFullYear()}/${filas[0].fecha_actualizacion.getMonth() + 1}/${filas[0].fecha_actualizacion.getDate()} - ${filas[0].fecha_actualizacion.getHours()}:${filas[0].fecha_actualizacion.getMinutes()}:${filas[0].fecha_actualizacion.getSeconds()}`
    
      if (filas.length > 0) {
        respuesta.render("admin/editar", {
          tikets: filas[0],
          mensaje: peticion.flash("mensaje"),
          fecha_creacion,
          fecha_actualizacion,
          usuario: peticion.session.usuario
        })
      } else {
        peticion.flash("mensaje", "Operación no permitida")
        respuesta.redirect("/admin/index")
      }
    })
    connection.release()
  })
})
/**********************************************************************************************/

//RUTA PARA PROCESAR Y EDITAR TIKET
/**********************************************************************************************/
router.post("/admin/procesar_editar", (peticion, respuesta) => {
  pool.getConnection((err, connection) => {

    const consulta = `
      UPDATE tikets
      SET
      estado = ${connection.escape(peticion.body.estado)},
      asunto = ${connection.escape(peticion.body.asunto)}
      WHERE
      id = ${connection.escape(parseInt(peticion.body.id))}`
    
    connection.query(consulta, (error, filas, campos) => {

      if (filas && filas.changedRows > 0) {
        peticion.flash("mensaje", "Tiket editado")
      } else {
        peticion.flash("mensaje", "Tiket no editado")
      }
      respuesta.redirect("/admin/index")
    })
    connection.release()
  })
})
/**********************************************************************************************/

//RUTA PARA ELIMINAR LOS TIKETS
/**********************************************************************************************/
router.get("/admin/procesar_eliminar/:id", (peticion, respuesta) => {
  pool.getConnection((err, connection) => {

    const consulta = `
      DELETE
      FROM
      tikets
      WHERE
      id = ${connection.escape(peticion.params.id)}`
    
    connection.query(consulta, (error, filas, campos) => {

      if (filas && filas.affectedRows > 0) {
        peticion.flash("mensaje", "Tiket eliminado")
      } else {
        peticion.flash("mensaje", "Tiket no eliminado")
      }
      respuesta.redirect("/admin/index")
    })
    connection.release()
  })
})
/**********************************************************************************************/

module.exports = router

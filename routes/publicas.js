const express = require("express")
const router = express.Router()
const mysql = require("mysql")
var path = require("path")

var pool = mysql.createPool({
    connectionLimit: 20,
    host: "localhost",
    user: "root",
    password: "admin",
    database: "bd_tikets",
});

//RUTA POR DEFECTO QUE RENDERIZA LA PAGINA DE INICIO
/**********************************************************************************************/
router.get("/", (peticion, respuesta) => {
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
            respuesta.render("index", {
                tikets: filas,
                busqueda: busqueda,
                seleccion: seleccion,
                pagina: pagina,
            })
        })
        connection.release();
    })
})
/**********************************************************************************************/

//RUTA INICIO DE SESION Y PROCESAR INICIO
/**********************************************************************************************/
router.get("/inicio", (peticion, respuesta) => {
    respuesta.render("inicio", { mensaje: peticion.flash("mensaje") });
})

router.post("/procesar_inicio", (peticion, respuesta) => {
    pool.getConnection((err, connection) => {
        
        const consulta = `
            SELECT *
            FROM usuarios
            WHERE
            correo = ${connection.escape(peticion.body.correo)} AND
            contrasena = ${connection.escape(peticion.body.contrasena)}`
        
        connection.query(consulta, (error, filas, campos) => {
            
            if (filas.length > 0) {

                peticion.session.usuario = filas[0].nombre

                respuesta.redirect("/admin/index");
            } else {
                peticion.flash("mensaje", "Datos inválidos");
                respuesta.redirect("/inicio");
            }
        });
        connection.release();
    });
});
/**********************************************************************************************/

//RUTA DETALLE TIKETS
/**********************************************************************************************/
router.get("/tikets/:id", (peticion, respuesta) => {
    pool.getConnection((err, connection) => {

       consulta = `
            SELECT
            *
            FROM tikets
            WHERE id = ${connection.escape(peticion.params.id)}`
        
            connection.query(consulta, (error, filas, campos) => {

            if (filas.length > 0) {
                respuesta.render("tiket", { tikets: filas[0] })
            } else {
                respuesta.redirect("/");
            }
        })
        connection.release();
    })
})
/**********************************************************************************************/

module.exports = router
const { attachment } = require('express/lib/response');
const conexion = require('../models/conexion.js');

let Contactos = {};

Contactos.mostrarTodos = (req, res) => {
    let sqlConsulta = 'SELECT * FROM contactos';
    conexion.query(sqlConsulta, (err, contactos) => {
        if(err) {
            console.log(err);
            res.render('contactos.html', {titulo: 'Contactos', consulta: 0, type: 'danger', message: 'Ocurrió un error al consultar los contactos.'});
        }
        else {
            res.render('contactos.html', {titulo: 'Contactos', results: contactos, consulta: 1, type: 'success', message: ''});
        }
    })
}

Contactos.insertar = (req, res) => {
    let contacto = req.body;
    let sqlConsulta = `INSERT INTO contactos VALUES (NULL, '${contacto.nombre}', '${contacto.domicilio}', ${contacto.telefono})`;
    conexion.query(sqlConsulta, (err, result) => {
        if(err) {
            console.log(err.message);
            res.render('contactos.html', {titulo: 'Contactos', consulta: 0, type: 'danger', message: 'Ocurrió un error al agregar el contacto.'});
        }
        else {
            res.render('contactos.html', {titulo: 'Contactos', consulta: 0, type: 'success', message: 'Se agregó correctamente. ID del contacto: ' + result.insertId});
        }
    });
}

Contactos.actualizar = (req, res) => {
    let contacto = req.body;
    let sqlConsulta = `UPDATE contactos 
                        SET nombre = '${contacto.nombre}', 
                        domicilio = '${contacto.domicilio}', 
                        telefono = '${contacto.telefono}' 
                        WHERE idContactos = '${contacto.idContacto}'`;
    conexion.query(sqlConsulta, (err, result) => {
        if(err) {
            console.log(err.message);
            res.render('contactos.html', {titulo: 'Contactos', consulta: 0, type: 'danger', message: 'Ocurrió un error al modificar el contacto.'});
        }
        else {
            if(result.affectedRows == 1) {
                res.render('contactos.html', {titulo: 'Contactos', consulta: 0, type: 'success', message: 'Se actualizó el contacto con el ID ' + contacto.idContacto +  ' correctamente.'});
            } 
            else {
                res.render('contactos.html', {titulo: 'Contactos', consulta: 0, type: 'danger', message: 'Ocurrió un error al modificar el contacto.'});
            }
        }
    })
}

Contactos.buscarId = (req, res) => {
    let data = req.query;
    let sqlConsulta = `SELECT * FROM contactos WHERE idContactos = ${data.idContacto}`;
    conexion.query(sqlConsulta, (err, contacto) => {
        if(err) {
            console.log(err.message);
            res.render('contactos.html', {titulo: 'Contactos', consulta: 0, type: 'danger', message: 'Ocurrió un error al buscar el contacto.'});
        }
        else {
            if(contacto[0]) {
                res.render('contactos.html', {titulo: 'Contactos', consulta: 2, type: 'success', message: '', result: contacto[0]});
            }
            else {
                res.render('contactos.html', {titulo: 'Contactos', consulta: 0, type: 'danger', message: 'No existe un contacto con el ID: ' + data.idContacto + '.'});
            }
        }
    })
}

Contactos.borrar = (req, res) => {
    let data = req.query;
    let sqlConsulta = 'DELETE FROM contactos WHERE idContactos = ?';
    conexion.query(sqlConsulta, (err, contacto) => {
        if(err) {
            console.log(err.message);
            res.render('contactos.html', {titulo: 'Contactos', consulta: 0, type: 'danger', message: 'Ocurrió un error al borrar el contacto.'});
        }
        else {
            res.render('contactos.html', {titulo: 'Contactos', consulta: 0, type: 'success', message: 'Contacto eliminado exitosamente.'});
        }
    })
}

module.exports = {Contactos};
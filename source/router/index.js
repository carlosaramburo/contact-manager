const express = require('express');
const router = express.Router();
const dbContactos = require('../models/contactos.js');
const mysql = require('mysql2');

// Rutas
router.get('/', (req, res) => {
    res.send('Trabajando servidor');
});

router.get('/index', (req, res) => {
    res.render('index.html', {titulo: 'Index'});
});

router.get('/acercade', (req, res) => {
    res.render('acercade.html', {titulo: 'Acerca de'});
});

router.get('/contactos', (req, res) => {
    res.render('contactos.html', {titulo: 'Contactos', consulta: 0, type: 'success', message: ''});
});

// Peticiones
router.get('/getContacts', dbContactos.Contactos.mostrarTodos);
router.get('/getContactById', dbContactos.Contactos.buscarId);
router.post('/insertContact', dbContactos.Contactos.insertar);
router.post('/updateContact', dbContactos.Contactos.actualizar);

router.get('*', (req, res) => {
    res.send('No existe la página.');
});

module.exports = router;
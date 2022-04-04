const express = require('express');
require('dotenv').config({path: './source/.env'});
const puerto = 3000;
const path = require('path');
const misRutas = require('./router/index');
const app = express();

// Configuraciones
// Motor de vistas
app.set('views engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Recursos públicos
app.use(express.static(path.join(__dirname, 'public')));

// Router
app.use(misRutas);

app.listen(puerto, ()=> {
    console.log('Iniciando el puerto');
})

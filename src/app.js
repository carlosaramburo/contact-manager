const express = require('express');
require('dotenv').config({path: './src/.env'});
const port = 3000;
const path = require('path');
const myRoutes = require('./router/index');
const app = express();

// Config
app.set('views engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Public Resources
app.use(express.static(path.join(__dirname, 'public')));

// Router
app.use(myRoutes);

app.listen(port, ()=> {
    console.log('App running on port ' + port);
})
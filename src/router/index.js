const express = require('express');
const router = express.Router();
const contactsDB = require('../models/contacts.js');

// Routes
router.get('/', (req, res) => {
    res.render('index.html');
});

router.get('/add', (req, res) => {
    res.render('newContact.html');
});

router.get('/edit', (req, res) => {
    res.render('editContact.html');
});

// API Requests
router.get('/getAllContacts', contactsDB.getAllContacts);
router.get('/getContactById/:id', contactsDB.getContactById);
router.post('/insertContact', contactsDB.insert);
router.put('/updateContact/:id', contactsDB.update);
router.delete('/deleteContact/:id', contactsDB.delete);

router.get('*', (req, res) => {
    res.send("This page doesn't exist");
});

module.exports = router;
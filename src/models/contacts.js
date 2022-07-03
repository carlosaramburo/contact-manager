const connection = require('./database.js');

module.exports = {
    getAllContacts: (req, res) => {
        let query = 'SELECT * FROM contacts';
        connection.query(query, (err, contactos) => {
            if(err) {
                console.log(err);
            }
            else {
                res.status(200).send(contactos);
            }
        })
    },
    
    getContactById: (req, res) => {
        const id = req.params.id;
        const query = "SELECT * FROM contacts WHERE idContact = ?";
        connection.query(query, [id], (err, contacto) => {
            if(err) {
                console.log(err.message);
                res.status(400).end();
            }
            else {
                if(contacto[0]) {
                    res.status(200).send(contacto[0]);
                }
                else {
                    res.status(400).end();
                }
            }
        })
    },
    
    insert: (req, res) => {
        const data = req.body;
        const query = "INSERT INTO contacts VALUES (NULL, ?, ?, ?, ?)";
        connection.query(query, [data.name, data.address, data.phoneNumber, data.gender], (err, result) => {
            if(err) {
                res.status(400).end();
            }
            else {
                if(result.affectedRows == 1) {
                    res.status(200).end();
                } 
                else {
                    res.status(400).end();
                }
            }
        });
    },
    
    update: (req, res) => {
        const id = req.params.id;
        const data = req.body;
        
        const query = "UPDATE contacts SET name = ?, address = ?, phoneNumber = ?, gender = ? WHERE idContact = ?";
        connection.query(query, [data.name, data.address, data.phoneNumber, data.gender, id], (err, result) => {
            if(err) {
                console.log(err.message);
                res.status(400).end();
            }
            else {
                if(result.affectedRows == 1) {
                    res.status(200).end();
                } 
                else {
                    res.status(400).end();
                }
            }
        })
    },
    
    delete: (req, res) => {
        const id = req.params.id;
        const query = 'DELETE FROM contacts WHERE idContact = ?';
        connection.query(query, [id], (err, result) => {
            if(err) {
                console.log(err.message);
                res.status(400).end();
            }
            else {
                if(result.affectedRows == 1){
                    res.status(200).end();
                }
                else {
                    res.status(400).end();
                }       
            }
        })
    }
}
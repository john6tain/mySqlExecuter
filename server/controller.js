const path = require('path');
const db = require('./db');


module.exports = {
    home: (req, res) => {
        res.sendFile(path.normalize(path.join(__dirname, '../public/index.html')));
    },
    config: (req, res) => {
        console.log(req.body);
        db.setUp(req.body);
        res.json({ message:'DB configurated succesfully' });
    },
    exec: (req, res) => {
        console.log(req.body);
        db.query(req.body.query).then((resolve) => {
            res.send(resolve.rows);
        }, (error) => {
            res.status(400).send(error);
            console.error('' + error);
        });   
    }
}
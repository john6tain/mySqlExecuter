const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
//const cors = require('cors');

module.exports = (app) => {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json({ extended: false }));
    // app.use(express.static(path.join(__dirname, 'public')));

    app.use(express.static('public', {
        dotfiles: 'ignore',
        etag: false,
        extensions: ['htm', 'html', 'js', 'css'],
        index: false,
        maxAge: '1d',
        redirect: false,
        setHeaders: function (res, path, stat) {
            res.set('x-timestamp', Date.now())
        }
    }))
    // Module to Allow Access Control Origin
    //app.use(cors());
};
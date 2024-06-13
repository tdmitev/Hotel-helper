const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const config = require('./config');

module.exports = (app) => {
    app.use(express.json());

    app.use(cookieParser());

    app.use(session({
        secret: 'odkf0sd9u_90asi09w3w9%$#wiudYG&6w%$#fty', 
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 3600000
        }
    }));

    app.use(cors({
        origin: ['http://localhost:4200', 'http://127.0.0.1:5000'],
        credentials: true
    }));

    // Log every request
    app.use((req, res, next) => {
        console.log(`${req.method} ${req.url}`);
        next();
    });

    app.use(express.static(path.resolve(__dirname, 'static')));

    // Error handling middleware
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });
};
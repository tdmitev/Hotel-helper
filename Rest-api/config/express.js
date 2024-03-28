const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cookieSecret = process.env.COOKIESECRET || 'TdMitev';
const { errorHandler } = require('../utils')
const session = require('express-session');

module.exports = (app) => {
    app.use(express.json());

    app.use(cookieParser(cookieSecret));

    app.use(session({
        secret: 'odkf0sd9u_90asi09w3w9%$#wiudYG&6w%$#fty', 
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 3600000
        }
      }));
  

    app.use(express.static(path.resolve(__basedir, 'static')));

    app.use(errorHandler);
};

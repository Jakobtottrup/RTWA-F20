const express = require('express');
const route = express.Router();

route.use((err, req, res, next) => {
    console.log('Error: ' + err.message);
    next();
});

route.use((req, res) => {
    res.type('text/html');
    res.status(404);
    res.render('errors/404');
});

route.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500);
    res.render('errors/500');
});

module.exports = route;

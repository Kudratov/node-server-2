/*jshint esversion: 6 */
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.set('view engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = now + ': ' + req.method + ' ' + req.url;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        console.log('Unable to connect server.log!!!');

    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintence.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to home page'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to connect to the server!!!'
    });
});

app.listen(port, () => {
    console.log('The server is using 3000-th port');
});
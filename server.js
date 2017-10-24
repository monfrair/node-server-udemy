const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
 next();
});


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

//app.use((req, res, next) => {
//    res.render('maintenance.hbs');
//        
//    });
    
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to the jungle',

    });
});

app.get('/about', function (req, res) {
    res.render('about.hbs', {
        pageTitle: 'About Page',

    });
});


app.get('/bad', function (req, res) {
    res.send({
        name: 'Bad request',
        reason: [
            'check connection',
            'you set it up wrong',
            'you have no f-ing idea what you are doing'
        ]
    });
});


app.listen(3000, function () {
    console.log('Sever is up on port 3000');
});

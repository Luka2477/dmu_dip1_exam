const express = require('express');
const app = express();
const session = require('express-session');

app.set('view engine', 'pug');
app.set('views', 'templates');

app.use(express.static('filer'));
app.use(express.json());
app.use(session({secret: 'hemmelig', saveUninitialized: true, resave: true}));

app.get('/', function (request, response) {

});

app.post('/', function (request, response) {

});

app.listen(8080);

console.log('Lytter på port 8080 ...');

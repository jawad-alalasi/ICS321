var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var session = require('express-session');
var db=require('./database');
 
var app = express();
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'front-end code')));
 
app.use(session({ 
    secret: '123456catr',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
 
 
/* GET home page. */
app.get('/', function(req, res, next) {
    /* res.render('contact-us', { title: 'Contact-Us' }) ; */
});
 
app.post('/contact-us', function(req, res, next) {
    var name = req.body.name;
    var age = req.body.age;
    var email = req.body.email;
    var phone = req.body.phone;
    var address = req.body.address
    var bloodtypei = req.body.bloodtype
 
    var sqlin = `INSERT INTO Person (name, age, email, phone, address) VALUES ("${name}", "${age}", "${email}", "${phone}", ${address}")`;
    db.query(sqlin, function(err, result) {
        if (err) throw err;
        console.log('record inserted');
    });

    var sqlina = `SELECT FROM Person (ID) WHERE Phone="${phone}"`;

    db.query(sqlina, function(err, result) {
        if (err) throw err;
        var idblo=result.id;
        console.log(result.id);
    });

    var sqlinb = `INSERT INTO BLOOD_TYPE (TYPE) VALUES ("${bloodtypei}") WHERE ID="${idblo}"`;

    db.query(sqlinb, function(err, result) {
        if (err) throw err;
        var idblo=result.id;
        console.log(result.id);
    });


    res.redirect('/');

});
 
app.get('/medicalhistory/:id', function(req, res, next) {
    var idhis=req.params.id
    var vc= `SELECT FROM MEDICAL_HISTORY WHERE ID="${idhis}" `
    db.query(vc, function(err, result) {
        if (err) throw err;
        var datam=result;
        console.log('record inserted');
    });

     res.render('medicalhistory.njk', datam) ; 
});






// port must be set to 3000 because incoming http requests are routed from port 80 to port 8080
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});
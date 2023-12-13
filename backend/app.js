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
 
app.post('/PERSON', function(req, res, next) {
    var name = req.body.name;
    var age = req.body.age;
    var email = req.body.email;
    var phone = req.body.phone;
    var address = req.body.address
    var bloodtypei = req.body.bloodtype
 
    var sqlin = `INSERT INTO Person (name, age, email, phone, address) VALUES ("${name}", "${age}", "${email}", "${phone}", "${address}")`;
    db.query(sqlin, function(err, result) {
        if (err) throw err;
        console.log('record inserted');
    });

    var sqlina = `SELECT FROM Person (ID) WHERE Phone="${phone}"`;

    db.query(sqlina, function(err, result) {
        if (err) throw err;
        let idblo=result.id;
        console.log();
        var sqlinb = `INSERT INTO BLOOD_TYPE (TYPE) VALUES ("${bloodtypei}") WHERE ID="${idblo}"`;

        db.query(sqlinb, function(err, result) {
            if (err) throw err;
            console.log('record inserted');
        });
    
    });

    res.redirect('/');

});
 
app.post('/medicalhistory', function(req, res, next) {
    var idhis=reg.body.id;
    var vc= `SELECT FROM MEDICAL_HISTORY WHERE ID="${idhis}" `;
    db.query(vc, function(err, result) {
        if (err) throw err;
        var datam=result;
        res.render('medicalhistory.njk', datam) 
        console.log('record inserted');
    });

     ; 
});


app.post('/users', function(req, res, next) {
    var username = req.body.Username;
    var id = req.body.id;
    var password = req.body.password;
    var role = req.body.role;

 
    var sqlin = `INSERT INTO users (username, password, id, role) VALUES ("${username}", "${password}", "${id}", "${role}")`;
    db.query(sqlin, function(err, result) {
        if (err) throw err;
        console.log('record inserted');
    });

});


app.get('/procecs', function(req, res, next) {

    var vc= `SELECT * FROM REQUEST `;
    db.query(vc, function(err, result) {
        if (err) throw err;
        var requestsf=result
        res.render('procecs.njk', requestsf) 
        console.log('record inserted');
    });
  
});
app.get('/bloodrive', function(req, res, next) {
    res.render('bloodrive.html') ;
});

app.post('/bloodrive', function(req, res, next) {
    var from = req.body.from;
    var to = req.body.to;
    var location = req.body.location;
    
    var sqlin = `INSERT INTO BLOOD_DRIVE (FROM_DATE, TO_DATE, LOCATION) VALUES ("${from}", "${to}", "${location}")`;
    db.query(sqlin, function(err, result) {
        if (err) throw err;
        console.log('record inserted');
    });
  /*res.redirect()*/
});

app.post('/bloodcount', function(req, res, next) {
    var sqlcoun = "SELECT blood_type.TYPE AS `blood type`,COUNT(blood_type.TYPE) AS `count`FROM blood_type GROUP BY blood_type.TYPE";
    db.query(sqlcoun, function(err, result) {
        if (err) throw err;
        res.render('bloodcount', result) 
        console.log('record inserted');
    });
  /*res.redirect()*/
});
app.post('/COLLOCTION', function(req, res, next) {
    var sqlcoun = "SELECT blood_drive.NUMBER, COUNT(blood_drive_donation.SAMPLE_NUMBER) AS expr1 FROM blood_drive_donation INNER JOIN blood_drive ON blood_drive_donation.NUMBER = blood_drive.NUMBERGROUP BY blood_drive.NUMBER";
    db.query(sqlcoun, function(err, result) {
        if (err) throw err;
        res.render('COLLOCTION', result) 
        console.log('record inserted');
    });
  /*res.redirect()*/
});
app.post('/Paymentcon', function(req, res, next) {
    var sqlcoun = "SELECT receive.ID, receive.SAMPLE_NUMBER, person.NAME FROM receive INNER JOIN recipient ON receive.ID = recipient.ID INNER JOIN person ON recipient.ID = person.ID WHERE receive.PAYMENT = 1";
    db.query(sqlcoun, function(err, result) {
        if (err) throw err;
        res.render('Paymentcon', result) 
        console.log('record inserted');
    });
  /*res.redirect()*/
});
app.post('/report1', function(req, res, next) {
    var date=req.body.date;
    if (date) {
        var sqlcoun = "SELECT donate.ID, person.NAME FROM donate INNER JOIN donor ON donate.ID = donor.ID INNER JOIN person ON donor.ID = person.ID ";
        db.query(sqlcoun, function(err, result) {
            if (err) throw err;
            res.render('repor1', result) 
            console.log('record inserted');
        });
    }else{
    var sqlcoun = "SELECT donate.ID, person.NAME FROM donate INNER JOIN donor ON donate.ID = donor.ID INNER JOIN person ON donor.ID = person.ID WHERE ID < 8";
    db.query(sqlcoun, function(err, result) {
        if (err) throw err;
        res.render('repor1', result) 
        console.log('record inserted');
    });}
  /*res.redirect()*/
});
app.post('/report0', function(req, res, next) {
    var date=req.body.date;
    if (date) {
        var sqlcoun = "SELECT person.NAME, receive.SAMPLE_NUMBER, person.ID FROM recipient INNER JOIN person ON recipient.ID = person.ID INNER JOIN receive ON receive.ID = recipient.ID ";
        db.query(sqlcoun, function(err, result) {
            if (err) throw err;
            res.render('repor0', result) 
            console.log('record inserted');
        });
    }else{
    var sqlcoun = "SELECT person.NAME, receive.SAMPLE_NUMBER, person.ID FROM recipient INNER JOIN person ON recipient.ID = person.ID INNER JOIN receive ON receive.ID = recipient.ID WHERE ID < 8";
    db.query(sqlcoun, function(err, result) {
        if (err) throw err;
        res.render('repor0', result) 
        console.log('record inserted');
    });}
  /*res.redirect()*/
});

// port must be set to 3000 because incoming http requests are routed from port 80 to port 8080
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mysql = require('mysql2');

var app = express();
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', express.static(__dirname + 'views'))
app.use('/user', express.static(path.join(__dirname, 'views')))
app.use('/admin', express.static(path.join(__dirname, 'views')))
app.use(express.static(path.join(__dirname, 'views')));
var con = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "pass",
    database: "mydatabase",
    dateStrings: true,
    multipleStatements: true
  });

  app.get('/admin', (req, res) => {
    res.render('admin_homepage')
  })

  app.get('/admin/search', (req, res) => {
       res.render('search_donor_recipient_history')
     })


     app.post('/admin/search', (req, res) => {
      var idhis=req.body.id;
      
    var vc= `SELECT * FROM MEDICAL_HISTORY WHERE ID="${idhis}" ; SELECT receive.SAMPLE_NUMBER, receive.DATE FROM recipient INNER JOIN person ON recipient.ID = person.ID INNER JOIN receive ON receive.ID = recipient.ID WHERE recipient.ID = "${idhis}"; SELECT donate.DATE, donate.SAMPLE_NUMBER FROM donate WHERE donate.ID = "${idhis}"  `;
    /*var c= `SELECT * FROM person WHERE ID="${idhis}" ;SELECT * FROM MEDICAL_HISTORY WHERE ID="${idhis}"`;*/     /*to do multiple stetment must look like this */
      con.query(vc, function(err, result) {
        if (err) throw err;
        res.render('search_donor_recipient_history0',{title : 'USER DETAILS', users:result[0], m:result[1], v:result[2]} ) ;
        console.log(result[1]);

    });

    })
    app.get('/admin/persons', (req, res) => {
      var vc= `SELECT person.NAME, person.AGE, person.EMAIL, person.PHONE, person.ADDRESS, blood_type.TYPE,person.ID FROM blood_type INNER JOIN person ON blood_type.ID = person.ID `;
        con.query(vc, function(err, result) {
          if (err) throw err;
          res.render('admin_donor_recipient_information',{title : 'USER DETAILS', users:result} ) ;
      });

    })
    app.get('/admin/persons/add', (req, res) => {
          res.render('admin_add_donor_recipient') ;
    })

    app.post('/admin/persons/add', function(req, res, next) {
      var name = req.body.name;
      var age = req.body.age;
      var email = req.body.email;
      var phone = req.body.phone;
      var address = req.body.address;
      var bloodtypei = req.body.bloodtype;
   
      var sqlin = `INSERT INTO Person (name, age, email, phone, address) VALUES ("${name}", "${age}", "${email}", "${phone}", "${address}")`; 
      con.query(sqlin, function(err, result) {
          if (err) throw err;
          console.log('record inserted');
              });
var sqlinq = `SELECT ID FROM Person WHERE Phone="${phone}"`;
con.query(sqlinq, function(err, resultx) {
                if (err) throw err;
                var idb=resultx[0].ID;
                console.log(idb);
      var sqlinB = `INSERT INTO blood_type(id,TYPE ,DETAILS) VALUES("${idb}","${bloodtypei}","Details")`; 
      con.query(sqlinB, function(err, result) {
                  if (err) throw err;
                  console.log('record inserted');
                  res.redirect('/admin/persons')
                      });

                    });
    });
    
    app.get('/admin/persons/delete/:id', (req, res) => {
      var idc=req.params.id;
      var vc= `DELETE FROM blood_type WHERE ID="${idc}"`;
        con.query(vc, function(err, result) {
          if (err) throw err;
      });   
      var vc= `DELETE FROM Person WHERE ID="${idc}"`;
      con.query(vc, function(err, result) {
        if (err) throw err;
        res.redirect('/admin/persons')
    });   
    
    });

    app.get('/admin/edit/:id', (req, res) => {
      var idc=req.params.id;
      var vc= `SELECT person.NAME, person.AGE, person.EMAIL, person.PHONE, person.ADDRESS, blood_type.TYPE,person.ID FROM blood_type INNER JOIN person ON blood_type.ID = person.ID WHERE person.ID="${idc}"`;
        con.query(vc, function(err, result) {
          if (err) throw err;
          res.render('admin_edit_donor_recipient',{title : 'USER DETAILS', users:result} )
      });   
   })


   app.post('/admin/edit/:id', function(req, res, next) {
    var name = req.body.name;
    var age = req.body.age;
    var email = req.body.email;
    var phone = req.body.phone;
    var address = req.body.address;
    var bloodtypei = req.body.bloodtype;
    var idb=req.params.id; 
    var sqlin = `update Person set name="${name}", age="${age}", email="${email}", phone="${phone}", address="${address}" where ID="${idb}"`; 
    con.query(sqlin, function(err, result) {
        if (err) throw err;
        console.log('record inserted');
            });
    var sqlinB = `update blood_type set TYPE="${bloodtypei}" where ID="${idb}"`; 
    con.query(sqlinB, function(err, result) {
                if (err) throw err;
                console.log('record inserted');
                res.redirect('/admin/persons')
                    });      
  });

  app.get('/admin/users', (req, res) => {
    var vc= `SELECT person.ID, uesr.USERNAME, uesr.ROLE, person.EMAIL FROM uesr INNER JOIN person ON uesr.ID = person.ID `;
      con.query(vc, function(err, result) {
        if (err) throw err;
        res.render('admin_system_user_information',{title : 'USER DETAILS', users:result} ) ;
    });

  })
  app.get('/admin/users/add', (req, res) => {
        res.render('admin_add_system_user') ;


  })

  app.post('/admin/users/add', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var role = req.body.Role;
    var idc=req.body.id;

 
    var sqlin = `INSERT INTO uesr (username, PASWORD, role,id ) VALUES ("${username}", "${password}", "${role}","${idc}")`;
    con.query(sqlin, function(err, result) {
        if (err) throw err;
        console.log('record inserted');
        res.redirect('/admin/users');
    });

});
app.get('/admin/user/delete/:id', (req, res) => {
  var idc=req.params.id;
  var vc= `DELETE FROM uesr WHERE ID="${idc}"`;
    con.query(vc, function(err, result) {
      if (err) throw err;
      res.redirect('/admin/users');
      });  

});
app.get('/admin/user/edit/:id', (req, res) => {
  var idc=req.params.id;
  var vc= `SELECT uesr.USERNAME, uesr.ROLE, person.EMAIL FROM uesr INNER JOIN person ON uesr.ID = person.ID where person.ID="${idc}"`;
    con.query(vc, function(err, result) {
      if (err) throw err;
      res.render('admin_edit_system_user',{title : 'USER DETAILS', users:result} );
      });  

});

app.post('/admin/user/edit/:id', function(req, res, next) {
  var role = req.body.role;
  var username = req.body.username;
  var email = req.body.email;
  var idb=req.params.id; 

  var sqlin = `update uesr set USERNAME="${username}", ROLE="${role}" where ID="${idb}"`; 
  con.query(sqlin, function(err, result) {
      if (err) throw err;
      console.log('record inserted');
          });
  var sqlinB = `update person set EMAIL="${email}" where ID="${idb}"`; 
  con.query(sqlinB, function(err, result) {
              if (err) throw err;
              console.log('record inserted');
                  });      
});

app.get('/admin/report', (req, res) => {
  res.render('admin_generate_reports') ;
})

app.get('/admin/recived', (req, res) => {
  res.render('admin_list_received_donations 0') ;
})

app.get('/admin/Received/month', (req, res) => {
  var sqlcoun = "SELECT receive.DATE, receive.SAMPLE_NUMBER, person.NAME, person.ID FROM receive INNER JOIN recipient ON receive.ID = recipient.ID INNER JOIN person ON recipient.ID = person.ID WHERE receive.DATE >= CURDATE() - 31";
  con.query(sqlcoun, function(err, result) {
      if (err) throw err;
      res.render('admin_list_received_donations', {title : 'USER DETAILS', users:result}) 
      console.log('record inserted');
  });
})
app.get('/admin/Received/week', (req, res) => {
  var sqlcoun = "SELECT receive.DATE, receive.SAMPLE_NUMBER, person.NAME, person.ID FROM receive INNER JOIN recipient ON receive.ID = recipient.ID INNER JOIN person ON recipient.ID = person.ID WHERE receive.DATE >= CURDATE() - 7";
  con.query(sqlcoun, function(err, result) {
      if (err) throw err;
      res.render('admin_list_received_donations', {title : 'USER DETAILS', users:result}) 
      console.log('record inserted');
  });
})
app.get('/admin/donated', (req, res) => {
  res.render('admin_list_donated_donations 0') ;
})

app.get('/admin/donated/month', (req, res) => {
  var sqlcoun = " SELECT person.NAME, person.ID, donate.DATE, donate.SAMPLE_NUMBER FROM donor INNER JOIN person ON donor.ID = person.ID INNER JOIN donate ON donate.ID = donor.ID WHERE donate.DATE >= CURDATE() - 31";
  con.query(sqlcoun, function(err, result) {
      if (err) throw err;
      res.render('admin_list_donated_donations', {title : 'USER DETAILS', users:result}) 
      console.log('record inserted');
  });
})
app.get('/admin/donated/week', (req, res) => {
  var sqlcoun = "SELECT person.NAME, person.ID, donate.DATE, donate.SAMPLE_NUMBER FROM donor INNER JOIN person ON donor.ID = person.ID INNER JOIN donate ON donate.ID = donor.ID WHERE donate.DATE >= CURDATE() - 7";
  con.query(sqlcoun, function(err, result) {
      if (err) throw err;
      res.render('admin_list_donated_donations', {title : 'USER DETAILS', users:result}) 
      console.log('record inserted');
  });
})
app.get('/admin/amount', (req, res) => {
  var sqlcoun = "SELECT blood_type.TYPE,COUNT(blood_type.TYPE) AS `count`FROM blood_type GROUP BY blood_type.TYPE";
  con.query(sqlcoun, function(err, result) {
      if (err) throw err;
      res.render('admin_aggregated_amount', {title : 'USER DETAILS', users:result}) 
      console.log("result");
  });
})
app.get('/admin/collcot', function(req, res, next) {
  var sqlcoun = "SELECT blood_drive.NUMBER, COUNT(blood_drive_donation.SAMPLE_NUMBER) AS count FROM blood_drive_donation INNER JOIN blood_drive ON blood_drive_donation.NUMBER = blood_drive.NUMBER GROUP BY blood_drive.NUMBER";
  con.query(sqlcoun, function(err, result) {
      if (err) throw err;
      res.render('admin_collection_drive_report', {title : 'USER DETAILS', users:result}) 
      console.log('record inserted');
  });
/*res.redirect()*/
});

app.get('/admin/Paymentcon', function(req, res, next) {
  var sqlcoun = "SELECT receive.ID, receive.SAMPLE_NUMBER, person.NAME FROM receive INNER JOIN recipient ON receive.ID = recipient.ID INNER JOIN person ON recipient.ID = person.ID WHERE receive.PAYMENT = 1";
  con.query(sqlcoun, function(err, result) {
      if (err) throw err;
      res.render('admin_confirmed_payments',  {title : 'USER DETAILS', users:result}) 
      console.log('record inserted');
  });
});
app.get('/admin/blooddrive', function(req, res, next) {
  var sqlcoun = "SELECT * FROM blood_drive";
  con.query(sqlcoun, function(err, result) {
      if (err) throw err;
      res.render('admin_initiate_blood_collection_drive',  {title : 'USER DETAILS', users:result}); 
      console.log('result');
  });
   ;
});

app.post('/admin/blooddrive', function(req, res, next) {
  var from = req.body.from;
  var to = req.body.to;
  var location = req.body.location;
  
  var sqlin = `INSERT INTO BLOOD_DRIVE (FROM_DATE, TO_DATE, LOCATION) VALUES ("${from}", "${to}", "${location}")`;
  con.query(sqlin, function(err, result) {
      if (err) throw err;
      console.log('record inserted');
      res.redirect('/admin/blooddrive');
  });
/*res.redirect()*/
});

app.get('/admin/Process', function(req, res, next) {
  var sqlcoun = "SELECT request.REQUEST_ID, person.name, request.DATE, recipient.ID, blood_type.TYPE FROM recipient INNER JOIN person  ON recipient.ID = person.ID INNER JOIN request ON recipient.REQUEST_ID = request.REQUEST_ID INNER JOIN blood_type ON blood_type.ID = person.ID";
  con.query(sqlcoun, function(err, result) {
      if (err) throw err;
      res.render('admin_process_request_blood',  {title : 'USER DETAILS', users:result}); 
      console.log('result');
  });
   ;
});


app.get('/admin/Process/:id', function(req, res, next) {
  var x=req.params.id;
  
  var sqlcoun = `SELECT blood__inventory.SAMPLE_NUMBER, blood__inventory.SAMPLE_DATE, blood_type.TYPE FROM blood_type INNER JOIN person ON blood_type.ID = person.ID INNER JOIN donor ON donor.ID = person.ID INNER JOIN donate  ON donate.ID = donor.ID INNER JOIN blood__inventory ON donate.SAMPLE_NUMBER = blood__inventory.SAMPLE_NUMBER;SELECT request.REQUEST_ID, request.DATE, recipient.ID, blood_type.TYPE FROM recipient INNER JOIN person  ON recipient.ID = person.ID INNER JOIN request ON recipient.REQUEST_ID = request.REQUEST_ID INNER JOIN blood_type ON blood_type.ID = person.ID where person.ID = "${x}";`
  con.query(sqlcoun, function(err, result) {
      if (err) throw err;
      res.render('admin_process_blood_request',  {title : 'USER DETAILS', users:result[0],m:result[1]}); 
      console.log(result);
  });
   ;
});

app.get('/admin/Process/:id/:num', function(req, res, next) {
  var xw=req.params.id;
  var ws=req.params.num;
  console.log(xw);
  console.log(ws);
  var sqlcounw = `INSERT INTO receive(DATE ,PAYMENT ,SAMPLE_NUMBER,ID ,acepted) VALUES(CURDATE(),0,"${xw}","${ws}",0 );`
  con.query(sqlcounw, function(err, result) {
      if (err) throw err;
      res.redirect('/admin/Process')
      console.log('result');
  });
});
app.get('/user/:id/pay', function(req, res, next) {
  var x= req.params.id;
  var w=`SELECT blood_type.TYPE,receive.SAMPLE_NUMBER,receive.DATE,receive.ID FROM receive INNER JOIN blood__inventory ON receive.SAMPLE_NUMBER = blood__inventory.SAMPLE_NUMBER INNER JOIN donate  ON donate.SAMPLE_NUMBER = blood__inventory.SAMPLE_NUMBER INNER JOIN donor  ON donate.ID = donor.ID INNER JOIN person ON donor.ID = person.ID INNER JOIN blood_type ON blood_type.ID = person.ID WHERE receive.ID = "${x}" AND receive.PAYMENT = 0 AND receive.acepted = 1 `/* change to acpt 1 */
  con.query(w, function(err, result) {
      if (err) throw err;
      res.render('user_myPayments', {title : 'USER DETAILS', users:result}) 
  });

});

app.get('/user/:id/pay/:samnum', function(req, res, next) {
  var x= req.params.id;
  var w=req.params.samnum;
  var vc= `UPDATE receive SET PAYMENT = 1  WHERE ID="${x}" and SAMPLE_NUMBER="${w}"`;

  con.query(vc, function(err, result) {
      if (err) throw err;
      console.log('record inserted');
      res.redirect('/user/:id/pay')
  });

});
app.get('/user/:id', (req, res) => {
  var x= req.params.id;
  res.render('user_homepage',{id:x })
})


app.get('/user/:id/agree', function(req, res, next) {
  var x= req.params.id;
  var vc= `SELECT receive.ID, blood__inventory.SAMPLE_DATE, receive.SAMPLE_NUMBER, blood_type.TYPE FROM receive INNER JOIN blood__inventory ON receive.SAMPLE_NUMBER = blood__inventory.SAMPLE_NUMBER INNER JOIN donate ON donate.SAMPLE_NUMBER = blood__inventory.SAMPLE_NUMBER INNER JOIN donor ON donate.ID = donor.ID INNER JOIN person ON donor.ID = person.ID INNER JOIN blood_type ON blood_type.ID = person.ID WHERE receive.ID = "${x}" and receive.acepted=0 `;
  con.query(vc, function(err, result) {
      if (err) throw err;
      var requestsf=result
      res.render('user_blood_requests', {title : 'USER DETAILS', users:result}) 
      console.log('record inserted');
  });

});

app.get('/user/:id/agree/:samnum', function(req, res, next) {
  var x= req.params.samnum ;
  var w=req.params.id;
  var vc= `UPDATE receive SET acepted = "1" WHERE SAMPLE_NUMBER = "${x}" and id="${w}"`;

  con.query(vc, function(err, result) {
      if (err) throw err;
      console.log('record inserted');
      res.redirect(`/user/${w}/agree`)

  });

});
app.get('/user/:id/edit', (req, res) => {
  var idc=req.params.id;
  var vc= `SELECT person.NAME, person.AGE, person.EMAIL, person.PHONE, person.ADDRESS, blood_type.TYPE,person.ID FROM blood_type INNER JOIN person ON blood_type.ID = person.ID WHERE person.ID="${idc}"`;
    con.query(vc, function(err, result) {
      if (err) throw err;
      res.render('user_myProfile_edit',{title : 'USER DETAILS', users:result} )
  });   
})


app.post('/user/:id/edit', function(req, res, next) {
var name = req.body.name;
var age = req.body.age;
var email = req.body.email;
var phone = req.body.phone;
var address = req.body.address;
var bloodtypei = req.body.bloodtype;
var idb=req.params.id; 
var sqlin = `update Person set name="${name}", age="${age}", email="${email}", phone="${phone}", address="${address}" where ID="${idb}"`; 
con.query(sqlin, function(err, result) {
    if (err) throw err;
    console.log('record inserted');
        });
var sqlinB = `update blood_type set TYPE="${bloodtypei}" where ID="${idb}"`; 
con.query(sqlinB, function(err, result) {
            if (err) throw err;
            console.log('record inserted');
            res.redirect(`/user/${idb}`)
                });      
});
app.get('/user/:id/search', (req, res) => {
  var idhis=req.params.id;
  
  var vc= `SELECT * FROM MEDICAL_HISTORY WHERE ID="${idhis}" ; SELECT receive.SAMPLE_NUMBER, receive.DATE FROM recipient INNER JOIN person ON recipient.ID = person.ID INNER JOIN receive ON receive.ID = recipient.ID WHERE recipient.ID = "${idhis}"; SELECT donate.DATE, donate.SAMPLE_NUMBER FROM donate WHERE donate.ID = "${idhis}"  `;
/*var c= `SELECT * FROM person WHERE ID="${idhis}" ;SELECT * FROM MEDICAL_HISTORY WHERE ID="${idhis}"`;*/     /*to do multiple stetment must look like this */
  con.query(vc, function(err, result) {
    if (err) throw err;
    res.render('user_my_history',{title : 'USER DETAILS', users:result[0], m:result[1],v:result[2]} ) ;
    console.log('hisgot');

});});

app.get('/', (req, res) => {
  res.render('login_page')
})
app.get('/guest', (req, res) => {
  res.render('guest')
})
       /* */
app.listen(3000, function () {
      console.log('Node app is running on port 3000');
  });




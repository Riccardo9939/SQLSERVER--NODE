var express = require('express');
var router = express.Router();
const sql = require('mssql');
var createError = require('http-errors');

const config = {
  user: 'campari.riccardo',  //Vostro user name
  password: 'xxx123#', //Vostra password
  server: "213.140.22.237",  //Stringa di connessione
  database: 'campari.riccardo', //(Nome del DB)
}

//Function to connect to database and execute query
let executeQuery = function (res, query, next) {
  sql.connect(config, function (err) {
    if (err) { //Display error page
      console.log("Error while connecting database :- " + err);
      res.status(500).json({success: false, message:'Error while connecting database', error:err});
      return;
    }
    var request = new sql.Request(); // create Request object
    request.query(query, function (err, result) { //Display error page
      if (err) {
        console.log("Error while querying database :- " + err);
        res.status(500).json({success: false, message:'Error while querying database', error:err});
        sql.close();
        return;
      }
      MandaPug(res,result.recordset);
      return;
    });



  });
}

let MandaPug = function (res,recordset) {
    let cl = recordset[0];
    res.render('dettagli', {
        title:'INFROMAZIONI CARTA',
        cl: cl,
    })
}

/* GET users listing. */
router.get('/:Unit', function (req, res, next) {
  let sqlQuery = `select * from dbo.[cr-unit-attributes] WHERE Unit = '${req.params.Unit}'`;
  executeQuery(res, sqlQuery, next);
});


module.exports = router;
var mysql = require('mysql');
require('dotenv').config();

// var con = mysql.createConnection({
//   host: process.env.host,
//   database: process.env.database,
//   user: process.env.user,
//   password: process.env.password,
//   port:process.env.port
// });

var con = mysql.createConnection({
  host: 'localhost', 
  database:'testdb',
  user: 'root',
  password: 'Hemant123456@', 
});


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// con.query("show databases",function(err,result){
//     if(!err)
//     {
//         console.log("res : ",result);
//     }
// });

// con.query("show tables",function(err,result){
//   if(!err)
//   {
//       console.log("res : ",result);
//   }
// });

module.exports=con;
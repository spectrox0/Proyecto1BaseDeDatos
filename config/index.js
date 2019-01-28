var mysql      = require('mysql');
var mysqlconnection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '2413180s',
  insecureAuth :true

});


mysqlconnection.connect((err)=>{

    if (!err)
    console.log('DB connection succeded');
    else
    console.log('DB connection failed\n'+ JSON.stringify);
});
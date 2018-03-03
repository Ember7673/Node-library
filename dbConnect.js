var mysql = require('mysql');

var pool = mysql.createPool({
    host : 'localhost',
    port : 3306,
    database : 'test',
    user : 'root',
    password : '',
    multipleStatements : true
});

// pool.connect();
// var sql = ' SELECT * FROM BOOK';
// pool.query(sql,function(err, result) {
//     if(err) {
//         console.log(err.message)
//         return
//     }else {
//         result
//     }
// })
// pool.end();
module.exports = pool;

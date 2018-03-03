var express = require('express');
var router = express.Router();
var pool = require('../dbConnect.js');

router.get('/',function(req,res) {
	pool.getConnection(function(err,connection) {
		if(err) {
			console.log('error person')
		}else {
			var sql = 'select * from user;';
			connection.query(sql,function(err,result) {
				if(err) {
					console.log('query error')
				}else {
					console.log(result)
					res.render('person',{
						personinfo: result
					})
				}
			})
		}
		connection.release();
	})
});
module.exports = router;

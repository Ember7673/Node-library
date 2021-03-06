var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var pool = require('../dbConnect.js');

//登陆页面
router.get('/',function(req,res) {
	// res.sendFile(__viewPath + 'login.html')
	res.render('login');
});

//登陆操作
router.post('/do_login',function(req,res) {
	req.on('data',function(data) {
		var input = JSON.parse(data.toString());
		pool.getConnection(function(err,connection) {
			if(err) {
				console.log('connect error');
			}else {
				console.log('connect success');
				var query = 'select * from user where username="'+input.username+'" and password="'+input.password+'"';
				connection.query(query,function(err,result){
					var flag = "";
					if(err) {
						console.log("err");
						flag = "fail";
					}else{
						if(result == null || result == "" ||result == undefined) {
							// res.redirect('./login.html');
							flag = "fail";
						}else{
							// res.redirect('./index.html');
							flag = "success";
							var user = result[0];
        					req.session.user = user;
							sessionStorage.setItem('is_login', true)
						}
					}
					console.log(req.session.user)
					connection.release();
					res.send(flag);
				})
			}
		})
	})
})

module.exports = router;
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const usersRouter = require('./src/users');
const config = require('./config');

const app = express();
const port = config.servers.api.port || process.env.PORT || '3000';
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/dist'));

app.use('/users', usersRouter);

//DB Connection
const dbConnection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'gozldwmf327',
	database: 'loginExperiments',
}); 

app.post('/post/id', (request, response) => {
	let userID = request.body.userID;

	let idCheckSql = 'SELECT * FROM userData where userId = ?'
	dbConnection.query(idCheckSql, userID, function(err, result) {
		if(result.length > 0) {
			let responseData =
				  {'result': 'goInputPwd', 'userID': userID};
				response.json(responseData);
		} else {
			let responseData =
				  {'result': 'pleaseReInputId', 'userID': userID};
				response.json(responseData);
		}
	  });
});

app.post('/post/pwd', (request, response) => {
	let userID = request.body.userID;
	let userPW = request.body.userPW;
	let pwdCheckSql = 'SELECT * FROM userData where userId = ? AND userPwd = ?'
	dbConnection.query(pwdCheckSql, [userID, userPW], function(err, result) {
		if(result.length > 0) {
			console.log(" !!! " + result);
			let responseData =
				  {'result': 'correctPwd', 'userID': userID, 'userPW': userPW};
				response.json(responseData);
		} else {
			console.log("???" + result);
			let responseData =
				  {'result': 'incorrectPwd', 'userID': userID, 'userPW': userPW};
				response.json(responseData);
		}
	  });
});

app.post('/post/signUp', (request, response) => {
	let userID = request.body.userID;
	let requestPW = request.body.requestPW;

	let insertUserDataSql = 'INSERT INTO userData(userId, userPwd) VALUES(?, ?);';
	dbConnection.query(insertUserDataSql, [userID, requestPW], function(err, result) {
		if(err) {
			console.log(err);
			return;
		}
		let responseData = {'result': 'signUpComplete', 'userID': userID, 'requestPW': requestPW};
		response.json(responseData);
	})
})


app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
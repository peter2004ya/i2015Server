var express = require('express');
var mongodb = require('mongodb');
var moment = require('moment');
var app = express();

var mongodURL = 'mongodb://ipeter2004ya:2ulxjudd@ds031893.mongolab.com:31893/signup';
var myDB;

mongodb.MongoClient.connect(mongodURL, function(err, db) {
	if (err) {
		console.log('connect mongo db error ' + err);
	} else {
		console.log('connect mongo db success');
		myDB = db;
	}
});

app.get('/user/signup', function(request, response) {
	var item = {
		NM : request.query.NM,
		MP : request.query.MP,
		Email : request.query.Email,
		User : request.query.User,
		Password : request.query.Password
	}
	var collection = myDB.collection('Member_Account_and_Password');
	collection.insert(item, function(err, result) {
		if (err) {
			response.status(406).send(err).end();
		} else {
			response.type('application/json');
			response.status(200).send(result).end();
		}
	});
});

app.get('/user/login', function(request, response) {
	var collection = myDB.collection('Member_Account_and_Password');
	collection.find({User : request.query.User}).toArray(function(err, docs){
		if (err) {
			response.status(406).send(err).end();
		} else {
			response.type('application/json');
			response.status(200).send(docs).end();
		}
	});
});

app.get('/store/login', function(request, response) {
	var collection = myDB.collection('Store_Account_and_Password');
	collection.find({Store : request.query.Store}).toArray(function(err, docs) {
		if (err) {
			response.status(406).send(err).end();
		} else {
			response.type('application/json');
			response.status(200).send(docs).end();
		}
	});
});

app.get('/store/menu', function(request, response) {
	var collection = myDB.collection('Store_Menu');
	collection.find({name : request.query.name}).toArray(function(err, docs) {
		if (err) {
			response.status(406).send(err).end();
		} else {
			response.type('application/json');
			response.status(200).send(docs).end();
		}
	});
});

app.get('/store/id', function(request, response) {
	var collection = myDB.collection('Store_ID');
	collection.find({name : request.query.name}).toArray(function(err, docs) {
		if (err) {
			response.status(406).send(err).end();
		} else {
			response.type('application/json');
			response.status(200).send(docs).end();
		}
	});
});

app.get('/order', function(request, response) {
	var collection = myDB.collection('X_Order');
	collection.find({rid : request.query.rid}).toArray(function(err, docs) {
		if (err) {
			response.status(406).send(err).end();
		} else {
			response.type('application/json');
			response.status(200).send(docs).end();
		}
	});
});






app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
});

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
});

app.listen(process.env.PORT || 5000);
console.log('port ' + (process.env.PORT || 5000));
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var db = require('./service/init-db');

var app = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.get('origin'));
    res.header("Access-Control-Allow-Credentials", 'true');
    res.header("Access-Control-Allow-Methods", 'GET, POST, PUT');
    res.header("Access-Control-Allow-Headers", 'content-type');

    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.put('/api/log', function (req, res, next) {
    db.exec("INSERT INTO log_table VALUES ('" + new Date().getTime() + "','" + JSON.stringify(req.body).replace(/\'/g, "''") + "')");
    res.send("OK");
});

app.get('/api/log', function (req, res, next) {
    const stmt = db.prepare('SELECT * FROM log_table');

    var response = [];
    var results = stmt.all();
    for (var i = 0; i < results.length; i++) {
        var row = results[i];
        response.push([new Date(Number(row.creation)), row.log]);
    }
    res.send({data: response});
});


module.exports = app;

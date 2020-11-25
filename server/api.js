const express = require('express');
//var cors = require('cors');
const app = express();

//app.use(cors());

const fs = require('fs');
const path = require('path');
global.appDir = path.resolve(__dirname);

const _ = require('lodash');

const app_config = require('./config/config.json');

function logViewRequested(req, res, next) {
    console.time('View requested: ' + req.url);
    next();
}

function allowCORS(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}

function checkAppKey(req, res, next) {
    if(app_config.app_key && app_config.app_key.length > 0) {
        let appKey = req.query.app_key;
        if(appKey == app_config.app_key) {
            delete req.query.app_key;
            next();
        } else {
            return res.status(404).send('Not found.');
        }
    }
    
    next();
}

//require all views files if you are caching
let views = [];
let middlewares = [logViewRequested, allowCORS, checkAppKey];
let viewFolder = global.appDir + '/views/';

//get default
app.get('/', middlewares, function (req, res) {
    return res.json('json-views up and running!'); 
});

//get view function
app.get('/api/views/:viewName', middlewares, function (req, res) {

    let viewFolder = global.appDir + '/views/';

    if(req.params.viewName) {
        let view = require(viewFolder + req.params.viewName);

        view.view(function(err, data) {
            if(!_.isEmpty(req.query)) { data = _.filter(data, req.query); }
            res.json(data);
            console.timeEnd('View requested: ' + req.url);
        });
    }
    else {
        res.json({ Error: 'No view name present.'});
    }

});

app.post('/api/views/:viewName', middlewares, function (req, res) {

    let viewFolder = global.appDir + '/views/';

    if(req.params.viewName) {
        let jsonData = req.body;
        let view = require(viewFolder + req.params.viewName);

        view.post(jsonData, function(err, data) {
            if(!_.isEmpty(req.query)) { data = _.filter(data, req.query); }
            res.json(data);
            console.timeEnd('View requested: ' + req.url);
        });
    }
    else {
        res.json({ Error: 'No view name present.'});
    }

});

//get view and do _.countBy
app.get('/api/views/:viewName/count/:fieldname', middlewares, function (req, res) {

    let viewFolder = global.appDir + '/views/';

    if(req.params.viewName && req.params.fieldname) {
        let view = require(viewFolder + req.params.viewName);
        let fieldname = req.params.fieldname;
        
        view.view(function(err, data) {
            if(!_.isEmpty(req.query)) { data = _.filter(data, req.query); }
            res.json(_.countBy(data, function(item) { return _.get(item, req.params.fieldname); }));
            console.timeEnd('View requested: ' + req.url);
        });
    }
    else {
        res.json({ Error: 'No view name or fieldname present.'});
    }

});

//get view and do _.groupBy
app.get('/api/views/:viewName/group/:fieldname', middlewares, function (req, res) {

    let viewFolder = global.appDir + '/views/';

    if(req.params.viewName && req.params.fieldname) {
        let view = require(viewFolder + req.params.viewName);
        let fieldname = req.params.fieldname;

        view.view(function(err, data) {
            if(!_.isEmpty(req.query)) { data = _.filter(data, req.query); }
            res.json(_.groupBy(data, function(item) { return _.get(item, req.params.fieldname); }));
            console.timeEnd('View requested: ' + req.url);
        });
    }
    else {
        res.json({ Error: 'No view name or fieldname present.'});
    }

});

app.listen(app_config.port, app_config.url, function() {
    console.log('Starting json-views api at URL: http://' + app_config.url + ':' + app_config.port);
});

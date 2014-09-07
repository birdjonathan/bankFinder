"use strict";

var mongoose    = require('mongoose'),
    uriUtil     = require('mongodb-uri'),
    morgan      = require('morgan'),
    bodyParser  = require('body-parser'),
    middle      = require('./middleware');

var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } }

// I would use an environmental variable here for a production app
var mongodbUri = 'mongodb://heroku_app29310252:4keu6dboi2ngtpqb5jt7nsbhm7@ds035260.mongolab.com:35260/heroku_app29310252'
mongoose.connect((mongodbUri, options) || 'mongodb://localhost/bankFinder');
/*
 * Include all your global env variables here.
*/
module.exports = exports = function (app, express, routers) {
  app.set('port', process.env.PORT || 9000);
  app.set('base url', process.env.URL || 'http://localhost');
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(middle.cors);
  app.use(express.static(__dirname + '/../../client'));
  app.use('/note', routers.NoteRouter);
  app.use(middle.logError);
  app.use(middle.handleError);
};

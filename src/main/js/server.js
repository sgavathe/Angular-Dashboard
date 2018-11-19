 /* * Express server serves UI webpages and provides HTTP Proxying */
 'use strict'; 
 module.exports = require('../../../grunt-config'); 
 var express = require('express'); 
 var app = express();
 /* * Angular UI distribution directory' */
 var staticRoot = 'dist/GETSTATS';
 /* * configure the port */
 app.set('port', (process.env.PORT || 8080));
 /* * Configure the static directory for the Angular UI distribution */
 app.use(express.static(staticRoot)); 
 app.use(function (req, res, next) { res.header('Content-Type', 'application/json');
 res.header('Access-Control-Allow-Origin', '*'); 
 res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); next(); });
 /* * UI listening port */
 app.listen(app.get('port'), 
    function () { 
         console.log(`Running at ${app.get('port')}`); 
    });

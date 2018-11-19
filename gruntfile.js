'use strict';
module.exports = function(grunt) {  
    var gruntConfig = require('./src/main/js/server.js');
    var options = {    
        srcDir: 'src/main/js'  
    };  
    gruntConfig(grunt, options);
};
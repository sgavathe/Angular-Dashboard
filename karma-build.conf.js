// Karma configuration file, see link for more information// https://karma-runner.github.io/1.0/config/configuration-file.html
module.exports = function (config) 
{  
    config.set({    basePath: '',    
    frameworks: ['jasmine', '@angular-devkit/build-angular'],    
    plugins: [      
        require('karma-jasmine'),      
        require('karma-chrome-launcher'),      
        require('karma-edge-launcher'),      
        require('karma-ie-launcher'),      
        require('karma-phantomjs-launcher'),      
        require('karma-jasmine-html-reporter'),      
        require('karma-coverage-istanbul-reporter'),      
        require('karma-webpack'),      
        require('@angular-devkit/build-angular/plugins/karma')    
        ],    
        client:{      clearContext: false 
            // leave Jasmine Spec Runner output visible in browser    
        },    
        angularCli: {      
            environment: 'dev'    
        },    
        port: 9876,    
        colors: true,    
        logLevel: config.LOG_INFO,    
        autoWatch: true,        
        singleRun: true,        
        /*     * Configure Karma to use a headless browser.  Consult the MDE regarding     * the availability of specific browser executables in the Jenkins environmnet.     */    
        browsers: ['PhantomJS'],        
        reporters: ['progress', 'coverage-istanbul'],        
        /*     * Configure Karma to use coverage-istanbul for generating coverage     * reports and to generate reports in a location recognized by Jenkins     */    
        coverageIstanbulReporter: {        
            reports: [ 'html', 'lcovonly' ],        
            dir: require('path').join(__dirname, 'reports/coverage/lcov-report'),        
            fixWebpackSourcePaths: true    },        
            /*     * Configure webpack to recognize TypeScript and to enable     * istanbul-instrumenter-loader to generate coverage reports     * based on Jasmine tests written for TypeScript code     */    
            webpack: {        
                devtool: 'inline-source-map',        
                resolve: {            
                    extensions: ['.ts', '.js', '.tsx', '.jsx', '.html']        
                },       
                module: {            
                    rules: [            
                        {                
                            test: /\.ts$/,                
                            exclude: /node_modules/,                
                            loaders: [ "awesome-typescript-loader", "angular2-template-loader" ],            
                        },            
                        {                
                            test: /\.(js|ts)$/,                
                            use: {                
                            loader: 'istanbul-instrumenter-loader',                 
                            options: { esModules: true 
                            }                
                        },                
                        enforce: 'post',                 
                        exclude: /node_modules|\.(e2e|spec)\.ts$/            
                    },            
                    {                
                        test: /\.(html|css)$/,                 
                        loader: 'raw-loader'            
                    }            
                ]        
            }    
        }  
    });};
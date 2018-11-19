'use strict';

const _ = require('lodash');
const path = require('path');
const pathExists = require('path-exists');
const absoluteRootDir = process.cwd();

let ALL_FILES;

const initGrunt = function (grunt, options) {
  require('time-grunt')(grunt);

  // Explicitly ensure that this exists
  options.packageJson = require(path.join(absoluteRootDir, 'package.json'));

  const srcDir = options.srcDir || 'src/main';

  const append = (base, toAppend) => {
    return toAppend => {
      return base + toAppend;
    };
  };
  const extensions = ['.ts'];

  const srcPattern = path.join(srcDir, '**/*');
  const srcPatterns = _.map(extensions, append(srcPattern));

  ALL_FILES = _.concat(srcPatterns);
};

const setupDotEnvLoading = function (grunt, options) {
  grunt.registerTask('load-dotenv', 'Setup local env based on .env files', function () {
    /**
     * let's check for top level .env files shall we?
     */
    const localenv = path.join(process.cwd(), '.env');
    // this must be a syncronous process since we're loading environment vars here
    if (pathExists.sync(localenv)) {
      require('dotenv').config({
        path: localenv
      });
    }

    const envFile = options.envFilePath;
    // adds support for setting multiple .env files as an array in a project's Gruntfile
    if (envFile !== undefined && envFile.constructor === Array) {
      envFile.forEach(env => {
        require('dotenv').config({
          path: env
        });
      });
    } else if (pathExists.sync(envFile) && envFile.trim()) {
      require('dotenv').config({
        path: envFile
      });
    }
  });
};

const setupTests = function (grunt, options) {
  grunt.config('karma', {
    unit: {
      configFile: 'karma-build.conf.js'
    }
  });
  
  grunt.config('protractor', {
    options: {
      configFile: "protractor-cucumber.conf.ts",
      keepAlive: false,
      noColor: false,
      args: {}
    },
    all: {},
  });

  grunt.config('protractor-cucumber-html-report', {
    default_options: {
      options: {
        dest: 'reports',
        output: 'index.html',
        testJSONDirectory: 'reports',
      }
    }
  });

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-protractor-cucumber-html-report');
};

const setupFileLinters = function (grunt, options) {
  grunt.config('eslint', {
    normal: {
      src: ALL_FILES
    },
    fix: {
      src: ALL_FILES,
      options: {
        fix: true
      }
    }
  });

  grunt.registerTask('lint-files', ['eslint:normal']);
  grunt.registerTask('lint-files-fix', ['eslint:fix']);
  grunt.loadNpmTasks('grunt-eslint');
};

// (?:)  non-capturing grouping
// \w*   any whitespace character 0 or more times
// \(    matches left parens
// '|"   matches single quote OR double quote
const setupFileChecker = function (grunt, options) {
  let srcFiles = options.srcDir || 'src';
  srcFiles += '/*';
  grunt.config('check-files', {
    src: srcFiles,
    // eval is covered by http://eslint.org/docs/rules/no-eval
    // setTimeout/setInterval (with strings as first param) covered by http://eslint.org/docs/rules/no-implied-eval
    badPatterns: [{
      pattern: /Function(?:\s*)\((?:\s*)(?:'|")/,
      resolution: 'Hidden eval, do not use Function constructor.'
    }, {
      warning: true,
      pattern: /\.(?:\s*)exec(?:\s*)\(/,
      resolution: 'If this matches on Node\'s child_process.exec() function ' +
      'change to use the more secure to use child_process.execFile() function. ' +
      'If this matches on a RegExp.exec() function you can ignore this warning.'
    }]
  });
};

const setupGitInfo = function (grunt, options) {
  const filename = 'git.json';
  grunt.registerTask('git-info', 'Output a ' + filename + ' file', function () {
    const fs = require('fs');
    const gitInfo = require('./src/main/js/git-info');
    const info = gitInfo();
    const gitInfoContent = JSON.stringify(info);
    fs.writeFileSync(filename, gitInfoContent, 'utf8');
  });
};

const setupExternalCmds = function (grunt, options) {
  // APPEND to exec
  let exec = grunt.config('exec') || {};
  exec.nsp = 'node ./node_modules/nsp check';
  grunt.config('exec', exec);
  grunt.loadNpmTasks('grunt-exec');
};

const registerTasks = function (grunt, options) {
  grunt.registerTask('build', ['lint-files', 'karma', 'git-info']);
  grunt.registerTask('integrationTest', ['load-dotenv', 'protractor', 'protractor-cucumber-html-report']);
  grunt.registerTask('nsp', 'exec:nsp');
  grunt.registerTask('default', ['build']);
};

module.exports = function (grunt, options) {
  let gruntOptions = options || {};
  initGrunt(grunt, gruntOptions);
  setupDotEnvLoading(grunt, gruntOptions);
  setupTests(grunt, gruntOptions);
  setupFileLinters(grunt, gruntOptions);
  setupFileChecker(grunt, gruntOptions);
  setupGitInfo(grunt, gruntOptions);
  setupExternalCmds(grunt, gruntOptions);
  registerTasks(grunt, gruntOptions);
};

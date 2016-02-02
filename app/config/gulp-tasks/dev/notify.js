/**
 * LESS (DEV)
 *
 * Sourcemap enabled
 * Autoprefixer enabled
 * No minification
 */

// Dependencies
var chalk = require('chalk');
var dateFormat = require('dateformat');

// Task
module.exports = function(gulp, plugins, config) {
  return function() {
    console.log(dateFormat("["+"h:MM:ss"+"]"), chalk.green('DEVELOPMENT BUILD COMPLETED'));
  };
};

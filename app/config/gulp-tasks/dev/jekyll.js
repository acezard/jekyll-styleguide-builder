/*
 * JEKYLL
 * jekyll html build
 * manage jekyll config in /app/config/_config.yml
 */

// Dependencies
var exec = require('child_process').exec;

// Task
module.exports = function(gulp, plugins, config) {
  return function() {
    exec('jekyll build', function(err, stdout, stderr) {
        console.log(stdout);
    });
  };
};
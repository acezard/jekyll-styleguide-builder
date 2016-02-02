/*
 * JEKYLL
 * jekyll html build
 * manage jekyll config in /app/config/_config_prod.yml
 */

// Dependencies
var exec = require('child_process').exec;

// Task
module.exports = function(gulp, plugins, config) {
  return function() {
  	// Using prod config
    exec('jekyll build --config=_config.yml,_config_prod.yml', function(err, stdout, stderr) {
        console.log(stdout);
    });
  };
};

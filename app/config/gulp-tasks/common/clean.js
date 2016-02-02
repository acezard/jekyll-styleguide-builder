/*
 * CLEAN 
 * Delete everything in build folder, except svn files
 */

// Dependencies
var del = require('del');

// Task
module.exports = function(gulp, plugins, config) {
  return function(cb) {
    del([!config.dest + '/.svn/**/*', config.dest + '/**/*'], {force: true}, cb);
  };
};

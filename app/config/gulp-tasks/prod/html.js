/*
 * HTML
 * html minification, best used with Jekyll
 */

 // Dependencies debug
var minifyHTML = require('gulp-minify-html');

// Task
module.exports = function(gulp, plugins, config) {
  return function() {
    gulp.src(config.dest + '/index.html')
      .pipe(minifyHTML({
        conditionals: true,
        spare: true
      }))
      .pipe(gulp.dest(config.dest));
  };
};

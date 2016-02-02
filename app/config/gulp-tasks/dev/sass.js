/*
 * LESS
 * less compilation with sourcemaps
 */
 var merge = require('merge2');

// Task
module.exports = function(gulp, plugins, config) {
  return function() {
    gulp.src(config.sass)
      .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass())
        .pipe(plugins.autoprefixer())
      .pipe(plugins.sourcemaps.write())
      .pipe(gulp.dest(config.dest + '/css'))
      .pipe(plugins.size({
        showFiles: true
      }));
  };
};

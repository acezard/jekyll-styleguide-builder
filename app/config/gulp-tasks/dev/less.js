/*
 * LESS
 * less compilation with sourcemaps
 */
 var merge = require('merge2');

// Task
module.exports = function(gulp, plugins, config) {
  return function() {
    gulp.src(config.master)
      .pipe(plugins.sourcemaps.init())
        .pipe(plugins.less())
        .pipe(plugins.autoprefixer())
      .pipe(plugins.sourcemaps.write())
      .pipe(gulp.dest(config.dest + '/css'))
      .pipe(plugins.size({
        showFiles: true
      }));
  };
};

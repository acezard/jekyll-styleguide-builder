/*
 * FONTS
 * Copying fonts from src to build
 */

// Task
module.exports = function(gulp, plugins, config) {
  return function() {
    return gulp.src(config.srcAssets + '/fonts/**/*.{ttf,woff,woff2,eot,svg}')
      .pipe(gulp.dest(config.dest +'/fonts'));
  };
};


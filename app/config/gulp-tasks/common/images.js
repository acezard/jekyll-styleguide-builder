/*
 * IMAGES
 * png compression enabled
 */

// Dependencies
var pngquant = require('imagemin-pngquant');

// Task
module.exports = function(gulp, plugins, config) {
  return function() {
    gulp.src(config.srcAssets + '/images/**/*')
      .pipe(plugins.imagemin({
        progressive: false,
        svgoPlugins: [{
          removeViewBox: false
        }],
        use: [pngquant()]
      }))
      .pipe(gulp.dest(config.dest + '/images'));
  };
};

/**
 * LESS (DEV)
 *
 * Sourcemap enabled
 * Autoprefixer enabled
 * No minification
 */
var merge = require('merge2');

// TASK
module.exports = function(gulp, plugins, config) {
  return function() {
    var masterSrc = gulp.src([config.master, config.bootstrap]).pipe(plugins.less());

    var minifyCSS = require('gulp-minify-css');

    return merge(masterSrc)
      .pipe(plugins.concatCss(config.dest + '/css/style.css', {
        rebaseUrls: false
      }))
      /* .pipe(plugins.uncss({
           html:  [ config.srcAssets + '/less/jsclasses.html', config.dest + '/index.html',]
       }))*/
      .pipe(minifyCSS({
        keepSpecialComments: 0
      }))
      .pipe(plugins.autoprefixer())
      .pipe(plugins.rename({
        suffix: config.min
      }))
      .pipe(plugins.replace(
        'fonts/slick',
        '../fonts/slick'
      ))
      .pipe(plugins.replace(
        'ajax-loader.gif',
        '../images/ajax-loader.gif'
      ))
      .pipe(gulp.dest(config.dest + '/css'))
      .pipe(plugins.size({
        showFiles: true
      }));
  };
};

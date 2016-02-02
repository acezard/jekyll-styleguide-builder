/*
 * gulpfile.js
 * date: 2015-10
 */

 // Project variables declaration
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var config = require('./gulpconfig');
var runSequence = require('run-sequence')

// getTask declaration
function getTask(task) {
    return require('./gulp-tasks' + task)(gulp, plugins, config);
}

// Individual tasks
// Common
gulp.task('clean', getTask('/common/clean'));
gulp.task('fonts', getTask('/common/fonts'));
gulp.task('images', getTask('/common/images'));

// Dev
gulp.task('jekyll', getTask('/dev/jekyll'));
gulp.task('less', getTask('/dev/less'));
gulp.task('notify', getTask('/dev/notify'));
gulp.task('scripts', getTask('/dev/scripts'));
gulp.task('sass', getTask('/dev/sass'));

// Production
gulp.task('html', getTask('/prod/html'));
gulp.task('jekyllProd', getTask('/prod/jekyll'));
gulp.task('lessProd', getTask('/prod/less'));
gulp.task('notifyProd', getTask('/prod/notify'));
gulp.task('scriptsProd', getTask('/prod/scripts'));

// Global tasks
// Default (set to dev build)
gulp.task('default', ['dev'], function() {
});



// Dev build
gulp.task('dev', function(callback) {
  runSequence('clean',
              ['jekyll', 
              'less', 
              'sass',
              'scripts', 
              'fonts', 
              'images'],
              'notify',          
              callback);
})


// Production build
gulp.task('prod', function(callback) {
  runSequence('clean',
              ['jekyllProd', 
              'lessProd', 
              'scriptsProd', 
              'fonts', 
              'images'],
              'html',
              'notifyProd',
              callback);
});

// Watch
gulp.task('watch', function() {
    gulp.watch([config.srcAssets + '/fonts/*'], ['fonts']);
    gulp.watch([config.srcAssets + '/less/*.less', config.srcAssets + config.master], ['less']);
    gulp.watch([config.srcAssets + '/js/*'], ['scripts']);
    gulp.watch([config.srcAssets + '/img/*'], ['img']);
    gulp.watch([config.srcJekyll + '/**/*'], ['jekyll']);
    gulp.watch([config.srcAssets + '/less/fda.scss'], ['sass']);
});
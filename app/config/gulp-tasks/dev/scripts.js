/*
 * SCRIPTS
 * Browserify bundling with sourcemaps
 */

// Dependencies
'use strict';
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');

// Task
module.exports = function(gulp, plugins, config) {

  // set up the browserify instance on a task basis
  return function() {
    var b = browserify({
      entries: config.srcAssets + '/js/app.js',
      debug: true
    });

    return b.bundle()
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(plugins.sourcemaps.init({
        loadMaps: true
      }))
        .on('error', gutil.log)
      .pipe(plugins.sourcemaps.write('./'))
      .pipe(gulp.dest(config.dest + '/js'));
  };
};

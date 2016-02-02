var srcAssets = '../src/assets/js/*.js'; // Assets folder
/*
*
* Gulpfile
* Jekyll config
*
*/

/* ==========================================================================
    INCLUDES
============================================================================= */
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var uncss = require('gulp-uncss');
var minifyCSS = require('gulp-minify-css');
var concatCss = require('gulp-concat-css');
var less = require('gulp-less');
var stripCssComments = require('gulp-strip-css-comments');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var minifyHTML = require('gulp-minify-html');
var merge = require('merge2');
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');
var livereload = require('gulp-livereload');
var notifier = require('node-notifier');
var del = require('del');
var order = require('gulp-order');
var del = require('del');
var exec = require('child_process').exec;
var runSequence = require('run-sequence');
var wait = require('gulp-wait');
var flatten = require('gulp-flatten');
var replace = require('gulp-replace');
var sourcemaps = require('gulp-sourcemaps');
var size = require('gulp-size');
var rename = require('gulp-rename');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var requireDir = require('require-dir');
var plugins = require('gulp-load-plugins')();


/* ==========================================================================
    FOLDERS
============================================================================= */

var srcAssets = '../src/assets';
var srcJekyll = '../src/jekyll'; // Jekyll folder
var vendor = '../vendor'; // Libraries folder
var dest = '../../build'; // Destination (build) folder
var master = srcAssets + '/less/master/style.less';
var bootstrap = srcAssets + '/less/master/bootstrap.less';
var min = '.min';
var lessc = 'less';
/* ==========================================================================
    TASKS
============================================================================= */

/* Tasks list :
* gulp clean
* gulp html
* gulp javascript
* gulp less
* gulp fonts
* gulp images
* gulp libJS
* gulp libCSS
* gulp watch
* gulp build
* gulp
*//* ===== JAVASCRIPT  ===== */
gulp.task('js', function() {
    // Get files
    return gulp.src(srcAssets + '/js/*.js')
        // Concatenate in a single file
        .pipe(concat('main.js'))
        // Compression
        .pipe(uglify())
        // Output file
        .pipe(gulp.dest(dest+ '/js'))
});

function getTask(task) {
    return require('./gulp-tasks/' + task)(gulp, plugins);
}

gulp.task('scripts', getTask('scripts'));

gulp.task('javascript', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: srcAssets + '/js/app.js',
    debug: true
  });

  return b.bundle()
    .pipe(source(srcAssets + '/js/app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init()
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dest+'/test')));
});


/* ===== CLEAN ===== */
// Delete everything in destination folder
gulp.task('clean', function (cb) {
  del([!dest + '/.svn/**/*', dest + '/**/*'], {force: true}, cb);
});




/* ===== LESS ===== */
gulp.task(lessc, function() {
    gulp.src(master)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dest+'/css'))
        .pipe(size({
            showFiles: true
        }))
});

gulp.task('lessProd', function() {
    var masterSrc = gulp.src([master, bootstrap]).pipe(less());
    var slickCss = gulp.src(vendor + '/slick.js/slick/slick.css');
    var slickCss2 = gulp.src(vendor + '/slick.js/slick/slick-theme.css');
    var materializeCss = gulp.src(vendor + '/materialize/dist/css/materialize.min.css');
    var fontawesomeCSS = gulp.src(vendor + '/font-awesome/css/font-awesome.min.css');

 return merge(masterSrc, slickCss, slickCss2, materializeCss, fontawesomeCSS)
        .pipe(concatCss(dest+'/css/style.css', {rebaseUrls: false}))
       /* .pipe(uncss({
            html:  [ srcAssets + '/less/jsclasses.html', dest + '/index.html',]
        }))*/
        .pipe(minifyCSS({keepSpecialComments: 0}))
        .pipe(autoprefixer())
        .pipe(rename({
            suffix: min
        }))
        .pipe(replace(
            'fonts/slick',
            '../fonts/slick'
            ))
        .pipe(replace(
            'ajax-loader.gif',
            '../images/ajax-loader.gif'
            ))
        .pipe(gulp.dest(dest+'/css'))
        .pipe(size({
            showFiles: true
        }));
});

gulp.task('bootstrap', function() {
    gulp.src(bootstrap)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dest+'/css'))
        .pipe(size({
            showFiles: true
        }))
});


/* ===== FONTS ===== */
gulp.task('fonts', function() {
    // Get files
    return gulp.src(srcAssets + '/fonts/**/*.{ttf,woff,woff2,eot,svg}')
        // Copy files to destination
        .pipe(gulp.dest(dest +'/fonts'));
});

/* ===== IMAGES ===== */
gulp.task('images', function () {
    return gulp.src(srcAssets + '/images/**/*')
        .pipe(imagemin({
            progressive: false,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(dest + '/images'));
});

/* ===== JEKYLL ===== */
gulp.task('jekyll', function (){
    exec('jekyll build', function(err, stdout, stderr) {
        console.log(stdout);
    });
});
gulp.task('jekyllProd', function (){
    exec('jekyll build --config=_config.yml,_config_prod.yml', function(err, stdout, stderr) {
        console.log(stdout);
    });
});

gulp.task('minHTML', function() {
  var opts = {
    conditionals: true,
    spare:true
  };

  return gulp.src(dest + '/index.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest(dest));
});


/* ===== JS LIB ===== */
gulp.task('libJS', function() {
    // Define libraries locations
    var jquery = gulp.src(vendor + '/jquery/dist/jquery.min.js');
    var bootstrapJs = gulp.src(vendor + '/bootstrap/dist/js/bootstrap.min.js');
    var jqueryui = gulp.src(vendor + '/jquery-ui/jquery-ui.min.js');
    var slickJs = gulp.src(vendor + '/slick.js/slick/slick.min.js');
    var materializeJs = gulp.src(vendor + '/materialize/dist/js/materialize.min.js');
    var parallax = gulp.src(vendor + '/parallax.js/parallax.min.js');
    var validate = gulp.src(vendor + '/jquery-validation/dist/jquery.validate.min.js')

    // Merge libraries
    return merge(bootstrapJs, jqueryui, slickJs, materializeJs, parallax, validate)
        // Order of concatenation, jQuery first
        .pipe(order([
            '../vendor/jquery/dist/jquery.min.js',
            '../vendor/bootstrap/dist/js/bootstrap.min.js',
            '../vendor/jquery-ui/jquery-ui.min.js',
            '../vendor/slick.js/slick/slick.min.js',
            '../vendor/materialize/dist/js/materialize.min.js',
            '../vendor/parallax.js/parallax.min.js',
            '../vendor//jquery-validation/dist/jquery.validate.min.js'
            ], { base: './' }))
        // Concatenate in a single file
        .pipe(uglify())
        .pipe(concat('vendor.js'))
        // Output file
        .pipe(gulp.dest(dest + '/js'))
});
gulp.task('jsProd', function() {
    // Define libraries locations
    var jquery = gulp.src(vendor + '/jquery/dist/jquery.min.js');
    var bootstrapJs = gulp.src(vendor + '/bootstrap/dist/js/bootstrap.min.js');
    var jqueryui = gulp.src(vendor + '/jquery-ui/jquery-ui.min.js');
    var slickJs = gulp.src(vendor + '/slick.js/slick/slick.min.js');
    var materializeJs = gulp.src(vendor + '/materialize/dist/js/materialize.min.js');
    var parallax = gulp.src(vendor + '/parallax.js/parallax.min.js');
    var validate = gulp.src(vendor + '/jquery-validation/dist/jquery.validate.min.js')
    var own = gulp.src(srcAssets + '/js/*.js');

    // Merge libraries
    return merge(bootstrapJs, jqueryui, slickJs, materializeJs, parallax, validate, own)
        // Order of concatenation, jQuery first
        .pipe(order([
            '../vendor/jquery/dist/jquery.min.js',
            '../vendor/bootstrap/dist/js/bootstrap.min.js',
            '../vendor/jquery-ui/jquery-ui.min.js',
            '../vendor/slick.js/slick/slick.min.js',
            '../vendor/materialize/dist/js/materialize.min.js',
            '../vendor/parallax.js/parallax.min.js',
            '../vendor//jquery-validation/dist/jquery.validate.min.js',
            '../src/assets/js/*.js'
            ], { base: './' }))
        // Concatenate in a single file
        .pipe(uglify())
        .pipe(concat('script.min.js'))
        // Output file
        .pipe(gulp.dest(dest + '/js'))
});


/* ===== CSS LIB ===== */
gulp.task('libCSS', function() {
    // Define libraries locations
    var slickCss = vendor + '/slick.js/slick/slick.css';
    var slickCss2 = vendor + '/slick.js/slick/slick-theme.css';
    var materializeCss = vendor + '/materialize/dist/css/materialize.min.css';
    var fontawesomeCSS = vendor + '/font-awesome/css/font-awesome.min.css';

    // Merge libraries
    return gulp.src([slickCss, slickCss2, materializeCss, fontawesomeCSS])
        // Concatenate in a single file
        .pipe(concatCss('vendor.css', {rebaseUrls:false}))
        .pipe(minifyCSS())
        .pipe(replace(
            'fonts/slick',
            '../fonts/slick'
            ))
        .pipe(replace(
            'ajax-loader.gif',
            '../images/ajax-loader.gif'
            ))
        .pipe(gulp.dest(dest + '/css'));
});

/* ===== FONTS LIB ===== */
gulp.task('libFonts', function() {
    // Define libraries locations
    var matFonts = gulp.src(vendor + '/materialize/font/material-design-icons/*.{ttf,woff,woff2,eot,svg}')
    var fontawesome = gulp.src(vendor + '/font-awesome/fonts/*.{ttf,woff,woff2,eot,svg}')
    var slick = gulp.src([vendor + '/slick.js/slick/fonts/*.{ttf,woff,woff2,eot,svg}', vendor + 'slick.js/slick/ajax-loader.gif'])
    matFonts
        // Copy file to destination
        .pipe(gulp.dest(dest +'/fonts/material-design-icons'));
    fontawesome
        // Copy file to destination
        .pipe(gulp.dest(dest + '/fonts'));
    slick
        // Copy file to destination
        .pipe(gulp.dest(dest + '/fonts'));
});

/* ===== WATCH ===== */
gulp.task('watch', function() {

    // Folders to watch and tasks to execute
    gulp.watch([srcAssets + '/fonts/*'], ['fonts']);
    gulp.watch([srcAssets + '/less/*.less', srcAssets + master], ['less']);
    gulp.watch([srcAssets + '/js/*'], ['js']);
    gulp.watch([srcAssets + '/img/*'], ['img']);
    gulp.watch([srcJekyll + '/**/*'], ['jekyll']);
    gulp.watch([srcAssets + '/less/master/bootstrap.less'], ['bootstrap']);

    livereload.listen();
    // When dest changes, tell the browser to reload
    gulp.watch(dest + '/**').on('change', livereload.changed);
});

/* ===== NOTIFY ===== */
gulp.task('notify', function() {
    notifier.notify({
        'title': 'Jekyll Builder',
        'message': 'Task completed',
        'icon': 'C:/Dev/ink/notifier-icon.png'
    });
});

/* ===== BUILD ===== */
// Clean destination then build
gulp.task('build', function(callback) {
  runSequence('clean',
              ['jekyll',lessc, 'bootstrap', 'js', 'fonts', 'images', 'libCSS', 'libJS', 'libFonts'],
              'notify',
              callback);
});

gulp.task('prod', function(callback) {
  runSequence('clean',
              ['jekyllProd', 'lessProd', 'jsProd', 'fonts', 'images', 'libFonts'],
              'minHTML',
              'notify',
              callback);
});


/* ===== BUILD AND WATCH ===== */
// Clean destination then build
gulp.task('n-watch', function(callback) {
  runSequence('build',
              'watch',
              callback);
});
gulp.task('prodnwatch', function(callback) {
  runSequence('prod',
              'watch',
              callback);
});

/* ===== DEFAULT START ===== */
// Default gulp task ($ gulp)
gulp.task('default', ['build'], function() {
});
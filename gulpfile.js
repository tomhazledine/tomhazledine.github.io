// Include gulp
var gulp         = require('gulp');

// Include Our Plugins
var autoprefixer = require('gulp-autoprefixer');
var cache        = require('gulp-cache');
var concat       = require('gulp-concat');
var imagemin     = require('gulp-imagemin');
var jshint       = require('gulp-jshint');
var livereload   = require('gulp-livereload');
var minifycss    = require('gulp-minify-css');
var plumber      = require('gulp-plumber');
var rename       = require('gulp-rename');
var sass         = require('gulp-sass');
var scsslint     = require('gulp-scss-lint');
var size         = require('gulp-size');
var svgSprite    = require('gulp-svg-sprite');
var uglify       = require('gulp-uglify');
var gutil        = require('gulp-util');
var lr           = require('tiny-lr');
var server       = lr();

// This will handle our errors
var onError = function (err) {
    gutil.log(gutil.colors.red(err));
};

/**
 * ----------
 * CORE TASKS
 *
 * sass
 * scripts
 * ----------
 */

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('_uncompressed/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(size({title: 'css'}))
    .pipe(gulp.dest('assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(size({title: 'css.min'}))
    .pipe(gulp.dest('assets/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(['_uncompressed/js/jquery/jquery.js','_uncompressed/js/vendor/*.js','_uncompressed/js/custom/*.js'])
    .pipe(plumber({
        errorHandler: onError
    }))
    .pipe(concat('app.js'))
    .pipe(size({title: 'js'}))
    .pipe(gulp.dest('assets/js'))
    .pipe(rename('app.min.js'))
    .pipe(uglify())
    .pipe(size({title: 'js.min'}))
    .pipe(gulp.dest('assets/js'));
});

// Compile Our Critical Path Sass
gulp.task('cpsass', function() {
    return gulp.src('_uncompressed/scss/criticalPath.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(size({title: 'css'}))
    .pipe(gulp.dest('assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(size({title: 'css.min'}))
    .pipe(gulp.dest('_includes/'));
});

/**
 * ------------
 * OCCASSIONALS
 *
 * static js
 * image minification
 * fonts
 * svg sprites
 * ------------
 */

// Minify and transfer static JS files
gulp.task('staticjs', function() {
    return gulp.src(['_uncompressed/js/static/*.js'])
    .pipe(plumber({
        errorHandler: onError
    }))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js/static'));
});

// Set up image minification
gulp.task('images', function() {
    return gulp.src('_uncompressed/images/**')
    .pipe(cache(imagemin({ optimizationLevel: 9, progressive: true, interlaced: true })))
    .pipe(gulp.dest('assets/images'));
});

// Fonts
gulp.task('fonts', function() {
    return gulp.src('_uncompressed/fonts/**')
    .pipe(gulp.dest('assets/fonts/'));
});

// SVG Sprite
var svgConfig = {
    shape : {
        dimension : { // Set maximum dimensions
            maxWidth : 32,
            maxHeight : 32
        },
        dest : 'intermediate' // Keep the intermediate files
    },
    mode : {
        bust : true,
        sprite : "sprite.<mode>.svg",
        symbol : true
    }
};
gulp.task('svg',function() {
    gulp.src('_uncompressed/icons/**/*.svg')
    .pipe(svgSprite(svgConfig))
    .pipe(gulp.dest('_includes'));
});

/**
 * -------------
 * LINTERS, ETC.
 *
 * scss
 * js
 * -------------
 */

// Lets lint our CSS
gulp.task('scss-lint', function() {
    gulp.src('_uncompressed/scss/*.scss')
    .pipe(scsslint({'config': 'defaultLint.yml'}));
});

// Lets lint our JS
gulp.task('jslint', function() {
    return gulp.src('_uncompressed/js/custom/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

/**
 * -----------
 * UTILITIES
 *
 * test
 * project setup
 * live-reload
 * watch
 * default
 * -----------
 */

// Test
gulp.task('test', function(){
    console.log('testing with ' + gutil.colors.cyan('colour'));
});

// Project Setup
// Catch-all task for getting up-and-running in a new location
gulp.task('setup',['sass','scripts','staticjs','fonts','images','svg']);

// Livereload
gulp.task('listen', function(next) {
    server.listen(35728, function(err) {
        if (err) return console.log;
        next();
    });
});

// Watch Files For Changes
gulp.task('watch', function() {

    gulp.watch('_uncompressed/js/jquery/*.js', ['scripts']);
    gulp.watch('_uncompressed/js/vendor/*.js', ['scripts']);
    gulp.watch('_uncompressed/js/custom/*.js', ['scripts']);
    gulp.watch('_uncompressed/js/static/*.js', ['staticjs']);
    gulp.watch('_uncompressed/scss/*.scss', ['sass']);
    gulp.watch('_uncompressed/images/**', ['images']);
    gulp.watch('_uncompressed/fonts/**', ['fonts']);
    gulp.watch('_uncompressed/icons/**/*.svg', ['svg']);
    gutil.log('Watching source files for changes... Press ' + gutil.colors.cyan('CTRL + C') + ' to stop.');

    gulp.watch(['*.html','*.php','assets/css/*.css','assets/js/']).on('change', function(file) {
        livereload(server).changed(file.path);
    });
});

// Default Task
gulp.task('default', ['watch']);

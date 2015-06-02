// Include gulp
var gulp         = require('gulp');

// Include Our Plugins
var sass         = require('gulp-sass');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var rename       = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var minifycss    = require('gulp-minify-css');
var imagemin     = require('gulp-imagemin');
var cache        = require('gulp-cache');
var scsslint     = require('gulp-scss-lint');
var livereload   = require('gulp-livereload');
var jshint       = require('gulp-jshint');
var size         = require('gulp-size');
var lr           = require('tiny-lr');
var gutil        = require('gulp-util');
var svgSprite    = require('gulp-svg-sprite');
var plumber      = require('gulp-plumber');
var server       = lr();

// This will handle our errors
var onError = function (err) {
    gutil.log(gutil.colors.red(err));
};

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('_uncompressed/scss/**/*.scss')
        .pipe(sass({errLogToConsole: true}))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(size({title: 'css'}))
        .pipe(gulp.dest('assets/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(size({title: 'css.min'}))
        .pipe(gulp.dest('assets/css'))
        // .pipe(livereload(server));
});

// Compile Our Critical Path Sass
gulp.task('cpsass', function() {
    return gulp.src('_uncompressed/scss/criticalPath.scss')
        .pipe(sass({errLogToConsole: true}))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(size({title: 'css'}))
        .pipe(gulp.dest('_includes/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(size({title: 'css.min'}))
        .pipe(gulp.dest('_includes/'))
        // .pipe(livereload(server));
});

// Lets lint our CSS
gulp.task('scss-lint', function() {
    gulp.src('_uncompressed/scss/*.scss')
        .pipe(scsslint({'config': 'defaultLint.yml'}));
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
        .pipe(gulp.dest('assets/js'))
        // .pipe(livereload(server));
});

// Minify and transfer static JS files
gulp.task('staticjs', function() {
    return gulp.src(['_uncompressed/js/static/*.js'])
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js/static'))
        .pipe(livereload(server));
});

gulp.task('jslint', function() {
    return gulp.src('_uncompressed/js/custom/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Set up image minification
gulp.task('images', function() {
    return gulp.src('_uncompressed/images/**')
        .pipe(imagemin({ optimizationLevel: 9, progressive: true, interlaced: true }))
        .pipe(gulp.dest('assets/images'))
        .pipe(livereload(server));
});

// Fonts
gulp.task('fonts', function() {
    return gulp.src('_uncompressed/fonts/**')
        .pipe(gulp.dest('assets/fonts/'));
});

// SVG Icon Sprite
var svgConfig = {
    shape : {
        dimension : { // Set maximum dimensions
            maxWidth : 32,
            maxHeight : 32
        }
    },
    mode : {
        symbol : true // Activate the «symbol» mode
    }
};
gulp.task('svg',function(){
    return gulp.src('_uncompressed/icons/**/*.svg')
        .pipe(svgSprite(svgConfig))
        .pipe(gulp.dest('_includes'));
});

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

    gulp.watch(['*.html','*.php']).on('change', function(file) {
        livereload(server).changed(file.path);
    });
});

// Default Task
gulp.task('default', ['sass', 'scripts', 'listen', 'watch']);
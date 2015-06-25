var gulp = require('gulp');

var gulpLoadPlugins = require('gulp-load-plugins');
var $ = gulpLoadPlugins();

var mainBowerFiles = require('main-bower-files');

var browserSync = require("browser-sync");
var reload = browserSync.reload;

var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

// 'gulp sass' task
gulp.task('sass', function() {

  return gulp.src('_assets/sass/base.scss')
    .pipe($.plumber())
    .pipe(sourcemaps.init())
    .pipe($.sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe($.autoprefixer( 'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4' ))
    .pipe($.plumber.stop())
    .pipe($.rename('app.css'))
    .pipe(gulp.dest('_site/dist'))
    .pipe(reload({stream: true}));

});

// 'gulp build' task
gulp.task('build', $.shell.task([ 'jekyll build' ]));

// 'gulp watch' task
gulp.task('watch', function() {

  browserSync({
    notify: true,
    port: 4000,
    server: {
      baseDir: './_site'
    }
  });

  gulp.watch('_assets/sass/**/*.scss', ['sass']);

  gulp.watch([
    '*.md',
    '*.html',
    '_includes/**/*.html',
    '_layouts/**/*.html',
    '_projects/**/*.html',
    '_posts/**/*'
  ], ['build']);

  gulp.watch("_site/*.html").on("change", browserSync.reload);

});


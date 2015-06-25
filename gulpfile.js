var gulp = require('gulp');

var gulpLoadPlugins = require('gulp-load-plugins');
var $ = gulpLoadPlugins();

var mainBowerFiles = require('main-bower-files');

var browserSync = require("browser-sync");
var reload = browserSync.reload;

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


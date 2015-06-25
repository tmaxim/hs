var gulp = require('gulp');

gulp.task('build', plugins.shell.task([ 'jekyll build' ]));

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


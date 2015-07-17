var gulp = require('gulp');

var gulpLoadPlugins = require('gulp-load-plugins');
var $ = gulpLoadPlugins();

var mainBowerFiles = require('main-bower-files');

var browserSync = require("browser-sync");
var reload = browserSync.reload;

var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

var pngquant = require('imagemin-pngquant');

// 'gulp sass' task
// ----------------
gulp.task('sass', function() {

  return gulp.src('_assets/sass/base.scss')

    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', function (error) {
      console.error(error);
      this.emit('end');
    })
    .pipe($.autoprefixer({
        browsers: ['last 2 versions']
    }))
    .pipe(sourcemaps.write())
    .pipe($.rename('app.css'))
    .pipe(gulp.dest('_site/dist/css'))
    .pipe(reload({stream: true}));

});

// 'gulp js' task
// --------------
gulp.task('js', function () {

  gulp.src('_assets/scripts/*.js')
    .pipe($.concat('app.js'))
    // .pipe($.uglify())
    .pipe(gulp.dest('_site/dist/js'))
    .pipe(reload({stream: true}));

});

// 'gulp image_assets' task
// ------------------------
gulp.task('image_assets', function() {
  return gulp.src('_assets/images/*')
    .pipe($.imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [{removeUnknownsAndDefaults: false}]
    }))
    .pipe(gulp.dest('_site/dist/images'));
});

// 'gulp image_collection' task
// ----------------------------
gulp.task('image_collection', function() {
  return gulp.src('_productos/**/images/*')
    .pipe($.imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [{removeUnknownsAndDefaults: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('_site/productos'));
});




// 'gulp main_bower_files' task
// ----------------------------
gulp.task('materialize_js', function() {

  var materializeFilter   = $.filter('materialize/js/**/*.js');

  return gulp.src(mainBowerFiles(), { base: '_bower_components' })
    .pipe(materializeFilter)
    .pipe($.concat('materialize.js'))
    // .pipe($.uglify())
    .pipe(gulp.dest('_site/dist/js'));

});

gulp.task('materialize_fonts', function() {

  var fontsFilter   = $.filter('font/**/*');

  return gulp.src(mainBowerFiles(), { base: '_bower_components/materialize' })
    .pipe(fontsFilter)
    .pipe(gulp.dest('_site/dist'));

});

gulp.task('js_bower_files', function() {

  var jsFilter   = $.filter([ '**/*.js', '!font/**/*', '!materialize/js/**/*.js' ]);

  return gulp.src(mainBowerFiles(), { base: '_bower_components' })
    .pipe(jsFilter)
    .pipe($.flatten())
    .pipe(gulp.dest('_site/dist/js/vendor'));

});


gulp.task('main_bower_files',[ 'materialize_js', 'materialize_fonts', 'js_bower_files' ]);

// 'gulp build' task
// -----------------
gulp.task('build', $.shell.task([ 'jekyll build' ]));

// 'gulp watch' task
// -----------------
gulp.task('watch', function() {

  browserSync({
    notify: true,
    port: 4000,
    server: {
      baseDir: './_site'
    }
  });

  gulp.watch('_assets/sass/**/*.scss', ['sass']);

  gulp.watch('_assets/scripts/**/*.js', ['js']);

  gulp.watch([
    '*.md',
    '*.html',
    '_includes/**/*.html',
    '_layouts/**/*.html',
    '_productos/**/*.html',
    '_posts/**/*'
  ], ['build']);

  gulp.watch("_site/*.html").on("change", browserSync.reload);

});


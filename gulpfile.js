var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');


gulp.task('build', function() {
  gulp.src(['./bower_components/ddp.js/src/ddp.js', './bower_components/q/q.js', './bower_components/asteroid/dist/asteroid.browser.js', 'src/*.js'])
    .pipe(concat('brand-flakes.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./server/app/public'));
});

gulp.task('build-dev', function() {
  gulp.src(['./bower_components/ddp.js/src/ddp.js', './bower_components/q/q.js', './bower_components/asteroid/dist/asteroid.browser.js', 'src/*.js'])
    .pipe(concat('brand-flakes.min.js'))
    .pipe(gulp.dest('./server/app/public'));

  gulp.watch('src/*.js', ['build-dev']);
});

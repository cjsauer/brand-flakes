var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('build', function() {
  gulp.src(['src/*.js', './bower_components/ddp.js/dist/ddp.js'])
    .pipe(uglify())
    .pipe(concat('brand-flakes.min.js'))
    .pipe(gulp.dest('./apps/brand-flakes/app/public'));
});

const gulp = require('gulp');

gulp.task('watch', () => {
  gulp.watch([
    './source/html/**/*.ejs',
    './source/data/**/*.json',
  ], ['ejs']);
  gulp.watch(['./source/sass/**/*.scss', './source/sass/**/*.sass'], ['sass']);
  gulp.watch(['./source/javascripts/**/*.js'], ['webpack']);
  gulp.watch(['./source/images/**/*.*'], ['img']);
});

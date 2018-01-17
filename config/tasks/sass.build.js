const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const config = require('../config');
const rename = require('gulp-rename');

gulp.task('sass:build', ['icon'], () => {
  gulp.src([
    './source/sass/**/*.sass',
    '!./source/sass/**/_*.sass',
    './source/sass/**/*.scss',
    '!./source/sass/**/_*.scss',
  ])
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: config.sassIncludePaths,
    }))
    .pipe(autoprefixer({
      browsers: config.autoprefixerSetting,
      cascade: false,
    }))
    .pipe(rename({
      extname: '.min.css',
    }))
    .pipe(gulp.dest('./build/stylesheets'));
});

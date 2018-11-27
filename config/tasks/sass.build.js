const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const config = require('../config');
const rename = require('gulp-rename');
const header = require('gulp-header');
const banner = require('../banner.js');

gulp.task('sass:build', () => {
  gulp
    .src(['./source/sass/**/*.sass', '!./source/sass/**/_*.sass', './source/sass/**/*.scss', '!./source/sass/**/_*.scss'])
    .pipe(
      sass({
        outputStyle: 'compressed',
        includePaths: config.sassIncludePaths
      })
    )
    .pipe(
      autoprefixer({
        browsers: config.autoprefixerSetting,
        cascade: false
      })
    )
    .pipe(
      rename({
        extname: '.min.css'
      })
    )
    .pipe(header('/*\n' + banner + '\n*/\n'))
    .pipe(header('@charset "UTF-8";\n'))
    .pipe(gulp.dest(config.buildPath + 'stylesheets'));
});

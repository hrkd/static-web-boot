'use strict'

const gulp   = require('gulp');
const ejs    = require('gulp-ejs');
const plumber= require('gulp-plumber');
const rename = require("gulp-rename");
const fs     = require('fs');
const config = require('../config');

gulp.task('ejs', ()=> {
  const outputPath = (process.env.NODE_ENV === 'production')?config.buildPath:config.distPath;
  let data = JSON.parse(fs.readFileSync('./source/data/data.json','utf8'));
  gulp.src([
    './source/html/**/*.ejs',
    '!./source/html/**/_*.ejs'
  ])
  .pipe(plumber())
  .pipe(ejs({
    config: data.config[process.env.NODE_ENV],
    data: data.data
  }))
  .pipe(rename({
    // suffix: '.min',
    extname: ".html"
  }))
  .pipe(gulp.dest(outputPath));
});

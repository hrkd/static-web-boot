const gulp = require('gulp');
const fs = require('fs');
const fse = require('node-fs-extra');
const config = require('../config');

const outputPath = (process.env.NODE_ENV === 'production') ? config.buildPath : config.distPath;

gulp.task('cp', () => {
});

gulp.task('img', () => {
  fse.copySync('./source/images/', `${outputPath}/images/`);
});

gulp.task('fonts', () => {
  fse.copySync('./bower_components/ionicons/fonts/', `${outputPath}/dist/fonts/`);
  fse.copySync('./node_modules/font-awesome/fonts/', `${outputPath}/dist/fonts/`);
});

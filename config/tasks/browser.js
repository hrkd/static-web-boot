const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const config = require('../config');

// Static server
gulp.task('browser-sync', () => {
  browserSync.init({
    port: config.port,
    server: config.distPath,
    notify: false,
    files: [
      `${config.distPath}**/*.html`,
      `${config.distPath}**/*.js`,
      `${config.distPath}**/*.css`,
    ],
    ghostMode: false,
    open: true,
  });
});

'use strict'

const gulp        = require('gulp');
//const argv        = require('yargs').argv;
const requireDir = require('require-dir');

requireDir('./config/tasks', {recurse: true});

gulp.task('default',['set-dev-node-env', 'img','ejs','sass','webpack','browser-sync','watch']);
gulp.task('build',  ['set-prod-node-env','img','ejs','sass:build','webpack']);

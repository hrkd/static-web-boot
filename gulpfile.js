'use strict'

const gulp        = require('gulp');
const iconfontCss = require('gulp-iconfont-css');
const iconfont    = require('gulp-iconfont');
const plumber     = require('gulp-plumber');
const rename      = require("gulp-rename");

const fs   = require('fs');
const fse  = require('node-fs-extra');

const sass        = require('gulp-sass');
const sassLint    = require('gulp-sass-lint');
const ejs         = require('gulp-ejs');
const autoprefixer= require("gulp-autoprefixer");
const svgmin      = require('gulp-svgmin');
const data        = require('gulp-data');

const webpack     = require('webpack-stream');
const argv        = require('yargs').argv;
const browserSync = require('browser-sync').create();

const distPath  = './.dist/';
const buildPath = './build/';

gulp.task('webpack', ()=>{
  const config = (process.env.NODE_ENV === 'production')?'./webpack.production.config.js':'./webpack.config.js';
  const outputPath = (process.env.NODE_ENV === 'production')?buildPath:distPath;
  gulp.src('')
    .pipe(webpack(require(config)))
    .pipe(gulp.dest(outputPath + 'javascripts/'));
});

gulp.task('ejs', ()=> {
  const outputPath = (process.env.NODE_ENV === 'production')?buildPath:distPath;
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

gulp.task('icon',['iconfont'], function () {
  var outputPath = (process.env.NODE_ENV === 'production')?buildPath:distPath;
  gulp.src('./source/fonts/*')
    .pipe(gulp.dest(outputPath+'fonts'));  // release配下にフォントファイルをコピー
});

gulp.task('iconfont', function (callback) {
  var svgminData = gulp.src('source/svg/*.svg')
    .pipe(svgmin());  // svgファイルを圧縮

  svgminData.pipe(plumber())
    .pipe(iconfontCss({  // アイコンフォントのscssを生成する
        fontName: 'iconfont',
        path: './node_modules/gulp-iconfont-css/templates/_icons.scss',  // icons.scssのテンプレート
        targetPath: '../sass/icons/_icons.scss',  // 生成するscssのパス
        fontPath: '/fonts/'  //scssからfontファイルへのパス。最終的にrelease配下に置かれた際に読み込めるパスにする
    }))
    .pipe(iconfont({  // アイコンフォントを生成する
        fontName: 'iconfont',
        formats: ['ttf', 'eot', 'woff2', 'woff', 'svg'],
        appendCodepoints:false
    }))
    .pipe(gulp.dest('source/fonts')) //develop配下にscssとiconfontを生成
    .on('end', function(){  // iconfontが完了してからiconfontを実行
        callback();
    });
});

gulp.task('sass',['icon'],function(){
  var outputPath = (process.env.NODE_ENV === 'production')?buildPath:distPath;
  gulp.src([
    './source/sass/**/*.sass',
    '!./source/sass/**/_*.sass',
    './source/sass/**/*.scss',
    '!./source/sass/**/_*.scss'
  ])
  .pipe(sass({outputStyle:'expanded'}))
  .pipe(autoprefixer({
    browsers: ["last 4 versions", "ie >= 9", "Android >= 4","ios_saf >= 8"],
    cascade: false
  }))
  .pipe(gulp.dest(outputPath+'stylesheets/'));
});

gulp.task('sass:build',['icon'],function(){
  gulp.src([
    './source/sass/**/*.sass',
    '!./source/sass/**/_*.sass',
    './source/sass/**/*.scss',
    '!./source/sass/**/_*.scss'
  ])
  .pipe(sass({outputStyle:'compressed'}))
  .pipe(autoprefixer({
    browsers: ["last 4 versions", "ie >= 9", "Android >= 4","ios_saf >= 8"],
    cascade: false
  }))
  .pipe(rename({
    extname: '.min.css'
  }))
  .pipe(gulp.dest('./build/stylesheets'));
});

gulp.task('img', function(){
  var outputPath = (process.env.NODE_ENV === 'production')?buildPath:distPath;
  fse.copySync('./source/images/', outputPath+'images/');
  fse.copySync('./source/fonts/',  outputPath+'fonts/');
});

// Static server
gulp.task('browser-sync', function() {
  browserSync.init({
    port: 5500,
    server: distPath,
    notify: false,
    files: [
      distPath+"**/*.html",
      distPath+"**/*.js",
      distPath+"**/*.css"
    ],
    ghostMode:false,
    open: false
  });
});

gulp.task('watch',function(){
  gulp.watch([
    './source/html/**/*.ejs',
    './source/data/**/*.json',
  ], ['ejs']);
  gulp.watch(['./source/sass/**/*.scss','./source/sass/**/*.sass'], ['sass']);
  gulp.watch(['./source/javascripts/**/*.js'], ['webpack']);
  gulp.watch([
    './source/images/**/*.png',
    './source/images/**/*.jpg',
    './source/images/**/*.gif'
  ], ['img']);
  gulp.watch(['./source/svg/*/*.svg'], ['icon']);
});

gulp.task('set-dev-node-env', function() {
    return process.env.NODE_ENV = 'development';
});

gulp.task('set-prod-node-env', function() {
    return process.env.NODE_ENV = 'production';
});

gulp.task('default',['set-dev-node-env', 'img','ejs','sass','webpack','browser-sync','watch']);
gulp.task('build',  ['set-prod-node-env','img','ejs','sass:build','webpack']);

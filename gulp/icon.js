'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

var fontName = 'darlin.me';

gulp.task('buildIcon', function(){
  return gulp.src([
      './svg/**/*.svg'
    ])
    .pipe(iconfontCss({
      fontName: fontName,
      path: path.join(conf.paths.src, '/icons-template/icons.less'),
      targetPath: '../app/icons/_icons.less',
      fontPath: '../fonts/',
      cssClass: 'icon'
    }))
    .pipe(iconfont({
      fontName: fontName,
      formats: ['ttf', 'eot', 'woff', 'woff2', 'svg']
    }))
    .pipe(gulp.dest(path.join(conf.paths.src, '/fonts/')));
});

gulp.task('cleanIcon', function (done) {
  $.del([path.join(conf.paths.src, '/fonts/'), path.join(conf.paths.src, '/app/icons/')], done);
});

gulp.task('icon', ['cleanIcon'], function () {
  gulp.start('buildIcon');
});

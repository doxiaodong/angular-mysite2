'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var jsonminify = require('gulp-jsonminify');
var chinese2unicode = require('fd-gulp-chinese2unicode');
 
gulp.task('language', function () {
    return gulp.src([
        path.join(conf.paths.src, '/languages/**/*.json')
      ])
      .pipe(jsonminify())
      .pipe(chinese2unicode())
      .pipe(gulp.dest(path.join(conf.paths.static, '/languages/')));
});

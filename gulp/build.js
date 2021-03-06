'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('partials', function () {
  return gulp.src([
    path.join(conf.paths.src, '/app/**/*.html'),
    path.join(conf.paths.tmp, '/serve/app/**/*.html')
  ])
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.angularTemplatecache('templateCacheHtml.js', {
      module: 'darlin',
      root: 'app'
    }))
    .pipe(gulp.dest(conf.paths.tmp + '/partials/'));
});

gulp.task('html', ['inject', 'partials'], function () {
  var partialsInjectFile = gulp.src(path.join(conf.paths.tmp, '/partials/templateCacheHtml.js'), { read: false });
  var partialsInjectOptions = {
    starttag: '<!-- inject:partials -->',
    ignorePath: path.join(conf.paths.tmp, '/partials'),
    addRootSlash: false
  };

  var htmlFilter = $.filter('*.html');
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');
  var assets;

  var chinese2unicode = require('fd-gulp-chinese2unicode');

  return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
    .pipe($.inject(partialsInjectFile, partialsInjectOptions))
    .pipe(assets = $.useref.assets())
    .pipe($.rev())
    .pipe(jsFilter)
    .pipe(chinese2unicode())
    .pipe($.ngAnnotate())
    .pipe($.uglify()).on('error', conf.errorHandler('Uglify'))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(htmlFilter)
    .pipe($.replace('"static/styles/', '"' + conf.paths.static_host + 'static/styles/'))
    .pipe($.replace('"static/scripts/', '"' + conf.paths.static_host + 'static/scripts/'))
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true,
      conditionals: true
    }))
    .pipe(htmlFilter.restore())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    .pipe($.size({ title: path.join(conf.paths.dist, '/'), showFiles: true }));
});

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task('fonts', function () {
  //return gulp.src($.mainBowerFiles())
  return gulp.src(conf.paths.src + '/**/*.*')
    .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
    .pipe($.flatten())
    .pipe(gulp.dest(path.join(conf.paths.static, '/fonts/')));
});

gulp.task('img', function () {
  var fileFilter = $.filter(function (file) {
    return file.stat.isFile();
  });

  return gulp.src([
    path.join(conf.paths.src, '/assets/images/**/*')

  ])
    .pipe(fileFilter)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()],
      optimizationLevel: 1
    }))
    .pipe(gulp.dest(path.join(conf.paths.static, '/assets/images/')))
});

gulp.task('favicon', function () {

  var fileFilter = $.filter(function (file) {
    return file.stat.isFile();
  });

  return gulp.src([
    path.join(conf.paths.src, '/favicon.ico'),
    path.join(conf.paths.src, '/robots.txt'),
    path.join(conf.paths.src, '/sitemap.xml')
  ])
    .pipe(fileFilter)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()],
      optimizationLevel: 1
    }))
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
});

gulp.task('other', function () {
  var fileFilter = $.filter(function (file) {
    return file.stat.isFile();
  });

  return gulp.src([
    path.join(conf.paths.src, '/**/*'),
    path.join('!' + conf.paths.src, '/assets/images/**/*'),
    path.join('!' + conf.paths.src, '/languages/**/*.json'),
    path.join('!' + conf.paths.src, '/favicon.ico'),
    path.join('!' + conf.paths.src, '/robots.txt'),
    path.join('!' + conf.paths.src, '/sitemap.xml'),
    path.join('!' + conf.paths.src, '/**/*.{html,css,js,less}'),
    path.join('!' + conf.paths.src, '/**/*.{eot,svg,ttf,woff,woff2}')
  ])
    .pipe(fileFilter)
    .pipe(gulp.dest(path.join(conf.paths.static, '/')));
});

gulp.task('clean', function (done) {
  $.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')], done);
});

gulp.task('build', ['html', 'fonts', 'other', 'img', 'favicon', 'language']);

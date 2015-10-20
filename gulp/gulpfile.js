var path = require('path');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var iife = require("gulp-iife");
var ngAnnotate = require('gulp-ng-annotate');
var del = require('del');
var nconf = require('nconf');
var _ = require('lodash');
var gulpOption = require("../lib/load-gmeteor-json").gulp;
nconf.argv();

gulp.task('default', ['gulp:base'], processDefault);
gulp.task('gulp:clean', processClean);
gulp.task('gulp:public', processPublic);
gulp.task('gulp:client', processClient);
gulp.task('gulp:js', prcessJs);
gulp.task('gulp:js-lib', prcessJsLib);
gulp.task('gulp:watch', processWatch);
gulp.task('gulp:base', ['gulp:clean'], processBase);

function processClean(cb) {
  return del([gulpOption.public.target + '/**', gulpOption.client.target + '/**'], {force: true});
}

function processPublic() {
  return gulp.src(gulpOption.public.all)
    .pipe(gulp.dest(gulpOption.public.target));
}

function processClient() {
  return gulp.src(gulpOption.client.all)
    .pipe(gulp.dest(gulpOption.client.target));
}

function prcessJs() {
  return gulp.src(gulpOption.public.js)
    .pipe(gulpif(nconf.get("production"), ngAnnotate()))
    .pipe(gulpif(nconf.get("production"), uglify()))
    .pipe(iife())
    .pipe(gulp.dest(gulpOption.public.target));
}

function prcessJsLib() {
  return gulp.src(gulpOption.public["js-lib"])
    .pipe(gulpif(nconf.get("production"), ngAnnotate()))
    .pipe(gulpif(nconf.get("production"), uglify()))
    .pipe(gulp.dest(gulpOption.public.target));
}

function processWatch() {
  gulp.watch(gulpOption.public.all, ['gulp:public', 'gulp:js']);
  gulp.watch(gulpOption.client.all, ['gulp:client']);
  gulp.watch(gulpOption.public.js, ['gulp:js']);
  gulp.watch(gulpOption.public["js-lib"], ['gulp:js-lib']);
}

function processDefault() {
  if(nconf.get("watch")) {
    gulp.start('gulp:watch')
  }
}

function processBase() {
  gulp.start('gulp:client', 'gulp:public', 'gulp:js', 'gulp:js-lib');
}
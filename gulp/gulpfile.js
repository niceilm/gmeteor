var path = require('path');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var iife = require("gulp-iife");
var ngAnnotate = require('gulp-ng-annotate');
var del = require('del');
var nconf = require('nconf');

var executeDirPath = path.resolve('.');
var gmeteorJsonPath = path.normalize(executeDirPath + '/gmeteor.json');

nconf.argv().env().file({file: gmeteorJsonPath}).defaults({
  "env": process.env.NODE_ENV
});

var isProduction = false;

gulp.task('default', ['gulp:base'], processDefault);

gulp.task('gulp:clean', processClean);
gulp.task('gulp:public', processPublic);
gulp.task('gulp:client', processClient);
gulp.task('gulp:js', prcessJs);
gulp.task('gulp:js-lib', prcessJsLib);
gulp.task('gulp:watch', processWatch);
gulp.task('gulp:base', ['gulp:clean'], processBase);
gulp.task('gulp:production', processProduction);

function processProduction() {
  isProduction = true;
  gulp.start('gulp:base');
}

function processClean(cb) {
  del([nconf.get("gulp:public:target") + '/**', nconf.get("gulp:client:target") + '/**'], {force: true}, cb);
}

function processPublic() {
  return gulp.src(nconf.get("gulp:public:all"))
    .pipe(gulp.dest(nconf.get("gulp:public:target")));
}

function processClient() {
  return gulp.src(nconf.get("gulp:client:all"))
    .pipe(gulp.dest(nconf.get("gulp:client:target")));
}

function prcessJs() {
  return gulp.src(nconf.get("gulp:public:js"))
    .pipe(gulpif(isProduction, ngAnnotate()))
    .pipe(gulpif(isProduction, uglify()))
    .pipe(iife())
    .pipe(gulp.dest(nconf.get("gulp:public:target")));
}

function prcessJsLib() {
  return gulp.src(nconf.get("gulp:public:js-lib"))
    .pipe(gulpif(isProduction, ngAnnotate()))
    .pipe(gulpif(isProduction, uglify()))
    .pipe(gulp.dest(nconf.get("gulp:public:target")));
}

function processWatch() {
  gulp.watch(nconf.get("gulp:public:all"), ['gulp:public', 'gulp:js']);
  gulp.watch(nconf.get("gulp:client:all"), ['gulp:client']);
  gulp.watch(nconf.get("gulp:public:js"), ['gulp:js']);
  gulp.watch(nconf.get("gulp:public:js-lib"), ['gulp:s-lib']);
}

function processDefault() {
  if(!isProduction) {
    gulp.start('gulp:watch')
  }
}

function processBase() {
  gulp.start('gulp:client', 'gulp:public', 'gulp:js', 'gulp:js-lib');
}
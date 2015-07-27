var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var iife = require("gulp-iife");
var ngAnnotate = require('gulp-ng-annotate');
var del = require('del');
var shelljs = require('shelljs');
var readlineSync = require('readline-sync');
var _ = require('underscore');
var nconf = require('nconf');

nconf.argv().env().file({file: 'gulp.json'}).defaults({
  "mup": {"path": "deploy/production"},
  "meteor": {"path": "backend"},
  "env": process.env.NODE_ENV
});

var isProduction = nconf.get("env") === "production";
var appendParameter = process.argv.slice(3);
var path = {
  deploy: "deploy",
  frontend: "frontend",
  backend: "backend",
  build: "build"
};

gulp.task('run', gulpSequence('preprocess:development', 'meteor:run'));
gulp.task('build:android', gulpSequence('preprocess:production', 'gulp:production', 'meteor:build', 'meteor:jarsigner', 'meteor:zipalign'));
gulp.task('build:ios', gulpSequence('preprocess:production', 'gulp:production', 'meteor:build'));
gulp.task('deploy', gulpSequence('preprocess:production', 'gulp:production', 'mup:deploy'));
gulp.task('default', ['gulp:base'], processDefault);

gulp.task('gulp:clean', processClean);
gulp.task('gulp:public', processPublic);
gulp.task('gulp:client', processClient);
gulp.task('gulp:js', prcessJs);
gulp.task('gulp:js-lib', prcessJsLib);
gulp.task('gulp:watch', processWatch);
gulp.task('gulp:base', ['gulp:clean'], processBase);
gulp.task('gulp:production', processProduction);

gulp.task('preprocess:production', _.partial(processPreprocess, 'production'));
gulp.task('preprocess:development', _.partial(processPreprocess, 'development'));

_.each(['run', 'build', 'jarsigner', 'zipalign', 'list', 'list-platform', 'configure-android', 'update', 'whoami', 'publish', 'add', 'remove'], function(command) {
  var fn;

  switch(command) {
    case "run":
      fn = processMeteorRun;
      break;
    case "build":
      fn = processMeteorBuild;
      break;
    case "jarsigner":
      fn = processJasrsigner;
      break;
    case "zipalign":
      fn = processZipalign;
      break;
    default:
      fn = _.partial(processByCommand, "meteor", command);
  }

  gulp.task('meteor:' + command, fn);
});

_.each(['init', 'deploy', 'setup', 'logs', 'reconfig', 'start', 'stop', 'restart'], function(command) {
  gulp.task('mup:' + command, _.partial(processByCommand, "mup", command));
});

function processProduction() {
  shelljs.exec("gulp --env production")
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

function processMeteorBuild() {
  var options = {
    buildPath: getAbsolutePath(nconf.get("mobile:buildPath")),
    server: nconf.get("production:rootUrl"),
    settings: getAbsolutePath(nconf.get("production:settings"))
  };
  shelljs.cd(getAbsolutePath(nconf.get("meteor:path")));
  shelljs.exec(_.template("meteor build <%=buildPath%> --server <%=server%> --mobile-settings <%=settings%>")(options));
}

function processJasrsigner() {
  var options = {
    "appname": nconf.get("production:name"),
    "keystore": getAbsolutePath(nconf.get("mobile:keystore")),
    "storepass": nconf.get("mobile:storepass") || readlineSync.question('type storepass : ', {hideEchoBack: true})
  };
  shelljs.cd(getAbsolutePath(nconf.get("mobile:buildPath") + "/android"));
  shelljs.exec(_.template("jarsigner -keystore <%=keystore %> -verbose -sigalg SHA1withRSA -digestalg SHA1 -storepass <%=storepass%> unaligned.apk <%=appname %>")(options));
}

function processZipalign() {
  var options = {
    apkPath: getAbsolutePath(nconf.get("mobile:apkPath"))
  };
  shelljs.cd(getAbsolutePath(nconf.get("mobile:buildPath") + "/android"));
  shelljs.exec(_.template("~/.meteor/android_bundle/android-sdk/build-tools/20.0.0/zipalign -f 4 unaligned.apk <%=apkPath%>")(options));
}

function processMeteorRun() {
  var option = {
    action: nconf.get("action") || "",
    server: nconf.get("development:rootUrl") || "http://localhost",
    port: nconf.get("development:port"),
    settings: getAbsolutePath(nconf.get("development:settings"))
  };

  console.log(_.template('meteor run <%=action %> -p <%=port%> --mobile-server=<%=server%> --settings <%=settings %>')(option));
  shelljs.cd(getAbsolutePath(nconf.get("meteor:path")));
  shelljs.exec(_.template('meteor run <%=action %> -p <%=port%> --mobile-server=<%=server%> --settings <%=settings %>')(option));
}

function processByCommand(exec, command) {
  var appendParam = nconf.get("a");
  var execStr = exec + " " + command;
  if(appendParam) {
    execStr += " " + appendParam;
  } else {
    execStr += " " + appendParameter.join(" ");
  }
  console.log("command : " + execStr);

  shelljs.cd(getAbsolutePath(nconf.get(exec + ":path")));
  shelljs.exec(execStr);
}

function processPreprocess(phase) {
  shelljs.cp("-f", getAbsolutePath("deploy/" + phase + "/mobile-config.js"), getAbsolutePath(nconf.get("meteor:path")));
}

function getAbsolutePath(path) {
  if(path && path.indexOf("/") !== 0) {
    path = __dirname + "/" + path;
  }
  return path;
}
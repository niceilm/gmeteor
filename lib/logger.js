var chalk = require('chalk');
var prettyTime = require('pretty-hrtime');
var moment = require('moment');
var error = chalk.bold.red;
var warn = chalk.bold.yellow;
var debug = chalk.bold.blue;
var log = chalk.bold.green;

module.exports = {
  _debug: false,
  actionTime: {},
  time: function(action) {
    var currentTime = new Date();
    this.actionTime[action] = process.hrtime();
    console.log(log("[%s] Starting '%s'..."), moment(currentTime).format("HH:mm:ss"), action);
  },
  timeEnd: function(action) {
    if(!this.actionTime[action]) {
      return;
    }
    var currentTime = new Date();
    var timeDiff = process.hrtime(this.actionTime[action]);
    this.actionTime[action] = null;
    console.log(log("[%s] Finished '%s' after %s"), moment(currentTime).format("HH:mm:ss"), action, prettyTime(timeDiff));
  },
  log: function(action) {
    var currentTime = new Date();
    console.log(log("[%s] log '%s'..."), moment(currentTime).format("HH:mm:ss"), action);
  },
  warn: function(action) {
    var currentTime = new Date();
    console.log(warn("[%s] warn '%s'..."), moment(currentTime).format("HH:mm:ss"), action);
  },
  error: function(action) {
    var currentTime = new Date();
    console.log(error("[%s] error '%s'..."), moment(currentTime).format("HH:mm:ss"), action);
  },
  debug: function(action) {
    if(this._debug) {
      var currentTime = new Date();
      console.log(debug("[%s] debug '%s'..."), moment(currentTime).format("HH:mm:ss"), action);
    }
  },
  setDebug: function(debug) {
    this._debug = !!debug;
  }
};

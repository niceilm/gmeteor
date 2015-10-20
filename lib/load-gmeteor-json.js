var util = require('util');
var fs = require("fs");
var path = require('path');
var cjson = require('cjson');
var _ = require('lodash');

var executeDirPath = path.resolve('.');
var gmeteorJsonPath = path.normalize(executeDirPath + '/gmeteor.json');
var defaultGmeteorJsonPath = path.normalize(__dirname + "/../assets/defaults-gmeteor.json");

// check gmeteor.json file
if(!fs.existsSync(gmeteorJsonPath)) {
  throw new Error("need gmeteor.json file");
}

var gmeteorJson = _.defaultsDeep(cjson.load(gmeteorJsonPath), cjson.load(defaultGmeteorJsonPath));

// check name
if(_.isUndefined(gmeteorJson.info)) {
  throw new Error("check info.name in gmeteor.json ");
}

// check phase
if(!fs.existsSync(gmeteorJson.info.path.deploy)) {
  throw new Error(util.format("check %s", gmeteorJson.info.path.deploy));
}
var supportPhase = fs.readdirSync(gmeteorJson.info.path.deploy);
var xorPhase = _.xor(supportPhase, _.keys(gmeteorJson.phase));

if(xorPhase.length !== 0) {
  throw new Error(util.format("unmatched phases %s check deploy folder and gmeteor.json file", xorPhase.join(", ")));
}

var problemKeys = [];
_.forEach(gmeteorJson.phase, function(value, key) {
  if(!_.isObject(value)) {
    problemKeys.push(key);
  }
});

if(problemKeys.length !== 0) {
  throw new Error(util.format("check phases %s object literal in gmeteor.json", problemKeys.join(", ")));
}

module.exports = gmeteorJson;

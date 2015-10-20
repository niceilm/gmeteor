var _ = require('lodash');

module.exports = {
  keyPlusValue: keyPlusValue,
  removeOption: removeOption
};

function keyPlusValue(value, key) {
  return key + "=" + value;
}

function removeOption(source, options) {
  options = _.isArray(options) ? options : [options];
  _.forEach(options, function(option) {
    source = source.replace(new RegExp(" " + option + "=.*? "), " ").replace(new RegExp(" " + option + " .*? "), " ")
  });
  return source;
}


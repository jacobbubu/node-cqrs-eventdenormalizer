var Denormalizer = require('./lib/denormalizer'),
  _ = require('lodash'),
  fs = require('fs'),
  path = require('path');

function denormalizer (options) {
  return new Denormalizer(options);
}

/**
 * Calls the constructor.
 * @param  {Object} klass Constructor function.
 * @param  {Array}  args  Arguments for the constructor function.
 * @return {Object}       The new object.
 */
function construct(klass, args) {
  function T() {
    klass.apply(this, arguments[0]);
  }
  T.prototype = klass.prototype;
  return new T(args);
}

var files = fs.readdirSync(path.join(__dirname, 'lib/definitions'));

files.forEach(function (file) {
  var name = path.basename(file, '.js');
  var nameCap = name.charAt(0).toUpperCase() + name.slice(1);
  denormalizer['define' + nameCap] = function () {
    return construct(require('./lib/definitions/' + name), _.toArray(arguments));
  };
});

module.exports = denormalizer;

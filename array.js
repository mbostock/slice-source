function ArraySource(array) {
  this._array = array;
}

ArraySource.prototype.read = function() {
  var array = this._array;
  this._array = null;
  return Promise.resolve(array ? {done: false, value: array} : {done: true, value: undefined});
};

ArraySource.prototype.cancel = function() {
  this._array = null;
  return Promise.resolve();
};

export default ArraySource;

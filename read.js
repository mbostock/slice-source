import concat from "./concat";
import empty from "./empty";

export default function(length) {
  var that = this, index = this._array.length - this._index;

  // If no length was specified, merge the remaining buffer with the next read.
  if (length == null || isNaN(length)) {
    var array = this._array.subarray(this._index);
    return this._source.read().then(function(result) {
      that._array = empty;
      that._index = 0;
      return result.done
          ? (index > 0 ? {done: false, value: array} : {done: true, value: undefined})
          : {done: false, value: concat(array, result.value)};
    });
  }

  if ((length |= 0) < 0) throw new Error("invalid length");

  // If the request fits within the remaining buffer, resolve it immediately.
  if (this._index + length <= this._array.length) {
    return Promise.resolve({done: false, value: this._array.subarray(this._index, this._index += length)});
  }

  // Otherwise, read chunks repeatedly until the request is fulfilled.
  var array = new Uint8Array(length);
  array.set(this._array.subarray(this._index));
  return (function read() {
    return that._source.read().then(function(result) {

      // When done, it’s possible the request wasn’t fully fullfilled!
      // If so, the pre-allocated array is too big and needs slicing.
      if (result.done) {
        that._array = empty;
        that._index = 0;
        return index > 0
            ? {done: false, value: array.subarray(0, index)}
            : {done: true, value: undefined};
      }

      // If this chunk fulfills the request, return the resulting array.
      if (index + result.value.length >= length) {
        that._array = result.value;
        that._index = length - index;
        array.set(result.value.subarray(0, length - index), index);
        return {done: false, value: array};
      }

      // Otherwise copy this chunk into the array, then read the next chunk.
      array.set(result.value, index);
      index += result.value.length;
      return read();
    });
  })();
}

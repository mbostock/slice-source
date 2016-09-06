import empty from "./empty";

export default function(length) {
  if ((length |= 0) < 0) throw new Error("invalid length");
  if (this._index + length <= this._array.length) return Promise.resolve({done: false, value: this._array.subarray(this._index, this._index += length)});
  var that = this, index = this._array.length - this._index, array = new Uint8Array(length);
  array.set(this._array.subarray(this._index));
  return (function read() {
    return that._source.read().then(function(result) {
      if (result.done) {
        that._array = empty;
        that._index = 0;
        return index > 0 ? {done: false, value: array.subarray(0, index)} : {done: true, value: undefined};
      }
      if (index + result.value.length >= length) {
        that._array = result.value;
        that._index = length - index;
        array.set(result.value.subarray(0, length - index), index);
        return {done: false, value: array};
      }
      array.set(result.value, index);
      index += result.value.length;
      return read();
    });
  })();
}

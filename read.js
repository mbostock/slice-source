import concat from "./concat";
import empty from "./empty";

export default function(length) {
  if ((length |= 0) < 0) throw new Error("invalid length");
  if (this._index + length <= this._array.length) return Promise.resolve({done: false, value: this._array.subarray(this._index, this._index += length)});
  var that = this, index = this._array.length - this._index, arrays = index > 0 ? [this._array.subarray(this._index)] : [];
  return (function read() {
    return that._source.read().then(function(result) {
      if (result.done) {
        that._array = empty;
        that._index = 0;
        return arrays.length ? {done: false, value: concat(arrays)} : {done: true, value: undefined};
      }
      if (index + result.value.length >= length) {
        that._array = result.value;
        that._index = length - index;
        arrays.push(result.value.subarray(0, length - index));
        return {done: false, value: concat(arrays)};
      }
      index += result.value.length;
      arrays.push(result.value);
      return read();
    });
  })();
}

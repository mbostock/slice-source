import empty from "./empty";
import slice_cancel from "./cancel";
import slice_read from "./read";
import slice_slice from "./slice";

export default function slice(source) {
  return new SliceSource(source.getReader ? source.getReader() : source);
}

function SliceSource(source) {
  this._source = source;
  this._array = empty;
  this._index = 0;
}

SliceSource.prototype.read = slice_read;
SliceSource.prototype.slice = slice_slice;
SliceSource.prototype.cancel = slice_cancel;

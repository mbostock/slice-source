import array_cancel from "./cancel";
import array_read from "./read";

function ArraySource(array) {
  this._array = array;
}

ArraySource.prototype.read = array_read;
ArraySource.prototype.cancel = array_cancel;

export default ArraySource;

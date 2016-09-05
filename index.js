import ArraySource from "./array";
import SliceSource from "./slice";

export function slice(source) {
  return new SliceSource(source instanceof ArrayBuffer ? new ArraySource(new Uint8Array(source))
      : source instanceof Uint8Array ? new ArraySource(source)
      : source);
}

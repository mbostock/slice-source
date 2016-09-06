import ArraySource from "./array/index";
import SliceSource from "./slice/index";

export default function slice(source) {
  return new SliceSource(source instanceof ArrayBuffer ? new ArraySource(new Uint8Array(source))
      : source instanceof Uint8Array ? new ArraySource(source)
      : source.getReader());
}

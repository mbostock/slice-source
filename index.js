import SliceSource from "./slice/index";

export default function slice(source) {
  return new SliceSource(source.getReader ? source.getReader() : source);
}

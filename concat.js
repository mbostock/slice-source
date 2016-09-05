export default function(arrays) {
  if (arrays.length === 1) return arrays[0];
  var length = 0, i, j, n = arrays.length;
  for (i = 0; i < n; ++i) length += arrays[i].length;
  var c = new Uint8Array(length);
  for (i = j = 0; i < n; ++i) c.set(arrays[i], j), j += arrays[i].length;
  return c;
}

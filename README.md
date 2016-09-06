# slice-source

A [readable stream reader](https://streams.spec.whatwg.org/#readable-stream-reader) that takes a *length* argument, allowing you to pull the specified number of bytes from the underlying readable stream. For example:

```html
<!DOCTYPE html>
<script src="https://unpkg.com/slice-source@0"></script>
<script>

fetch("https://cors-anywhere.herokuapp.com/").then((response) => {
  return (function read(reader) {
    return reader.read(40).then((result) => {
      if (result.done) return;
      console.log(result.value);
      return read(reader);
    });
  })(sources.slice(response.body));
}).catch((error) => console.error(error.stack));

</script>
```

## API Reference

<a name="slice" href="#slice">#</a> <b>slice</b>(<i>stream</i>) [<>](https://github.com/mbostock/slice-source/blob/master/index.js#L4 "Source")
<b><a href="#slice">#</a> <b>slice</b>(<i>reader</i>)

Returns a sliceable *source* for the specified [readable *stream*](https://streams.spec.whatwg.org/#rs). If the specified *stream* does not expose a *reader*.getReader method, it assumed to be a [readable stream *reader*](https://streams.spec.whatwg.org/#readable-stream-reader), and a corresponding sliceable *source* is made.

<a name="source_read" href="#source_read">#</a> <i>source</i>.<b>read</b>(<i>length</i>) [<>](https://github.com/mbostock/slice-source/blob/master/read.js "Source")

Returns a Promise for the next chunk of data from the underlying stream. The yielded result is an object with the following properties:

* `value` - a [Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array), or undefined if the stream ended
* `done` - a boolean which is true if the stream ended

The promise will be yielded with a *value* of *length* bytes, or the remaining bytes of the underlying stream if the underlying stream has more than zero but fewer than *length* bytes remaining. When no bytes remain in the stream, the yielded *value* will be undefined, and *done* will be true.

<a name="source_cancel" href="#source_cancel">#</a> <i>source</i>.<b>cancel</b>() [<>](https://github.com/mbostock/slice-source/blob/master/cancel.js "Source")

Returns a Promise which is resolved when the underlying stream has been destroyed.

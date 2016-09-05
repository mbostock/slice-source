# slice-source

A [readable stream reader](https://streams.spec.whatwg.org/#readable-stream-reader) that takes an optional *length* argument, allowing you to pull the specified number of bytes from the underlying reader. For example:

```html
<!DOCTYPE html>
<script src="https://unpkg.com/slice-source@0.0"></script>
<script>

fetch("https://cors-anywhere.herokuapp.com/").then((response) => {
  return (function read(reader) {
    return reader.read(40).then((result) => {
      if (result.done) return;
      console.log(result.value);
      return read(reader);
    });
  })(sources.slice(response.body.getReader()));
}).catch((error) => console.error(error.stack));

</script>
```

## API Reference

<a name="slice" href="#slice">#</a> sources.<b>slice</b>(<i>source</i>) [<>](https://github.com/mbostock/slice-source/blob/master/index.js#L1 "Source")

Returns a sliceable *source* for the specified *source* (a *reader*).

<a name="source_read" href="#source_read">#</a> <i>source</i>.<b>read</b>([<i>length</i>]) [<>](https://github.com/mbostock/slice-source/blob/master/index.js#L22 "Source")

Returns a Promise for the next chunk of data from the underlying stream. The yielded result is an object with the following properties:

* `value` - a [Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) (a [Buffer](https://nodejs.org/api/buffer.html)), or undefined if the stream ended
* `done` - a boolean which is true if the stream ended

If an optional *length* is specified, the promise will be yielded with a *value* of *length* bytes, or the remaining bytes of the underlying stream if the underlying stream has more than zero but fewer than *length* bytes remaining. When no bytes remain in the stream, the yielded *value* will be undefined, and *done* will be true.

<a name="source_cancel" href="#source_cancel">#</a> <i>source</i>.<b>cancel</b>() [<>](https://github.com/mbostock/slice-source/blob/master/index.js#L46 "Source")

Returns a Promise which is resolved when the underlying stream has been destroyed.

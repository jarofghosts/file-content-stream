file-content-stream
====

given a stream of file names, will output a stream of file contents (split by newline) in format:

```js
{
  filename: '/path/to/file',
  line: (line number),
  data: (line string)
}
```

## license

MIT

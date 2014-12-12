file-content-stream
===================

[![Build Status](http://img.shields.io/travis/jarofghosts/file-content-stream.svg?style=flat)](https://travis-ci.org/jarofghosts/file-content-stream)
[![npm install](http://img.shields.io/npm/dm/file-content-stream.svg?style=flat)](https://www.npmjs.org/package/file-content-stream)

## usage

given a stream of file names, will output a stream of file contents
(split by newline) in format:

```js
{
  filename: '/path/to/file'
  line: (line number)
  data: (line string)
}
```

## license

MIT

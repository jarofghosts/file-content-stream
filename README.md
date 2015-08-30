# file-content-stream

[![Build Status](https://img.shields.io/travis/jarofghosts/file-content-stream.svg?style=flat-square)](https://travis-ci.org/jarofghosts/file-content-stream)
[![npm install](https://img.shields.io/npm/dm/file-content-stream.svg?style=flat-square)](https://www.npmjs.org/package/file-content-stream)
[![npm version](https://img.shields.io/npm/v/file-content-stream.svg?style=flat-square)](https://www.npmjs.org/package/file-content-stream)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)
[![License](https://img.shields.io/npm/l/file-content-stream.svg?style=flat-square)](https://github.com/jarofghosts/file-content-stream/blob/master/LICENSE)

## usage

given a stream of file names, will output a stream of file contents in format:

```js
{
  filename: '/path/to/file',
  chunk: (chunk number),
  data: (data chunk)
}
```

## API

`fileContentStream([splitOn]) -> DuplexStream`

* Where `splitOn` is an optional sequence to split file data by, defaults to
  `/\r?\n/`.

## license

MIT

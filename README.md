# file-content-stream

[![Build Status](http://img.shields.io/travis/jarofghosts/file-content-stream.svg?style=flat)](https://travis-ci.org/jarofghosts/file-content-stream)
[![npm install](http://img.shields.io/npm/dm/file-content-stream.svg?style=flat)](https://www.npmjs.org/package/file-content-stream)

## usage

given a stream of file names, will output a stream of file contents in format:

```js
{
    filename: '/path/to/file'
  , chunk: (chunk number)
  , data: (data chunk)
}
```

## api

`fileContentStream([splitOn]) -> DuplexStream`

* Where `splitOn` is an optional sequence to split file data by, defaults to
  `/\r?\n/`.

## license

MIT

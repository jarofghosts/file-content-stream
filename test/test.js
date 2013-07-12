var assert = require('assert'),
    fileStream = require('../index.js'),
    stream = require('stream'),
    Readable = stream.Readable,
    Writable = stream.Writable,
    rs = Readable(),
    a = Writable({ decodeStrings: false, objectMode: true });

a._write = function (line, enc, next) {
  console.log(line);
  next();
}

rs._read = function () {
  rs.push(__dirname + '/testfile');
  rs.push(null);
}

rs.pipe(fileStream()).pipe(a);

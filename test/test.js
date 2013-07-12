var assert = require('assert'),
    fileStream = require('../index.js'),
    stream = require('stream'),
    Readable = stream.Readable,
    Writable = stream.Writable,
    rs = Readable(),
    a = Writable({ decodeStrings: false, objectMode: true });

a._write = function (data, enc, next) {
  switch (data.line) {
    case 1:
      assert.equal(data.data, 'hey');
      break;
    case 2:
      assert.equal(data.data, 'wooo');
      break;
    case 3:
      assert.equal(data.data, 'bleee');
      break;
    case 4:
      assert.equal(data.data, 'scrawww');
      break;
    case 5:
      assert.equal(data.data, 'boooooooo');
      break;
    case 6:
      assert.ok(false);
      break;
  }
  next();
}

rs._read = function () {
  rs.push(__dirname + '/testfile');
  rs.push(null);
}

rs.pipe(fileStream()).pipe(a);

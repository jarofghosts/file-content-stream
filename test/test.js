var assert = require('assert'),
    fileStream = require('../index.js'),
    stream = require('stream'),
    Readable = stream.Readable,
    Writable = stream.Writable,
    rs = Readable(),
    a = Writable({ decodeStrings: false, objectMode: true }),
    badTime;

a._write = function (data, enc, next) {
  if (data.filename.match(/file2/)) clearTimeout(badTime);
  switch (data.line) {
    case 1:
      if (data.filename.match(/testfile/)) assert.equal(data.data, 'hey');
      if (data.filename.match(/file2/)) assert.equal(data.data, 'haha');
      break;
    case 2:
      if (data.filename.match(/testfile/)) assert.equal(data.data, 'wooo');
      if (data.filename.match(/file2/)) assert.equal(data.data, 'hey, now!');
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
  rs.push(__dirname + '/sub/file2');
  rs.push(null);
}
badTime = setTimeout(function () { assert.ok(false); }, 1000);
rs.pipe(fileStream()).pipe(a);

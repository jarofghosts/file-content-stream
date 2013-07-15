var fs = require('fs'),
    split = require('split'),
    through = require('through');

module.exports = fileStream;

function fileStream() {
  var tr = through(write, end),
      file = null,
      files = [];

  function processFile(filename) {
    var line = 1,
        file = fs.createReadStream(filename).pipe(split());
    
    file.on('data', function (data) {

      if (!data) return;

      var fileObject = {
        filename: filename,
        line: line,
        data: data.toString()
      };

      tr.queue(fileObject);

      line++;
    });

    file.on('end', function () {
      if (!files.length) {
        tr.queue(null);
      } else {
        processFile(files.shift());
      }
    });
    file.on('error', function () {
      // no-op
    });

 }

  function write(buf) {
    files.push(buf.toString());
    if (!file) processFile(files.shift());
  }

  function end() {
    if (!files.length) tr.queue(null);
  }

  return tr;

}


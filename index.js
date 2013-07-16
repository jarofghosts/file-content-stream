var fs = require('fs'),
    split = require('split'),
    through = require('through');

module.exports = fileStream;

function fileStream(options) {
  
  options = options || {};

  var tr = through(write, end),
      file = null,
      go = true,
      files = [];

  function processFile(filename) {
    var line = 1,
        file = fs.createReadStream(filename).pipe(split());
    
    file.on('data', function (data) {

      if (!data) return;

      var fileObject = {
        filename: filename,
        line: line,
        data: data
      };

      tr.queue(fileObject);

      line++;
    });

    file.on('end', function () {
      if (files.length) {
        processFile(files.shift());
      }
    });
    file.on('error', function () {
      // no-op
    });

 }

  function write(buf) {
    files.push(buf.toString());
    if (go) {
      go = false;
      processFile(files.shift());
    }
  }

  function end() {
    // we don't want through's default end()
  }

  return tr;

}


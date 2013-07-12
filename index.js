var fs = require('fs'),
    split = require('split'),
    through = require('through');

module.exports = fileStream;

function fileStream() {
  var tr = through(write, end),
      file = null,
      opened = 0;

  function write(buf) {
    opened++;
    var line = 1,
        filename = buf.toString();
    file = fs.createReadStream(filename).pipe(split());
    
    file.on('data', function (data) {

      if (!data) return

      var fileObject = {
        filename: filename,
        line: line,
        data: data.toString()
      };

      tr.queue(fileObject);
      line++;

    });

    file.on('end', function () {
      opened--;
      if (!opened) tr.queue(null);
    });
    file.on('error', function () {
      // no-op
    });
  }

  function end() {
    if (!opened) tr.queue(null);
  }

  return tr;

}


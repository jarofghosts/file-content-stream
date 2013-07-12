var fs = require('fs'),
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
    file = fs.createReadStream(filename);
    
    file.on('data', function (data) {

      var fileObject = {
        filename: filename,
        line: line,
        data: data
      };

      tr.queue(fileObject);
      line++;

    });

    file.on('end', function () {
      opened--;
      if (!opened) { tr.queue(null); }
    });
  }

  function end() {
    if (!opened) {
      tr.queue(null);
    }
  }

  return tr;

}


var fs = require('fs'),
    through = require('through');

module.exports = fileStream;

function fileStream() {
  var tr = through(write, end);

  function write(buf) {
    var line = 0;
  }

  function end() {
    
  }
}

var fs = require('fs'),
    split = require('split'),
    through = require('through')

module.exports = fileStream

function fileStream(options) {

  options = options || {}

  var tr = through(write, noop),
      file = null,
      files = []

  return tr

  function processFile(filename) {
    var line = 1,
        file = fs.createReadStream(filename).pipe(split())
    
    file.on('data', onData)
    file.on('end', onEnd)
    file.on('error', noop)

    function onData(data) {
      line++

      if (!data) return

      var fileObject = {
        filename: filename,
        line: line - 1,
        data: data
      }

      tr.queue(fileObject)
    }

    function onEnd() {
      if (files.length) processFile(files.shift())
    }
 }

  function write(buf) {
    files.push(buf.toString())
    if (file != null) return
    file = true
    processFile(files.shift())
  }

  function noop() {}
}

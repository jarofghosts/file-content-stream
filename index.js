var fs = require('fs'),
    split = require('split'),
    through = require('through')

module.exports = fileStream

function fileStream(options) {
  var tr = through(write, noop),
      file = null,
      files = []

  options = options || {}

  return tr

  function write(buf) {
    files.push(buf.toString())
    if (file != null) return
    file = true
    processFile(files.shift())
  }

  function processFile(filename) {
    var line = 0,
        file = fs.createReadStream(filename).pipe(split())
    
    file.on('data', onData)
    file.on('end', onEnd)
    file.on('error', noop)

    function onData(data) {
      line++

      if (!data) return

      var fileObject = {
        filename: filename,
        line: line,
        data: data
      }

      tr.queue(fileObject)
    }

    function onEnd() {
      if (files.length) return processFile(files.shift())
      tr.queue(null)
    }
  }
}

function noop() {}

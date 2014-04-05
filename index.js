var fs = require('fs')

var through = require('through')
  , split = require('split')

module.exports = fileStream

function fileStream() {
  var tr = through(write, noop)
    , processing = false
    , files = []

  return tr

  function write(buf) {
    files.push(buf.toString())
    if (processing) return

    processing = true
    process_file(files.shift())
  }

  function process_file(filename) {
    var file = fs.createReadStream(filename).pipe(split())

    var line = 0
    
    file.on('data', on_data)
    file.on('end', on_end)
    file.on('error', noop)

    function on_data(data) {
      line++

      if (!data) return

      var fileObject = {
          filename: filename
        , line: line
        , data: data
      }

      tr.queue(fileObject)
    }
  }

  function on_end() {
    if (files.length) return process_file(files.shift())

    tr.queue(null)
  }
}

function noop() {}

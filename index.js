var fs = require('fs')

var through = require('through')
  , split = require('split')

module.exports = fileStream

function fileStream() {
  var stream = through(write, end)
    , processing = false
    , finished = false
    , files = []

  return stream

  function write(buf) {
    files.push('' + buf)
    if(processing) return

    processing = true
    processFile(files.shift())
  }

  function processFile(filename) {
    if(!filename) return

    var file = fs.createReadStream(filename).pipe(split())
      , line = 0

    file.on('data', onData)
    file.on('end', onEnd)
    file.on('error', function(err) {
      stream.emit('error', err)
    })

    function onData(data) {
      line++

      if(!data) return

      var fileObject = {
          filename: filename
        , line: line
        , data: data
      }

      stream.queue(fileObject)
    }
  }

  function end() {
    if(!processing) stream.queue(null)
    finished = true
  }

  function onEnd() {
    if(!files.length && finished) return stream.queue(null)

    processFile(files.shift())
  }
}

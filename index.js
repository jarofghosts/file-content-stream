var fs = require('fs')

var through = require('through2')
  , split = require('split')

module.exports = fileStream

function fileStream(splitOn) {
  var stream = through.obj(write, end)
    , processing = false
    , finished = false
    , files = []

  return stream

  function write(buf, enc, next) {
    files.push(buf.toString())

    if(processing) {
      return next()
    }

    processing = true
    processFile(files.shift())

    next()
  }

  function processFile(filename) {
    if(!filename) {
      return
    }

    var file = fs.createReadStream(filename).pipe(split(splitOn))
      , chunk = 0

    file.on('data', onData)
    file.on('end', onEnd)
    file.on('error', function(err) {
      stream.emit('error', err)
    })

    function onData(data) {
      chunk++

      if(!data) {
        return
      }

      var fileObject = {
          filename: filename
        , chunk: chunk
        , data: data
      }

      stream.push(fileObject)
    }
  }

  function end() {
    if(!processing) {
      stream.push(null)
    }

    finished = true
  }

  function onEnd() {
    if(!files.length && finished) {
      return stream.push(null)
    }

    processFile(files.shift())
  }
}

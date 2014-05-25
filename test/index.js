var path = require('path')

var test = require('tape')

var fileStream = require('../')

test('streams file contents', function(t) {
  t.plan(2)

  var stream = fileStream()
    , lines = []
    , text = []

  stream.on('data', function(data) {
    lines.push(data.line)
    text.push(data.data)
  })

  stream.on('end', check)

  function check(data) {
    t.deepEqual([1, 2, 3, 4, 5, 1, 2], lines)
    t.deepEqual([
        'hey'
      , 'wooo'
      , 'bleee'
      , 'scrawww'
      , 'boooooooo'
      , 'haha'
      , 'hey, now!'
    ], text)
  }

  stream.write(path.join(__dirname, 'testfile'))
  stream.write(path.join(__dirname, 'sub', 'file2'))
})

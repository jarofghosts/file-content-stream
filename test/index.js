var path = require('path')

var test = require('tape')

var fileStream = require('../')

test('streams file contents', function(t) {
  t.plan(2)

  var stream = fileStream()
    , chunks = []
    , text = []

  stream.on('data', function(data) {
    chunks.push(data.chunk)
    text.push(data.data)
  })

  stream.on('end', check)

  function check() {
    t.deepEqual([1, 2, 3, 4, 5, 1, 2], chunks)
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
  stream.end()
})

test('accepts optional split sequence', function(t) {
  t.plan(2)

  var stream = fileStream(' ')
    , chunks = []
    , text = []

  stream.on('data', function(data) {
    chunks.push(data.chunk)
    text.push(data.data)
  })

  stream.on('end', check)

  function check() {
    t.deepEqual([1, 1, 2], chunks)
    t.deepEqual([
        'hey\nwooo\nbleee\nscrawww\nboooooooo\n'
      , 'haha\nhey,'
      , 'now!\n'
    ], text)
  }

  stream.write(path.join(__dirname, 'testfile'))
  stream.write(path.join(__dirname, 'sub', 'file2'))
  stream.end()
})

test('deals with stream ending correctly', function(t) {
  t.plan(2)

  var stream = fileStream()
    , chunks = []
    , text = []

  stream.on('data', function(data) {
    chunks.push(data.chunk)
    text.push(data.data)
  })

  stream.on('end', check)

  function check() {
    t.deepEqual([1, 2, 3, 4, 5, 1, 2], chunks)
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

  process.nextTick(function() {
    stream.write(path.join(__dirname, 'sub', 'file2'))
    stream.end()
  })
})

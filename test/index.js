var test = require('tape')
var bulk = require('../')
var bl   = require('bl')

test('basic case', function(t) {
  t.plan(5)

  bulk('scoped', 'pwd', __dirname, function(err) {
    t.ifError(err, 'completed without error')
  }).on('spawn', function(cwd, proc) {
    proc.stdout.pipe(bl(function(err, data) {
      if (err) return t.fail(err.message)
      t.equal(String(data).trim(), cwd)
    }))
  })
})

test('fail: scope does not exist', function(t) {
  bulk('missing', 'echo hello', __dirname, function(err) {
    t.ok(err, 'error was created')
    t.equal(err.message, 'Package scope "@missing" does not exist')
    t.end()
  })
})

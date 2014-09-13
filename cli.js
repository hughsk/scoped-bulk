#!/usr/bin/env node

var quote    = require('shell-quote').quote
var minimist = require('minimist')
var path     = require('path')
var bulk     = require('./')
var fs       = require('fs')

var cwd  = process.cwd()
var argv = []
var cmd  = []

for (var i = 2; i < process.argv.length; i++) {
  var arg = process.argv[i]
  if (arg.charAt(0) === '-') {
    argv.push(arg)
    continue
  }

  cmd = process.argv.slice(i)
  break
}

// Currently extracting command-line arguments
// in the hopes of avoiding backwards-compatibility
// issues later
var name = cmd.shift()
argv = minimist(argv)
cmd  = quote(cmd)

if (!name) return bail('Please specify a package namespace to use.')
if (!cmd.trim()) return bail('Please specify a command to run.')

bulk(name, cmd, cwd, function(err) {
  if (err) throw err
}).on('spawn', function(CWD, proc) {
  console.error()
  console.error(path.relative(cwd, CWD))
  console.error('> ' + cmd)
  console.error()

  proc.stdout.pipe(process.stdout)
  proc.stderr.pipe(process.stderr)
})

function bail(err) {
  console.error()
  console.error(err)
  console.error()

  fs.createReadStream(path.join(__dirname, 'usage.txt'))
    .once('close', function() { console.error() })
    .pipe(process.stderr)
}

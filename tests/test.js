'use strict'

var assert = require('assert')
var fs = require('fs')
var gutil = require('gulp-util')
var expect = require('expect.js')

var transformer = require('../index')

it('should handle a no angular file', function (cb) {
  var stream = transformer()
  var filename = './tests/fixtures/noangular.html'
  var testFile = fs.readFileSync(filename)

  stream.on('data', function (file) {
    expect(file.contents.toString()).to.equal(testFile.toString())
  })

  stream.on('end', cb)

  stream.write(new gutil.File({
    contents: new Buffer(testFile.toString())
  }))

  stream.end()
})

it('should handle a basic angular app', function (cb) {
  var stream = transformer()
  var filename = './tests/fixtures/basic.html'
  var testFile = fs.readFileSync(filename)

  stream.on('data', function (file) {
    var contents = file.contents.toString('utf8')
    expect(file.contents.toString()).to.not.equal(testFile.toString())
    expect(/\s+data-ng-cloak/.test(contents)).to.be.ok()
  });

  stream.on('end', cb)

  stream.write(new gutil.File({
    contents: new Buffer(testFile.toString())
  }))

  stream.end()
})

'use strict'

var gutil = require('gulp-util')
var cheerio = require('cheerio')
var through = require('through2')
var pluginName = 'gulp-angular-cloak'
var pluginError = gutil.PluginError

module.exports = function(opts) {
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      cb(null, file)
      return
    }
    if (file.isStream()) {
      cb(new pluginError(pluginName, 'Streaming not supported'))
      return
    }

    var content = file.contents.toString('utf8')

    if (needCloak(content)) {
      file.contents = new Buffer(replace(content))
    }

    return cb(null, file)
  })

  function needCloak(content) {
    return /{{/.test(content)
  }

  function replace(content) {
    var $ = cheerio.load(content, {
      xmlMode: false,
      decodeEntities: false,
      normalizeWhitespace: false,
      recognizeSelfClosing: true
    })

    $('*').filter(function(index, elem) {
      return elem.children.some(function(child) {
        return child.type === 'text'
      })
    }).filter(function(index, elem) {
      return needCloak($(elem).text())
    }).each(function(index, elem) {
      $(elem).attr('data-ng-cloak', 'data-ng-cloak')
    });

    return $.html()
  }
}

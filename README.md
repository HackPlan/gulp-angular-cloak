# [gulp](https://github.com/gulpjs/gulp)-angular-cloak

> Add `ng-cloak` automatically

## Install

Install with [npm](https://npmjs.org/package/gulp-angular-cloak)

```sh
npm install --save gulp-angular-cloak
```

## Usage

```js
var gulp = require('gulp');
var ngCloak = require('gulp-angular-cloak');

//simple usage
gulp.task('htmlify', function() {
    gulp.src('public/**/*.html')
        .pipe(ngCloak())
        .pipe(gulp.dest('build/'));
});

//using jade as a pre-processer
gulp.task('htmlify', function() {
    gulp.src('partials/**/*.jade')
        .pipe(jade())
        .pipe(ngCloak())
        .pipe(gulp.dest('build/'));
});
```
## License

MIT @[c4605](https://github.com/bolasblack)

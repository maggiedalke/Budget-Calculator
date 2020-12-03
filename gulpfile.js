const { src, dest, series, parallel } = require('gulp');

function htmlTask() {
  return src('src/*.html').pipe(dest('dist'));
}

function stylesTask() {
  return src('src/*.css').pipe(dest('dist'));
}

function scriptTask() {
  return src('src/*.js').pipe(dest('dist'));
}

function imageTask() {
  return src('src/*.png').pipe(dest('dist'));
}

exports.default = series(htmlTask, stylesTask, imageTask, scriptTask);

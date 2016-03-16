var gulp = require('gulp');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var to5 = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var paths = require('../paths');
var compilerOptions = require('../babel-options');
var assign = Object.assign || require('object.assign');
var notify = require("gulp-notify");
var browserSync = require('browser-sync');

// transpiles changed es6 files to SystemJS format
// the plumber() call prevents 'pipe breaking' caused
// by errors from other gulp plugins
// https://www.npmjs.com/package/gulp-plumber
gulp.task('build-system', function() {
  return gulp.src(paths.source)
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(changed(paths.output, {extension: '.js'}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(to5(assign({}, compilerOptions, {modules: 'system'})))
    .pipe(sourcemaps.write({includeContent: true}))
    .pipe(gulp.dest(paths.output));
});

// copies changed html files to the output directory
gulp.task('build-html', function() {
  return gulp.src(paths.html)
    .pipe(changed(paths.output, {extension: '.html'}))
    .pipe(gulp.dest(paths.output));
});

// copies changed css files to the output directory
gulp.task('build-css', function() {
  return gulp.src(paths.css)
    .pipe(changed(paths.output, {extension: '.css'}))
    .pipe(gulp.dest(paths.output))
    .pipe(browserSync.stream());
});

gulp.task('build-plugin-html-es6', function () {
  return gulp.src(paths.pluginHtml)
    .pipe(gulp.dest(paths.output + 'es6'));
});

gulp.task('build-plugin-es6', ['build-plugin-html-es6'], function () {
  return gulp.src(paths.pluginSource)
    .pipe(gulp.dest(paths.output + 'es6'));
});

gulp.task('build-plugin-html-commonjs', function () {
  return gulp.src(paths.pluginHtml)
    .pipe(gulp.dest(paths.output + 'commonjs'));
});

gulp.task('build-plugin-commonjs', ['build-plugin-html-commonjs'], function () {
  return gulp.src(paths.pluginSource)
    .pipe(to5(assign({}, compilerOptions, {modules:'common'})))
    .pipe(gulp.dest(paths.output + 'commonjs'));
});

gulp.task('build-plugin-html-amd', function () {
  return gulp.src(paths.pluginHtml)
    .pipe(gulp.dest(paths.output + 'amd'));
});

gulp.task('build-plugin-amd', ['build-plugin-html-amd'], function () {
  return gulp.src(paths.pluginSource)
    .pipe(to5(assign({}, compilerOptions, {modules:'amd'})))
    .pipe(gulp.dest(paths.output + 'amd'));
});

gulp.task('build-plugin-html-system', function () {
  return gulp.src(paths.pluginHtml)
    .pipe(gulp.dest(paths.output + 'system'));
});

gulp.task('build-plugin-system', ['build-plugin-html-system'], function () {
  return gulp.src(paths.pluginSource)
    .pipe(to5(assign({}, compilerOptions, {modules:'system'})))
    .pipe(gulp.dest(paths.output + 'system'));
});

gulp.task('build-plugin', function(callback) {
  return runSequence(
    // 'plugin-clean',  // not needed in client build-plugin since it's
    //                     using paths.output instead of paths.pluginOutput
    ['build-plugin-es6', 'build-plugin-commonjs', 'build-plugin-amd', 'build-plugin-system'],
    callback
  );
});

// this task calls the clean task (located
// in ./clean.js), then runs the build-system
// and build-html tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    ['build-system', 'build-plugin', 'build-html', 'build-css'],
    callback
  );
});





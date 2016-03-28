var gulp = require('gulp');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');

// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000

gulp.task('serve-bundle', function() {
  browserSync({
    online: false,
    open: false,  // don't open the browser automatically
    port: 9000,  // start on this port
    server: {
      baseDir: ['.'],
      middleware: function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  });
});

gulp.task('browser-sync', function(done) {
  browserSync({
    online: false,
    open: false,
    port: 9000,
    server: {
      baseDir: ['.'],
      middleware: function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  }, done);
});

gulp.task('serve', function() {
  return runSequence(
    'unbundle',
    'build',
    'browser-sync'
  );
});

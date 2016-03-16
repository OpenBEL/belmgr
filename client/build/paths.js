var appRoot = 'src/';
var outputRoot = 'dist/';
var exportSrvRoot = 'export/';
var pluginRoot = '../plugin/';
var pluginOutputRoot = '../plugin/dist/';

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.js',
  pluginSource: pluginRoot + 'src/**/*.js',
  html: appRoot + '**/*.html',
  pluginHtml: pluginRoot + 'src/**/*.html',
  css: appRoot + '**/*.css',
  style: 'styles/**/*.css',
  output: outputRoot,
  exportSrv: exportSrvRoot,
  doc: './doc',
  e2eSpecsSrc: ['test/e2e/src/**/*.js', pluginRoot + 'test/e2e/src/**/*.js'],
  e2eSpecsDist: 'test/e2e/dist/'
};

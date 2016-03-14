var appRoot = 'client/src/';
var outputRoot = 'client/dist/';
var pluginRoot = 'plugin/src/';
var pluginOutputRoot = 'plugin/dist/';

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.js',
  pluginSource: pluginRoot + '**/*.js',
  html: appRoot + '**/*.html',
  pluginHtml: pluginRoot + '**/*.html',
  css: appRoot + '**/*.css',
  style: 'styles/**/*.css',
  output: outputRoot,
  pluginOutput: pluginOutputRoot,
  doc: './doc',
  e2eSpecsSrc: ['client/test/e2e/src/**/*.js'],
  e2eSpecsDist: ['client/test/e2e/dist/']
};

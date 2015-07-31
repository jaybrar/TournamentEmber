/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  app.import('bower_components/jquery/dist/jquery.min.js');
  app.import('bower_components/materialize/dist/font/roboto/Roboto-Regular.woff', {
    destDir: '/font/roboto/'
  });
  app.import('bower_components/materialize/dist/font/roboto/Roboto-Light.woff', {
    destDir: '/font/roboto/'
  });
  app.import('bower_components/materialize/dist/font/roboto/Roboto-Medium.woff', {
    destDir: '/font/roboto/'
  });
  app.import('bower_components/materialize/dist/font/material-design-icons/Material-Design-Icons.woff', {
    destDir: '/font/material-design-icons/'
  });
  app.import('bower_components/materialize/dist/font/material-design-icons/Material-Design-Icons.woff2', {
    destDir: '/font/material-design-icons/'
  });
  app.import('bower_components/materialize/dist/css/materialize.min.css');
  app.import('bower_components/materialize/dist/js/materialize.min.js');

  return app.toTree();
};

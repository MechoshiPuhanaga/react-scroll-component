/* eslint-disable no-param-reassign */
/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');

module.exports = (on, config) => {
  config.env = config.env || {};
  config.env.webpackFilename = path.resolve(__dirname, '../../webpack.test.js');

  require('@cypress/code-coverage/task')(on, config);

  require('@cypress/react/plugins/load-webpack')(on, config, config.env);

  return config;
};

const path = require('path');

const resources = ['_mixins.scss', '_variables.scss'];

module.exports = resources.map((file) => path.resolve(__dirname, file));

const path = require('path');

const aliases = {
  web: {
    '@root': path.resolve(__dirname, '/'),
    '@components': path.resolve(__dirname, 'src/components'),
    '@pages': path.resolve(__dirname, 'src/pages'),
    '@services': path.resolve(__dirname, 'src/services'),
    '@styles': path.resolve(__dirname, 'src/styles')
  }
};

module.exports = () => {
  return Object.keys(aliases).reduce((accum, parentName) => {
    Object.keys(aliases[parentName]).forEach((aliasName) => {
      if (typeof accum[aliasName] === 'undefined') {
        accum[aliasName] = aliases[parentName][aliasName];
      }
    });

    return accum;
  }, {});
};

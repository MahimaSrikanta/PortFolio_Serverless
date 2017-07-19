var glob = require('glob');
var path = require('path');
var nodeExternals = require('webpack-node-externals');

// React App Babel transform
process.env.NODE_ENV = 'production';

module.exports = {
  //  All js files in project rootexclude webpack.config.js
  entry: globEntries('!(webpack.config).js'),
  target: 'node',
  // As 'aws-sdk' is not compatible with webpack, 
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder 
  // Run babel on all .js files and skip those in node_modules
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: __dirname,
      exclude: /node_modules/,  //  exclude all node dependencies
    }]
  },
  // For multiple APIs that we create need .js file for each 
  
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  },
};

function globEntries(globPath) {
  var files = glob.sync(globPath);
  var entries = {};

  for (var i = 0; i < files.length; i++) {
    var entry = files[i];
    entries[path.basename(entry, path.extname(entry))] = './' + entry;
  }

  return entries;
}
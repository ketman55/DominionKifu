const path = require('path');
const glob = require('glob');

module.exports = {
  entry: glob.sync('src/webpack/**/*.ts').reduce((entries, entry) => {
    const entryName = path.relative('src/webpack', entry).replace(/\\/g, '/').replace('.ts', '');
    entries[entryName] = path.resolve(__dirname, entry);
    return entries;
  }, {}),
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
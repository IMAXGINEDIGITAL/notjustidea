const path = require('path');
const globule = require('globule');
const cssnext = require('postcss-cssnext')
const filepaths = globule.find('src/view/*.vue');
const entry = {};

filepaths.forEach(filepath => {
  const name = path.basename(filepath, '.vue');
  entry[name] = path.resolve(__dirname, filepath);
});

// webpack.config.js
module.exports = {
  // entry point of our application
  entry: entry,
  // where to place the compiled bundle
  output: {
    path: path.resolve(__dirname, 'pages', 'dist'),
    filename: '[name].js',
    library: 'VUE_APP',
    libraryTarget: 'var'
  },
  module: {
    // `loaders` is an array of loaders to use.
    // here we are only configuring vue-loader
    loaders: [
      {
        test: /\.vue$/, // a regex for matching all files that end in `.vue`
        loader: 'vue'   // loader to use for matched files
      },
      {
        test: /\.js$/,
        loader: 'babel?presets[]=es2015&plugins[]=transform-runtime'
      }
    ]
  },
  vue: {
    autoprefixer: false,
    postcss: [cssnext()],
    loader: {
      css: 'postcss'
    }
  }
}
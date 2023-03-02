const path = require('path');

// eslint-disable-next-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const outputDirectory = 'dist';

module.exports = {
  entry: './src/client/index.js', // app starts executing and webpack starts bundling
  output: {
    // target dir and file name for bundled output
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js',
  },
  module: {
    // Module loaders are transformations that are applied on the source code of a module
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          // We pass all the js file through babel-loader to transform JSX to Javascript
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        // CSS files are passed through css-loaders and style-loaders to load and bundle CSS files
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    // for development env only
    port: 3000,
    open: true,
    proxy: {
      // Proxying URLs can be useful when we have a separate API backend development server
      // And we want to send API requests on the same domain
      // In our case, we have a Nodejs/ Express backend where we want to send the API requests to
      '/api': 'http://localhost:8080',
    },
  },
  plugins: [
    // webpack plugin to remove the build folder(s) before building
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: [outputDirectory],
    }), // simplifies creation of HTML files to serve your webpack bundles
    // It loads the template(public / index.html) and injects the output bundle
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
    }),
  ],
};

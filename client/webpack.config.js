const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: './src/index.js',

    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '/dist'),
        publicPath: '/'
       
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html'
        })
    ],

    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
              },
            },
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
          // Add other loaders for different file types as needed
        ],
      },
      resolve: {
        extensions: ['.js', '.jsx'],
      },
      devServer: {
        static: path.join(__dirname, 'dist'),
        port: 3000,
        hot: true,
        historyApiFallback: true,
        // other devServer configurations
      },
    };
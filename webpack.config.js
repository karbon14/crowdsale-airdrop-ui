const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const BUILD_DIR = path.resolve(__dirname, 'dist')
const APP_DIR = path.resolve(__dirname, 'src')

// Html Auto generator
const HtmlPlugin = new HtmlWebpackPlugin({
  title: 'Karbon14 Airdrop',
  template: require('html-webpack-template'),
  appMountId: 'app',
  favicon: 'src/favicon.ico',
  baseHref: '/',
  inject: false,
  mobile: true,
  scripts: ['https://www.googletagmanager.com/gtag/js?id=UA-126698710-2'],
  meta: [
    { charset: 'utf-8' },
    {
      name: 'description',
      content:
        'Get your Karbon14 Free Tokens now. Follow our Airdrop steps and claim your reward'
    },
    {
      name: 'keywords',
      content:
        'Karbon14, ICO, Crowdsale, Blockchain, Smart Contracts, Proof of Life, Airdrop, Freetokens, Free Tokens, Ethereum, ERC20, ERC-20'
    },
    {
      property: 'og:description',
      content:
        'Get your Karbon14 Free Tokens now. Follow our Airdrop steps and claim your reward'
    },
    {
      property: 'canonical',
      content: 'https://airdrop.karbon14.org/'
    },
    {
      property: 'image',
      content: 'https://airdrop.karbon14.org/preview.jpg'
    },
    {
      property: 'og:title',
      content: 'Karbon14 Airdrop'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:url',
      content: 'https://airdrop.karbon14.org/'
    },
    {
      property: 'og:site_name',
      content: 'Karbon14 Airdrop'
    }
  ]
})

const getPlugins = argv => {
  let plugins = [
    HtmlPlugin,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(argv.mode),
      'process.env.API_URL': JSON.stringify(
        process.env.API_URL || 'http://localhost:80/v1'
      ),
      'process.env.HOME_URL': JSON.stringify(
        process.env.HOME_URL || 'https://karbon14.org'
      ),
      'process.env.AIRDROP_URL': JSON.stringify(
        process.env.AIRDROP_URL || 'https://goo.gl/forms/m83bqWYcWs1TigJI2'
      )
    })
  ]

  if (argv.mode === 'production') {
    plugins = [
      ...plugins,
      new CopyWebpackPlugin([
        {
          from: './_redirects',
          to: './_redirects',
          toType: 'file'
        },
        {
          from: './_headers',
          to: './_headers',
          toType: 'file'
        }
      ])
    ]
  }

  return plugins
}

module.exports = (env, argv) => ({
  // Don't directly expose sourcemaps on production
  devtool: argv.mode === 'production' ? false : 'eval-source-map',
  // webpack-dev-server configurations
  devServer: {
    inline: true,
    contentBase: BUILD_DIR,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
    },
    proxy: {
      '/api': {
        target: 'http://localhost:80',
        pathRewrite: { '^/api': '' }
      }
    }
  },
  // Entry of the project, use babel polyfill.
  // Can be configured to split into diferent files.
  entry: {
    bundle: [
      'whatwg-fetch',
      'babel-polyfill',
      'url-search-params-polyfill',
      'moment',
      'moment-timezone',
      `${APP_DIR}/index.js`
    ]
  },
  output: {
    path: BUILD_DIR,
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
  },
  module: {
    // Set up loaders to process your files
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg|woff2?|ttf|eot)$/i,
        use: [
          {
            loader: 'file-loader',
            options: { name: '[name].[ext]' }
          }
        ]
      },
      {
        test: /\.js$/,
        include: [APP_DIR],
        use: [{ loader: 'babel-loader' }]
      },
      {
        test: /\.css/,
        use: [{ loader: 'to-string-loader' }, { loader: 'css-loader' }]
      },
      {
        test: /\.scss/,
        use: [{ loader: 'babel-loader' }, { loader: 'styled-jsx-css-loader' }]
      }
    ]
  },
  plugins: getPlugins(argv),
  resolve: {
    alias: {
      react: require.resolve('react')
    },
    // Allow us to use peerDependencies on library packages
    modules: ['node_modules', path.join(__dirname, 'node_modules')]
  }
})

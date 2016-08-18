var webpack = require('webpack')

module.exports = function (config) {
  config.set({
    // base path used to resolve all patterns
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon'],

    // list of files/patterns to load in the browser
    files: [{ pattern: 'spec.bundle.js', watched: false }],

    // files to exclude
    exclude: [],

    plugins: [
      require('karma-chai'),
      require('karma-phantomjs-launcher'),
      require('karma-mocha'),
      require('karma-mocha-reporter'),
      require('karma-sinon'),
      require('karma-sourcemap-loader'),
      require('karma-webpack')
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: { 'spec.bundle.js': ['webpack', 'sourcemap'] },

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          { test: /\.js$/, exclude: [/app\/lib/, /node_modules/], loader: 'ng-annotate!babel' },
          { test: /\.json$/, loader: 'json' },
          { test: /\.html$/, loader: 'raw' },
          { test: /\.jade$/, loader: 'raw!jade-html' },
          { test: /\.less$/, loader: 'style!css!less' },
          { test: /\.css$/, loader: 'style!css' },
          { test: /\.(png|jpg)$/, loader: 'url?limit=25000' },
          { test: /\.styl$/, loader: 'style!css!stylus' },
          { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
          { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
          { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
          { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
          { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
          { test: /\.otf(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
          { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
          { test: /\.svg$/, loader: 'svg' },
          { test: /\.(woff|woff2|ttf|eot|svg)(\?]?.*)?$/, loader: 'file-loader?name=res/[name].[ext]?[hash]' }
        ]
      },
      stylus: {
        use: [require('nib')()],
        import: ['~nib/lib/nib/index.styl']
      },
      plugins: [
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery'
        }),
      ]
    },

    webpackServer: {
      noInfo: true // prevent console spamming when running in Karma!
    },

    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],

    // web server port
    port: 9876,

    // enable colors in the output
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // toggle whether to watch files and rerun tests upon incurring changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // if true, Karma runs tests once and exits
    singleRun: true,

    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true
    }
  });
};

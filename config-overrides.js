// react-app-rewired overrides for CRA 5 (webpack 5).
// Webpack 5 no longer ships Node.js core polyfills, but web3 1.x expects
// them in the browser, so wire them back in here.
const webpack = require("webpack");

module.exports = function override(config) {
  config.resolve.fallback = {
    ...(config.resolve.fallback || {}),
    assert: require.resolve("assert/"),
    buffer: require.resolve("buffer/"),
    crypto: require.resolve("crypto-browserify"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify/browser"),
    process: require.resolve("process/browser"),
    stream: require.resolve("stream-browserify"),
    url: require.resolve("url/"),
  };

  config.plugins = [
    ...(config.plugins || []),
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ];

  // Some web3 packages ship source maps pointing at files that are not
  // published; silence the resulting source-map-loader warnings.
  config.ignoreWarnings = [
    ...(config.ignoreWarnings || []),
    /Failed to parse source map/,
  ];

  return config;
};

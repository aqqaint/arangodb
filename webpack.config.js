"use strict";
const nodeExternals = require("webpack-node-externals");

const path = require("path");

module.exports = {
  mode: "production",
  target: "node",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "build"),
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"]
          }
        }
      }
    ]
  },
  entry: {
    index: path.resolve(__dirname, "foxx", "index.js"),
    setup: path.resolve(__dirname, "foxx", "setup.js"),
    start: path.resolve(__dirname, "db", "start.js")
  },
  externals: [/^@arangodb(\/|$)/, nodeExternals()]
};

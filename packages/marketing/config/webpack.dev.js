const {merge} = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
    mode: 'development',
    devServer:{
        port:8081,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins:[
        new ModuleFederationPlugin({
            name: 'marketing',
            filename: 'remoteEntry.js',
            exposes: {
                './MarketingApp': './src/bootstrap'
            },
            // syntax to delegate shared module selection
            shared: packageJson.dependencies
            
            // old syntax of shared modules
            //shared:['react', 'react-dom']

        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]

}

module.exports = merge(commonConfig, devConfig)
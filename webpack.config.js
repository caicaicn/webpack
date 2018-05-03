var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
module.exports={
    devtool: "source-map",
    entry: './app/main.js',
    output: {
        path: __dirname + "/public", 
        filename: 'bundle-[hash].js'
    },
    module:{
        rules:[
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['es2015']
                    }
                }, 
                exclude: "/node_modules/"
            },
            {
                test: /\.css$/,
                // use: [
                //     {
                //         loader: "style-loader"
                //     },
                //     {
                //         loader: "css-loader"
                //     }
                // ]
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader"]
                })
            }
        ]
    },
    plugins: [
        // 依据一个简单的index.html模板，生成一个自动引用你打包后的JS文件的新index.html
        new HtmlWebpackPlugin(),
        // 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
        new webpack.optimize.OccurrenceOrderPlugin(),
        // 压缩 不用配置
        new webpack.optimize.UglifyJsPlugin(),
        // 分离 use: ExtractTextPlugin.extract
        new ExtractTextPlugin('./css/common.css')
    ]
}
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const ImageminWebpWebpackPlugin= require("imagemin-webp-webpack-plugin");
const { extendDefaultPlugins } = require("svgo");
const path = require('path');

module.exports = {
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin(),
        new SpriteLoaderPlugin(),
        new ImageminWebpWebpackPlugin(),
        new ImageMinimizerPlugin({
            minimizerOptions: {
                plugins: [
                    ["gifsicle", { interlaced: true, optimizationLevel: 2 }],
                    ["mozjpeg", { progressive: true, quality: 85 }],
                    ["pngquant", { quality: [0.7, 1] }],
                ],
            },
        }),

    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"],
            },
            {
                test: /\.svg$/i,
                include: /.*_sprite\.svg/,
                use: [
                    'svg-sprite-loader',
                    'svgo-loader'
                ]
            },
            {
                test: /\.(gif|png|jpe?g)$/,
                type: "asset/resource",
                generator: {
                    filename: '[name][ext]',
                },
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
        ]
    },
    devServer: {
        contentBase: './dist'
    },
    optimization: {
        minimize: true,
        minimizer: [
            new HtmlMinimizerPlugin(),
            new CssMinimizerPlugin(),
        ],
    },
};
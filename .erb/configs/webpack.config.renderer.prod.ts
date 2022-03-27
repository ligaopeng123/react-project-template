/**
 * Build config for electron renderer process
 */

import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// @ts-ignore
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import {merge} from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import baseConfig from './webpack.config.base';
import webpackPaths from './webpack.paths';
import checkNodeEnv from '../scripts/check-node-env';
import deleteSourceMaps from '../scripts/delete-source-maps';

// const {getThemeVariables} = require('antd/dist/theme');
checkNodeEnv('production');
deleteSourceMaps();

const devtoolsConfig =
    process.env.DEBUG_PROD === 'true'
        ? {
            devtool: 'source-map',
        }
        : {};

const configuration: webpack.Configuration = {
    ...devtoolsConfig,

    mode: 'production',

    target: ['web', 'electron-renderer'],

    entry: [path.join(webpackPaths.srcRendererPath, 'index.tsx')],

    output: {
        path: webpackPaths.distRendererPath,
        publicPath: './',
        filename: 'renderer.js',
        library: {
            type: 'umd',
        },
    },

    module: {
        rules: [
            {
                test: /\.s?(a|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: "resolve-url-loader",
                        options: {
                            sourceMap: true,
                            root: webpackPaths.srcRendererPathSrc,
                        },
                    },
                    'sass-loader',
                ],
                include: /\.module\.s?(c|a)ss$/,
            },
            {
                test: /\.s?(a|c)ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', {
                    loader: "resolve-url-loader",
                    options: {
                        sourceMap: true,
                        root: webpackPaths.srcRendererPathSrc,
                    },
                }, 'sass-loader'],
                exclude: /\.module\.s?(c|a)ss$/,
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', {
                    loader: 'less-loader',
                    options: {
                        lessOptions: {
                            module: true,
                            javascriptEnabled: true,
                            // localIdentName: '[local]--[hash:base64:5]',
                            // ...getThemeVariables({
                            //     dark: true, // 开启暗黑模式
                            //     compact: false, // 开启紧凑模式
                            // }),
                        }
                    }
                }],
            },
            // Fonts
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            // Images
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },

    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
            }),
            new CssMinimizerPlugin(),
        ],
    },

    plugins: [
        /**
         * Create global constants which can be configured at compile time.
         *
         * Useful for allowing different behaviour between development builds and
         * release builds
         *
         * NODE_ENV should be production so that modules do not perform certain
         * development checks
         */
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'production',
            DEBUG_PROD: false,
        }),

        new webpack.DefinePlugin({
            'process.env': JSON.stringify({REACT_APP_PUBLICPATH: ''})
        }),

        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
        // @ts-ignore
        new BundleAnalyzerPlugin({
            analyzerMode: process.env.ANALYZE === 'true' ? 'server' : 'disabled',
        }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(webpackPaths.srcRendererPath, 'index.ejs'),
            minify: {
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeComments: true,
            },
            isBrowser: false,
            isDevelopment: process.env.NODE_ENV !== 'production',
        }),
    ],
};

export default merge(baseConfig, configuration);

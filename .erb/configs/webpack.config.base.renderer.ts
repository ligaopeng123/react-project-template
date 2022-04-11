/**
 * Base webpack renderer config used across other specific configs
 */
import {resolve} from "path";

const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
// const {getThemeVariables} = require('antd/dist/theme');

export const sassRegex = /\.(scss|sass)$/;
export const sassModuleRegex = /\.module\.(scss|sass)$/;

export const sassRules = () => {
    return [
        {
            test: sassRegex,
            exclude: sassModuleRegex,
            use: [
                {
                    loader: 'style-loader',
                    options: {}
                },
                {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            mode: 'local',
                        },
                        sourceMap: true,
                        importLoaders: 3,
                    },
                },
                {
                    loader: require.resolve('postcss-loader'),
                    options: {
                        postcssOptions: {
                            ident: 'postcss',
                            config: false,
                            plugins: [
                                'postcss-flexbugs-fixes',
                                [
                                    'postcss-preset-env',
                                    {
                                        autoprefixer: {
                                            flexbox: 'no-2009',
                                        },
                                        stage: 3,
                                    },
                                ],
                                'postcss-normalize',
                            ],
                        },
                        sourceMap: true,
                    },
                },
                {
                    loader: "resolve-url-loader",
                    options: {
                        sourceMap: true,
                        root: resolve(__dirname, '../../src/renderer'),
                    },
                },
                {
                    loader: 'sass-loader',
                    options: {
                        // webpackImporter: false,
                    }
                }
            ],
            sideEffects: true,
        },
        {
            test: sassModuleRegex,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            mode: 'local',
                            getLocalIdent: getCSSModuleLocalIdent,
                        },
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {}
                }],
            exclude: /\.module\.s?(c|a)ss$/,
        },
    ]
};


export const lessRules = () => {
    return [
        {
            test: /\.less$/,
            use: ['style-loader', 'css-loader',
                {
                    loader: 'less-loader',
                    options: {
                        lessOptions: {
                            javascriptEnabled: true,
                        }
                    }
                }],
        },
    ]
}

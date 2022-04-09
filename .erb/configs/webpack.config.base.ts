/**
 * Base webpack config used across other specific configs
 */

import webpack from 'webpack';
import webpackPaths from './webpack.paths';
import {dependencies as externals} from '../../release/app/package.json';
import {resolve} from "path";

const configuration: webpack.Configuration = {
    externals: [...Object.keys(externals || {})],

    stats: 'errors-only',

    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        // Remove this line to enable type checking in webpack builds
                        transpileOnly: true
                    }
                }
            }
        ]
    },

    output: {
        path: webpackPaths.srcPath,
        // https://github.com/webpack/webpack/issues/1114
        library: {
            type: 'commonjs2'
        }
    },

    /**
     * Determine the array of extensions that should be used to resolve modules.
     */
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
        modules: [webpackPaths.srcPath, 'node_modules'],
        alias: {
            '@': resolve(__dirname, '../../src/renderer'),
            '@assets': resolve(__dirname, '../../assets'),
            '@httpClient': resolve(__dirname, '../../src/renderer/httpClient'),
            '@layouts': resolve(__dirname, '../../src/renderer/layouts'),
            '@pages': resolve(__dirname, '../../src/renderer/pages'),
            '@share': resolve(__dirname, '../../src/renderer/share'),
            '@store': resolve(__dirname, '../../src/renderer/store'),
            '@hooks': resolve(__dirname, '../../src/renderer/hooks'),
            '@components': resolve(__dirname, '../../src/renderer/components'),
        }
    },

    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'production'
        })
    ]
};

export default configuration;

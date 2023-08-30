// If your plugin is direct dependent to the html webpack plugin:
const HtmlWebpackPlugin = require('html-webpack-plugin');

class AddExternalsPlugin {
    constructor(config) {
        this.scripts = config.scripts || [];
    }
    apply(compiler) {
        compiler.hooks.compilation.tap('AddExternalsPlugin', (compilation) => {
            HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
                'AddExternalsPlugin', // <-- Set a meaningful name here for stacktraces
                (data, cb) => {
                    // Manipulate the content
                    data.html += this.scripts?.map((_path) => `<script src="${_path}"></script>`).join('')
                    // Tell webpack to move on
                    cb(null, data)
                }
            )
        })
    }
}

module.exports = AddExternalsPlugin;


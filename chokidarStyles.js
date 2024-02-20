const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const sass = require('sass');
const autoprefixer = require('autoprefixer');
const postcss = require('postcss');

// 要监听的文件或目录路径
const filePath = './src/styles.scss';
const templatePath = './src/${upperCamelName}Template.ts';

// 监听文件或目录变化
const watcher = chokidar.watch(filePath);

const changeCss = () => {
    // 编译 SCSS 文件
    const scssFilePath = path.resolve(__dirname, filePath);
    try {
        const result = sass.renderSync({file: scssFilePath, outputStyle: 'expanded'});
        const cssContent = result.css.toString();
        postcss([autoprefixer({overrideBrowserslist: ['last 30 versions', '> 0.5%', 'Firefox ESR', 'not dead']})])
            .process(cssContent, {from: undefined})
            .then(_result => {
                // 添加样式后的css
                const prefixedCss = _result.css;

                // 读取模板文件
                const templateContent = fs.readFileSync(templatePath, 'utf-8');

                const regex = /<style>([\s\S]*?)<\/style>/;

                const cssText = templateContent.match(regex);

                if (cssText && cssText[1] !== prefixedCss) {
                    // 将 CSS 内容插入模板中
                    const modifiedTemplateContent = templateContent.replace(regex, `<style>${prefixedCss}</style>`);
                    // 更新输出文件
                    const outputFilePath = path.resolve(__dirname, templatePath);
                    fs.writeFileSync(outputFilePath, modifiedTemplateContent);
                }
            })
            .catch(error => {
                console.error('Error processing CSS:', error);
            });
    } catch (e) {
        console.log(e);
    }
}

// 监听文件或目录变化事件
watcher.on('change', (path) => {
    console.log(`File ${path} has been changed`);
    changeCss();
});

watcher.on('add', (path) => {
    console.log(`File ${path} has been added`);
});

watcher.on('unlink', (path) => {
    console.log(`File ${path} has been removed`);
});

// 监听错误事件
watcher.on('error', (error) => {
    console.error(`Watcher error: ${error}`);
});

// 在需要的时候停止监听
// watcher.close();

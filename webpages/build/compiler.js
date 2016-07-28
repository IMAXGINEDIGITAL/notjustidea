'use strict';

const promisifyAll = require('bluebird').promisifyAll;
const fs = promisifyAll(require('fs'));
const fse = promisifyAll(require('fs-extra'));
const path = require('path');
const globule = require('globule');
const parser = require('./parser');

const argv = require('yargs')
  .usage('Usage: compiler -p \'<your pattern1>\' -p \'<your pattern2>\' -o <your output dir>')
  .example('compiler -p \'**/*.js\' -o \'dist\'')
  .demand('p')
  .alias('p', 'pattern')
  .describe('p', 'Files to compile, globbing supported.')
  .demand('o')
  .alias('o', 'output')
  .describe('o', 'Directory to output.')
  .argv;

let patterns;
let outputDir;

if (typeof argv.pattern === 'string') {
    patterns = [argv.pattern];
} else {
    patterns = argv.pattern.slice(0);
}

if (typeof argv.output === 'string') {
    outputDir = argv.output;
} else {
    outputDir = argv.output[0];
}

const projectRoot = path.resolve(__dirname, '..');

globule.find.apply(globule, patterns)
    .forEach(filepath => {
        const name = path.basename(filepath, path.extname(filepath));
        const pkg = {
            name: `component-${name}`,
            main: 'main.js'
        };
        const componentDir = path.join(projectRoot, outputDir, name);

        Promise.all([
            fs.readFileAsync(path.join(projectRoot, filepath), 'utf-8'),
            fse.mkdirsAsync(componentDir)
        ]).then((ret) => {
            const result = parser.parse(ret[0]);
            return Promise.all([
                fse.writeFileAsync(path.join(componentDir, 'template.js'), result.template),
                fse.writeFileAsync(path.join(componentDir, 'style.js'), result.style),
                fse.writeFileAsync(path.join(componentDir, 'script.js'), result.script),
                fse.writeFileAsync(path.join(componentDir, 'main.js'), result.main),
                fse.writeJsonAsync(path.join(componentDir, 'package.json'), pkg),
            ]);
        }).then(() => {
            console.log(`compile ${filepath} => ${componentDir}`);
        }).catch(e => {
            console.error(e);
        });
    });


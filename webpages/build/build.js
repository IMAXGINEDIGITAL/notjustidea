'use strict';

const promisifyAll = require('bluebird').promisifyAll;
const fs = promisifyAll(require('fs'));
const fse = promisifyAll(require('fs-extra'));
const path = require('path');
const npmlog = require('npmlog');
const globule = require('globule');
const art = require('art-template');

const argv = require('yargs')
  .usage('Usage: build -p \'<your pattern>\' -i \'<your layout template>\' -o <your output dir>')
  .example('build -p \'dist/*.js\' -i \'src/layout/main.tpl\' -o \'pages\'')
  .demand('p')
  .alias('p', 'pattern')
  .describe('p', 'Files to compile, globbing supported.')
  .demand('i')
  .alias('i', 'input')
  .describe('i', 'Layout file')
  .demand('o')
  .alias('o', 'output')
  .describe('o', 'Directory to output.')
  .boolean('d')
  .alias('d', 'dev')
  .describe('d', 'For develop')
  .argv;

let patterns;
let layoutFile;
let outputDir;
let isDevelop;

if (typeof argv.pattern === 'string') {
    patterns = [argv.pattern];
} else {
    patterns = argv.pattern.slice(0);
}

if (typeof argv.input === 'string') {
    layoutFile = argv.input;
} else {
    layoutFile = argv.input[0];
}

if (typeof argv.output === 'string') {
    outputDir = argv.output;
} else {
    outputDir = argv.output[0];
}

isDevelop = !!argv.dev;

const projectRoot = path.resolve(__dirname, '..');
const layoutPath = path.join(projectRoot, layoutFile);
const filepaths = globule.find.apply(globule, patterns)

const templateSource = fs.readFileAsync(layoutPath, 'utf-8');

filepaths.forEach(filepath => {
    filepath = path.join(projectRoot, filepath);
    const name = path.basename(filepath, '.js');

    let bundle;
    if (isDevelop) {
        bundle = Promise.resolve(`<script src="dist/${name}.js"></script>`);
    } else {
        bundle = fs.readFileAsync(filepath, 'utf-8')
                        .then(filecontent => {
                            return `<script>${filecontent}</script>`;
                        });
    }
    Promise.all([templateSource, bundle])
        .then(ret => {
            const html = art.compile(ret[0], {
                escape: false,
                openTag: '{{',
                closeTag: '}}'
            })({bundle: ret[1]});
            const outputPath = path.join(projectRoot, outputDir, name + '.html');
            return fse.writeFileAsync(outputPath, html, 'utf-8')
        }).then(() => {
            npmlog.info('build', `${name}.html success`);
        }).catch(e => {
            npmlog.error('build', `${name}.html failure\n`, e);
        });
});

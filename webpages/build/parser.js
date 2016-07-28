'use strict';

const fs = require('fs')
const path = require('path')
const parse5 = require('parse5')
const deindent = require('de-indent')
const templateCompiler = require('../lib/vue-template-compiler')

const projectRoot = path.resolve(__dirname, '..');
const filePath = `${projectRoot}/src/component/name.vue`;
const content = fs.readFileSync(filePath, 'utf-8');


function parseTemplate(template) {
    const result = templateCompiler.compile(template);
    const render = result.render;
    const staticRenderFns = result.staticRenderFns.map(fn => {
        return `function() {${fn}}`;
    });

    return `
export function render() {${render}}
export const staticRenderFns = [${staticRenderFns.join(',')}]
`.trim()
}

function parseStyle(style) {

return `
var headEl = document.getElementsByTagName('head')[0];
var styleEl = document.createElement('style');
headEl.appendChild(styleEl);
var css = '${style.replace(/[\n\r]/g, '')}';

if (styleEl.styleSheet) {
    if (!styleEl.styleSheet.disabled) {
        styleEl.styleSheet.cssText = css;
    }
} else {
    try {
        styleEl.innerHTML = css
    } catch(e) {
        styleEl.innerText = css;
    }
}
`.trim();
}

function parseScript(script) {
    return script.trim();
}

function parseMain() {

return `
import './style';
import {render, staticRenderFns} from './template';
import script from './script';

const options = Object.assign({}, {
    render,
    staticRenderFns
}, script);

export default options;
`.trim();
}

module.exports = {
    parse(content) {
        const fragment = parse5.parseFragment(content, {
            locationInfo: true
        });

        const output = {
            template: [],
            style: [],
            script: []
        }

        fragment.childNodes.forEach(function (node) {
            const type = node.tagName

            if (!output[type]) {
              return
            }

            // skip empty script/style tags
            if (type !== 'template' && (!node.childNodes || !node.childNodes.length)) {
              return
            }

            // template content is nested inside the content fragment
            if (type === 'template') {
              node = node.content
            }

            // extract part
            const start = node.childNodes[0].__location.startOffset
            const end = node.childNodes[node.childNodes.length - 1].__location.endOffset
            const result = deindent(content.slice(start, end))

            output[type].push({
              result
            })
        });

        return {
            template: parseTemplate(output.template[0].result),
            style: parseStyle(output.style[0].result),
            script: parseScript(output.script[0].result),
            main: parseMain()
        }
    }
}

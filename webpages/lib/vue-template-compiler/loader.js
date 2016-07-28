var compiler = require('./index')

module.exports = function(content) {
    this.cacheable()
    var module = {}
    new Function('module', content)(module)
    var result = compiler.compile(module.exports)

    var render = result.render;
    var staticRenderFns = result.staticRenderFns.map(fn => {
        return `function() {${fn}}`;
    });

    return 'module.exports = {' +
             'render: function(){' + render + '},' +
             'staticRenderFns: [' + staticRenderFns.join(',') + ']' +
           '}'
}
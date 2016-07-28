<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<script src="lib/vue.js"></script>
</head>
<body>
<div id="app"></div>
{{bundle}}
<script>
(function(Vue, app) {
    var vue = new Vue({
        el: '#app',
        render: function() {
            with(this) {
                return _h('app')
            }
        },
        staticRenderFns: [],
        components: {
        app: app
        }
    });
})(window.Vue, window.VUE_APP);
</script>
</body>
</html>
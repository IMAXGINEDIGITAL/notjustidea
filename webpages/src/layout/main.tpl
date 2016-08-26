<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link href="assets/reset.css" rel="stylesheet" />
<link href="assets/common.css" rel="stylesheet" />
<script src="lib/es6promise.min.js"></script>
<script src="lib/fetch.min.js"></script>
<script src="lib/vue.min.js"></script>
</head>
<body>
<div id="app">
    <app></app>
</div>
{{bundle}}
<script>
(function(Vue, app) {
    new Vue({
        el: '#app',
        components: {
            app: app
        }
    });
})(window.Vue, window.VUE_APP);
</script>
</body>
</html>
<template>
    <div class="links">
        <a :href="url">{{text}}</a>
        <a href="index.html">随便逛逛</a>
    </div>
</template>

<style scoped>
.links {
    text-align: center;

    & a {
        display: inline-block;
        text-decoration: underline;
        margin: 0 10px;
        font-size: 12px;
        color: #FFF;
    }
}
</style>

<script>
export default {
    props: ['url', 'text']
}
</script>
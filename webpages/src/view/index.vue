<template>
    <div>
        <h1>直达页面</h1>
        <ul>
            <li v-for="item in urls">
                <a :href="item.url">&gt; {{item.text}}</a>
            </li>
        </ul>
    </div>
</template>

<style scoped>
h1 {
    padding: 10px;
    font-size: 30px;
    color: #FFF;
}

li {
    margin: 20px;

    & a {
        font-size: 18px;
        color: #FFF;
        text-decoration: none;
    }
}
</style>

<script>
export default {
    data() {
        return {
            urls: [
                {
                    url: 'apitest.html',
                    text: 'API测试'
                },
                {
                    url: 'signin.html',
                    text: '登录'
                },
                {
                    url: 'signup.html',
                    text: '注册'
                },
                {
                    url: 'findpsw.html',
                    text: '找回密码'
                }
            ]
        }
    }
}
</script>
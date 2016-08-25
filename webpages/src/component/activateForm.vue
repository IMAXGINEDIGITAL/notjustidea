<template>
    <div v-if="email">
        <h1>请验证邮箱</h1>
        <div class="link">验证链接已发送至您的邮箱 <b>{{email}}</b>，请<span v-if="emailbox">点击 <a :href="emailbox">这里</a></span> 前往验证。</div>
    </div>
    <a href="index.html" class="back">返回首页</a>
</template>

<style scoped>
h1 {
    text-align: center;
    font-size: 36px;
    color: #fff;
}

.link {
    font-size: 14px;
    text-align: center;
    color: #fff;
    margin: 28px 0 38px;

    & b, & a {
        color: #138af1;
    }

    & a {
        text-decoration: none;
    }
}

.back {
    text-decoration: none;
    font-size: 14px;
    margin: 0 auto;
    display: block;
    width: 160px;
    height: 40px;
    text-align: center;
    color: #FFF;
    line-height: 40px;
    border-radius: 20px;
    border: 0;
    padding: 0;
    vertical-align: middle;
    cursor: pointer;
    background: linear-gradient(99deg, rgba(113, 169, 216, 1), rgba(69, 161, 255, 1) 28%, rgba(48, 201, 174, 1));
}
</style>

<script>
import emailBoxMap from '../common/emailboxmap';

export default {
    props: ['email'],

    data() {
        return {
            email: '',
            emailbox: ''
        }
    },

    created() {
        if (this.email) {
            const posfix = this.email.match(/\@([^@]+)$/);
            if (posfix && emailBoxMap[posfix[1]]) {
                this.emailbox = emailBoxMap[posfix[1]];
            }
        }
    }
}
</script>
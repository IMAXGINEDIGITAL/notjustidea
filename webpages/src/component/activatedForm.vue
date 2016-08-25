<template>
    <div v-if="email">
        <h1>邮箱验证成功</h1>
        <p>欢迎加入中国最新锐的创意资源库。</p>
        <p>登录后即可上传自己的创意作品、委托查找供应商等。</p>
    </div>
    <signinform class="form" :email="email"></signinform>
</template>

<style scoped>
h1 {
    text-align: center;
    font-size: 36px;
    color: #fff;
    margin-bottom: 12px;
}

p {
    font-size: 14px;
    text-align: center;
    color: #fff;
    line-height: 2em;
}

.form {
    margin-top: 20px;
}

</style>

<script>
import emailBoxMap from '../common/emailboxmap';
import signinForm from './signinForm.vue';

export default {
    props: ['email'],

    data() {
        return {
            email: '',
            emailbox: ''
        }
    },

    components: {
        signinform: signinForm
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
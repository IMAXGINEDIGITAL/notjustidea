<template>
    <h1>找回密码</h1>
    <div v-if="showForm" class="form">
        <field 
            :width="formWidth" 
            placeholder="请输入当时注册的邮箱地址" 
            :value.sync="email" 
            :err-msg="errMsg"></field>
        <submit v-ref:submit :width="formWidth" class="btn" text="确认"></submit>
    </div>
    <div v-if="showTips" class="tips">
        <div class="link">验证链接已发送至您的邮箱 <b>{{email}}</b>，请<span v-if="emailbox">点击 <a :href="emailbox">这里</a></span> 前往验证。</div>
    </div>
</template>

<style scoped>
    h1 {
        font-size: 36px;
        text-align: center;
        color: #fff;
    }

    .form {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 36px;
    }

    .btn {
        margin-top: 30px;
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

</style>

<script>
import {findpsw} from '../action/findpsw';
import accountFormField from './accountFormField.vue';
import accountFormButton from './accountFormButton.vue';
import emailBoxMap from '../common/emailboxmap';

export default {
    data() {
        return {
            formWidth: 304,
            errMsg: '', 
            email: '',
            showForm: true,
            showTips: false
        }
    },

    components: {
        field: accountFormField,
        submit: accountFormButton
    },

    ready() {
        this.$refs.submit.$on('clicked', () => {
            this.findpsw();
        });
    },

    methods: {
        findpsw() {
            findpsw(this.email)
                .then((ret) => {
                    this.showForm = false;
                    this.showTips = true;
                    const posfix = this.email.match(/\@([^@]+)$/);
                    if (posfix && emailBoxMap[posfix[1]]) {
                        this.emailbox = emailBoxMap[posfix[1]];
                    }
                }).catch((errs) => {
                    if (errs.emailError) {
                        this.errMsg = errs.emailError;
                    }
                });
        }
    }
}
</script>
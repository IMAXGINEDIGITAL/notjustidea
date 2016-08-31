<template>
    <div v-if="message">
        <p>{{{message}}}</p>
    </div>
    <div v-else>
        <h1>{{title}}</h1>
        <div v-show="showForm" class="form">
            <field 
                :width="formWidth" 
                placeholder="登录密码至少8位，需含英文及数字"
                type="password" 
                :value.sync="password" 
                :err-msg.sync="pswErrorMsg"></field>

            <field 
                :width="formWidth" 
                placeholder="请再次确认密码" 
                type="password"
                :value.sync="confirmPassword" 
                :err-msg.sync="confirmPswErrorMsg"></field> 

            <captcha 
                :width="formWidth" 
                :captcha.sync="captcha"
                :captcha-id.sync="captchaId"
                :captcha-err-msg.sync="captchaErrorMsg"></captcha>

            <submit v-ref:submit :width="formWidth" class="btn" text="重置"></submit>
        </div>

        <div v-show="showBack" class="form">
            <back v-ref:back :width="formWidth * 0.5" class="btn" text="重新登录"></back>
        </div>
    </div>

    <tip v-if="globalErrorMsg" :text.sync="globalErrorMsg"></tip>
</template>


<script>
import {resetpsw} from '../action/resetpsw';
import globalTip from './globalTip.vue';
import captchaField from './captchaField.vue';
import accountFormField from './accountFormField.vue';
import accountFormButton from './accountFormButton.vue';

export default {
    props: ['email', 'code'],

    data() {
        return {
            title: '重设密码',
            formWidth: 304,
            password: '',
            pswErrorMsg: '',
            confirmPassword: '',
            confirmPswErrorMsg: '',
            captcha: '',
            captchaId: '',
            captchaErrorMsg: '',
            globalErrorMsg: '',
            showForm: false,
            showBack: false,
            message: ''
        }
    },

    components: {
        field: accountFormField,
        submit: accountFormButton,
        back: accountFormButton,
        captcha: captchaField,
        tip: globalTip
    },

    ready() {
        if (this.email && this.code) {
            this.showForm = true;

            this.$refs.submit.$on('clicked', () => {
                this.submit();
            });

            this.$refs.back.$on('clicked', () => {
                this.backToSignin();
            });
        } else {
            this.message = '无法重置密码';
        }
    },

    methods: {
        submit() {
            resetpsw(
                this.email,
                this.code,
                this.password,
                this.confirmPassword,
                this.captcha,
                this.captchaId
            ).then((ret) => {
                this.showForm = false;
                this.showBack = true;
                this.title = '重设密码成功，3秒后自动返回首页';
                setTimeout(() => this.backToIndex(), 3000);
            }).catch((errs) => {
                if (errs instanceof Error) {
                    return Promise.reject(errs);
                }

                for (const key in errs) {
                    if (errs[key]) {
                        this[`${key}Msg`] = errs[key];
                    }
                }
            });
        },

        backToSignin() {
            location.href = 'signin.html';
        }
    }
}
</script>

<style scoped>
    h1 {
        font-size: 36px;
        text-align: center;
        color: #fff;
    }

    p {
        font-size: 14px;
        text-align: center;
        color: #fff;
        line-height: 2em;
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
</style>
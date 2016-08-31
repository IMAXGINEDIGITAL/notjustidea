<template>
    <h1>找回密码</h1>

    <div v-if="showForm" class="form">
        <field 
            :width="formWidth" 
            placeholder="请输入当时注册的邮箱地址" 
            :value.sync="email" 
            :err-msg.sync="emailErrorMsg"></field>

        <captcha 
            :width="formWidth" 
            :captcha.sync="captcha"
            :captcha-id.sync="captchaId"
            :captcha-err-msg.sync="captchaErrorMsg"></captcha>

        <submit v-ref:submit :width="formWidth" class="btn" text="确认"></submit>
    </div>

    <div v-if="showTips" class="tips">
        <div class="link">验证链接已发送至您的邮箱 <b>{{email}}</b>，请<span v-if="emailbox">点击 <a :href="emailbox">这里</a></span> 前往验证。</div>
    </div>

    <tip v-if="globalErrorMsg" :text.sync="globalErrorMsg"></tip>
</template>


<script>
import {findpsw} from '../action/findpsw';
import globalTip from './globalTip.vue';
import captchaField from './captchaField.vue';
import accountFormField from './accountFormField.vue';
import accountFormButton from './accountFormButton.vue';
import emailBoxMap from '../common/emailboxmap';

export default {
    data() {
        return {
            formWidth: 304,
            email: '',
            emailbox: '',
            emailErrorMsg: '',
            captcha: '',
            captchaId: '',
            captchaErrorMsg: '',
            globalErrorMsg: '',
            showForm: true,
            showTips: false
        }
    },

    components: {
        field: accountFormField,
        submit: accountFormButton,
        captcha: captchaField,
        tip: globalTip
    },

    ready() {
        this.$refs.submit.$on('clicked', () => {
            this.submit();
        });
    },

    methods: {
        submit() {
            findpsw(
                this.email,
                this.captcha,
                this.captchaId
            ).then((ret) => {
                if (ret.sended) {
                    this.showForm = false;
                    this.showTips = true;
                    const posfix = this.email.match(/\@([^@]+)$/);
                    if (posfix && emailBoxMap[posfix[1]]) {
                        this.emailbox = emailBoxMap[posfix[1]];
                    }
                } else {
                    return Promise.reject({
                        globalError: '服务器正忙，请稍后再试'
                    });
                }
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

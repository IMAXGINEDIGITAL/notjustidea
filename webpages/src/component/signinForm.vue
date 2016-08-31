<template>
    <div class="form">
        <field :width="formWidth" 
            placeholder="邮箱地址" 
            type="text" 
            :value.sync="email" 
            :err-msg.sync="emailErrorMsg"></field>
        <field :width="formWidth" 
            placeholder="密码" 
            type="password" 
            :value.sync="password" 
            :err-msg.sync="pswErrorMsg"></field>

        <captcha 
            :width="formWidth" 
            :captcha.sync="captcha"
            :captcha-id.sync="captchaId"
            :captcha-err-msg.sync="captchaErrorMsg"></captcha>

        <div class="extra" :style="{width: formWidth + 'px'}">
            <div>
                <input class="checkbox" type="checkbox" v-model="remember" />
                <span @click="toggleRemember">保持登录状态</span>
            </div>
            <a href="findpsw.html">忘记密码？</a>
        </div>
        <submit v-ref:submit :width="formWidth" class="btn" text="登录"></submit>
    </div>

    <tip v-if="globalErrorMsg" :text.sync="globalErrorMsg"></tip>
</template>


<script>
import {signin} from '../action/signin';
import globalTip from './globalTip.vue';
import captchaField from './captchaField.vue';
import accountFormField from './accountFormField.vue';
import accountFormButton from './accountFormButton.vue';

export default {
    props: ['email'],

    data() {
        return {
            formWidth: 304,
            email: '',
            password: '',
            emailErrorMsg: '',
            pswErrorMsg: '',
            captcha: '',
            captchaId: '',
            captchaErrorMsg: '',
            globalErrorMsg: '',
            remember: false
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
            signin(
                this.email,
                this.password,
                this.captcha,
                this.captchaId,
                this.remember
            ).then((ret) => {
                location.href = 'index.html';
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

        toggleRemember() {
            this.remember = !this.remember;
        }
    }
}
</script>

<style scoped>
    .form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .extra {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        & > div {
            display: flex;
            align-items: center;
            font-size: 12px;
            color: #FFF;
            cursor: pointer;

            & input {
                display: inline-block;
                margin: 0;
            }

            & span {
                display: inline-block;
                margin-left: 10px;
            }
        }

        & a {
            color: #FFF;
            font-size: 12px;
            text-decoration: none;
        }
    }

    .btn {
        margin-top: 40px;
    }
</style>
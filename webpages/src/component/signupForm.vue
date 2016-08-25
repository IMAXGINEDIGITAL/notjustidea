<template>
    <div class="form">
        <field :width="formWidth" 
            placeholder="用于登录的邮箱 username@mailbox.com" 
            type="text" 
            :value.sync="email" 
            :err-msg="emailErrorMsg"></field>

        <field 
            :width="formWidth" 
            placeholder="登录密码至少8位，需含英文及数字" 
            type="password"
            :value.sync="password" 
            :err-msg="pswErrorMsg"></field>

        <field 
            :width="formWidth" 
            placeholder="请再次确认密码" 
            type="password"
            :value.sync="confirmPassword" 
            :err-msg="confirmPswErrorMsg"></field>

        <div class="extra" :style="{width: formWidth + 'px'}">
            <input class="checkbox" type="checkbox" v-model="isAgreePolicy" />
            <div @click="togglePolicy">我已阅读并同意 <a href="#">使用条款</a> 和 <a href="#">隐私政策</a></div>
        </div>

        <submit v-ref:submit :width="formWidth" class="btn" text="注册"></submit>
    </div>
</template>

<style scoped>
    .form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .extra {
        font-size: 12px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;

        & input {
            margin: 0;
        }

        & div {
            color: #fff;
            margin-left: 10px;
            cursor: pointer;
        }

        & a {
            color: #43a2fd;
            text-decoration: none;
        }
    }

    .btn {
        margin-top: 40px;
    }
</style>

<script>
import {signup} from '../action/signup';
import accountFormField from './accountFormField.vue';
import accountFormButton from './accountFormButton.vue';

export default {
    data() {
        return {
            formWidth: 304,
            isAgreePolicy: true,
            email: '',
            password: '',
            confirmPassword: '',
            emailErrorMsg: '',
            pswErrorMsg: '',
            confirmPswErrorMsg: ''
        }
    },

    components: {
        field: accountFormField,
        submit: accountFormButton
    },

    ready() {
        this.$refs.submit.$on('clicked', () => {
            this.signup();
        });
    },

    methods: {
        signup() {
            signup(this.email, this.password, this.confirmPassword)
                .then((ret) => {
                    location.href = `activate.html?email=${this.email}`;
                }).catch((errs) => {
                    if (errs.emailError) {
                        this.emailErrorMsg = errs.emailError;
                    }

                    if (errs.pswError) {
                        this.pswErrorMsg = errs.pswError;
                    }

                    if (errs.confirmPswError) {
                        this.confirmPswErrorMsg = errs.confirmPswError;
                    }
                });
        },

        togglePolicy() {
            this.isAgreePolicy = !this.isAgreePolicy;
        }
    }
}
</script>
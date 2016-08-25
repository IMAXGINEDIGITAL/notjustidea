<template>
    <div class="form">
        <field :width="formWidth" 
            placeholder="邮箱地址" 
            type="text" 
            :value.sync="email" 
            :err-msg="emailErrorMsg"></field>
        <field :width="formWidth" 
            placeholder="密码" 
            type="password" 
            :value.sync="password" 
            :err-msg="pswErrorMsg"></field>
        <div class="extra" :style="{width: formWidth + 'px'}">
            <div>
                <input class="checkbox" type="checkbox" v-model="isKeepSignin" />
                <span @click="toggleKeepSignin">保持登录状态</span>
            </div>
            <a href="findpsw.html">忘记密码？</a>
        </div>
        <submit v-ref:submit :width="formWidth" class="btn" text="登录"></submit>
    </div>
</template>

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

<script>
import {signin} from '../action/signin';
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
            isKeepSignin: false
        }
    },

    components: {
        field: accountFormField,
        submit: accountFormButton
    },

    ready() {
        this.$refs.submit.$on('clicked', () => {
            this.signin();
        });
    },

    methods: {
        signin() {
            signin(this.email, this.password, this.isKeepSignin)
                .then((ret) => {
                    location.href = 'index.html';
                }).catch((errs) => {
                    if (errs.emailError) {
                        this.emailErrorMsg = errs.emailError;
                    }

                    if (errs.pswError) {
                        this.pswErrorMsg = errs.pswError;
                    }
                });
        },

        toggleKeepSignin() {
            this.isKeepSignin = !this.isKeepSignin;
        }
    }
}
</script>
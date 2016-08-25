<template>
    <h1>{{title}}</h1>
    <div v-show="showForm" class="form">
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
        <submit v-ref:submit :width="formWidth" class="btn" text="确认"></submit>
    </div>
    <div v-show="showBack" class="form">
        <back v-ref:back :width="formWidth * 0.5" class="btn" text="返回首页"></back>
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
</style>

<script>
import {resetpsw} from '../action/resetpsw';
import accountFormField from './accountFormField.vue';
import accountFormButton from './accountFormButton.vue';

export default {
    props: ['email', 'activeCode'],

    data() {
        return {
            title: '重设密码',
            formWidth: 304,
            password: '',
            confirmPassword: '',
            pswErrorMsg: '',
            confirmPswErrorMsg: '',
            showForm: true,
            showBack: false
        }
    },

    components: {
        field: accountFormField,
        submit: accountFormButton,
        back: accountFormButton
    },

    ready() {
        this.$refs.submit.$on('clicked', () => {
            this.resetpsw();
        });

        this.$refs.back.$on('clicked', () => {
            this.backToIndex();
        });
    },

    methods: {
        resetpsw() {
            resetpsw(this.password, this.confirmPassword)
                .then((ret) => {
                    this.showForm = false;
                    this.showBack = true;
                    this.title = '重设密码成功，5秒后跳转至首页';
                    setTimeout(() => this.backToIndex(), 5000);
                }).catch((errs) => {
                    if (errs.pswError) {
                        this.pswErrorMsg = errs.pswError;
                    }

                    if (errs.confirmPswError) {
                        this.confirmPswErrorMsg = errs.confirmPswError;
                    }
                });
        },

        backToIndex() {
            location.href = 'index.html';
        }
    }
}
</script>
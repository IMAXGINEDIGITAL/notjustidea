<template>
    <div class="form">
        <div class="field" :class="{error: !!emailErrorMsg}">
            <input @focus="reset" class="inputtext" type="text" placeholder="用于登录的邮箱 username@mailbox.com" v-model="email"/>
            <div class="errMsg">← {{emailErrorMsg}}</div>
        </div>
        <div class="field" :class="{error: !!pswErrorMsg}">
            <input @focus="reset" class="inputtext" type="password" placeholder="登录密码至少8位，需含英文及数字" v-model="password"/>
            <div class="errMsg">← {{pswErrorMsg}}</div>
        </div>
        <div class="field" :class="{error: !!confirmPswErrorMsg}">
            <input @focus="reset" class="inputtext" type="password" placeholder="请再次确认密码" v-model="confirmPassword"/>
            <div class="errMsg">← {{confirmPswErrorMsg}}</div>
        </div>
        <div class="extra">
            <input class="checkbox" type="checkbox" v-model="isAgreePolicy" />
            <div @click="togglePolicy">我已阅读并同意 <a href="#">使用条款</a> 和 <a href="#">隐私政策</a></div>
        </div>
        <div class="action">
            <!-- <a class="back btn" @click="back">返回</a> -->
            <a v-if="isAgreePolicy" class="signup btn" @click="signup">注册</a>
        </div>
        <div class="other">
            <a href="signin.html">登录</a>
            <a href="index.html">随便逛逛</a>
        </div>
    </div>
</template>

<style scoped>
    :root {
        --field-width: 304px;
    }

    .form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .field {
        width: var(--field-width);
        position: relative;
        overflow: visible;
        margin-bottom: 8px;

        & .inputtext {
            width: var(--field-width);
            height: 60px;
            line-height: 60px;
            box-sizing: border-box;
            background-color: #ccc;
            border: 2px solid transparent;
            padding: 0 20px;
            font-size: 14px;

            &::-webkit-input-placeholder {
                color: rgba(0, 0, 0, 0.5);
                font-size: 14px;
            }
        }

        &.error .inputtext {
            border: 2px solid red;
        }

        & .errMsg {
            display: none;
            position: absolute;
            right: -180px;
            top: 11px;
            width: 216px;
            height: 38px;
            line-height: 38px;
            color: #FFF;
            font-size: 14px;
            text-align: center;
            border-radius: 19px;
            background: linear-gradient(99deg, #e10019, #00601b);
        }

        &.error .errMsg {
            display: block;
        }
    }

    .extra {
        width: var(--field-width);
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

    .action {
        width: var(--field-width);
        margin: 40px 0 28px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        & .btn {
            width: 100%;
            height: 38px;
            line-height: 38px;
            text-align: center;
            font-size: 14px;
            border-radius: 20px;
            border: 0;
            padding: 0;
            vertical-align: middle;
            cursor: pointer;

            &.back {
                background-color: #fff;
                color: #000;
            }

            &.signup {
                background: linear-gradient(99deg, rgba(113, 169, 216, 1), rgba(69, 161, 255, 1) 28%, rgba(48, 201, 174, 1));
                color: #fff;
            }
        }
    }

    .other {
        text-align: center;

        & a {
            display: inline-block;
            text-decoration: underline;
            margin: 0 10px;
            font-size: 12px;
            color: #FFF;
        }
    }
</style>

<script>
import {signup} from '../action/signup';

export default {
    data() {
        return {
            isAgreePolicy: true,
            email: '',
            password: '',
            confirmPassword: '',
            emailErrorMsg: '',
            pswErrorMsg: '',
            confirmPswErrorMsg: ''
        }
    },

    methods: {
        signup() {
            signup(this.email, this.password, this.confirmPassword)
                .then((ret) => {
                    location.href = 'activate.html';
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

        reset() {
            this.emailErrorMsg = '';
            this.pswErrorMsg = '';
            this.confirmPswErrorMsg = '';
        },

        togglePolicy() {
            this.isAgreePolicy = !this.isAgreePolicy;
        }
    }
}
</script>
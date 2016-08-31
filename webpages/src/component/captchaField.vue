<template>
    <div :style="{width: width + 'px'}" class="field">
        <img @click="refresh" class="img" :src="captchaSrc" />
        
        <div class="text">
            <field 
                width="100%" 
                placeholder="点击验证码刷新" 
                type="text"
                :value.sync="captcha" 
                :err-msg.sync="captchaErrMsg"></field>
        </div>
    </div>
</template>

<script>
const {fetch, URL} = window;
import accountFormField from './accountFormField.vue';
import {host} from '../common/serverConfig';

export default {
    props: ['width', 'captcha', 'captchaId', 'captchaErrMsg'],

    data() {
        return {
            captchaSrc: ''
        }
    },

    components: {
        field: accountFormField
    },

    ready() {
        this.refresh();
    },

    methods: {
        refresh() {
            fetch(`${host}/common/captcha.png`, {
                mode: 'cors',
                credentials: 'include'
            }).then(res => {
                this.captchaId = res.headers.get('id');
                return res.blob();
            }).then(blob => {
                this.captchaSrc = URL.createObjectURL(blob);
            });
        }
    }
}
</script>

<style scoped>
   .field {
        position: relative;
        overflow: visible;
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        justify-content: stretch;

        & .img {
            width: 78px;
            height: 40px;
            margin-right: 15px;
            cursor: pointer;
        }

        & .text {
            flex: 1;
            height: 60px;
        }
    }
</style>
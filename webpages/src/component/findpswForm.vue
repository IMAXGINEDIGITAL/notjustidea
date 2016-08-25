<template>
    <h1>找回密码</h1>
    <div class="form">
        <field v-ref:email :width="formWidth" placeholder="请输入当时注册的邮箱地址" :value="email" :err-msg="errMsg"></field>
        <submit v-ref:submit :width="formWidth" class="btn" text="确认"></submit>
    </div>
    <links class="links"></links>
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

    .links {
        margin-top: 28px;
    }
</style>

<script>
import accountFormField from './accountFormField.vue';
import accountFormButton from './accountFormButton.vue';
import signLinks from './signLinks.vue';

export default {
    data() {
        return {
            formWidth: 304,
            errMsg: '', 
            email: ''
        }
    },

    components: {
        field: accountFormField,
        submit: accountFormButton,
        links: signLinks
    },

    ready() {
        this.$refs.submit.$on('clicked', () => {
            this.findpsw();
        });
    },

    methods: {
        findpsw() {
            console.log(this.$refs.email.value, this.email)
        }
    }
}
</script>
<template>
    <div v-if="validated">
        <h1>邮箱验证成功</h1>
        <p>欢迎加入中国最新锐的创意资源库。</p>
        <p>登录后即可上传自己的创意作品、委托查找供应商等。</p>
        <signinform class="form" :email="email"></signinform>
    </div>
    <div v-else>
        <p>{{{message}}}</p>
    </div>
</template>

<style scoped>
h1 {
    text-align: center;
    font-size: 36px;
    color: #fff;
    margin-bottom: 12px;
}

p {
    font-size: 14px;
    text-align: center;
    color: #fff;
    line-height: 2em;
}

.form {
    margin-top: 20px;
}

</style>

<script>
import {activate} from '../action/activate';
import signinForm from './signinForm.vue';

export default {
    props: ['email', 'code'],

    data() {
        return {
            validated: false,
            message: '正在验证邮箱...'
        }
    },

    components: {
        signinform: signinForm
    },

    ready() {
        if (this.email && this.code) {
            this.submit()
        } else {
            this.message = '无法验证邮箱';
        }
    },

    methods: {
        submit() {
            activate(this.email, this.code)
                .then(() => {
                    this.validated = true;
                }).catch((errs) => {
                    if (errs instanceof Error) {
                        return Promise.reject(errs);
                    }

                    this.message = Object.values(errs)
                                    .filter(s => s)
                                    .join('<br />');
                });
        }
    }
}
</script>
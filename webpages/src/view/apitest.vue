<template>
    <h1>API测试</h1>
    <form>
        <h2>定义</h2>
        <div>
            <input style="width: 400px;" type="text" placeholder="输入API名称，例如/common/checkcaptcha" v-model="api" />
        </div>
        <h3>qs参数</h3>
        <div v-for="item in qslist" track-by="$index">
            <input v-model="item.name" type="text" placeholder="参数名" />
            <input v-model="item.value" type="text" placeholder="参数值" />
        </div>
        <div><a class="btn" @click="addqs">增加qs参数</a></div>
        <h3>data参数</h3>
        <div v-for="item in datalist" track-by="$index">
            <input v-model="item.name" type="text" placeholder="参数名" />
            <input v-model="item.value" type="text" placeholder="参数值" />
        </div>
        <div><a class="btn" @click="adddata">增加data参数</a></div>
    </form>
    <form>
        <h2>验证码</h2>
        <div>
            <input v-model="captcha" placeholder="请输入验证码" type="text" />
            <img :src="captchaSrc" />
            <a class="btn" @click="refreshCaptcha">刷新</a>
        </div>
        <div>
            <a class="submit" @click="request('GET')">GET请求</a>
            <a class="submit" @click="request('POST')">POST请求</a>
        </div>
    </form> 

    <pre>{{result}}</pre>
</template>

<script>
const serverHost = 'http://www.notjustidea.com/apis'
const {JSON, Promise} = window;

export default {
    data() {
        return {
            api: '',
            method: 'GET',
            qslist: [{
                name: '',
                value: ''
            }],
            datalist: [{
                name: '',
                value: ''
            }],
            captchaSrc: '',
            captchaId: '',
            captcha: '',
            result: ''
        }
    },

    ready() {
       this.refreshCaptcha();
    },

    methods: {
        addqs() {
            this.qslist.push({
                name: '',
                text: ''
            });
        },

        adddata() {
            this.datalist.push({
                name: '',
                text: ''
            });
        },

        request(method) {
            if (this.api === '') {
                return;
            }

            const qs = this.qslist.filter(({name, value}) => name && value)
                            .map(({name, value}) => {
                            return `${name}=${encodeURIComponent(value)}`;
                            });

            const data = {};

            this.datalist.filter(({name, value}) => name && value)
                            .reduce((last, item) => {
                                last[item.name] = item.value;
                                return last;
                            }, data);

            const options = {
                method: method,
                mode: 'cors',
                credentials: 'include'
            };

            if (method === 'POST') {
                if (this.captcha) {
                    data['captcha'] = this.captcha;
                    data['captchaId'] = this.captchaId;
                }
                options.body = JSON.stringify(data);
            } else if (method === 'GET' && this.captcha){
                qs.push(`captcha=${this.captcha}`,
                        `captchaId=${this.captchaId}`);
            }

            fetch(`${serverHost}${this.api}?__${Date.now()}__&${qs.join('&')}`, options)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject({
                        url: res.url,
                        status: res.status,
                        statusText: res.statusText
                    });
                }
            }).then(json => {
                this.result = JSON.stringify(json, null, '  ');
            }).catch(err => {
                this.result = JSON.stringify(err, null, '  ');
            });
        },

        checkCaptcha() {
            const api = `${serverHost}/common/checkcaptcha`;
            fetch(`${api}?captchaId=${this.captchaId}&captcha=${this.captcha}`, {
                credentials: 'include'
            }).then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject({
                        url: res.url,
                        status: res.status,
                        statusText: res.statusText
                    });
                }
            }).then(json => {
                this.result = JSON.stringify(json, null, '  ');
            }).catch(err => {
                this.result = JSON.stringify(err, null, '  ');
            });
        },

        refreshCaptcha() {
            fetch(`${serverHost}/common/captcha.png`, {
                credentials: 'include'
            }).then(res => {
                this.captchaId = res.headers.get('id');
                return res.blob();
            }).then(blob => {
                this.captchaSrc = URL.createObjectURL(blob);
            })
        }
    }
}
</script>

<style scoped>
h1 {
    font-size: 30px;
    color: #FFF;
    margin: 10px;
}

h2 {
    font-size: 26px;
    color: #DDD;
    margin: 20px;
}

h3 {
    font-size: 20px;
    color: #DDD;
    margin: 25px;
}


form > div {
    display: flex;
    margin-left: 30px;
    align-items: center;
}

input {
    width: 200px;
    border: 1px solid #FFF;
    padding: 5px;
    margin: 5px;
    display: inline-block;
    font-size: 14px;
}

label {
    font-size: 20px;
    color: #BBB;
    padding: 10px;
    display: inline-block;
}

.btn, .submit {
    border-radius: 4px;
    border: 1px solid #FFF;
    font-size: 14px;
    padding: 5px;
    margin: 5px;
    background-color: #FFF;
    cursor: pointer;
}

.submit {
    width: 40%;
    display: block;
    box-sizing: border-box;
    margin: 10px auto;
    text-align: center;
    font-size: 20px;
    background-color: green;
    cursor: pointer;
}

pre {
    width: 80%;
    min-height: 100px;
    box-sizing: border-box;
    margin: 20px auto;
    border: 1px solid #DDD;
    padding: 10px;
    font-size: 15px;
    background-color: #BBB;
    color: #333;
    word-break: break-all; 
}
</style>
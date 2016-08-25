<template>
    <div :style="{width: width + 'px'}" class="field" :class="{error: !!errMsg}">
        <input @focus="reset" class="inputtext" :type="type" :placeholder="placeholder" v-model="value" />
        <div class="errMsg">← {{errMsg}}</div>
    </div>
</template>

<style scoped>
    .field {
        position: relative;
        overflow: visible;
        margin-bottom: 8px;

        & .inputtext {
            width: 100%;
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

        &.error .inputtext{
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
</style>

<script>
export default {
    props: ['width', 'type', 'value', 'placeholder', 'errMsg'],

    data() {
        // return {
        //     type: '',
        //     value: '',
        //     errMsg: '',
        //     placeholder: ''
        // }
    },

    methods: {
        reset() {
            this.errMsg = '';
        },

        created() {
            this.type = this.type || 'text';
        }
    }
}
</script>
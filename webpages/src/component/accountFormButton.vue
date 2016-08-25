<template>
    <div class="action" :style="{width: width + 'px'}">
        <a class="btn" @click="clicked">{{text}}</a>
    </div>
</template>

<style scoped>
    .action {
        display: flex;
        flex-direction: row;
        align-items: center;

        & .btn {
            width: 100%;
            height: 38px;
            line-height: 38px;
            text-align: center;
            color: #FFF;
            font-size: 14px;
            border-radius: 20px;
            border: 0;
            padding: 0;
            vertical-align: middle;
            cursor: pointer;
            background: linear-gradient(99deg, rgba(113, 169, 216, 1), rgba(69, 161, 255, 1) 28%, rgba(48, 201, 174, 1));
        }
    }
</style>

<script>
export default {
    props: ['width', 'text'],

    methods: {
        clicked() {
            this.$emit('clicked');
        }
    }
}
</script>
<template>
    <div class="layout" :style="{width:width + 'px', height:height + 'px'}">
        <slot></slot>
    </div>
</template>

<style scoped>
    .layout {
        padding-top: 48px;
        background: linear-gradient(99deg, rgba(113, 169, 216, 0.3), rgba(69, 161, 255, 0.3) 28%, rgba(48, 201, 174, 0.3));
    }
</style>

<script>
export default {
    data() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    },

    ready() {
        window.addEventListener('resize', () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
        });
    }
}
</script>
<template>
    <div v-el:wrap :style="{left: left + 'px', top: top + 'px'}" transition="fade">
        <p>{{{text}}}</p>
    </div>
</template>

<style scoped>
 .fade-transition{
    position: absolute;
    z-index: 99999;
    padding: 15px 20px;
    background-color: rgba(0, 0, 0, 0.7);
    color: rgba(255,255,255,0.9);
    font-size: 16px;
    border-radius: 4px;
    opacity: 1;
    transition: opacity 0.6s ease 0s;

    & p {
        padding: 0;
        margin: 0;
        line-height: 1.5em;
    }
}

.fade-enter, .fade-leave {
    opacity: 0;
}
</style>

<script>
export default {
    props: ['text'],

    data() {
        return {
            left: 0,
            top: 0
        }
    },

    attached() {
        this.text = this.text.replace(/\n/g, '</p><p>');
        const rect = this.$els.wrap.getBoundingClientRect();
        this.left = (window.innerWidth - rect.width) / 2;
        this.top = (window.innerHeight - rect.height) / 2;
        setTimeout(() => {
            this.$remove(() => {
                this.text = '';
            });
        }, 2000)
    }
}
</script>
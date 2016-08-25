<template>
    <layout>
        <title></title>
        <aform></aform>
        <links class="links" text="注册" url="signup.html"></links>
    </layout>
</template>

<style scoped>
    .links {
        margin-top: 28px;
    }
</style>

<script>
import accountLayout from '../component/accountLayout.vue';
import signTitle from '../component/signTitle.vue';
import findpswForm from '../component/findpswForm.vue';
import signLinks from '../component/signLinks.vue';

export default {
    components: {
        layout: accountLayout,
        title: signTitle,
        aform: findpswForm,
        links: signLinks
    }
}
</script>